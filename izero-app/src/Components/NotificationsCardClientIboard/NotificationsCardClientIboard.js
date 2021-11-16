import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Avatar, Badge} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconStar from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import Api from '../../api';

import CheckIcon from 'react-native-vector-icons/AntDesign';

import BlockIcon from 'react-native-vector-icons/Entypo';

import colors from '../../Constants/colors';

import * as RootNavigation from '../../Router/navigation/RootNavigation';


function NotificationsCardClientIboard({
  navigation,
  title,
  image,
  status,
  jobID,
  jwt,
  onPress,
  item,
  fee,
  jobTitle,
}) {
  

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          flex: 1,
          flexDirection: 'row',
          marginBottom: heightPercentageToDP('0.5%'),
          //justifyContent: 'center',
        }}>
        <View style={[styles.oval, {backgroundColor: colors.pureYellow}]} />
        <View>
          <Text
            style={[
              styles.title,
              {marginBottom: heightPercentageToDP('0.3%')},
            ]}>
            {title}
          </Text>

          <View style={{marginTop: 1}}>
            <Text style={styles.address}>Job: {jobTitle}</Text>
          </View>

          <View>
            {status === 'expense' ? (
              <>
                <View style={{marginTop: 1}}>
                  <Text style={styles.address}>
                    Item: {'NFL Brand Ambassadar'}
                  </Text>
                </View>
                <View style={{marginTop: 1}}>
                  <Text style={styles.address}>
                    Fee: {fee ? '£' + fee : ''}
                  </Text>
                </View>
                <View style={{marginTop: 1}}>
                  <Text style={styles.address}>Awaiting Approval</Text>
                </View>
              </>
            ) : null}
          </View>

          {status == 'newApplicant' ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: heightPercentageToDP('1.1%'),
                marginRight: widthPercentageToDP('3%'),
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  //marginBottom: heightPercentageToDP('2%'),
                  marginLeft: 10,
                }}
                source={{
                  uri:
                    'https://www.obstechnologia.com/Content/Images/umair.png', //item?.user?.avatar,
                }}
              />
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  marginLeft: 10,
                  //marginBottom: heightPercentageToDP('2%'),
                }}
                source={{
                  uri:
                    'https://www.obstechnologia.com/Content/Images/umair.png', //item?.user?.avatar,
                }}
              />
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  marginLeft: 10,
                  //marginBottom: heightPercentageToDP('2%'),
                }}
                source={{
                  uri:
                    'https://www.obstechnologia.com/Content/Images/umair.png', //item?.user?.avatar,
                }}
              />
            </View>
          ) : null}
{/* 
          <View style={styles.row}>
            {status === 'jobDetails' ? (
              <View>
                <View style={[styles.tagCon, styles.border]}>
                  <Text
                    style={{
                      fontFamily: 'Europa',
                      fontSize: RFValue(12, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: colors.darkGreyHigh,
                    }}>
                    Job Details
                  </Text>
                </View>
              </View>
            ) : status === 'completed' ? (
              <TouchableHighlight underlayColor="" onPress={onPress}>
                <View
                  style={{
                    paddingHorizontal: widthPercentageToDP('2.6%'),
                    height: heightPercentageToDP('3.2%'),
                    borderRadius: 13,
                    backgroundColor: '#FEF7EA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: heightPercentageToDP('1.1%'),
                    marginRight: widthPercentageToDP('3%'),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Europa',
                      fontSize: RFValue(12, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: colors.pureYellow, //colors.pureYellow
                    }}>
                    Rate Staff
                  </Text>
                </View>
              </TouchableHighlight>
            ) : status === 'expense'? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    underlayColor=""
                    onPress={() => approveExpense()}>
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 35,
                        backgroundColor: '#3eb561',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: heightPercentageToDP('1.1%'),
                        marginRight: widthPercentageToDP('3%'),
                        borderColor: colors.darkGreyHigh,
                        borderWidth: 1,
                        justifyContent: 'center',
                      }}>
                      <CheckIcon name="check" size={25} color={colors.pureWhite} />
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor=""
                    onPress={() => declineExpense()}>
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 35,
                        backgroundColor: '#E5899E',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: heightPercentageToDP('1.1%'),
                        marginRight: widthPercentageToDP('3%'),
                        justifyContent: 'center',
                      }}>
                      <BlockIcon name="block" size={25} color={colors.pureWhite} />
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor=""
                    onPress={() =>
                     // navigation.navigate('ExpenseDetails', {id: item?.id})
                    //RootNavigation.navigate('ExpenseDetails', {id: item?.id})
                    }>
                    <View
                      style={{
                        paddingHorizontal: widthPercentageToDP('2.6%'),
                        height: heightPercentageToDP('3.2%'),
                        borderRadius: 13,
                        backgroundColor: colors.pureWhite,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: heightPercentageToDP('1.5%'),
                        marginRight: widthPercentageToDP('3%'),
                        borderColor: colors.darkGreyHigh,
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Europa',
                          fontSize: RFValue(12, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: colors.darkGreyHigh,
                        }}>
                        Expense Details
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </>
            ) : status === 'newApplicant' ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      paddingHorizontal: widthPercentageToDP('2.6%'),
                      height: heightPercentageToDP('3.2%'),
                      borderRadius: 13,
                      backgroundColor: '#FEF7EA',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: heightPercentageToDP('1.1%'),
                      marginRight: widthPercentageToDP('3%'),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(12, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.pureYellow,
                      }}>
                      {'Mon 6th June'}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: widthPercentageToDP('2.6%'),
                      height: heightPercentageToDP('3.2%'),
                      borderRadius: 13,
                      backgroundColor: colors.pureWhite,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: heightPercentageToDP('1.1%'),
                      marginRight: widthPercentageToDP('3%'),
                      borderColor: colors.darkGreyHigh,
                      borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: RFValue(12, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.darkGreyHigh,
                      }}>
                      View Staff
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>
       */}
      </View>
        <View>
          <Image source={image} style={styles.image} />
        </View>
      </View>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

export {NotificationsCardClientIboard};
