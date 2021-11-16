import React from 'react';
import {View, Text} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import styles from './Styles';

import CheckIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

function CheckBox({termCondition}) {
  return (
    <View style={styles.container}>
      {termCondition ? (
        <View
          style={{
            width: widthPercentageToDP('6%'),
            height: widthPercentageToDP('6%'),
            borderRadius: widthPercentageToDP('6%') / 2,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.green,
          }}>
          <CheckIcon
            name="check"
            size={15}
            color={colors.green}
            style={{marginLeft: 5}}
          />
        </View>
      ) : (
        <View style={styles.checkCon}></View>
      )}
      <Text style={styles.text}>
        By completing and submitting this registration process, you are agreeing
        to our <Text style={styles.highlighted}>terms and conditions</Text> and{' '}
        <Text style={styles.highlighted}>privacy policy.</Text>
      </Text>
    </View>
  );
}

export {CheckBox};
