import { Post, Sort, User } from '../../types'
import ActionTypes, { Actions } from './actionTypes'

interface State {
  data: Post[]
  users: User[]
  isLocalMode: boolean
  isLoading: {
    getData: boolean
    postDelete: boolean
    postUpdate: boolean
    error: null | string
  }
  dataState: {
    sortOrder: Sort
    filterUserId: null | number
    searchText: string
  }
}

const storedIsLocalMode = localStorage.getItem('isLocalMode')

const initialState: State = {
  data: [],
  users: [],
  isLocalMode: storedIsLocalMode === 'true' ? true : false,
  isLoading: {
    getData: false,
    postUpdate: false,
    postDelete: false,
    error: null,
  },
  dataState: {
    sortOrder: Sort.ASC,
    filterUserId: null,
    searchText: '',
  },
}

function postsReducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.DATA_SWITCH_MODE:
      return {
        ...state,
        isLocalMode: !state.isLocalMode,
      }

    // DATA LOAD

    case ActionTypes.DATA_LOAD_START:
      return {
        ...state,
        isLoading: { ...state.isLoading, getData: true, error: null },
      }

    case ActionTypes.DATA_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, getData: false, error: null },
        data: action.payload.data,
        users: action.payload.users,
      }

    case ActionTypes.DATA_LOAD_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          getData: false,
          error: state.data.length ? null : action.payload,
        },
      }

    // POST UPDATE

    case ActionTypes.POST_UPDATE_START:
      return {
        ...state,
        isLoading: { ...state.isLoading, postUpdate: true, error: null },
      }

    case ActionTypes.POST_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, postUpdate: false, error: null },
        data: [
          ...state.data.map(element =>
            element.id === action.payload.id
              ? {
                  ...element,
                  title: action.payload.title,
                  body: action.payload.body,
                }
              : element
          ),
        ],
      }

    case ActionTypes.POST_UPDATE_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          postUpdate: false,
          error: action.payload,
        },
      }

    // POST DELETE
    case ActionTypes.POST_DELETE_START:
      return {
        ...state,
        isLoading: { ...state.isLoading, postDelete: true, error: null },
      }

    case ActionTypes.POST_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: { ...state.isLoading, postDelete: false, error: null },
        data: [...state.data.filter(element => element.id !== action.payload)],
      }

    case ActionTypes.POST_DELETE_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          postDelete: false,
          error: action.payload,
        },
      }

    // SORT, FILTER, SEARCH

    case ActionTypes.POSTS_SORT_BY_ID:
      return {
        ...state,
        data: [...action.payload],
        dataState: { ...state.dataState, sortOrder: action.sortOrder },
      }

    case ActionTypes.POSTS_SORT_BY_TITLE:
      return {
        ...state,
        data: [...action.payload],
        dataState: { ...state.dataState, sortOrder: action.sortOrder },
      }

    case ActionTypes.POSTS_SORT_BY_BODY:
      return {
        ...state,
        data: [...action.payload],
        dataState: { ...state.dataState, sortOrder: action.sortOrder },
      }

    case ActionTypes.POSTS_FILTER_BY_USER:
      return {
        ...state,
        dataState: { ...state.dataState, filterUserId: action.payload },
      }

    case ActionTypes.POSTS_SEARCH_BY_TEXT:
      return {
        ...state,
        dataState: { ...state.dataState, searchText: action.payload },
      }

    default:
      return state
  }
}

export default postsReducer
