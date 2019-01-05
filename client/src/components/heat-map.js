import React from 'react'
import { Group } from '@vx/group'
import { genBins } from '@vx/mock-data'
import { scaleLinear } from '@vx/scale'
import { HeatmapRect } from '@vx/heatmap'

const cool1 = '#65907e'
const cool2 = '#b4fbde'
const bg = '#28272c'

const data = genBins(16, 16)

// utils
const max = (dumb, value = d => d) => Math.max(...dumb.map(value))

// accessors
const bins = d => d.bins
const count = d => d.count

const colorMax = max(data, d => max(bins(d), count))
const bucketSizeMax = max(data, d => bins(d).length)

// scales
const xScale = scaleLinear({
  domain: [0, data.length],
})
const yScale = scaleLinear({
  domain: [0, bucketSizeMax],
})
const rectColorScale = scaleLinear({
  range: [cool1, cool2],
  domain: [0, colorMax],
})
const opacityScale = scaleLinear({
  range: [0.1, 1],
  domain: [0, colorMax],
})

export default ({
  width,
  height,
  margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 110,
  },
}) => {
  // bounds
  let size = width
  if (size > margin.left + margin.right) {
    size = width - margin.left - margin.right
  }

  const xMax = size - margin.left - margin.right
  const yMax = height - margin.bottom - margin.top
  const binWidth = xMax / data.length
  const binHeight = yMax / bucketSizeMax

  xScale.range([0, xMax])
  yScale.range([yMax, 0])
  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
      <Group top={margin.top} left={margin.left}>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
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
                    onClick={event => {
                      const { row, column } = bin
                      alert(JSON.stringify({ row, column, ...bin.bin }))
                    }}
                  />
                )
              })
            })
          }}
        </HeatmapRect>
      </Group>
    </svg>
  )
}
