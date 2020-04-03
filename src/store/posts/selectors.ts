import { createSelector } from 'reselect'

import { RootState } from '../rootReducer'

const getState = (state: RootState): RootState => state

export const loadingSelector = createSelector(
  getState,
  state => state.posts.loading.getData
)

export const errorSelector = createSelector(
  getState,
  state => state.posts.error
)

export const postsSelector = createSelector(getState, state => state.posts.data)

export const filterIdSelector = createSelector(
  getState,
  state => state.posts.filterId
)

export const searchTextSelector = createSelector(
  getState,
  state => state.posts.searchText
)

/* export const homeSelector = createSelector(
  [
    loadingSelector,
    errorSelector,
    dataSelector,
    filterIdSelector,
    searchTextSelector,
  ],
  (loading, error, data, filterId, searchText) => ({
    loading,
    error,
    data,
    filterId,
    searchText,
  })
)
 */
