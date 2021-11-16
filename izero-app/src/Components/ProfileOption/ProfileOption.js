import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './Styles';
import {BackArrow} from '../../Assets/Icons';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  widthConverter,
} from '../../Helpers/Responsive';

function ProfileOption({icon, label, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          {icon ? (
            <View style={{width: widthConverter(60)}}>{icon}</View>
          ) : null}

          <Text style={[styles.text]}>{label}</Text>
        </View>
        <BackArrow
          width={widthPercentageToDP('3%')}
          height={heightPercentageToDP('1.3%')}
          color="#3eb561"
          style={styles.icon}
        />
      </View>
    </TouchableWithoutFeedback>
  );
  s;
}

export {ProfileOption};
