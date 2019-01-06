import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Row = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  background-color: ${props => (props.isSelected ? '#777' : 'white')};
  color: ${props => (props.isSelected ? 'white' : 'black')};
  border: ${props => (props.isSelected ? '1px solid #777' : '1px solid black')};
  padding: 0.8rem;
  margin: 0.2rem;
  outline: none;
  text-transform: uppercase;
  :hover {
    cursor: pointer;
    color: white;
    border: 1px solid #777;
    background-color: #777;
  }
`

const ButtonRow = React.memo(({ selectors, selectButton, isSelected }) => {
  return (
    <Row>
      {selectors.map((selector, i) => {
        return (
          <Button
            isSelected={isSelected === selector}
            key={selector}
            onClick={() => selectButton(i)}
          >
            {selector}
          </Button>
        )
      })}
    </Row>
  )
})

ButtonRow.propTypes = {
  selectors: PropTypes.array.isRequired,
  selectButton: PropTypes.func.isRequired,
}

export default ButtonRow
