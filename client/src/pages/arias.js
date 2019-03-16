import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/common/seo'
import ButtonRow from '../components/common/button-row'
import Wrapper from '../components/charts/chart-wrapper'
import AriaPack from '../components/charts/aria-pack'
import { ARIA_BUTTONS } from '../constants'

export const ButtonContext = React.createContext()

const Arias = ({ data }) => {
  const [selectedButton, setButton] = React.useState(ARIA_BUTTONS[0])
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark

  const selectButton = i => {
    setButton(ARIA_BUTTONS[i])
  }

  return (
    <Layout>
      <SEO title="Aria Pack Map" />
      <ButtonContext.Provider value={{ selectedButton }}>
        <Wrapper
          events
          margin={{
            top: 80,
          }}
          title="Arias"
          component={AriaPack}
        />
      </ButtonContext.Provider>
      <ButtonRow
        selectors={ARIA_BUTTONS}
        selectButton={selectButton}
        isSelected={selectedButton}
      />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <br />
      <h4>Created on: {frontmatter.date}</h4>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const query = graphql`
  query AriasQuery {
    markdownRemark(frontmatter: { title: { eq: "Arias" } }) {
      html
      frontmatter {
        date
      }
    }
  }
`

export default Arias
