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
      <TextBox>
        <Text>{post.body}</Text>
      </TextBox>
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
  display: flex;
  color: rgb(75, 75, 75);
  font-size: 16px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.176);
  border-bottom: none;
  padding: 10px 15px;
  height: 45px;
  &:hover {
    background-color: rgba(60, 120, 180, 0.1);
  }
  &:last-of-type {
    border: 1px solid rgba(0, 0, 0, 0.176);
  }
  &:first-of-type {
    border-top: none;
  }
`

const IdBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  margin-right: 15px;
`

const Id = styled.span`
  color: rgb(140, 140, 140);
`

const UserBox = styled.section`
  display: flex;
  align-items: center;
  min-width: 150px;
  width: 150px;
  margin-right: 15px;
`

const User = styled.span`
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const TitleBox = styled.section`
  display: flex;
  align-items: center;
  margin-right: 15px;
  min-width: 200px;
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
  max-width: 200px;
  font-size: 16px;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const TextBox = styled.section`
  display: flex;
  align-items: center;
  line-height: 1.35em;
  min-height: 2.7em;
`

const Text = styled.p`
  margin: 0;
  text-overflow: ellipsis;
  white-space: initial;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const DeleteButtonBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  margin-left: auto;
`

const DeleteButton = styled.span`
  cursor: pointer;
  user-select: none;
  color: rgb(170, 170, 170);
  line-height: 16px;
  transition: color 0.15s ease-in-out;
  &:hover {
    color: rgb(0, 0, 0);
  }
`
