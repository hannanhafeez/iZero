import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

function PhoneaIcon(props) {
  return (
    <Svg width="23px" height="23px" viewBox="0 0 23 23" {...props}>
      <G
        id="Calendar"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <G
          id="3.-Calendar-Clicked-View-Booking"
          transform="translate(-319.000000, -373.000000)"
          fill="#3EB561"
          fillRule="nonzero"
        >
          <G id="phone" transform="translate(319.000000, 373.000000)">
            <Path
              d="M21.8722758,16.5011669 L18.7345327,13.3634238 C17.6139101,12.2428013 15.7088518,12.6910941 15.2606028,14.1478596 C14.924416,15.1564637 13.8037935,15.7167749 12.7952332,15.4926067 C10.5539881,14.9322954 7.52830722,12.0186768 6.96799595,9.66536943 C6.63180919,8.65676537 7.30418272,7.53614283 8.312743,7.19999984 C9.76955231,6.75175082 10.2178013,4.8466925 9.09717878,3.72606996 L5.95943566,0.588326835 C5.06293763,-0.196108945 3.71819058,-0.196108945 2.9337548,0.588326835 L0.804571966,2.71750967 C-1.32461087,4.95875475 1.02869648,10.8980542 6.29562243,16.1649802 C11.5625484,21.4319061 17.5018479,23.8973195 19.7430929,21.6560306 L21.8722758,19.5268478 C22.6567553,18.6303498 22.6567553,17.2856027 21.8722758,16.5011669 Z"
              id="Path"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export {PhoneaIcon}
