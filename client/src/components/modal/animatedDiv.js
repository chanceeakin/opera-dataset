import React from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'

const AnimatedDiv = React.memo(({ className, children, ...props }) => (
  <animated.div className={className} {...props}>
    {children}
  </animated.div>
))

AnimatedDiv.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default AnimatedDiv
