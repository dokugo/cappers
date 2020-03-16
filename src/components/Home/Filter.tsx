import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import {
  sortByBody,
  sortById,
  sortByTitle,
} from '../../store/posts/postsActions'
import { RootState } from '../../store/rootReducer'
import { Post, Sort } from '../../types'
import Dropdown from './Dropdown'

const Filter: FC<Props> = ({
  posts,
  sort,
  sortById,
  sortByTitle,
  sortByBody,
}) => {
  const sortNext = sort === Sort.ASC ? Sort.DESC : Sort.ASC

  const handleSortById = (): void => sortById(posts, sortNext)
  const handleSortByTitle = (): void => sortByTitle(posts, sortNext)
  const handleSortByBody = (): void => sortByBody(posts, sortNext)

  return (
    <Container>
      <IdBox>
        <FilterItem onClick={handleSortById}>ID</FilterItem>
      </IdBox>
      <UserBox>
        <Dropdown />
      </UserBox>
      <TitleBox>
        <FilterItem onClick={handleSortByTitle}>Title</FilterItem>
      </TitleBox>
      <TextBox>
        <FilterItem onClick={handleSortByBody}>Body</FilterItem>
      </TextBox>
    </Container>
  )
}

const mapStateToProps = (
  state: RootState
): {
  posts: Post[]
  sort: Sort
} => ({
  posts: state.posts.data,
  sort: state.posts.sort,
})

const mapDispatchToProps = { sortById, sortByTitle, sortByBody }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Filter)

const Container = styled.section`
  display: flex;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  background: rgba(255, 255, 255, 0.75);
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.176);
  padding: 10px 15px;
  box-sizing: border-box;
  height: 65px;
`
const IdBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  margin-right: 15px;
`
const UserBox = styled.section`
  display: flex;
  align-items: center;
  min-width: 150px;
  width: 150px;
  margin-right: 15px;
  position: relative;
`

const TitleBox = styled.section`
  display: flex;
  align-items: center;
  margin-right: 15px;
  min-width: 200px;
`
const TextBox = styled.section`
  display: flex;
  align-items: center;
  line-height: 1.35em;
  min-height: 2.7em;
`
const FilterItem = styled.span`
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  color: rgb(170, 170, 170);
  transition: color 0.15s ease-in-out;
  &:hover {
    color: inherit;
  }
`
