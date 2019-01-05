import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/chart-wrapper'
import OtherBar from '../components/other-bar'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Wrapper
      events
      margin={{ top: 80 }}
      title="Breakdown of aria offerings by Audition Category and voice type"
      component={OtherBar}
    />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
