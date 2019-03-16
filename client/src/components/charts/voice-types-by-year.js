import React from 'react'
import { Group } from '@vx/group'
import { BarGroup } from '@vx/shape'
import { AxisBottom } from '@vx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'

import { PARTS } from '../../constants'
import json from '../../../../data/multi-year.json'

const blue = '#aeeef8'
const green = '#e5fd3d'
const bg = '#612efb'

const newData = PARTS.map(part => {
  const reduced = json.data.reduce((acc, curr) => {
    acc['Voice Type'] = part
    if (curr['Voice Type'] === part) {
      acc[curr['Year']] = curr['Frequency']
    }
    return acc
  }, {})
  return reduced
})

const newKeys = Object.keys(newData[0]).filter(d => d !== 'Voice Type')

// accessors
const x0 = d => d['Voice Type']

// scales
const x0Scale = scaleBand({
  domain: newData.map(x0),
  padding: 0.2,
})
const x1Scale = scaleBand({
  domain: newKeys,
  padding: 0.1,
})
const yScale = scaleLinear({
  domain: [
    0,
    Math.max(...newData.map(d => Math.max(...newKeys.map(key => d[key])))),
  ],
})
const color = scaleOrdinal({
  domain: newKeys,
  range: [blue, green],
})

export default React.memo(
  withTooltip(
    ({
      width,
      height,
      margin = {
        top: 40,
      },
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      tooltipTimeout,
      hideTooltip,
      showTooltip,
    }) => {
      // bounds
      const xMax = width
      const yMax = height - margin.top - 100

      x0Scale.rangeRound([0, xMax])
      x1Scale.rangeRound([0, x0Scale.bandwidth()])
      yScale.range([yMax, 0])

      return (
        <React.Fragment>
          {tooltipOpen && (
            <Tooltip
              top={tooltipTop}
              left={tooltipLeft}
              style={{
                minWidth: 60,
                backgroundColor: 'rgba(0,0,0,0.9)',
                color: 'white',
              }}
            >
              <div style={{ color: color(tooltipData.key) }}>
                <strong>{tooltipData.key}</strong>
              </div>
              <div>{tooltipData.value}</div>
            </Tooltip>
          )}
          <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
            <Group top={margin.top}>
              <BarGroup
                data={newData}
                keys={newKeys}
                height={yMax}
                x0={x0}
                x0Scale={x0Scale}
                x1Scale={x1Scale}
                yScale={yScale}
                color={color}
              >
                {data => {
                  return data.map(barGroup => {
                    return (
                      <Group
                        key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                        left={barGroup.x0}
                      >
                        {barGroup.bars.map(bar => {
                          return (
                            <rect
                              key={`bar-group-bar-${barGroup.index}-${
                                bar.index
                              }-${bar.value}-${bar.key}`}
                              x={bar.x}
                              y={bar.y}
                              width={bar.width}
                              height={bar.height}
                              fill={bar.color}
                              rx={4}
                              onMouseLeave={() => {
                                tooltipTimeout = setTimeout(() => {
                                  hideTooltip()
                                }, 200)
                              }}
                              onMouseEnter={e => {
                                if (tooltipTimeout) clearTimeout(tooltipTimeout)
                                const top = e.clientY - margin.top - bar.height
                                const left = bar.x + bar.width + 60
                                showTooltip({
                                  tooltipData: bar,
                                  tooltipTop: top,
                                  tooltipLeft: left,
                                })
                              }}
                            />
                          )
                        })}
                      </Group>
                    )
                  })
                }}
              </BarGroup>
            </Group>
            <AxisBottom
              top={yMax + margin.top}
              scale={x0Scale}
              stroke={green}
              tickStroke={green}
              hideAxisLine={true}
              tickLabelProps={() => ({
                fill: green,
                fontSize: 11,
                textAnchor: 'middle',
              })}
            />
          </svg>
        </React.Fragment>
      )
    }
  )
)
