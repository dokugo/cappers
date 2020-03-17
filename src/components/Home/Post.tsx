import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { deletePost } from '../../store/posts/postsActions'
import { Post } from '../../types'

type Props = PropsFromRedux & { post: Post }

const PostItem: FC<Props> = ({ post, deletePost }) => {
  const handleClick = (): Promise<void> => deletePost(post.id)

  return (
    <Container>
      <IdBox>
        <Id>{post.id}</Id>
      </IdBox>
      <UserBox>
        <User>{post.userName}</User>
      </UserBox>
      <TitleBox>
        <StyledRouterLink to={`/post/${post.id}`}>
          <Title>{post.title}</Title>
        </StyledRouterLink>
      </TitleBox>
      <BodyBox>
        <Body>{post.body}</Body>
      </BodyBox>
      <DeleteButtonBox>
        <DeleteButton onClick={handleClick}>✕</DeleteButton>
      </DeleteButtonBox>
    </Container>
  )
}

const mapDispatchToProps = { deletePost }

const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PostItem)

const Container = styled.article`
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.176);
  border-bottom: none;
  color: rgb(75, 75, 75);
  display: flex;
  font-size: 16px;
  height: 45px;
  padding: 10px 15px;
  &:hover {
    background-color: rgba(60, 120, 180, 0.1);
  }
  &:last-of-type {
    border: 1px solid rgba(0, 0, 0, 0.176);
  }
  &:first-of-type {
    border-top: none;
  }
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

const Id = styled.span`
  color: rgb(140, 140, 140);
`

const UserBox = styled(FilterItemBox)`
  min-width: 125px;
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

const User = styled.span`
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const StyledRouterLink = styled(Link)`
  color: rgb(75, 75, 75);
  text-decoration: none;
  transition: color 0.15s ease-in-out;
  &:hover {
    color: rgb(56, 151, 240);
  }
`

const Title = styled.h6`
  font-size: 16px;
  margin: 0;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media only screen and (max-width: 769px) {
    max-width: 125px;
  }
  @media only screen and (max-width: 600px) {
    max-width: 65px;
  }
  @media only screen and (max-width: 405px) {
    max-width: 50px;
  }
`

const BodyBox = styled(FilterItemBox)`
  line-height: 1.35em;
  min-height: 2.7em;
  min-width: 250px;
  @media only screen and (max-width: 769px) {
    min-width: 150px;
  }
  @media only screen and (max-width: 769px) {
    min-width: 100px;
  }
  @media only screen and (max-width: 405px) {
    margin-right: 0;
  }
`

const Body = styled.p`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
`

const DeleteButtonBox = styled(FilterItemBox)`
  justify-content: center;
  margin-left: auto;
  margin-right: 0;
  min-width: 40px;
  @media only screen and (max-width: 405px) {
    margin-right: 0;
    min-width: 30px;
  }
`

const DeleteButton = styled.span`
  color: rgb(170, 170, 170);
  cursor: pointer;
  line-height: 16px;
  transition: color 0.15s ease-in-out;
  user-select: none;
  &:hover {
    color: rgb(0, 0, 0);
  }
`
