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
import colors from '../../Constants/colors';

function JobCard({
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
  status,
  ratingTag,
  jobStatus,
  jobID,
  completedButton,
  rating,
  statusJob,
  checkFav,
  applied,
  checkIn,
  jobTitle,
  shiftTitle,
  item,
  dateCheckIn,
  jwt,
  clockedout
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

  const checOut = async () => {
    try {
      let data = new FormData();
      data.append('job_id', jobID);
      data.append('status', 'check_out');
      let res = await Api.post('/check_in_out', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Check Out API response', res);
    } catch (error) {
      console.log({error});
    }
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
          <Text
            style={[
              styles.title,
              {marginBottom: heightPercentageToDP('0.3%')},
            ]}>
            {title}
          </Text>
          {jobStatus === 'Completed' && completedButton == true ? (
            <View
              style={[
                styles.tagCon,
                {backgroundColor: '#3DB460', width: '50%', marginTop: null},
              ]}>
              <Text style={[styles.tagText, {color:colors.pureWhite}]}>{jobStatus}</Text>
            </View>
          ) : null}
          {designation ? (
            <Text style={styles.designation}>{designation}</Text>
          ) : null}
          {appliedFor ? (
            <View style={{marginTop: 10}}>
              <Text style={styles.address}>Applied For</Text>
              <Text
                style={[
                  styles.title,
                  {marginBottom: heightPercentageToDP('0.1%')},
                ]}>
                {appliedFor}
              </Text>
            </View>
          ) : null}
          {jobsCompleted ? (
            <View style={{marginTop: 10}}>
              <Text style={styles.address}>
                Jobs Completed: {jobsCompleted}
              </Text>
            </View>
          ) : null}
          {jobTitle ? (
            <View style={{marginTop: 1}}>
              <Text style={styles.fee}>{jobTitle}</Text>
            </View>
          ) : null}
          {price ? (
            <View style={{marginTop: 1}}>
              <Text style={styles.fee}>{price}</Text>
            </View>
          ) : null}
          {shiftTitle ? (
            <View style={{marginTop: 1}}>
              <Text style={styles.fee}>Shift Title: {shiftTitle}</Text>
            </View>
          ) : null}

          {time ? (
            <View style={{marginTop: 1}}>
              <Text style={styles.fee}>Shift Time: {time}</Text>
            </View>
          ) : null}
          {address ? (
            <View style={{marginTop: 5}}>
              <Text
                style={[
                  styles.address,
                  {
                    flex: 1,
                    //width: widthPercentageToDP('68%')
                  },
                ]}>
                {address}
              </Text>
            </View>
          ) : null}

          {data ? (
            <View>
              <Text style={[styles.title, {marginBottom: null}]}>Staff</Text>
              <FlatList
                horizontal={true}
                data={data}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // inverted={language === "en" ? false : true}
                contentContainerStyle={{alignSelf: 'flex-start'}}
                ListFooterComponent={
                  <View>
                    <Text style={{marginTop: 12}}>+ 6 More</Text>
                  </View>
                }
                renderItem={({item}) => (
                  <TouchableOpacity
                    //   onPress={() =>}
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
                          <FontAwesome5
                            name={'user-alt'}
                            size={26}
                            color={'#909497'}
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                // onEndReachedThreshold={0.01}
                // onEndReached={this.LoadMoreActiveChat}
                // ListFooterComponent={this.renderFooter.bind(this)}
                //keyExtractor={(item) => item.id}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}

          {rate === 'true' ? (
            <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
              <Text
                style={[
                  styles.fee,
                  {
                    width: widthPercentageToDP('14%'),
                  },
                ]}>
                Rated:
              </Text>
              <Rating
                ratingCount={5}
                // showRating
                type="custom"
                onFinishRating={rating}
                style={{paddingVertical: 4}}
                ratingColor="#24334C"
                // selectedColor={colors.red}
                reviewColor="blue"
                tintColor={colors.pureWhite}
                ratingBackgroundColor="#c8c7c8"
                imageSize={17}
                defaultRating={5}
                readonly={true}
                // isDisabled={false}
              />
            </View>
          ) : null}

          {applied ? (
            <View style={styles.row}>
              <View
                style={[
                  styles.tagCon,
                  {
                    backgroundColor: colors.pureWhite,
                    borderWidth: 1,
                    borderColor: '#F9B312',
                  },
                ]}>
                <Text style={[styles.tagText, {color: '#F9B312'}]}>
                  {'Awaiting'}
                </Text>
              </View>
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
                    color: colors.pureBlack,

                    fontSize: RFValue(18, 812),
                  }}>
                  Rating: {ratingTag}
                </Text>
                <IconStar name="star" size={15} color={colors.pureBlack} style={{}} />
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
                  onPress={() =>
                    navigation.navigate('JobDetailsTalent', {
                      jobID: jobID,
                      statusJob: statusJob,
                      checkFav: checkFav,
                    })
                  }
                  >
                  <View style={[styles.tagCon, styles.border]}>
                    <Text style={[styles.tagText, styles.secondText]}>
                      Job Details
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null} */}

            {jobDetails ? (
              <View>
                <View style={[styles.tagCon, styles.border]}>
                  <Text style={[styles.tagText, styles.secondText]}>
                    Job Details
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          {checkIn && statusJob === 'live' ? (
            <TouchableHighlight
              underlayColor=""
              onPress={() =>
                navigation.navigate('QRCodeScan', {jobID: jobID, item: item})
              }>
              <View
                style={{
                  width: 100,
                }}>
                <View style={[styles.tagCon, styles.border]}>
                  <Text style={[styles.tagText, styles.secondText]}>
                    Check In
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ) : null}
          <View style={{
            //flexDirection: 'row'
        }}>
            {checkIn ? null : (
              <View
                style={{
                  width: 210,
                }}>
                <View style={[styles.tagCon, styles.border]}>
                  <Text style={[styles.tagText, styles.secondText]}>
                    {'Clocked In: ' + dateCheckIn}
                  </Text>
                </View>
              </View>
            )}

            {clockedout? (
              <TouchableHighlight underlayColor="" onPress={() => checOut()}>
                <View
                  style={{
                    width: 210,
                  }}>
                  <View style={[styles.tagCon, styles.border]}>
                    <Text style={[styles.tagText, styles.secondText]}>
                      {'Clocked Out:'+ clockedout}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            ) : null}
          </View>
        </View>
        <View>
          <Image source={image} style={styles.image} />
        </View>
      </View>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

export {JobCard};
