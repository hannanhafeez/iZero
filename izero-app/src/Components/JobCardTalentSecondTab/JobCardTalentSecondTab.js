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

function JobCardTalentSecondTab({
  navigation,
  type = 'new',
  title,
  address,
  price,
  time,
  timeTag,
  onPress,
  image,
  rate,
  data,
  designation,
  appliedFor,
  date,
  jobDetails,
  jobsCompleted,
  jobsCompletedLabel,
  status,
  ratingTag,
  jobStatus,
  plusSign,
  findTalent,
  checkData,
  jobID,
  applicants,
  shiftTitle,
  clientName,
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
      {/* <View style={styles.container}> */}
      <View
        style={{
          backgroundColor: colors.pureWhite,
          flex: 1,
          flexDirection: 'row',
          marginBottom: heightPercentageToDP('0.5%'),
          justifyContent: 'center',
        }}>
        <View style={[styles.oval, {backgroundColor: types[type].solid}]} />
        <View>
          <Text style={styles.title}>{title}</Text>
          {jobStatus === 'Completed' ? (
            <View
              style={[
                styles.tagCon,
                {
                  backgroundColor: '#3DB460',
                  width: '40%',
                  marginTop: null,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <Text style={[styles.tagText, {color: colors.pureWhite}]}>
                {jobStatus}
              </Text>
              <CheckIcon
                name="check"
                size={15}
                color={colors.pureWhite}
                style={{marginLeft: 5}}
              />
            </View>
          ) : null}
          {designation ? (
            <Text
              style={[
                styles.designation,
                {
                  marginTop: heightPercentageToDP('0.3%'),
                },
              ]}>
              {designation}
            </Text>
          ) : null}
          {appliedFor ? (
            <Text style={styles.fee}>Job Offered: {appliedFor}</Text>
          ) : null}
          {jobsCompletedLabel ? (
            <View
              style={{
                marginTop: 3,
              }}>
              <Text style={styles.address}>
                Jobs Completed: {jobsCompleted}
              </Text>
            </View>
          ) : null}
          {applicants && shiftTitle ? (
            <View>
              <>
                <Text style={styles.fee}>
                  Shift Title: {shiftTitle + '    '}
                </Text>
                <Text style={styles.fee}>Shift Fee: {price}</Text>
              </>
            </View>
          ) : null}

          {clientName !== null ? (
            <View>
              <>
                <Text style={styles.fee}>
                  Employer Name: {clientName + '    '}
                </Text>
              </>
            </View>
          ) : null}
          {applicants ? null : (
            <>
              {price ? (
                <Text style={styles.fee}>Total Fee: {price}</Text>
              ) : null}
            </>
          )}
          {time ? <Text style={styles.fee}>Shift Time: {time}</Text> : null}
          {address ? <Text style={styles.address}>{address}</Text> : null}

          {data?.user > 0 ? (
            <Text style={{color: colors.pureBlack}}>Staff</Text>
          ) : null}
          {data ? (
            <View>
              <FlatList
                horizontal={true}
                data={data}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{alignSelf: 'flex-start'}}
                ListEmptyComponent={<Text style={{marginBottom: -20}} />}
                renderItem={({item}) => (
                  <>
                    <TouchableOpacity style={styles.activeMainTouchContainer}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10,
                          marginRight: 10,
                        }}>
                        {item.Avatar_base64 ? (
                          <Avatar
                            rounded
                            size={30}
                            source={{
                              uri: item.Avatar_base64,
                            }}
                          />
                        ) : (
                          <View style={styles.addUserContainer}>
                            <Image
                              style={{
                                width: widthPercentageToDP('10%'),
                                height: widthPercentageToDP('10%'),
                                marginBottom: heightPercentageToDP('2%'),
                              }}
                              source={{
                                uri: item?.user?.avatar,
                              }}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}

          <View style={styles.row}>
            {date ? (
              <View
                style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
                <Text style={[styles.tagText, {color: types[type].solid}]}>
                  {date}
                </Text>
              </View>
            ) : null}

            {/* {ratingTag ? (
                <View
                  style={[
                    styles.tagCon,
                    styles.border,
                    {flexDirection: 'row'},
                  ]}>
                  <Text
                    style={{
                      //color: colors.pureBlack,
                      color: '#26354C',
                      fontSize: RFValue(18, 812),
                    }}>
                    Rating: {ratingTag}
                  </Text>
                  <IconStar
                    name="star"
                    size={15}
                    //color={colors.pureBlack}
                    color="#26354C"
                    style={{}}
                  />
                </View>
              ) : null} */}

            {status ? (
              <View
                style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
                <Text style={[styles.tagText, {color: types[type].solid}]}>
                  {status}
                </Text>
              </View>
            ) : null}

            {timeTag ? (
              <View style={[styles.tagCon, styles.border]}>
                <Text style={[styles.tagText, styles.secondText]}>
                  {timeTag}
                </Text>
              </View>
            ) : null}

            {jobDetails ? (
              <View>
                <View style={[styles.tagCon, styles.border]}>
                  <View>
                    <Text style={[styles.tagText, styles.secondText]}>
                      Job Details
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            {findTalent ? (
              <TouchableOpacity>
                <View style={[styles.tagCon, styles.border]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('JobsClient', {open: 4})
                    }>
                    <Text style={[styles.tagText, styles.secondText]}>
                      Find Staff
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          {rate === 'true' ? (
            <View style={{alignItems: 'flex-start'}}>
              <Rating
                ratingCount={5}
                type="custom"
                style={{paddingVertical: 10}}
                ratingColor="#24334C"
                reviewColor="blue"
                tintColor={colors.pureWhite}
                ratingBackgroundColor="#c8c7c8"
                imageSize={17}
                defaultRating={2}
                readonly={true}
              />
            </View>
          ) : null}
        </View>
        <View>
          <Image source={image} style={styles.image} />
        </View>
      </View>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

export {JobCardTalentSecondTab};
