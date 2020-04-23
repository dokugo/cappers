import { Post, Sort, User } from '../../types'
import ActionTypes, { Actions } from './actionTypes'

interface State {
  loading: {
    getData: boolean
    postDelete: boolean
    postUpdate: boolean
  }
  error: null | string
  data: Post[]
  users: User[]
  sort: Sort
  filterUserId: null | number
  searchText: string
}

const initialState: State = {
  loading: {
    getData: false,
    postUpdate: false,
    postDelete: false,
  },
  error: null,
  data: [],
  users: [],
  sort: Sort.ASC,
  filterUserId: null,
  searchText: '',
}

function postsReducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    // DATA LOAD

    case ActionTypes.DATA_LOAD_START:
      return {
        ...state,
        error: null,
        loading: { ...state.loading, getData: true },
      }

    case ActionTypes.DATA_LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: { ...state.loading, getData: false },
        data: action.payload.data,
        users: action.payload.users,
      }

    case ActionTypes.DATA_LOAD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: { ...state.loading, getData: false },
      }

    // POST UPDATE

    case ActionTypes.POST_UPDATE_START:
      return {
        ...state,
        error: null,
        loading: { ...state.loading, postUpdate: true },
      }

    case ActionTypes.POST_UPDATE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: { ...state.loading, postUpdate: false },
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
        error: action.payload,
        loading: { ...state.loading, postUpdate: false },
      }

    // POST DELETE
    case ActionTypes.POST_DELETE_START:
      return {
        ...state,
        error: null,
        loading: { ...state.loading, postDelete: true },
      }

    case ActionTypes.POST_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: { ...state.loading, postDelete: false },
        data: [
          ...state.data.filter(element => {
            return element.id !== action.payload
          }),
        ],
      }

    case ActionTypes.POST_DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: { ...state.loading, postDelete: false },
      }

    // SORT, FILTER, SEARCH

    case ActionTypes.POSTS_SORT_BY_ID:
      return {
        ...state,
        data: [...action.payload],
        sort: action.sort,
      }

    case ActionTypes.POSTS_SORT_BY_TITLE:
      return {
        ...state,
        data: [...action.payload],
        sort: action.sort,
      }

    case ActionTypes.POSTS_SORT_BY_BODY:
      return {
        ...state,
        data: [...action.payload],
        sort: action.sort,
      }

    case ActionTypes.POSTS_FILTER_BY_USER:
      return {
        ...state,
        filterUserId: action.payload,
      }

    case ActionTypes.POSTS_SEARCH_BY_TEXT:
      return {
        ...state,
        searchText: action.payload,
      }

    default:
      return state
  }
}

export default postsReducer
