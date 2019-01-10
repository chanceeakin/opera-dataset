import React from 'react'
import PropTypes from 'prop-types'

const PackCircle = React.memo(
  ({
    circle,
    colorScale,
    findFill,
    tooltipTimeout,
    margin,
    showTooltip,
    hideTooltip,
    selectedButton,
  }) => {
    return (
      <circle
        r={circle.r}
        cx={circle.x}
        cy={circle.y}
        fill={colorScale(findFill(circle, selectedButton))}
        onMouseLeave={event => {
          tooltipTimeout = setTimeout(() => {
            hideTooltip()
          }, 300)
        }}
        onMouseMove={e => {
          if (tooltipTimeout) clearTimeout(tooltipTimeout)
          const top = e.clientY - margin.top - circle.height
          const left = circle.x
          showTooltip({
            tooltipData: circle.data,
            tooltipTop: top,
            tooltipLeft: left,
          })
        }}
      />
    )
  }
)

PackCircle.propTypes = {
  circle: PropTypes.object.isRequired,
  colorScale: PropTypes.func.isRequired,
  findFill: PropTypes.func.isRequired,
  tooltipTimeout: PropTypes.func.isRequired,
  margin: PropTypes.object.isRequired,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
}

export default PackCircle
