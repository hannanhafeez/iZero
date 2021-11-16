import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {color} from 'react-native-reanimated';
import styles from './Styles';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

function FinanceCard({
  type,
  title,
  address,
  price,
  time,
  fragmentSelected,
  onPress,
  dueDate,
  completedDate,
  image,
  date,
  nextPay,
  status,
  description,
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
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View>
                {nextPay ? (
                  <Text style={styles.titled}>NEXT PAYOUT</Text>
                ) : (
                  <Text style={[styles.titled, {color: '#3eb561'}]}>
                    LAST PAYMENT COMPLETE
                  </Text>
                )}

                <View style={styles.row}>
                  <View
                    style={[
                      styles.oval,
                      {
                        backgroundColor: nextPay
                          ? colors.darkBlueHigh
                          : types[type].solid,
                      },
                    ]}
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
                      {/* <View style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
              <Text style={[styles.tagText, {color: types[type].solid}]}>
                Sat 11 Jun - Mon 13 Jun
              </Text>
            </View> */}
                      {type === 'new' && nextPay ? (
                        <View
                          style={[
                            styles.tagCon,
                            [styles.border, {borderColor: colors.darkBlueHigh}],
                          ]}>
                          <Text
                            style={[
                              styles.tagText,
                              [styles.secondText, {color: colors.darkBlueHigh}],
                            ]}>
                            Due: {date}
                          </Text>
                        </View>
                      ) : (
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
                            Completed: {completedDate}
                          </Text>
                          <CheckIcon
                            name="check"
                            size={15}
                            color={colors.pureWhite}
                            style={{marginLeft: 5}}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View style={{marginLeft: -30}}>
                <Image
                  source={
                    image == null
                      ? require('../../Assets/Demo/Logo1.png')
                      : {uri: image}
                  }
                  style={styles.image}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      {fragmentSelected === 'inProcess' ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
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
                      {/* <View style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
              <Text style={[styles.tagText, {color: types[type].solid}]}>
                Sat 11 Jun - Mon 13 Jun
              </Text>
            </View> */}
                      {type === 'inProcess' ? (
                        <View
                          style={[
                            styles.tagCon,
                            [styles.border, {borderColor: types[type].solid}],
                          ]}>
                          <Text
                            style={[
                              styles.tagText,
                              [styles.secondText, {color: types[type].solid}],
                            ]}>
                            Due: {dueDate}
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
          <View style={styles.container}>
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
                      {/* <View style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
              <Text style={[styles.tagText, {color: types[type].solid}]}>
                Sat 11 Jun - Mon 13 Jun
              </Text>
            </View> */}
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
                            Completed: {completedDate}
                          </Text>
                          <CheckIcon
                            name="check"
                            size={15}
                            color={colors.pureWhite}
                            style={{marginLeft: 5}}
                          />
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
      {fragmentSelected === 'Expenses' ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.oval,
                      {
                        backgroundColor:
                          status == 'pending'
                            ? colors.darkBlueHigh
                            : status == 'approved'
                            ? 'green'
                            : status == 'declined'
                            ? colors.red
                            : null,
                      },
                    ]}
                  />
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    {price ? (
                      <Text style={styles.fee}>Fee: {price}</Text>
                    ) : null}
                    {time ? (
                      <Text style={styles.fee}>Shift Time: {time}</Text>
                    ) : null}
                    {description ? (
                      <Text style={[styles.fee, {color: '#BABDD0'}]}>
                        {description}
                      </Text>
                    ) : null}
                    <View style={styles.row}>
                      {/* <View style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
              <Text style={[styles.tagText, {color: types[type].solid}]}>
                Sat 11 Jun - Mon 13 Jun
              </Text>
            </View> */}
                      {type === 'Expenses' ? (
                        <View
                          style={[
                            styles.tagCon,
                            [
                              styles.border,
                              {
                                borderColor:
                                  status == 'pending'
                                    ? colors.darkBlueHigh
                                    : status == 'approved'
                                    ? '#3eb561'
                                    : status == 'declined'
                                    ? colors.red
                                    : null,

                                backgroundColor:
                                  status == 'approved'
                                    ? '#3eb561'
                                    : colors.pureWhite,
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
                                    status == 'pending'
                                      ? colors.darkBlueHigh
                                      : status == 'approved'
                                      ? colors.pureWhite
                                      : status == 'declined'
                                      ? colors.red
                                      : null,
                                },
                              ],
                            ]}>
                            {status == 'pending'
                              ? `Pending: ${date}`
                              : status == 'approved'
                              ? `Completed: ${date}`
                              : status == 'declined'
                              ? `Declined: ${date}`
                              : null}
                            {/* {status.charAt(0).toUpperCase() + status.slice(1)}:{'Wed 25 Jun'} */}
                          </Text>
                          {status == 'approved' ? (
                            <CheckIcon
                              name="check"
                              size={15}
                              color={colors.pureWhite}
                              style={{marginLeft: 5}}
                            />
                          ) : null}
                        </View>
                      ) : null}
                      {type === 'inProcess' ? (
                        <View style={[styles.tagCon, styles.border]}>
                          <Text style={[styles.tagText, styles.secondText]}>
                            Pending:{date}
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
                            Completed:{date}
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
    </>
  );
}

export {FinanceCard};
