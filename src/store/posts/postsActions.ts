import { ThunkDispatch } from 'redux-thunk'

import { API_ENDPOINT } from '../../config/config'
import { InitPost, Post, Sort, User } from '../../types'
import { delay } from '../../utils'
import { RootState } from '../rootReducer'
import ActionTypes, { Actions } from './actionTypes'

export const switchLocalMode = (isLocalMode: string) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  localStorage.setItem('isLocalMode', isLocalMode)
  dispatch({ type: ActionTypes.DATA_SWITCH_MODE })
}

export const getData = (signal: AbortSignal) => async (
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  getState: () => RootState
): Promise<void> => {
  const isLocalMode = getState().posts.isLocalMode
  const url = isLocalMode
    ? {
        posts: `${process.env.PUBLIC_URL}/posts.json`,
        users: `${process.env.PUBLIC_URL}/users.json`,
      }
    : { posts: `${API_ENDPOINT}/posts`, users: `${API_ENDPOINT}/users` }

  dispatch({ type: ActionTypes.DATA_LOAD_START })

  if (isLocalMode) await delay(1000)

  const getPosts = (): Promise<InitPost[]> =>
    fetch(url.posts, { signal })
      .then(response => response.json())
      .catch(() => {
        dispatch({
          type: ActionTypes.DATA_LOAD_ERROR,
          payload: 'Data load error.',
        })
        return
      })

  const getUsers = (): Promise<User[]> =>
    fetch(url.users, { signal })
      .then(response => response.json())
      .catch(() => {
        dispatch({
          type: ActionTypes.DATA_LOAD_ERROR,
          payload: 'Data load error.',
        })
        return
      })

  const getPostsAndUsers = async (): Promise<void> => {
    const posts: InitPost[] = await getPosts()
    const users: User[] = await getUsers()

    if (!Array.isArray(posts || users)) return

    const data = posts.map(post => {
      const user = users?.find(user => user.id === post.userId)
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
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  getState: () => RootState
): Promise<void> => {
  const isLoading = getState().posts.isLoading.postUpdate
  if (isLoading) {
    console.error('Post update is already in action.')
    return
  }

  dispatch({ type: ActionTypes.POST_UPDATE_START })

  const isLocalMode = getState().posts.isLocalMode
  if (isLocalMode) {
    await delay(1000)
    dispatch({ type: ActionTypes.POST_UPDATE_SUCCESS, payload: post })
    return
  }

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
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  getState: () => RootState
): Promise<void> => {
  const isLoading = getState().posts.isLoading.postDelete
  if (isLoading) {
    console.error('Post delete is already in action.')
    return
  }

  dispatch({ type: ActionTypes.POST_DELETE_START })

  const isLocalMode = getState().posts.isLocalMode
  if (isLocalMode) {
    await delay(1000)
    dispatch({ type: ActionTypes.POST_DELETE_SUCCESS, payload: id })
    return
  }

  await fetch(`${API_ENDPOINT}/posts/${id}`, { method: 'DELETE' })
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
    sortOrder: direction,
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
    sortOrder: direction,
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
    sortOrder: direction,
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

export const searchByText = (text: string) => (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
): void => {
  dispatch({
    type: ActionTypes.POSTS_SEARCH_BY_TEXT,
    payload: text,
  })
}
