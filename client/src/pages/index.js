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
    <h2>Young Artist Audition Data</h2>
    <p>
      Using a data set sourced from a certain opera company that performs in a
      Barn, this site is an exploration of statistical and historical trends in
      audition selection choices.
    </p>
    <p>
      This site constitutes some preliminary work with visualization of the 2019
      audition tour data, as well as some lazy manipulation of the initial data
      set. Instances of the dataset exist in both CSV and json, and some helper
      utilities are included to convert said dataset into a{' '}
      <code>pandas.Dataframe</code>.
    </p>
    <p>
      There were 3750 instances from 1108 unique arias (operatic solos for
      software folks) on audition sheets this year (or they heard 3750 singers
      in person...optimistic but unlikely).
    </p>
    <h3>Why am I building this?</h3>
    <p>
      I really enjoy learning new things and building with new technologies.
      This project allows me to learn data science and artificial
      intelligence/machine learning in a fun way. I also enjoy giving to
      organizations who might not otherwise have the time or resources for such
      an analysis.
    </p>
    <h3>Future Plans</h3>
    <ul>
      <li>
        Data Sanitiztion/Normalization: While this dataset is a great resource,
        there are a lot of discrepancies in white-space, spellings, diacritical
        markings which result in a suboptimal analysis. Going to continue to
        clean that up as I go along.
      </li>
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
        next years' lists, wouldn't it be more fun to quantitatively predict how
        many hopeful mezzos are going to offer "Must the winter come so soon?"
        before we even crack open that YAP tracking site?
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
    <p>Last Updated: January 5th, 2019</p>
    <br />
  </Layout>
)

export default IndexPage
