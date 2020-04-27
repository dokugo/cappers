import React, { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { switchLocalMode } from '../../store/posts/postsActions'
import { RootState } from '../../store/rootReducer'
import Switch from '../ui/Switch'

const LocalMode: FC<Props> = ({ switchLocalMode, isLocalMode }) => {
  const setState = (isChecked: boolean): void =>
    switchLocalMode(JSON.stringify(isChecked))

  return (
    <Container>
      <Paragraph>
        Sometimes the jsonplaceholder API can act extremely laggy, in that case
        you can turn on the local mode to use fake API calls.
      </Paragraph>
      <Paragraph>
        <Switch setState={setState} state={isLocalMode} text="Local mode" />
      </Paragraph>
    </Container>
  )
}

const mapStateToProps = (state: RootState): { isLocalMode: boolean } => ({
  isLocalMode: state.posts.isLocalMode,
})

const mapDispatchToProps = { switchLocalMode }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(LocalMode)

const Container = styled.section`
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.176);
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin-bottom: 25px;
  padding: 10px 15px;
  width: 100%;
`
const Paragraph = styled.p`
  color: rgb(170, 170, 170);
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 10px;
  &:last-of-type {
    margin: 0;
  }
`
