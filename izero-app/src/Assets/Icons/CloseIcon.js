import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

function CloseIcon(props) {
  return (
    <Svg width="14px" height="14px" viewBox="0 0 14 14" {...props}>
      <G
        id="Jobs"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <G
          id="1.1-Job-Listings-Filter"
          transform="translate(-332.000000, -214.000000)"
          stroke="#3EB561"
          strokeWidth={2}
        >
          <G id="cross" transform="translate(333.000000, 215.000000)">
            <Path
              d="M6,6 L0,0 L6,6 L12,0 L6,6 Z M6,6 L12,12 L6,6 L0,12 L6,6 Z"
              id="Combined-Shape"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export {CloseIcon}
