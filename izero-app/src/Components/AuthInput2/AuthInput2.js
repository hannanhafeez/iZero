import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {ViewIcon} from '../../Assets/Icons';
import {heightPercentageToDP} from '../../Helpers/Responsive';

const AuthInput2 = React.forwardRef((props, ref) => {
  const [focus, setfocus] = useState(false);
  const [hide, sethide] = useState(props.secureTextEntry);
  
  return (
    <View style={styles.container}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> : null}
      <View
        style={[
          styles.inputCon,
          {
            borderColor: props.check ? 'red' : '#e0e3eb',
          },
        ]}>
        {props.inputType === 'rate' ? (
          <Text style={styles.symbol}>£</Text>
        ) : null}
        <TextInput
          ref={ref}
          {...props}
          secureTextEntry={hide}
          clearButtonMode={true}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
          underlineColorAndroid="transparent"
          style={[styles.input, focus && !props.check ? styles.active : null]}
          underlineColorAndroid="transparent"
        />

        {props.inputType === 'rate' ? (
          <Text style={styles.perhour}>per hour</Text>
        ) : null}
        {props.secureTextEntry ? (
          <TouchableOpacity
            style={{
              //marginTop: heightPercentageToDP('1%'),
              position: 'absolute',
              marginLeft: '90%',
            }}
            onPress={() => sethide(!hide)}>
            <ViewIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});

export {AuthInput2};
