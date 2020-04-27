import React, { FC, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { connect, ConnectedProps } from 'react-redux'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components/macro'

import EditPost from './components/Edit/EditPost'
import Index from './components/Index/Index'
import { getData } from './store/posts/postsActions'
import { RootState } from './store/rootReducer'
import ProgressBar from './utils/ProgressBar'

const App: FC<Props> = ({ isLocalMode, getData }) => {
  useEffect(() => {
    const abortController = new AbortController()
    getData(abortController.signal)
    return (): void => abortController.abort()
  }, [getData, isLocalMode])

  return (
    <BrowserRouter>
      <ProgressBar />
      <GlobalStyle />
      <Main>
        <StyledRouterLink to="/">
          <Title>Index</Title>
        </StyledRouterLink>
        <Switch>
          <Route component={EditPost} path="/post/:id" />
          <Route component={Index} />
        </Switch>
      </Main>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: RootState): { isLocalMode: boolean } => ({
  isLocalMode: state.posts.isLocalMode,
})

const mapDispatchToProps = { getData }

const ConnectedApp = process.env.NODE_ENV === 'development' ? hot(App) : App

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(ConnectedApp)

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: rgb(247, 249, 250);
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`
const Title = styled.h1`
  margin: 0;
`

const Main = styled.main`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  max-width: 980px;
  padding: 0 20px;
`
const StyledRouterLink = styled(Link)`
  color: rgb(75, 75, 75);
  margin-bottom: 50px;
  text-decoration: none;
  transition: color 0.15s ease-in-out;
  &:hover {
    color: rgb(56, 151, 240);
  }
`
