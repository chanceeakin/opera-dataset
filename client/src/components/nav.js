import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Transition } from 'react-spring/renderprops'

export const Container = styled.nav`
  ul {
    display: block;
    list-style: none;
    padding: 0;
    position: absolute;
    z-index: 10;
    top: 40px;
    background: #fff;
    right: calc(-25%);
    border: 1px solid #e5e5e5;
    li {
      padding: 0.5rem;
      text-align: center;
    }
  }
`

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`

export const Button = styled.h4`
  cursor: pointer;
  margin-bottom: 0;
  color: white;
  &:hover {
    color: inherit;
  }
`

export const DropdownList = styled.li`
  position: relative;
  display: block;
  white-space: nowrap;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    color: inherit;
  }
`

const Nav = () => {
  const [isMenuShown, setMenu] = React.useState(false)

  const showDropdownMenu = event => {
    event.preventDefault()
    setMenu(true)
    document.addEventListener('click', hideDropdownMenu)
  }

  const hideDropdownMenu = () => {
    setMenu(false)
    document.removeEventListener('click', hideDropdownMenu)
  }

  return (
    <Container>
      <Dropdown>
        <Button onClick={showDropdownMenu}>Visualizations</Button>
        <Transition
          items={isMenuShown}
          from={{ opacity: 0, transform: 'translateY(-10px)' }}
          enter={{ opacity: 1, transform: 'translateY(0px)' }}
          leave={{ opacity: 0, transform: 'translateY(-10px)' }}
        >
          {isMenuShown =>
            isMenuShown &&
            (props => {
              return (
                <ul style={props}>
                  <DropdownList>
                    <StyledLink to="/composer-heat/">
                      Composer Heat Map
                    </StyledLink>
                  </DropdownList>
                  <DropdownList>
                    <StyledLink to="/by-category/">Categories</StyledLink>
                  </DropdownList>
                  <DropdownList>
                    <StyledLink to="/arias/">Arias</StyledLink>
                  </DropdownList>
                  <DropdownList>
                    <StyledLink to="/voices-by-year/">
                      Voice Types By Year
                    </StyledLink>
                  </DropdownList>
                </ul>
              )
            })
          }
        </Transition>
      </Dropdown>
    </Container>
  )
}
export default Nav
