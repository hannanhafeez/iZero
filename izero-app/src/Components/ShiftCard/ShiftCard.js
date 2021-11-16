import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import styles from './Styles';

import CheckIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

function ShiftCard({
  onPress,
  selected,
  btnStyle,
  txtStyle,
  text,
  date,
  totalPay,
  role,
  time,
  applied,
  check,
  startDate,
  endDate,
  startTime,
  endTime,
}) {
  return (
    <TouchableWithoutFeedback
      disabled={applied == true ? true : false}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.tag}>
            <Text style={[styles.tagText,{color: colors.green}]}>
              {startDate
                ? startDate
                : 'No Date Found'}
            </Text>
          </View>
          <View style={styles.secondTag}>
            <Text style={[styles.tagText, styles.color]}>
              {startTime && endTime
                ? startTime?.substring(0, startTime?.length - 3) +
                  ' - ' +
                  endTime?.substring(0, endTime?.length - 3)
                : 'No Time Found'}
            </Text>
          </View>
        </View>
        <Text style={styles.fee}>Fee: £{totalPay}</Text>
        <Text style={styles.fee}>Job Role: {role}</Text>

        {applied ? (
          <View
            style={{
              width: widthPercentageToDP('88%'),
              height: heightPercentageToDP('5.6%'),
              borderRadius: 23,
              borderStyle: 'solid',
              marginTop: 14,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(62, 181, 97, 0.2)',
            }}>
            <Text style={[styles.btnText, txtStyle]}>{'Already applied'}</Text>
          </View>
        ) : (
          <View style={[styles.button, btnStyle]}>
            <>
              <Text style={[styles.btnText, txtStyle]}>{text}</Text>
              {check ? (
                <View
                  style={{
                    backgroundColor: colors.green,
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                    borderRadius: 25,
                    justifyContent: 'center',
                  }}>
                  <CheckIcon
                    name="check"
                    size={15}
                    color={colors.pureWhite}
                    style={{marginLeft: 5}}
                  />
                </View>
              ) : null}
            </>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export {ShiftCard};
