import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/chart-wrapper'
import BarStack from '../components/bar-stack'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <Wrapper
    events
    margin={{ top: 80 }}
    title='Bar Stack' component={BarStack} />
  </Layout>
)

export default SecondPage
