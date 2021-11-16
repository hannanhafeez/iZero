import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

function OvalChat(props) {
  return (
    <Svg width="375px" height="129px" viewBox="-15 60 390 150" {...props}>
      <G id="Jobs" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <G id="2.-Job-Chosen-(Description)" fill="#24334C">
          <Circle id="Oval" cx={182} cy={-200} r={350} />
        </G>
      </G>
    </Svg>
  )
}

export {OvalChat}
