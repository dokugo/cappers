import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { RootState } from '../../store/rootReducer'
import { Post } from '../../types'
import Filter from './Filter'
import PostList from './PostList'
import Search from './Search'

const Home: FC<Props> = ({
  loading,
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
      <Search />
      <Filter />
      {loading ? <Loading>Loading...</Loading> : <PostList posts={posts} />}
      {error ? <Loading>{error}</Loading> : null}
    </>
  )
}

const mapStateToProps = (
  state: RootState
): {
  loading: boolean
  error: null | string
  data: Post[]
  filterUserId: null | number
  searchText: string
} => ({
  loading: state.posts.loading.getData,
  error: state.posts.error,
  data: state.posts.data,
  filterUserId: state.posts.filterUserId,
  searchText: state.posts.searchText,
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Home)

const Loading = styled.span`
  color: rgb(75, 75, 75);
  font-size: 24px;
  margin-top: 50px;
`
