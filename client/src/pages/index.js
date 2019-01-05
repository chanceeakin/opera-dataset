import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[`audition`, `opera`, `data`, `react`, `gatsby`]}
    />
    <h1>Audition Data</h1>
    <p>
      This is a data set sourced from Wolf Trap Opera regarding statistical
      trends in their young artist auditions.
    </p>
    <p>
      This site constitutes some preliminary work with visualization of the 2019
      audition tour data and severely lazy manipulation of the initial data set.
      Instances of the dataset exist in both CSV and json, and some helper
      utilities are included to convert said dataset into a{' '}
      <code>pandas.Dataframe</code>.
    </p>
    <p>
      There were 3750 unique iterations/instances of a given aria, though I'm
      not sure whether said data is based off of the hearing of the audition or
      the listing of the aria on the sheet.
    </p>
    <h3>Future Plans</h3>
    <ul>
      <li>
        Additional Charts and Graphs, delivered on a weekly basis. I'm also an
        optimist on that assessment, and beg indulgence for those times
        where...life gets in the way.
      </li>
      <ul />
      <li>
        Would like to pull this into a jupyter notebook, as well as aggregate
        previous seasons of audition data for predictive analytics on the 2020
        audition season. As much fun as it is to passive aggressively predict
        next years' lists, wouldn't it be more fun to...quantify the snark?
      </li>
    </ul>
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
    <p>Last Updated: January 4th, 2019</p>
  </Layout>
)

export default IndexPage
