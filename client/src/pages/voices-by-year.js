import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/common/seo'
import Wrapper from '../components/charts/chart-wrapper'
import VoiceTypesChart from '../components/charts/voice-types-by-year'

const VoicesByYear = React.memo(({ data }) => {
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark
  return (
    <Layout>
      <SEO title="Voice Types By Year" />
      <Wrapper
        events
        margin={{
          top: 80,
          left: 0,
          right: 0,
          bottom: 40,
        }}
        title="Voice Types by Year"
        component={VoiceTypesChart}
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
  query VoicesQuery {
    markdownRemark(frontmatter: { title: { eq: "Voice Types By Year" } }) {
      html
      frontmatter {
        date
      }
    }
  }
`

export default VoicesByYear
