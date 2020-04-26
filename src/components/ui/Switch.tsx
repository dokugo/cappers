import React, { FC } from 'react'
import styled from 'styled-components/macro'

interface Props {
  setState: (isChecked: boolean) => void
  state: boolean
  text: string
}

const SwitchElement: FC<Props> = ({ setState, state, text }) => {
  const handleChange = (): void => setState(!state)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') setState(!state)
  }

  return (
    <Label>
      {text}
      <Switch
        type={'checkbox'}
        isChecked={state}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Label>
  )
}

export default SwitchElement

export const Label = styled.label`
  cursor: pointer;
  display: flex;
  height: 24px;
  line-height: 24px;
  user-select: none;
  width: fit-content;
`

export const Switch = styled.input<{ isChecked: boolean }>`
  cursor: pointer;
  display: block;
  height: 0;
  margin: 0;
  margin-left: 10px;
  position: relative;
  width: 0;
  &::before {
    background: ${(props): string =>
      props.isChecked ? 'rgb(63, 102, 159)' : 'rgba(60,120,180,0.3)'};
    border-radius: 20px;
    content: '';
    display: block;
    height: 24px;
    left: 0;
    position: relative;
    top: 0;
    transition: 0.25s ease-in-out;
    width: 50px;
  }
  &::after {
    background: rgba(255, 255, 255, 1);
    border-radius: 17.5px;
    content: '';
    display: block;
    height: 16px;
    left: ${(props): string => (props.isChecked ? '30px' : '4px')};
    position: absolute;
    top: 4px;
    transition: 0.25s ease-in-out;
    width: 16px;
  }
  &:active::after {
    left: ${(props): string => (props.isChecked ? '26px' : '4px')};
    width: 20px;
  }
`
