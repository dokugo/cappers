import React, { FC, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { searchText } from '../../store/posts/postsActions'
import { RootState } from '../../store/rootReducer'
import { Sort } from '../../types'

const Search: FC<Props> = ({ searchText }) => {
  const [state, setState] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState(event.target.value)
    searchText(event.target.value)
  }

  const handleClick = (): void => {
    setState('')
    searchText('')
  }

  const handleEscKey = (event: any): void | false => {
    if (event.key === 'Escape') {
      if (event.target.classList.contains('Search')) {
        setState('')
        searchText('')
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return (): void => document.removeEventListener('keydown', handleEscKey)
  })

  return (
    <Container>
      <InputBox>
        <Input
          onChange={handleChange}
          type="text"
          placeholder="Search"
          value={state}
          className="Search"
        />
        <DeleteButtonBox show={state.length ? true : false}>
          <DeleteButton onClick={handleClick}>✕</DeleteButton>
        </DeleteButtonBox>
      </InputBox>
    </Container>
  )
}

const mapStateToProps = (state: RootState): { sort: Sort } => ({
  sort: state.posts.sort,
})

const mapDispatchToProps = { searchText }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Search)

const Container = styled.section`
  display: flex;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  background: rgba(255, 255, 255, 0.75);
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.176);
  border-bottom: none;
  padding: 10px 15px;
  box-sizing: border-box;
  height: 65px;
`
const InputBox = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
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
  &:focus {
    background-color: rgba(60, 120, 180, 0.1);
    border: 1px solid rgb(60, 120, 180);
    outline: 0;
  }
`

const DeleteButtonBox = styled.section<{ show: boolean }>`
  display: ${(props): string => (props.show ? 'flex' : 'none')};
  position: absolute;
  right: 15px;
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
