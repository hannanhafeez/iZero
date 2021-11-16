import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import styles from './Styles';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';

import IconBell from 'react-native-vector-icons/Entypo';
import colors from '../../Constants/colors';

function NotificationsCardTalent({title, message, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          marginTop: '5%',
          width: widthPercentageToDP('88%'),
          height: heightPercentageToDP('10%'),
          borderRadius: 15,
          shadowColor: 'rgba(0, 0, 0, 0.07)',
          shadowOffset: {
            width: 7,
            height: 7,
          },
          shadowRadius: 25,
          shadowOpacity: 1,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#efefef',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.fee}>{message}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.2,
          }}>
          <IconBell name="bell" size={30} color={colors.green} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export {NotificationsCardTalent};
