import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/charts/chart-wrapper'
import ComposerHeat from '../components/charts/composer-heat'

const SecondPage = React.memo(({ data }) => {
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark
  return (
    <Layout>
      <SEO title="Composer Heatmap" />
      <Wrapper
        events
        margin={{ top: 50, left: 50, right: 0, bottom: 100 }}
        title="Composer Frequency"
        component={ComposerHeat}
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
})

export const query = graphql`
  query HeatMapQuery {
    markdownRemark(frontmatter: { title: { eq: "Composer Heat" } }) {
      html
      frontmatter {
        date
      }
    }
  }
`

export default SecondPage
