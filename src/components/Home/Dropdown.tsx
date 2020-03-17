/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import styled from 'styled-components/macro'

import { filterByUser } from '../../store/posts/postsActions'
import { RootState } from '../../store/rootReducer'
import { User } from '../../types'

const Dropdown: FC<Props> = ({ users, filterByUser, filterId }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownHead = useRef<HTMLSpanElement>(null)

  const handleInsideClick = (event: any): void => {
    if (event.target.classList.contains('Item')) return
    setShowDropdown(!showDropdown)
  }

  const handleOutsideClick = (event: any): void => {
    if (dropdownHead?.current?.contains(event.target)) return
    if (event.target.classList.contains('Item')) return

    setShowDropdown(false)
  }

  const handleOutsideKey = (event: any): void | false =>
    event.key === 'Escape' && setShowDropdown(false)

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleOutsideKey)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleOutsideKey)
    }
    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleOutsideKey)
    }
  }, [showDropdown])

  const handleDropdownItemClick = (id: number): void =>
    id === filterId ? filterByUser() : filterByUser(id)

  const handleClearFilterClick = (): void => filterByUser()

  return (
    <>
      <UserFilterItem onClick={handleInsideClick} ref={dropdownHead}>
        User
      </UserFilterItem>
      <DeleteButtonBox show={filterId ? true : false}>
        <DeleteButton onClick={handleClearFilterClick}>✕</DeleteButton>
      </DeleteButtonBox>
      <DropdownContainer show={showDropdown}>
        {users?.map((element: User) => {
          return (
            <DropdownItem
              key={element.id}
              onClick={(): void => handleDropdownItemClick(element.id)}
              highlight={
                element.id === filterId ? 'rgba(60, 120, 180, 0.3)' : null
              }
              className="Item"
            >
              {element.name}
            </DropdownItem>
          )
        })}
      </DropdownContainer>
    </>
  )
}

const mapStateToProps = (
  state: RootState
): {
  users: User[]
  filterId: number | null
} => ({
  users: state.posts.users,
  filterId: state.posts.filterId,
})

const mapDispatchToProps = { filterByUser }

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(Dropdown)

const FilterItem = styled.span`
  color: rgb(170, 170, 170);
  cursor: pointer;
  font-weight: 700;
  transition: color 0.15s ease-in-out;
  user-select: none;
  &:hover {
    color: inherit;
  }
  @media only screen and (max-width: 405px) {
    font-size: 14px;
  }
`

const UserFilterItem = styled(FilterItem)`
  margin-right: 10px;
  position: relative;
`

const DeleteButtonBox = styled.section<{ show: boolean }>`
  display: ${(props): string => (props.show ? 'flex' : 'none')};
  @media only screen and (max-width: 405px) {
    display: none;
  }
`

const DeleteButton = styled.span`
  color: rgb(170, 170, 170);
  cursor: pointer;
  line-height: 16px;
  margin-top: 2px;
  transition: color 0.15s ease-in-out;
  user-select: none;
  &:hover {
    color: rgb(0, 0, 0);
  }
`

const DropdownContainer = styled.section<{ show: boolean }>`
  background-color: rgb(247, 249, 250);
  border: 1px solid rgb(219, 227, 231);
  border-radius: 1px;
  display: ${(props): string => (props.show ? 'block' : 'none')};
  left: 0px;
  position: absolute;
  top: 53px;
`
const DropdownItem = styled.span<{ highlight: string | null }>`
  background-color: ${(props): string | null => props.highlight};
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  overflow: hidden;
  padding: 10px 15px;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
  width: 100%;
  &:hover {
    background-color: ${(props): string =>
      props.highlight || 'rgba(60, 120, 180, 0.1)'};
    background-color: rgba(60, 120, 180, 0.1);
  }
`
