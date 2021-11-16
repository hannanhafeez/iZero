import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Avatar, Badge} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconStar from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Entypo';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';

import colors from '../../Constants/colors';

function JobCardClientSearchTab({
  navigation,
  type = 'new',
  title,
  onPress,
  image,
  date,
  checkProfession,
  checkDate,
  profession,
  checkJobStatus,
  jobStatus,
}) {
  const types = {
    new: {
      solid: '#3eb561',
      trans: 'rgba(62, 181, 97, 0.2)',
    },
    completed: {
      solid: '#f9b312',
      trans: 'rgba(249, 179, 18, 0.1)',
    },
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image source={image} style={styles.image} />
          <View
            style={{marginLeft: 20, marginTop: heightPercentageToDP('0.5%')}}>
            <Text style={styles.title}>{title}</Text>
            {checkProfession ? (
              <>
                <View style={styles.row}>
                  <View
                    style={{
                      borderRadius: 13,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: heightPercentageToDP('0.5%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(20, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.darkGreyHigh,
                      }}>
                      {profession}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
            {checkDate ? (
              <>
                <View style={styles.row}>
                  <View
                    style={{
                      borderRadius: 13,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: heightPercentageToDP('0.5%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(14, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.darkGreyHigh,
                      }}>
                      {date}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}

            {checkJobStatus ? (
              <>
                <View style={styles.row}>
                  <View
                    style={{
                      borderRadius: 13,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: heightPercentageToDP('0.5%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(14, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.darkGreyHigh,
                      }}>
                      {'Job Complete'}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export {JobCardClientSearchTab};
