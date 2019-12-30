import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import Nav from './nav'

const Container = styled.div`
  background: darkslategray;
  margin-bottom: 1.45rem;
`

const Row = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  margin: 0;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Header = ({ siteTitle }) => (
  <>
    <Container>
      <Row>
        <Title>
          <StyledLink to="/" style={{}}>
            {siteTitle}
          </StyledLink>
        </Title>
        <Nav />
      </Row>
      <div
        style={{
          background: `tomato`,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '.25rem',
        }}
      >
        <h4
          style={{
            marginBottom: '0',
          }}
        >
          This page will go offline on January 5th, 2020. It's been a fun ride!
        </h4>
      </div>
    </Container>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
