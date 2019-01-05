import React from 'react'
import cx from 'classnames'
import styled from '@emotion/styled'
import { withScreenSize } from '@vx/responsive'

const Container = styled.div`
  margin-bottom: 2rem;
`

const Wrapper = React.memo(
  ({
    screenWidth,
    screenHeight,
    children,
    title,
    component,
    shadow = false,
    events = false,
    margin = { top: 0, left: 0, right: 0, bottom: 80 },
    description,
  }) => {
    const padding = 40
    let width = screenWidth - padding
    if (width > 800) width = 800
    const height = width * 0.6

    return (
      <Container>
        <div style={{ width: width }}>
          <h1>{title}</h1>
        </div>
        <div
          className={cx(
            {
              shadow: !!shadow,
            },
            title.split(' ').join('-'),
            'chart'
          )}
        >
          {React.createElement(component, {
            width,
            height,
            margin,
            events,
          })}
        </div>
        {description && React.createElement(description, { width, height })}
      </Container>
    )
  }
)

export default withScreenSize(Wrapper)
