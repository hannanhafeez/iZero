import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {RFValue} from 'react-native-responsive-fontsize';
import {FlatList} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
function JobCardCalender({
  type = 'new',
  title,
  address,
  date,
  dueDate,
  price,
  time,
  onPress,
  image,
  rate,
  checkAcive,
  inVoiceNo,
  data,
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
      {checkAcive ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <View>
              <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <Text style={styles.address}>
                {date ? date : 'Monday 12 June 2020'}
              </Text>

              <View style={styles.row}>
                <View>
                  <FlatList
                    horizontal={true}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <>
                        <TouchableOpacity>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 10,
                              marginRight: 10,
                            }}>
                            <Image
                              style={{
                                width: widthPercentageToDP('10%'),
                                height: widthPercentageToDP('10%'),
                                marginBottom: heightPercentageToDP('2%'),
                                borderRadius: 20,
                                marginTop: 15,
                              }}
                              source={
                                // data?.avatar !== null
                                //   ? {uri: data?.avatar}:
                                require('../../Assets/Images/avatar.png')
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <View style={{alignContent: 'flex-end'}}>
                  <View
                    style={[
                      styles.tagCon,
                      styles.border,
                      {marginTop: 35, borderColor: '#3eb561'},
                    ]}>
                    <Text
                      style={[
                        styles.tagText,
                        styles.secondText,
                        {color: '#3eb561'},
                      ]}>
                      Active Job
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <View>
              <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
              </View>

              <Text style={styles.address}>
                {date ? date : 'Monday 12 June 2020'}
              </Text>

              <Text style={styles.address}>
                {time ? time : '10:00 - 17:30'}
              </Text>

              {/* <View style={[styles.row,{width: '97%'}]}>
                <View>
                  <Text style={[styles.title, {marginTop: 10}]}>
                    {inVoiceNo ? `Invoice ${inVoiceNo}` : null}
                  </Text>

                  {rate?<Text style={[styles.title, {fontSize: RFValue(25, 812)}]}>
                    {rate ? `£ ${rate}`  : null}
                  </Text>:null}
                </View>

                <View>
                  <View style={[styles.tagCon, styles.border, {marginTop: 45}]}>
                    <Text style={[styles.tagText, styles.secondText]}>
                       {dueDate?`Due${dueDate}`:null}
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
}

export {JobCardCalender};
