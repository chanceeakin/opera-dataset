import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/charts/chart-wrapper'
import PartsBreakdown from '../components/charts/parts-breakdown'

const SecondPage = React.memo(({ data }) => {
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark
  return (
    <Layout>
      <SEO title="By Category" />
      <Wrapper
        events
        margin={{
          top: 80,
        }}
        title="Breakdown of aria offerings by Audition Category and voice type"
        component={PartsBreakdown}
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
  query ByCategoryQuery {
    markdownRemark(frontmatter: { title: { eq: "By Category" } }) {
      html
      frontmatter {
        date
      }
    }
  }
`

export default SecondPage
