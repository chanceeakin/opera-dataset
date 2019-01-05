import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer>
            <p>
              © 2019. Made with{' '}
              <span role="img" aria-label="heart">
                ❤️
              </span>{' '}
              and{' '}
              <span role="img" aria-label="bourbon">
                🥃
              </span>
              by <a href="https://chanceeakin.io">Chance Eakin</a> using{' '}
              <a href="https://www.gatsbyjs.org">GatsbyJS.</a>
            </p>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
