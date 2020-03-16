import { Post, Sort, User } from '../../types'

enum ActionTypes {
  DATA_LOAD_START = 'DATA_LOAD_START',
  DATA_LOAD_SUCCESS = 'DATA_LOAD_SUCCESS',
  DATA_LOAD_ERROR = 'DATA_LOAD_ERROR',

  POST_UPDATE_START = 'POST_UPDATE_START',
  POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS',
  POST_UPDATE_ERROR = 'POST_UPDATE_ERROR',

  POST_DELETE_START = 'POST_DELETE_START',
  POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS',
  POST_DELETE_ERROR = 'POST_DELETE_ERROR',

  POSTS_SORT_BY_ID = 'POSTS_SORT_BY_ID',
  POSTS_SORT_BY_TITLE = 'POSTS_SORT_BY_TITLE',
  POSTS_SORT_BY_BODY = 'POSTS_SORT_BY_BODY',
  POSTS_FILTER_BY_USER = 'POSTS_FILTER_BY_USER',
  POSTS_SEARCH_TEXT = 'POSTS_SEARCH_TEXT',
}

// DATA LOAD

type DataLoadStartAction = {
  type: typeof ActionTypes.DATA_LOAD_START
}

type DataLoadSuccessAction = {
  type: typeof ActionTypes.DATA_LOAD_SUCCESS
  payload: {
    data: Post[]
    users: User[]
  }
}

type DataLoadErrorAction = {
  type: typeof ActionTypes.DATA_LOAD_ERROR
  payload: string
}

// POST UPDATE

type PostUpdateStartAction = {
  type: typeof ActionTypes.POST_UPDATE_START
}

type PostUpdateSuccessAction = {
  type: typeof ActionTypes.POST_UPDATE_SUCCESS
  payload: Pick<Post, 'title' | 'body' | 'id'>
}

type PostUpdateErrorAction = {
  type: typeof ActionTypes.POST_UPDATE_ERROR
  payload: string
}

// POST DELETE

type PostDeleteStartAction = {
  type: typeof ActionTypes.POST_DELETE_START
}

type PostDeleteSuccessAction = {
  type: typeof ActionTypes.POST_DELETE_SUCCESS
  payload: number
}

type PostDeleteErrorAction = {
  type: typeof ActionTypes.POST_DELETE_ERROR
  payload: string
}

type PostsSearchTextAction = {
  type: typeof ActionTypes.POSTS_SEARCH_TEXT
  payload: string
}

// SORT, FILTER, SEARCH

type PostsFilterByUserAction = {
  type: typeof ActionTypes.POSTS_FILTER_BY_USER
  payload: number | null
}

type PostsSort<T> = {
  type: T
  payload: Post[]
  sort: Sort
}

type PostsSortByIdAction = PostsSort<typeof ActionTypes.POSTS_SORT_BY_ID>

type PostsSortByTitleAction = PostsSort<typeof ActionTypes.POSTS_SORT_BY_TITLE>

type PostsSortByBodyAction = PostsSort<typeof ActionTypes.POSTS_SORT_BY_BODY>

export default ActionTypes

export type Actions =
  | DataLoadStartAction
  | DataLoadSuccessAction
  | DataLoadErrorAction
  | PostUpdateStartAction
  | PostUpdateSuccessAction
  | PostUpdateErrorAction
  | PostDeleteStartAction
  | PostDeleteSuccessAction
  | PostDeleteErrorAction
  | PostsSortByIdAction
  | PostsSortByTitleAction
  | PostsSortByBodyAction
  | PostsSearchTextAction
  | PostsFilterByUserAction
