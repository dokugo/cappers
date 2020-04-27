import React, { FC } from 'react'
import styled from 'styled-components/macro'

import { Post } from '../../../types'
import PostItem from './Post'

interface Props {
  posts: Post[]
}

const PostList: FC<Props> = ({ posts }) => {
  return (
    <Container>
      {posts?.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default React.memo(PostList)

const Container = styled.section`
  width: 100%;
`
