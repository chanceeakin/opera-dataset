import React from 'react'
import PropTypes from 'prop-types'
import { useSpring } from 'react-spring'
import styled from 'react-emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Title } from './Styled'
import AnimatedDiv from './AnimatedDiv'

//${tw('relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded')};
const ModalDiv = styled(AnimatedDiv)`
  position: relative;
  padding: 2rem;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  :hover {
    cursor: pointer;
  }
`

// ${tw('text-2xl lg:text-l font-sans text-black mt-8 xxl:w-3/4')};
const ModalText = styled.p`
  color: black;
`

// ${tw('absolute pin-t pin-r p-4')};
const ExitButton = styled.span`
  :hover {
    cursor: pointer;
  }
`

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 50,
  (x - window.innerWidth / 2) / 50,
  1.1,
]
const trans = (x, y) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`

const ModalContent = React.memo(({ toggleClose, selectedCity }) => {
  const [props, set] = useSpring({
    xy: [0, 0],
    config: { mass: 5, tension: 350, friction: 40 },
  })
  return (
    <ModalDiv
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      onMouseLeave={() => set({ xy: [0, 0] })}
      onClick={toggleClose}
      style={{ transform: props.xy.interpolate(trans) }}
    >
      <ExitButton onClick={toggleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </ExitButton>
      <Title>{selectedCity.city}</Title>
      <ModalText>{selectedCity.blurb}</ModalText>
    </ModalDiv>
  )
})

ModalContent.propTypes = {
  selectedCity: PropTypes.object.isRequired,
  toggleClose: PropTypes.func.isRequired,
  xy: PropTypes.any.isRequired,
}

export default ModalContent
