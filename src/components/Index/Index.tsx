import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { RootState } from '../../store/rootReducer'
import { Post } from '../../types'
import Filter from './Filter/Filter'
import PostList from './List/PostList'
import LocalMode from './LocalMode/LocalMode'
import Search from './Search/Search'

const Index: FC<Props> = ({
  isLoading,
  error,
  data,
  filterUserId,
  searchText,
}) => {
  const filterByUser = (filterUserId: number): Post[] =>
    data.filter(element => element.userId === filterUserId)

  const postsByUser = filterUserId ? filterByUser(filterUserId) : data

  const searchByText = (searchText: string): Post[] =>
    postsByUser.filter(
      element =>
        element.body.includes(searchText) || element.title.includes(searchText)
    )

  const posts = searchText.length
    ? searchByText(searchText.toLowerCase())
    : postsByUser

  return (
    <>
      <LocalMode />
      <Search />
      <Filter />
      {!posts.length && isLoading ? (
        <Status>Loading...</Status>
      ) : (
        <PostList posts={posts} />
      )}
      {error ? <Status>{error}</Status> : null}
    </>
  )
}

const mapStateToProps = (
  state: RootState
): {
  isLoading: boolean
  error: null | string
  data: Post[]
  filterUserId: null | number
  searchText: string
} => ({
  isLoading: state.posts.isLoading.getData,
  error: state.posts.isLoading.error,
  data: state.posts.data,
  filterUserId: state.posts.dataState.filterUserId,
  searchText: state.posts.dataState.searchText,
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Index)

const Status = styled.span`
  color: rgb(75, 75, 75);
  font-size: 24px;
  margin-top: 50px;
`
