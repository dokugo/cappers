import React, { FC, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components/macro'

import { updatePost } from '../../store/posts/postsActions'
import { RootState } from '../../store/rootReducer'
import { Post } from '../../types'

type State = Pick<Post, 'title' | 'body' | 'id'>

type RouterParams = {
  id: string
}

const EditPost: FC<Props> = ({ post, updatePost, error }) => {
  const [state, setState] = useState<State>({
    title: '',
    body: '',
    id: 0,
  })

  useEffect(() => {
    if (post) {
      setState({
        title: post.title,
        body: post.body,
        id: post.id,
      })
    }
  }, [post])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    updatePost(state)
  }
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setState({ ...state, [event.target.id]: event.target.value })

  if (post) {
    return (
      <Container>
        <Title>Edit post</Title>
        <Form onSubmit={handleSubmit}>
          <InputField>
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleChange}
              type="text"
              id="title"
              defaultValue={post.title}
            />
          </InputField>
          <InputField>
            <Label htmlFor="body">Body</Label>
            <Textarea
              onChange={handleChange}
              id="body"
              defaultValue={post.body}
            />
          </InputField>
          <InputField>
            <Button>Save</Button>
          </InputField>
          <Error>{error}</Error>
        </Form>
      </Container>
    )
  } else return null
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<RouterParams>
): { post: Post | undefined; error: string | null } => ({
  post: state.posts.data.find(
    post => post.id === Number(ownProps.match.params.id)
  ),
  error: state.posts.isLoading.error,
})

const mapDispatchToProps = { updatePost }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(EditPost)

const Container = styled.article`
  background: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.08) 0 1px 12px 0,
    rgb(219, 227, 231) 0 0 0 1px inset;
  box-sizing: border-box;
  color: rgb(75, 75, 75);
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding: 20px 30px;
  width: 640px;
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`
const Title = styled.h2`
  text-align: center;
`

const Form = styled.form``

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  min-width: 100%;
`

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
  position: relative;
  width: fit-content;
`

const Input = styled.input`
  background-color: rgb(247, 249, 250);
  border: 1px solid rgb(219, 227, 231);
  border-radius: 3px;
  box-sizing: border-box;
  color: rgb(83, 97, 113);
  display: block;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  padding: 5px 10px;
  text-overflow: ellipsis;
  transition: 0.15s ease-in-out;
  white-space: nowrap;
  width: 100%;
  &:focus {
    background-color: rgba(60, 120, 180, 0.1);
    border: 1px solid rgb(60, 120, 180);
    outline: 0;
  }
`

const Textarea = styled.textarea`
  background-color: rgba(247, 249, 250);
  border: 1px solid rgb(219, 227, 231);
  border-radius: 3px;
  box-sizing: border-box;
  color: rgb(83, 97, 113);
  display: block;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  min-height: 108px;
  padding: 5px 10px;
  resize: vertical;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  width: 100%;
  &:focus {
    background-color: rgba(60, 120, 180, 0.1);
    border-color: rgb(60, 120, 180);
    outline: 0;
  }
`

const Button = styled.button`
  background: rgb(63, 102, 159);
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  min-width: 100%;
  outline: none;
  padding: 0;
  user-select: none;
  width: 100%;
  &:focus {
    box-shadow: rgba(63, 102, 159, 0.35) 0 0 0 3px;
  }
  &:active {
    box-shadow: none;
    transform: translateY(1px);
  }
`
const Error = styled.span`
  color: rgba(225, 0, 0, 0.75);
`
