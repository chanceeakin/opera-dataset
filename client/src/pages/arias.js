import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ButtonRow from '../components/button-row'
import Wrapper from '../components/charts/chart-wrapper'
import AriaPack from '../components/charts/aria-pack'
import { ARIA_BUTTONS } from '../constants'

export const ButtonContext = React.createContext()

class Arias extends React.PureComponent {
  state = {
    selectedButton: ARIA_BUTTONS[0],
  }

  selectButton = i => {
    this.setState({
      selectedButton: ARIA_BUTTONS[i],
    })
  }
  render() {
    const { data } = this.props
    const { selectedButton } = this.state
    const { markdownRemark } = data
    const { html, frontmatter } = markdownRemark
    return (
      <Layout>
        <SEO title="Aria Pack Map" />
        <ButtonContext.Provider value={{ selectedButton }}>
          <Wrapper
            events
            margin={{
              top: 80,
            }}
            title="Arias"
            component={AriaPack}
          />
        </ButtonContext.Provider>
        <ButtonRow
          selectors={ARIA_BUTTONS}
          selectButton={this.selectButton}
          isSelected={selectedButton}
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
  }
}

export const query = graphql`
  query AriasQuery {
    markdownRemark(frontmatter: { title: { eq: "Arias" } }) {
      html
      frontmatter {
        date
      }
    }
  }
`

export default Arias
