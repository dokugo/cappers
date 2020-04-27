import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import {
  sortByBody,
  sortById,
  sortByTitle,
} from '../../../store/posts/postsActions'
import { RootState } from '../../../store/rootReducer'
import { Post, Sort } from '../../../types'
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
      <BodyBox>
        <FilterItem onClick={handleSortByBody}>Body</FilterItem>
      </BodyBox>
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
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.176);
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-size: 16px;
  height: 65px;
  padding: 10px 15px;
  width: 100%;
  @media only screen and (max-width: 405px) {
    font-size: 14px;
    padding: 10px 12px;
  }
`
const FilterItemBox = styled.div`
  align-items: center;
  display: flex;
  margin-right: 15px;
  @media only screen and (max-width: 405px) {
    margin-right: 7px;
  }
`

const IdBox = styled(FilterItemBox)`
  justify-content: center;
  min-width: 30px;
  @media only screen and (max-width: 405px) {
    min-width: 20px;
  }
`
const UserBox = styled(FilterItemBox)`
  align-items: center;
  display: flex;
  min-width: 125px;
  position: relative;
  @media only screen and (max-width: 769px) {
    min-width: 75px;
  }
  @media only screen and (max-width: 600px) {
    min-width: 50px;
  }
  @media only screen and (max-width: 405px) {
    min-width: 40px;
  }
`

const TitleBox = styled(FilterItemBox)`
  min-width: 200px;
  @media only screen and (max-width: 769px) {
    min-width: 125px;
  }
  @media only screen and (max-width: 600px) {
    min-width: 65px;
  }
  @media only screen and (max-width: 405px) {
    min-width: 50px;
  }
`
const BodyBox = styled(FilterItemBox)``

const FilterItem = styled.span`
  color: rgb(170, 170, 170);
  cursor: pointer;
  font-weight: 700;
  transition: color 0.15s ease-in-out;
  user-select: none;
  &:hover {
    color: inherit;
  }
`
