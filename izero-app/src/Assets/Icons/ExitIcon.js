import * as React from "react"
import Svg, { G, Polygon, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

function ExitIcon(props) {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" {...props}>
      <G
        id="Profile"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <G
          id="1.-Profile"
          transform="translate(-35.000000, -528.000000)"
          fill="#3EB561"
          fillRule="nonzero"
        >
          <G id="login-3" transform="translate(35.000000, 528.000000)">
            <Polygon
              id="Path"
              points="9.8753307 10.56815 12.5725758 7.87679446 10.9122203 6.21407219 5.38507789 11.7318024 10.9110094 17.269513 12.5737317 15.6103134 9.88474295 12.9166461 23.4847961 12.9166461 23.4847961 10.56815"
            />
            <Path
              d="M11.7423705,21.1363 C6.56282114,21.1363 2.34844108,16.921975 2.34844108,11.7423705 C2.34844108,6.5627661 6.56282114,2.34849612 11.7423705,2.34849612 C15.6760891,2.34849612 19.047329,4.78269334 20.4446366,8.21970891 L22.9422427,8.21970891 C21.4427763,3.46283048 16.9900625,0 11.7423705,0 C5.2676173,0 0,5.26882824 0,11.7423705 C0,18.2159128 5.2676173,23.4847411 11.7423705,23.4847411 C16.9900625,23.4847411 21.4427763,20.0230665 22.9434536,15.2650872 L20.4446916,15.2650872 C19.047329,18.7032587 15.6760891,21.1363 11.7423705,21.1363 Z"
              id="Path"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export {ExitIcon}
