import { Post, Sort, User } from '../../types'
import ActionTypes, { Actions } from './actionTypes'

interface State {
  loading: {
    default: boolean
    postDelete: boolean
  }
  error: null | string
  data: Post[]
  users: User[]
  sort: Sort
  filterId: number | null
  searchText: string
}

const initialState: State = {
  loading: {
    default: false,
    postDelete: false,
  },
  error: null,
  data: [],
  users: [],
  sort: Sort.ASC,
  filterId: null,
  searchText: '',
}

function postsReducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    // DATA LOAD

    case ActionTypes.DATA_LOAD_START:
      return {
        ...state,
        loading: { ...state.loading, default: true },
        error: null,
      }

    case ActionTypes.DATA_LOAD_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, default: false },
        error: null,
        data: action.payload.data,
        users: action.payload.users,
      }

    case ActionTypes.DATA_LOAD_ERROR:
      return {
        ...state,
        loading: { ...state.loading, default: false },
        error: action.payload,
      }

    // POST UPDATE

    case ActionTypes.POST_UPDATE_START:
      return {
        ...state,
        loading: { ...state.loading, default: true },
        error: null,
      }

    case ActionTypes.POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, default: false },
        error: null,
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
        loading: { ...state.loading, default: false },
        error: action.payload,
      }

    // POST DELETE
    case ActionTypes.POST_DELETE_START:
      return {
        ...state,
        loading: { ...state.loading, postDelete: true },
        error: null,
      }

    case ActionTypes.POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, postDelete: false },
        error: null,
        data: [
          ...state.data.filter(element => {
            return element.id !== action.payload
          }),
        ],
      }

    case ActionTypes.POST_DELETE_ERROR:
      return {
        ...state,
        loading: { ...state.loading, postDelete: false },
        error: action.payload,
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
        filterId: action.payload,
      }

    case ActionTypes.POSTS_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      }

    default:
      return state
  }
}

export default postsReducer
