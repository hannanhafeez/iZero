import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title, desc */

function BackArrow(props) {
  return (
    <Svg width="20px" height="20px" viewBox="0 0 20 20" {...props}>
      <G
        id="Welcome-Screens"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd">
        <G
          id="7.-Login-with-email"
          transform="translate(-30.000000, -60.000000)"
          fill={props.color || '#24334C'}
          fillRule="nonzero">
          <Path
            d="M41.0019,60.9851 C40.5119,60.4951 39.7219,60.4951 39.2319,60.9851 L30.9219,69.2951 C30.5319,69.6851 30.5319,70.3151 30.9219,70.7051 L39.2319,79.0151 C39.7219,79.5051 40.5119,79.5051 41.0019,79.0151 C41.4919,78.5251 41.4919,77.7351 41.0019,77.2451 L33.7619,69.9951 L41.0119,62.7451 C41.4919,62.2651 41.4919,61.4651 41.0019,60.9851 Z"
            id="Path"
          />
        </G>
      </G>
    </Svg>
  );
}

export {BackArrow};
