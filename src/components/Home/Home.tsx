import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { RootState } from '../../store/rootReducer'
import { Post } from '../../types'
import Filter from './Filter'
import PostList from './PostList'
import Search from './Search'

const Home: FC<Props> = ({ loading, error, data, filterId, searchText }) => {
  const filterPosts = (filterId: number): Post[] =>
    data.filter((element: Post) => element.userId === filterId)

  const filteredPosts = filterId ? filterPosts(filterId) : data

  const searchPosts = (searchText: string): Post[] =>
    filteredPosts.filter(
      element =>
        element.body.includes(searchText) || element.title.includes(searchText)
    )

  const posts = searchText.length ? searchPosts(searchText) : filteredPosts

  return (
    <>
      <Search />
      <Filter />
      {loading ? <Loading>Loading...</Loading> : <PostList posts={posts} />}
      <Error show={error ? true : false}>{error}</Error>
    </>
  )
}

const mapStateToProps = (
  state: RootState
): {
  loading: boolean
  error: null | string
  data: Post[]
  filterId: number | null
  searchText: string
} => ({
  loading: state.posts.loading.getData,
  error: state.posts.error,
  data: state.posts.data,
  filterId: state.posts.filterId,
  searchText: state.posts.searchText,
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Home)

const Loading = styled.span`
  font-size: 24px;
  margin-top: 50px;
  color: rgb(75, 75, 75);
`
const Error = styled(Loading)<{ show: boolean }>`
  display: ${(props): string => (props.show ? 'block' : 'none')};
`
