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
import {widthPercentageToDP} from '../../Helpers/Responsive';
import colors from '../../Constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';

function FinanceCardClient({
  type,
  title,
  address,
  price,
  time,
  fragmentSelected,
  onPress,
  completedDateStatus,
  invoiceHeadingDue,
  invoiceHeadingLast,
  dueDateTag,
  invoiceNumber,
  date,
  download,
  description,
  quote,
  check,
  image,
  status,
}) {
  const types = {
    new: {
      solid: '#3eb561',
      trans: 'rgba(62, 181, 97, 0.2)',
    },
    inProcess: {
      solid: colors.darkBlueHigh,
      trans: 'rgba(62, 181, 97, 0.2)',
    },
    completed: {
      solid: '#3eb561',
      trans: 'rgba(249, 179, 18, 0.1)',
    },
    Expenses: {
      solid: colors.red,
      trans: 'rgba(249, 179, 18, 0.1)',
    },
  };
  return (
    <>
      {fragmentSelected === 'overView' ? (
        <TouchableWithoutFeedback
        onPress={onPress}
        >
          <View style={{
            flex:1,
            width: widthPercentageToDP('88%'),
            borderRadius: 5,
            backgroundColor: colors.pureWhite,
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
            padding: 16,
            flexDirection: 'row'
          }}>
            <View
              style={{
                flex: 0.8,
              }}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View>
                  {invoiceHeadingDue ? (
                    <Text style={styles.titled}>{invoiceHeadingDue}</Text>
                  ) : null}
                  {invoiceHeadingLast ? (
                    <Text
                      style={[
                        styles.titled,
                        check == true
                          ? {color: '#3EB561'}
                          : {color: colors.darkBlueHigh},
                      ]}>
                      {invoiceHeadingLast}
                    </Text>
                  ) : null}

                  <View style={styles.row}>
                    <View
                      style={[
                        styles.oval,
                        check == true
                          ? {backgroundColor: '#3DB360'}
                          : {backgroundColor: colors.darkBlueHigh},
                      ]}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(16, 812),
                          fontWeight: 'bold',
                          fontStyle: 'normal',
                          color: '#24334c',
                          textAlign: 'left',
                        }}>
                        {title}
                      </Text>
                      {price ? (
                        <Text style={styles.fee}>Fee: {price}</Text>
                      ) : null}
                      {invoiceNumber ? (
                        <Text style={styles.fee}>Invoice #{invoiceNumber}</Text>
                      ) : null}
                      {date ? (
                        <Text style={styles.fee}>Date: {date}</Text>
                      ) : null}
                      {time ? (
                        <Text style={styles.fee}>Shift Time: {time}</Text>
                      ) : null}

                      <View style={styles.row}>
                        {type === 'new' ? (
                          <>
                            {dueDateTag ? (
                              <View style={[styles.tagCon, styles.border]}>
                                <Text
                                  style={[styles.tagText, styles.secondText]}>
                                  Due: {date}
                                </Text>
                              </View>
                            ) : null}
                          </>
                        ) : null}

                        {completedDateStatus ? (
                          <View
                            style={[
                              styles.tagCon,
                              {
                                backgroundColor:
                                  check == true ? '#3DB460' : colors.pureWhite,
                                flexDirection: 'row',
                                borderColor:
                                  check == true ? '#3DB460' : '#0292FB',
                              },
                            ]}>
                            {check == true ? (
                              <Text
                                style={[
                                  styles.tagText,
                                  {color: colors.pureWhite},
                                ]}>
                                Completed: {completedDateStatus}
                              </Text>
                            ) : (
                              <Text
                                style={[styles.tagText, {color: '#0292FA'}]}>
                                Due: {completedDateStatus}
                              </Text>
                            )}
                            {check == true ? (
                              <View style={{marginLeft: 6}}>
                                <CheckIcon
                                  name="check"
                                  size={15}
                                  color={colors.pureWhite}
                                />
                              </View>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 0.2,
              }}>
              <Image
                source={
                  image == null ? require('../../Assets/Demo/Logo1.png') : image
                }
                style={styles.image}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {fragmentSelected === 'inProcess' ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[styles.container, {width: widthPercentageToDP('100%')}]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View>
                <View style={styles.row}>
                  <View
                    style={[styles.oval, {backgroundColor: types[type].solid}]}
                  />
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    {price ? (
                      <Text style={styles.fee}>Fee: {price}</Text>
                    ) : null}
                    {invoiceNumber ? (
                      <Text style={styles.fee}>Invoice #{invoiceNumber}</Text>
                    ) : null}
                    {date ? <Text style={styles.fee}>Date: {date}</Text> : null}
                    {time ? (
                      <Text style={styles.fee}>Shift Time: {time}</Text>
                    ) : null}
                    <View style={styles.row}>
                      {type === 'inProcess' ? (
                        <View style={[styles.tagCon, styles.border]}>
                          <Text style={[styles.tagText, styles.secondText]}>
                            Due: Wed 25 Jun
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {fragmentSelected === 'completed' ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[styles.container, {width: widthPercentageToDP('100%')}]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View>
                <View style={styles.row}>
                  <View
                    style={[styles.oval, {backgroundColor: types[type].solid}]}
                  />
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    {price ? <Text style={styles.fee}> : {price}</Text> : null}
                    {invoiceNumber ? (
                      <Text style={styles.fee}>Invoice #{invoiceNumber}</Text>
                    ) : null}
                    {date ? <Text style={styles.fee}>Date: {date}</Text> : null}
                    {time ? (
                      <Text style={styles.fee}>Shift Time: {time}</Text>
                    ) : null}
                    <View style={styles.row}>
                      {type === 'completed' ? (
                        <View
                          style={[
                            styles.tagCon,
                            [
                              styles.border,
                              {
                                backgroundColor: '#3EB561',
                                flexDirection: 'row',
                                borderWidth: null,
                              },
                            ],
                          ]}>
                          <Text
                            style={[
                              styles.tagText,
                              [styles.secondText, {color: colors.pureWhite}],
                            ]}>
                            Completed: Wed 25 Jun
                          </Text>
                          <CheckIcon
                            name="check"
                            size={15}
                            style={{marginLeft: 10}}
                            color={colors.pureWhite}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                  {download ? (
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 45,
                        height: 45,
                        //  position: 'absolute',
                        top: 10,
                        bottom: 10,
                        right: -5,

                        backgroundColor: colors.pureWhite,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: '#E5E6E8',
                      }}>
                      <Icon name="arrowdown" size={20} color="#3EB561" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {fragmentSelected === 'Expenses' ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[styles.container, {width: widthPercentageToDP('100%')}]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View>
                <View style={styles.row}>
                  <View
                    style={[styles.oval, {backgroundColor: types[type].solid}]}
                  />
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    {price ? (
                      <Text style={styles.fee}>Fee: {price}</Text>
                    ) : null}
                    {time ? (
                      <Text style={styles.fee}>Shift Time: {time}</Text>
                    ) : null}
                    <View style={styles.row}>
                      {type === 'Expenses' ? (
                        <View
                          style={[
                            styles.tagCon,
                            [styles.border, {borderColor: colors.red}],
                          ]}>
                          <Text
                            style={[
                              styles.tagText,
                              [styles.secondText, {color: colors.red}],
                            ]}>
                            Declined: Wed 25 Jun
                          </Text>
                        </View>
                      ) : null}
                      {type === 'inProcess' ? (
                        <View style={[styles.tagCon, styles.border]}>
                          <Text style={[styles.tagText, styles.secondText]}>
                            Pending: Wed 25 Jun
                          </Text>
                        </View>
                      ) : null}
                      {type === 'completed' ? (
                        <View
                          style={[
                            styles.tagCon,
                            [
                              styles.border,
                              {backgroundColor: '#3EB561', borderWidth: null},
                            ],
                          ]}>
                          <Text
                            style={[
                              styles.tagText,
                              [styles.secondText, {color: colors.pureWhite}],
                            ]}>
                            Completed: Wed 25 Jun
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}

      {fragmentSelected === 'ExpensesAwaiting' ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[styles.container, {width: widthPercentageToDP('100%')}]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.oval,
                      {
                        backgroundColor:
                          status === 'pending'
                            ? '#F9B312'
                            : status === 'approved'
                            ? '#3AB36A'
                            : status === 'declined'
                            ? '#F51313'
                            : '',
                      },
                    ]}
                  />
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    {price ? (
                      <Text style={styles.fee}>Fee: {price}</Text>
                    ) : null}
                    {quote ? (
                      <Text style={styles.fee}>Quote #{quote}</Text>
                    ) : null}
                    {date ? <Text style={styles.fee}>Date: {date}</Text> : null}
                    {description ? (
                      <Text style={[styles.fee, {color: '#9FA5B1'}]}>
                        {description}
                      </Text>
                    ) : null}

                    <View style={styles.row}>
                      <View
                        style={[
                          styles.tagCon,
                          [
                            styles.border,
                            {
                              borderColor:
                                status === 'pending'
                                  ? '#FEF7E7'
                                  : status === 'approved'
                                  ? '#BFE5C7'
                                  : status === 'declined'
                                  ? '#FDB4B4'
                                  : '',
                            },
                          ],
                        ]}>
                        <Text
                          style={[
                            styles.tagText,
                            [
                              styles.secondText,
                              {
                                color:
                                  status === 'pending'
                                    ? '#F9B312'
                                    : status === 'approved'
                                    ? '#3AB36A'
                                    : status === 'declined'
                                    ? '#F51313'
                                    : '',
                              },
                            ],
                          ]}>
                          {status === 'pending'
                            ? 'Awaiting Decision'
                            : status === 'approved'
                            ? 'Approved'
                            : status === 'declined'
                            ? 'Declined'
                            : ''}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
}

export {FinanceCardClient};
