import * as React from 'react';
import Svg, {G, Circle} from 'react-native-svg';

function Oval(props) {
  return (
    <Svg width="375px" height="375px" viewBox="0 0 375 375" {...props}>
      <G
        id="Welcome-Screens"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd">
        <G id="3.-Welcome-Screen-2" fill={props.color}>
          <Circle id="Oval" cx={187} cy={94} r={281} />
        </G>
      </G>
    </Svg>
  );
}

export {Oval};
