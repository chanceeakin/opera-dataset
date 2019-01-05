import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/charts/chart-wrapper'
import ComposerHeat from '../components/charts/composer-heat'

const SecondPage = () => (
  <Layout>
    <SEO title="Composer Heatmap" />
    <Wrapper
      events
      margin={{ top: 50, left: 50, right: 0, bottom: 100 }}
      title="Breakdown by Composer"
      component={ComposerHeat}
    />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
