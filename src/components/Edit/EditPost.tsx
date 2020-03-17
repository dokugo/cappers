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
  error: state.posts.error,
})

const mapDispatchToProps = { updatePost }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(EditPost)

const Container = styled.article`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 640px;
  color: rgb(75, 75, 75);
  font-size: 16px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px 0px,
    rgb(219, 227, 231) 0px 0px 0px 1px inset;
  @media only screen and (max-width: 769px) {
    width: 100%;
  }
`

const Form = styled.form``

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-weight: 400;
  font-size: 16px;
  position: relative;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  width: fit-content;
`

const Input = styled.input`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: rgb(83, 97, 113);
  border: 1px solid rgb(219, 227, 231);
  background-color: rgb(247, 249, 250);
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  display: block;
  border-radius: 3px;
  transition: 0.15s ease-in-out;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:focus {
    background-color: rgba(60, 120, 180, 0.1);
    border: 1px solid rgb(60, 120, 180);
    outline: 0;
  }
`

const Textarea = styled.textarea`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: rgb(83, 97, 113);
  border: 1px solid rgb(219, 227, 231);
  background-color: rgba(247, 249, 250);
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  display: block;
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  line-height: 1.5;
  resize: vertical;
  min-height: 108px;
  &:focus {
    background-color: rgba(60, 120, 180, 0.1);
    border-color: rgb(60, 120, 180);
    outline: 0;
  }
`

const Button = styled.button`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background: rgb(63, 102, 159);
  border: none;
  border-radius: 3px;
  color: #fff;
  line-height: 40px;
  height: 40px;
  width: 100%;
  min-width: 100%;
  font-size: 16px;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  outline: none;
  cursor: pointer;
  &:focus {
    box-shadow: rgba(63, 102, 159, 0.35) 0px 0px 0px 3px;
  }
  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`
const Error = styled.span`
  color: rgba(225, 0, 0, 0.75);
`
