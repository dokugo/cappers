import React, { FC, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { searchByText } from '../../../store/posts/postsActions'
import { RootState } from '../../../store/rootReducer'

const Search: FC<Props> = ({ searchText, searchByText }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    searchByText(event.target.value)

  const handleClick = (): void => searchByText('')

  const handleEscKey = (event: KeyboardEvent): void => {
    if (searchText === '') return
    const { classList } = event.target as HTMLElement
    if (event.key === 'Escape' && classList.contains('Search')) searchByText('')
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
          value={searchText}
          className="Search"
        />
        <DeleteButtonBox show={searchText.length ? true : false}>
          <DeleteButton onClick={handleClick}>✕</DeleteButton>
        </DeleteButtonBox>
      </InputBox>
    </Container>
  )
}

const mapStateToProps = (state: RootState): { searchText: string } => ({
  searchText: state.posts.dataState.searchText,
})

const mapDispatchToProps = { searchByText }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Search)

const Container = styled.section`
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.176);
  border-bottom: none;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-size: 16px;
  height: 65px;
  padding: 10px 15px;
  width: 100%;
`
const InputBox = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
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
  padding: 5px 10px;
  transition: 0.15s ease-in-out;
  width: 100%;
  &:focus {
    background-color: rgba(60, 120, 180, 0.1);
    border: 1px solid rgb(60, 120, 180);
    outline: 0;
  }
  &::placeholder {
    color: rgb(170, 170, 170);
  }
  @media only screen and (max-width: 405px) {
    font-size: 14px;
  }
`

const DeleteButtonBox = styled.section<{ show: boolean }>`
  display: ${(props): string => (props.show ? 'flex' : 'none')};
  position: absolute;
  right: 15px;
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
