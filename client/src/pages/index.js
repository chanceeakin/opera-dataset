import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/common/seo'

const IndexPage = React.memo(({ data }) => {
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark
  const { date, title } = frontmatter
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`audition`, `opera`, `data`, `react`, `gatsby`]}
      />
      <h1
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p>
        Using a data set sourced from a certain opera company that performs in a
        Barn, this site is an exploration of statistical and historical trends
        in audition selection choices.
      </p>
      <p>
        This site constitutes some preliminary work with visualization of the
        2019 audition tour data, as well as some lazy manipulation of the
        initial data set. Instances of the dataset exist in both CSV and json,
        and some helper utilities are included to convert said dataset into a{' '}
        <code>pandas.Dataframe</code>.
      </p>
      <p>
        There were 3750 instances from 1108 unique arias (operatic solos for
        software folks) on audition sheets this year (or they heard 3750 singers
        in person...optimistic but unlikely).
      </p>
      <p>
        <strong>THIS SITE CURRENTLY BEST VIEWED ON DESKTOP.</strong>
      </p>
      <h3>Currently Available Charts</h3>
      <ul>
        <li>
          <Link to="/by-category/">Data by Audition Category</Link>
        </li>
        <li>
          <Link to="/composer-heat/">Data by Composer</Link>
        </li>
        <li>
          <Link to="/arias/">Data by Aria</Link>
        </li>
        <li>
          <Link to="/voices-by-year/">Voice Type Entries By Year</Link>
        </li>
      </ul>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p>Last Updated: {date}</p>
    </Layout>
  )
})

export const query = graphql`
  query IndexQuery {
    markdownRemark(
      frontmatter: { title: { eq: "Young Artist Audition Data" } }
    ) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`

export default IndexPage
