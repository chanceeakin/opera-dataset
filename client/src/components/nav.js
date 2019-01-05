import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Transition } from 'react-spring'

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

class Nav extends React.Component {
  constructor() {
    super()

    this.state = {
      displayMenu: false,
    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
  }

  showDropdownMenu(event) {
    event.preventDefault()
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu)
    })
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  render() {
    const { displayMenu } = this.state
    return (
      <Container>
        <Dropdown>
          <Button onClick={this.showDropdownMenu}>Visualizations</Button>
          <Transition
            items={displayMenu}
            from={{ opacity: 0, transform: 'translateY(-10px)' }}
            enter={{ opacity: 1, transform: 'translateY(0px)' }}
            leave={{ opacity: 0, transform: 'translateY(-10px)' }}
          >
            {displayMenu =>
              displayMenu &&
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
                  </ul>
                )
              })
            }
          </Transition>
        </Dropdown>
      </Container>
    )
  }
}
export default Nav
