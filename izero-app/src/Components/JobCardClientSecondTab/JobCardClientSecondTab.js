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

function JobCardClientSecondTab({
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
  live,
  jobTitle,
  shiftID,
  item,
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
          width: '90%',
          //flex: 1,
          flexDirection: 'row',
          marginBottom: heightPercentageToDP('0.5%'),
          // justifyContent: 'center',
          // alignSelf: 'center',
          // justifyContent: 'center',
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
            <View
              style={{
                //marginTop: 10
                marginTop: 6,
              }}>
              <Text style={styles.address}>Applied for:</Text>
              <Text
                style={[
                  styles.title,
                  {marginBottom: heightPercentageToDP('0.1%')},
                ]}>
                {appliedFor}
              </Text>
            </View>
          ) : null}
          {jobsCompletedLabel ? (
            <View
              style={{
                //marginTop: 10
                marginTop: 3,
              }}>
              <Text style={styles.address}>
                Jobs Completed: {jobsCompleted}
              </Text>
            </View>
          ) : null}
          {applicants ? (
            <View>
              <>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: RFValue(19, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#24334c',
                    width: widthPercentageToDP('52%'),
                  }}>
                  Shift Title: {shiftTitle + '    '}
                </Text>
                <Text style={styles.fee}>{price}</Text>
              </>
            </View>
          ) : null}
          {applicants ? null : (
            <>{price ? <Text style={styles.fee}>{price}</Text> : null}</>
          )}
          {time ? <Text style={styles.fee}>{time}</Text> : null}
          {jobTitle ? (
            <View style={{marginTop: 1}}>
              <Text style={styles.fee}>{jobTitle}</Text>
            </View>
          ) : null}
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
                // inverted={language === "en" ? false : true}
                contentContainerStyle={{alignSelf: 'flex-start'}}
                // ListFooterComponent={
                //   <>
                //     {plusSign ? (
                //       <TouchableOpacity
                //         style={{
                //           alignItems: 'center',
                //           justifyContent: 'center',
                //           width: 30,
                //           height: 30,
                //           //  position: 'absolute',
                //           top: 10,
                //           bottom: 10,
                //           right: 0,

                //           backgroundColor: colors.pureWhite,
                //           borderRadius: 30,
                //           borderWidth: 1,
                //         }}
                //         // onPress={() =>
                //         //   navigation.navigate('CreateJobClient')
                //         // }
                //       >
                //         <Icon name="plus" size={20} color="#000" />
                //       </TouchableOpacity>
                //     ) : (
                //       <View>
                //         <Text style={{marginTop: 20}}>
                //           {data.user?.avatar ? '+ 6 More' : ''}
                //         </Text>
                //       </View>
                //     )}
                //   </>
                // }
                ListEmptyComponent={<Text style={{marginBottom: -20}} />}
                renderItem={({item}) => (
                  <>
                    <TouchableOpacity
                      //onPress={() =>}}
                      style={styles.activeMainTouchContainer}>
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
                            // title="MD"

                            source={{
                              uri: item.Avatar_base64,
                            }}
                          />
                        ) : (
                          <View style={styles.addUserContainer}>
                            {/* <FontAwesome5
                              name={'user-alt'}
                              size={26}
                              color={'#909497'}
                            /> */}
                            {/* <Image source={{uri: item?.user?.avatar}}/> */}
                            <Image
                              style={{
                                width: widthPercentageToDP('10%'),
                                height: widthPercentageToDP('10%'),
                                marginBottom: heightPercentageToDP('2%'),
                              }}
                              source={{
                                uri: item?.user?.avatar,
                                //item?.user?.avatar :'../../Assets/Images/avatar.png'
                              }}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                // onEndReachedThreshold={0.01}
                // onEndReached={this.LoadMoreActiveChat}
                // ListFooterComponent={this.renderFooter.bind(this)}
                //keyExtractor={(item) => item.id}
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

            {ratingTag ? (
              <View
                style={[styles.tagCon, styles.border, {flexDirection: 'row'}]}>
                <Text
                  style={{
                    color: '#26354C',
                    fontSize: RFValue(18, 812),
                  }}>
                  Rating: {ratingTag}
                </Text>
                <IconStar name="star" size={15} color="#26354C" style={{}} />
              </View>
            ) : null}

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

            {/* {jobDetails ? (
                <TouchableOpacity
                >
                  <View style={[styles.tagCon, styles.border]}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('JobDetailsClient', {
                          jobID: jobID,
                        })
                      }>
                      <Text style={[styles.tagText, styles.secondText]}>
                        Job Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ) : null} */}

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
              <TouchableOpacity
              //  onPress={() => navigation.navigate('JobDetails')}
              >
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
          {live ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ApplicantsDetailsClient', {
                  shiftID: shiftID,
                  item: item,
                })
              }>
              <View
                style={{
                  paddingHorizontal: widthPercentageToDP('2.6%'),
                  height: heightPercentageToDP('3.2%'),
                  width: widthPercentageToDP('25%'),
                  borderRadius: 13,
                  backgroundColor: 'rgba(249, 179, 18, 0.1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: heightPercentageToDP('1%'),
                  borderWidth: 1,
                  borderColor: '#26354C',
                  backgroundColor: colors.pureWhite,
                }}>
                <Text
                  style={{
                    color: '#5b6679',
                    fontFamily: 'Europa',
                    fontSize: RFValue(14, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                  }}>
                  Applicants
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {rate === 'true' ? (
            <View style={{alignItems: 'flex-start'}}>
              <Rating
                ratingCount={5}
                // showRating
                type="custom"
                //onFinishRating={ratingCompleted}
                style={{paddingVertical: 10}}
                ratingColor="#24334C"
                // selectedColor={colors.red}
                reviewColor="blue"
                tintColor={colors.pureWhite}
                ratingBackgroundColor="#c8c7c8"
                imageSize={17}
                defaultRating={2}
                readonly={true}
                // isDisabled={false}
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

export {JobCardClientSecondTab};
