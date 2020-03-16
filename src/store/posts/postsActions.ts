import { ThunkDispatch } from 'redux-thunk'

import { API_ENDPOINT } from '../../config/config'
import { InitPost, Post, Sort, User } from '../../types'
import { RootState } from '../rootReducer'
import ActionTypes, { Actions } from './actionTypes'

export const getData = () => async (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): Promise<void> => {
  dispatch({ type: ActionTypes.DATA_LOAD_START })

  const getPosts = (): Promise<InitPost[]> =>
    fetch(`${API_ENDPOINT}/posts`)
      .then(response => response.json())
      .catch(() =>
        dispatch({
          type: ActionTypes.DATA_LOAD_ERROR,
          payload: 'Data load error.',
        })
      )

  const getUsers = (): Promise<User[]> =>
    fetch(`${API_ENDPOINT}/users`)
      .then(response => response.json())
      .catch(() =>
        dispatch({
          type: ActionTypes.DATA_LOAD_ERROR,
          payload: 'Data load error.',
        })
      )

  const getPostsAndUsers = async (): Promise<void> => {
    const posts: InitPost[] = await getPosts()
    const users: User[] = await getUsers()

    if (!Array.isArray(posts || users)) return

    const data = posts.map(post => {
      const user = users.find(user => user.id === post.userId)
      return { ...post, userName: user?.name }
    })

    dispatch({
      type: ActionTypes.DATA_LOAD_SUCCESS,
      payload: { data, users },
    })
  }

  getPostsAndUsers()
}

export const updatePost = (post: Pick<Post, 'body' | 'title' | 'id'>) => async (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): Promise<void> => {
  dispatch({ type: ActionTypes.POST_UPDATE_START })

  await fetch(`${API_ENDPOINT}/posts/${post.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: post.title, body: post.body }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(response => {
      if (response.status !== 200) throw new Error()
      else return response.json()
    })
    .then(response =>
      dispatch({
        type: ActionTypes.POST_UPDATE_SUCCESS,
        payload: response,
      })
    )
    .catch(() =>
      dispatch({
        type: ActionTypes.POST_UPDATE_ERROR,
        payload: 'Post update error.',
      })
    )
}

export const deletePost = (id: number) => async (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): Promise<void> => {
  dispatch({ type: ActionTypes.POST_DELETE_START })

  await fetch(`${API_ENDPOINT}/posts/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: ActionTypes.POST_DELETE_SUCCESS, payload: id })
      }
    })
    .catch(() =>
      dispatch({
        type: ActionTypes.POST_DELETE_ERROR,
        payload: 'Post delete error.',
      })
    )
}

export const sortById = (posts: Post[], direction: Sort) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  const sorted = posts.slice().sort(({ id: left }, { id: right }) => {
    switch (direction) {
      case Sort.DESC:
        return right - left
      case Sort.ASC:
        return left - right
      default:
        return 0
    }
  })

  dispatch({
    type: ActionTypes.POSTS_SORT_BY_ID,
    payload: sorted,
    sort: direction,
  })
}

export const sortByTitle = (posts: Post[], direction: Sort) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  const sorted = posts.slice().sort(({ title: left }, { title: right }) => {
    switch (direction) {
      case Sort.DESC:
        return left.localeCompare(right)
      case Sort.ASC:
        return right.localeCompare(left)
      default:
        return 0
    }
  })

  dispatch({
    type: ActionTypes.POSTS_SORT_BY_TITLE,
    payload: sorted,
    sort: direction,
  })
}

export const sortByBody = (posts: Post[], direction: Sort) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  const sorted = posts.slice().sort(({ body: left }, { body: right }) => {
    switch (direction) {
      case Sort.DESC:
        return left.localeCompare(right)
      case Sort.ASC:
        return right.localeCompare(left)
      default:
        return 0
    }
  })
  dispatch({
    type: ActionTypes.POSTS_SORT_BY_BODY,
    payload: sorted,
    sort: direction,
  })
}

export const filterByUser = (id: number | null = null) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  dispatch({
    type: ActionTypes.POSTS_FILTER_BY_USER,
    payload: id,
  })
}

export const searchText = (text: string) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  dispatch({
    type: ActionTypes.POSTS_SEARCH_TEXT,
    payload: text,
  })
}
