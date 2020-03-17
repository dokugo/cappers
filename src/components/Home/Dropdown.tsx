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
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  color: rgb(170, 170, 170);
  transition: color 0.15s ease-in-out;
  &:hover {
    color: inherit;
  }
  @media only screen and (max-width: 405px) {
    font-size: 14px;
  }
`

const UserFilterItem = styled(FilterItem)`
  position: relative;
  margin-right: 10px;
`

const DeleteButtonBox = styled.section<{ show: boolean }>`
  display: ${(props): string => (props.show ? 'flex' : 'none')};
  @media only screen and (max-width: 405px) {
    display: none;
  }
`

const DeleteButton = styled.span`
  cursor: pointer;
  margin-top: 2px;
  user-select: none;
  color: rgb(170, 170, 170);
  line-height: 16px;
  transition: color 0.15s ease-in-out;
  &:hover {
    color: rgb(0, 0, 0);
  }
`

const DropdownContainer = styled.section<{ show: boolean }>`
  position: absolute;
  display: ${(props): string => (props.show ? 'block' : 'none')};
  top: 53px;
  left: 0px;
  background-color: rgb(247, 249, 250);
  border: 1px solid rgb(219, 227, 231);
  border-radius: 1px;
`
const DropdownItem = styled.span<{ highlight: string | null }>`
  cursor: pointer;
  user-select: none;
  display: block;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${(props): string | null => props.highlight};
  &:hover {
    background-color: rgba(60, 120, 180, 0.1);
    background-color: ${(props): string =>
      props.highlight || 'rgba(60, 120, 180, 0.1)'};
  }
`
