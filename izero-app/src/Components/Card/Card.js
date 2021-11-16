import React from 'react';
import {View, Text,TouchableHighlight} from 'react-native';
import styles from './Styles';
import {RFValue} from 'react-native-responsive-fontsize';

function Card({label, total, smallText, onPress}) {
  return (
    <TouchableHighlight
    underlayColor=""
    onPress={onPress}
    >
    <View style={styles.container}>
      <Text style={styles.title}>{label ? label : 'LIVE JOBS'}</Text>
      <Text
        style={[
          styles.value,
          {fontSize: smallText ? RFValue(22, 812) : RFValue(41, 812)},
        ]}>
        {total}
      </Text>
    </View>
    </TouchableHighlight>
  );
}

export {Card};
