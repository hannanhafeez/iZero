import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

function Ovaltwo(props) {
  return (
    <Svg width="375px" height="129px" viewBox="0 0 375 129" {...props}>
      <G id="Jobs" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <G id="2.-Job-Chosen-(Description)" fill="#24334C">
          <Circle id="Oval" cx={187} cy={-152} r={281} />
        </G>
      </G>
    </Svg>
  )
}

export {Ovaltwo}
