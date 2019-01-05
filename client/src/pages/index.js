import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = React.memo(({ data }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`audition`, `opera`, `data`, `react`, `gatsby`]}
      />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <h3>Currently Available Charts</h3>
      <ul>
        <li>
          <Link to="/by-category/">Data by Audition Category</Link>
        </li>
        <li>
          <Link to="/composer-heat/">Data by Composer</Link>
        </li>
      </ul>
      <h3>Resources and Links</h3>
      <ul>
        <li>
          <a href="https://github.com/chanceeakin/opera-dataset">Source Code</a>
        </li>
      </ul>
    </Layout>
  )
})

export const query = graphql`
  query IndexQuery {
    markdownRemark(frontmatter: { title: { eq: "Index" } }) {
      html
    }
  }
`

export default IndexPage
