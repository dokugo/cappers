// for a later usage

import { createSelector } from 'reselect'

import { RootState } from '../rootReducer'

const getState = (state: RootState): RootState => state

export const loadingSelector = createSelector(
  getState,
  state => state.posts.isLoading.getData
)

export const errorSelector = createSelector(
  getState,
  state => state.posts.isLoading.error
)

export const postsSelector = createSelector(getState, state => state.posts.data)

export const filterIdSelector = createSelector(
  getState,
  state => state.posts.dataState.filterUserId
)

export const searchTextSelector = createSelector(
  getState,
  state => state.posts.dataState.searchText
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
