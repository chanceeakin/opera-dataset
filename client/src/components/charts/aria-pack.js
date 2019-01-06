import React from 'react'
import { Group } from '@vx/group'
import { Pack } from '@vx/hierarchy'
import { hierarchy } from 'd3-hierarchy'
import { scaleThreshold, scaleOrdinal } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { LegendOrdinal, LegendThreshold } from '@vx/legend'
import { ButtonContext } from '../../pages/arias'
import { ARIA_BUTTONS, ARTIST_CATEGORIES, PARTS } from '../../constants'
import json from '../../../../data/arias.json'

const formattedJson = json.index.map((aria, i) => {
  return {
    aria: aria[0],
    composer: aria[1],
    artist: aria[2],
    voice: aria[3],
    frequency: json.data[i][0],
  }
})
const pack = { children: [{ children: formattedJson }] }

let tooltipTimeout

const findScale = selectedButton => {
  switch (selectedButton) {
    case ARIA_BUTTONS[0]:
      return scaleThreshold({
        domain: [5, 10, 20, 30, 40, 45],
        range: [
          '#f2f0f7',
          '#dadaeb',
          '#bcbddc',
          '#9e9ac8',
          '#756bb1',
          '#54278f',
        ],
      })
    case ARIA_BUTTONS[1]:
      return scaleOrdinal({
        domain: PARTS,
        range: [
          '#ffe108',
          '#ffb40b',
          '#fd6d6f',
          '#52e63b',
          '#11d2f9',
          '#9949f4',
        ],
      })
    case ARIA_BUTTONS[2]:
      return scaleOrdinal({
        domain: ARTIST_CATEGORIES,
        range: ['#fd6d6f', '#ffe108'],
      })
    default:
      return
  }
}

const findFill = (circle, selectedButton) => {
  switch (selectedButton) {
    case ARIA_BUTTONS[0]:
      return circle.data.frequency
    case ARIA_BUTTONS[1]:
      return circle.data.voice
    case ARIA_BUTTONS[2]:
      return circle.data.artist
    default:
      return
  }
}

const findTooltipFill = (tooltipData, selectedButton) => {
  switch (selectedButton) {
    case ARIA_BUTTONS[0]:
      return tooltipData.frequency
    case ARIA_BUTTONS[1]:
      return tooltipData.voice
    case ARIA_BUTTONS[2]:
      return tooltipData.artist
    default:
      return
  }
}

export default withTooltip(
  ({
    width,
    height,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
    margin = {
      top: 10,
      left: 30,
      right: 40,
      bottom: 80,
    },
  }) => {
    const data = hierarchy(pack).sum(d => d.frequency * d.frequency)
    return (
      <ButtonContext.Consumer>
        {({ selectedButton }) => {
          const colorScale = findScale(selectedButton)
          return (
            <React.Fragment>
              <svg width={width} height={height}>
                <rect width={width} height={height} rx={14} fill="#ffffff" />
                <Pack root={data} size={[width, height]}>
                  {pack => {
                    const circles = pack.descendants().slice(2)
                    return (
                      <Group top={-height - margin.bottom} left={width / 2}>
                        {circles.map((circle, i) => {
                          return (
                            <circle
                              key={`cir-${i}`}
                              r={circle.r}
                              cx={circle.x}
                              cy={circle.y}
                              fill={colorScale(
                                findFill(circle, selectedButton)
                              )}
                              stroke="black"
                              strokeWidth="0.2px"
                              onMouseLeave={event => {
                                tooltipTimeout = setTimeout(() => {
                                  hideTooltip()
                                }, 300)
                              }}
                              onMouseMove={e => {
                                if (tooltipTimeout) clearTimeout(tooltipTimeout)
                                const top =
                                  e.clientY - margin.top - circle.height
                                const left = circle.x
                                showTooltip({
                                  tooltipData: circle.data,
                                  tooltipTop: top,
                                  tooltipLeft: left,
                                })
                              }}
                            />
                          )
                        })}
                      </Group>
                    )
                  }}
                </Pack>
              </svg>
              {selectedButton === ARIA_BUTTONS[1] ||
              selectedButton === ARIA_BUTTONS[2] ? (
                <LegendOrdinal
                  scale={colorScale}
                  direction="row"
                  labelMargin="0 15px 0 0"
                />
              ) : (
                <LegendThreshold
                  scale={colorScale}
                  direction="row"
                  labelMargin="0 15px 0 0"
                />
              )}
              {tooltipOpen && (
                <Tooltip
                  top={tooltipTop}
                  left={tooltipLeft}
                  style={{
                    minWidth: 60,
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    color: 'white',
                  }}
                >
                  <div
                    style={{
                      color: colorScale(
                        findTooltipFill(tooltipData, selectedButton)
                      ),
                    }}
                  >
                    <strong>{tooltipData.aria}</strong>
                  </div>
                  <div>{tooltipData.composer}</div>
                  <div>{tooltipData.frequency}</div>
                  <div>{tooltipData.artist}</div>
                  <div>{tooltipData.voice}</div>
                </Tooltip>
              )}
            </React.Fragment>
          )
        }}
      </ButtonContext.Consumer>
    )
  }
)
