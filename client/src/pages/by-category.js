import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/charts/chart-wrapper'
import PartsBreakdown from '../components/charts/parts-breakdown'

const SecondPage = () => (
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
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
