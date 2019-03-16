import React from 'react'
import styled from '@emotion/styled'

const Container = styled.footer`
  padding-top: 2rem;
`

const Footer = () => (
  <Container>
    <p>
      © 2019. Made with{' '}
      <span role="img" aria-label="heart">
        ❤️
      </span>{' '}
      <span role="img" aria-label="heart">
        ☕️
      </span>
      {' and '}
      <span role="img" aria-label="bourbon">
        🥃
      </span>
      by <a href="https://chanceeakin.io">Chance Eakin</a> using{' '}
      <a href="https://www.gatsbyjs.org">GatsbyJS.</a>
    </p>
  </Container>
)

export default Footer
