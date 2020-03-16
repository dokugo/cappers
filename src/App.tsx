import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import React, { FC, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { connect, ConnectedProps } from 'react-redux'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components/macro'

import EditPost from './components/Edit/EditPost'
import Home from './components/Home/Home'
import { getData } from './store/posts/postsActions'
import { RootState } from './store/rootReducer'

NProgress.configure({ showSpinner: false })

const App: FC<Props> = ({
  getData,
  loading,
  postDeleteLoading,
  postUpdateLoading,
}) => {
  useEffect(() => {
    getData()
  }, [getData])

  loading || postUpdateLoading || postDeleteLoading
    ? NProgress.start()
    : NProgress.done()

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Main>
        <StyledRouterLink to="/">
          <Title>Index</Title>
        </StyledRouterLink>
        <Switch>
          <Route component={EditPost} path="/post/:id" />
          <Route component={Home} />
        </Switch>
      </Main>
    </BrowserRouter>
  )
}

const mapStateToProps = (
  state: RootState
): {
  loading: boolean
  postUpdateLoading: boolean
  postDeleteLoading: boolean
} => ({
  loading: state.posts.loading.getData,
  postUpdateLoading: state.posts.loading.postUpdate,
  postDeleteLoading: state.posts.loading.postDelete,
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
  padding: 0 20px;
  margin: 50px auto;
  max-width: 980px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledRouterLink = styled(Link)`
  margin-bottom: 50px;
  text-decoration: none;
  color: rgb(75, 75, 75);
  transition: color 0.15s ease-in-out;
  &:hover {
    color: rgb(56, 151, 240);
  }
`
