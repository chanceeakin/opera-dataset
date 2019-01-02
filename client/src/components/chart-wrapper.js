import React from 'react';
import cx from 'classnames';
import { withScreenSize } from '@vx/responsive';

const Wrapper = ({
    screenWidth,
    screenHeight,
    children,
    title,
    component,
    shadow = false,
    events = false,
    margin = { top: 0, left: 0, right: 0, bottom: 80 },
    description
  }) => {
    const padding = 40;
    let width = screenWidth - padding;
    if (width > 800) width = 800;
    const height = width * 0.6;

    return (
        <div className="container">
          <div style={{ width: width }}>
            <h1>{title}</h1>
          </div>
          <div
            className={cx(
              {
                shadow: !!shadow
              },
              title.split(' ').join('-'),
              'chart'
            )}
          >
            {React.createElement(component, {
              width,
              height,
              margin,
              events
            })}
          </div>
          {description && React.createElement(description, { width, height })}
        </div>
    );
  }

export default withScreenSize(Wrapper)
