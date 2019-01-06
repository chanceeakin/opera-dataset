import React from 'react'
import { BarStack } from '@vx/shape'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { AxisBottom } from '@vx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { LegendOrdinal } from '@vx/legend'
import { ARTIST_CATEGORIES, PARTS } from '../../constants'
import json from '../../../../data/data.json'

const purple1 = '#6c5efb'
const purple2 = '#c998ff'
const purple3 = '#a44afe'
const bg = '#eaedff'

const totals = PARTS.map(part => {
  return json.reduce((acc, curr) => {
    if (curr['Voice Type'] === part) {
      acc += curr['Frequency']
    }
    return acc
  }, 0)
})

const filene = json.filter(f => f['Artist Category'] === ARTIST_CATEGORIES[0])
const studio = json.filter(f => f['Artist Category'] === ARTIST_CATEGORIES[1])

const data = PARTS.reduce((acc, part) => {
  const reducedFilene = filene.reduce((acc1, curr) => {
    if (curr['Voice Type'] === part) {
      acc1 += curr['Frequency']
    }
    return acc1
  }, 0)
  const reducedStudio = studio.reduce((acc1, curr) => {
    if (curr['Voice Type'] === part) {
      acc1 += curr['Frequency']
    }
    return acc1
  }, 0)
  acc.push({
    'Voice Type': part,
    Filene: reducedFilene,
    Studio: reducedStudio,
  })
  return acc
}, [])

// accessors
const x = d => d['Voice Type']
// scales
const xScale = scaleBand({
  domain: json.map(x),
  padding: 0.2,
})
const yScale = scaleLinear({
  domain: [0, Math.max(...totals)],
  nice: true,
})
const color = scaleOrdinal({
  domain: ARTIST_CATEGORIES,
  range: [purple1, purple2, purple3],
})

let tooltipTimeout

const BarStackComponent = React.memo(
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
      hideTooltip,
      showTooltip,
    }) => {
      // bounds
      const xMax = width
      const yMax = height - margin.top - 100

      xScale.rangeRound([0, xMax])
      yScale.range([yMax, 0])
      return (
        <div style={{ position: 'relative' }}>
          <svg
            width={width}
            height={height}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
            <Grid
              top={margin.top}
              left={margin.left}
              xScale={xScale}
              yScale={yScale}
              width={xMax}
              height={yMax}
              stroke={'black'}
              strokeOpacity={0.1}
              xOffset={xScale.bandwidth() / 2}
            />
            <Group top={margin.top}>
              <BarStack
                data={data}
                keys={ARTIST_CATEGORIES}
                x={x}
                xScale={xScale}
                yScale={yScale}
                color={color}
              >
                {elements => {
                  return elements.map(stacks => {
                    return stacks.bars.map(bar => {
                      return (
                        <rect
                          key={`bar-stack-${stacks.index}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          height={bar.height}
                          width={bar.width}
                          fill={bar.color}
                          onMouseLeave={event => {
                            tooltipTimeout = setTimeout(() => {
                              hideTooltip()
                            }, 300)
                          }}
                          onMouseMove={e => {
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
                    })
                  })
                }}
              </BarStack>
            </Group>
            <AxisBottom
              top={yMax + margin.top}
              scale={xScale}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={(value, index) => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: 'middle',
              })}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: margin.top / 2 - 10,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            <LegendOrdinal
              scale={color}
              direction="row"
              labelMargin="0 15px 0 0"
            />
          </div>
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
              <div>{tooltipData.bar.data[tooltipData.key]}</div>
            </Tooltip>
          )}
        </div>
      )
    }
  )
)

export default BarStackComponent
