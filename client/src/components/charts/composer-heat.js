import React from 'react'
import { Group } from '@vx/group'
import { scaleLinear } from '@vx/scale'
import { HeatmapRect } from '@vx/heatmap'
import { withTooltip, Tooltip } from '@vx/tooltip'
import json from '../../../../data/composers.json'
import './heat-map.css'

const cool1 = '#65907e'
const cool2 = '#b4fbde'
const bg = '#28272c'

const data = Object.keys(json.Frequency).map((key, i) => {
  return {
    composer: key,
    count: Number(json.Frequency[key]),
    bin: i,
  }
})

const chunkArray = (arr, size) => {
  let index = 0
  let length = arr.length
  let temp = []

  for (index = 0; index < length; index += size) {
    const c = {
      bin: index,
      bins: arr.slice(index, index + size),
    }
    temp.push(c)
  }

  return temp
}
const chunked = chunkArray(data, 12)

// utils
const max = (data, value = d => d) => Math.max(...data.map(value))

// accessors
const bins = d => d.bins
const count = d => d.count

const colorMax = max(chunked, d => max(bins(d), count))
const bucketSizeMax = max(chunked, d => bins(d).length)

// scales
const xScale = scaleLinear({
  domain: [0, chunked.length],
})
const yScale = scaleLinear({
  domain: [0, bucketSizeMax],
})
const rectColorScale = scaleLinear({
  domain: [0, colorMax],
  range: [cool1, cool2],
})
const opacityScale = scaleLinear({
  domain: [0, colorMax],
  range: [0.1, 1],
})

let tooltipTimeout

export default React.memo(
  withTooltip(
    ({
      width,
      height,
      margin = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 110,
      },
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      hideTooltip,
      showTooltip,
    }) => {
      // bounds
      let size = width
      if (size > margin.left + margin.right) {
        size = width - margin.left - margin.right
      }

      const xMax = size - margin.left - margin.right
      const yMax = height - margin.bottom - margin.top
      const binWidth = xMax / chunked.length
      const binHeight = yMax / bucketSizeMax

      xScale.range([0, xMax])
      yScale.range([yMax, 0])
      console.log(tooltipData)
      return (
        <div style={{ position: 'relative' }}>
          <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
            <Group top={margin.top} left={margin.left}>
              <HeatmapRect
                data={chunked}
                xScale={xScale}
                yScale={yScale}
                colorScale={rectColorScale}
                opacityScale={opacityScale}
                count={count}
                binWidth={binWidth}
                binHeight={binHeight}
                gap={2}
              >
                {heatmap => {
                  return heatmap.map(bins => {
                    return bins.map(bin => {
                      return (
                        <rect
                          key={`heatmap-rect-${bin.row}-${bin.column}`}
                          className="vx-heatmap-rect"
                          width={bin.width}
                          height={bin.height}
                          x={bin.x}
                          y={bin.y}
                          fill={bin.color}
                          fillOpacity={bin.opacity}
                          onMouseLeave={event => {
                            tooltipTimeout = setTimeout(() => {
                              hideTooltip()
                            }, 300)
                          }}
                          onMouseMove={event => {
                            if (tooltipTimeout) clearTimeout(tooltipTimeout)
                            const top =
                              event.clientY - margin.top - margin.bottom
                            const left = bin.x + bin.width
                            showTooltip({
                              tooltipData: bin,
                              tooltipTop: top,
                              tooltipLeft: left,
                            })
                          }}
                        />
                      )
                    })
                  })
                }}
              </HeatmapRect>
            </Group>
          </svg>
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
              <div style={{ color: tooltipData.color }}>
                <strong>{tooltipData.bin.composer}</strong>
              </div>
              <div>Frequency: {tooltipData.bin.count}</div>
            </Tooltip>
          )}
        </div>
      )
    }
  )
)
