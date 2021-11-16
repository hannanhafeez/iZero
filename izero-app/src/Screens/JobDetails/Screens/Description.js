import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, Button, AuthInput} from '../../../Components';
import {widthConverter, heightConverter} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../../api/index';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CheckIcon from 'react-native-vector-icons/FontAwesome';

import IconCross from 'react-native-vector-icons/Entypo';

import MapView, {Marker} from 'react-native-maps';
import colors from '../../../Constants/colors';

export default function Description({route}) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state.auth.accessToken);
  const [aboutJob, setAboutJob] = useState('');
  const [totoalShift, setTotoalShift] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDate, setJobDate] = useState('');

  const [jobLat, setJobLat] = useState('');
  const [jobLong, setJobLong] = useState('');

  const [vissibleRatingView, setVissibleRatingView] = useState(false);

  const [vissibleShiftDetails, setVissibleShiftDetails] = useState(false);

  const [shifts, setShifts] = useState([]);

  const [selected, setSelected] = useState(-1);

  let data = route?.params;
  let jobID = data.jobID;
  let statusJob = data.statusJob;

  console.log('route?.params', route?.params);

  useEffect(() => {
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/job_detail?job_id=${jobID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Description for Staff side job details', res);
      setLoading(true);
      setAboutJob(res?.data?.data?.description);
      setTotoalShift(res?.data?.data?.shifts?.length);
      setJobDate(res?.data?.data?.expiry_date);
      setJobLocation(res?.data?.data?.location);
      setJobLat(res?.data?.data?.lat);
      setJobLong(res?.data?.data?.lng);
      setShifts(res?.data?.data?.shifts);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const jobDetailsFunc = (index) => {
    setVissibleShiftDetails(true);
    setSelected(index);
  };

  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        {loading == false ? (
          <View style={{flex: 1, marginTop: 30}}>
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            {statusJob === 'completed' ? (
              <View
                style={{
                  backgroundColor: '#3DB460',
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingHorizontal: widthPercentageToDP('2.6%'),
                  height: heightPercentageToDP('3.2%'),
                  borderRadius: 13,
                  alignItems: 'center',
                  marginTop: heightPercentageToDP('0%'),
                  marginBottom: heightPercentageToDP('1%'),
                  marginRight: widthPercentageToDP('2%'),
                  marginLeft: '8%',
                }}>
                <Text style={[styles.tagText, {color: colors.pureWhite}]}>Completed</Text>
                <CheckIcon
                  name="check"
                  size={15}
                  color={colors.pureWhite}
                  style={{marginLeft: 5}}
                />
              </View>
            ) : null}

            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                About Job
              </Text>
              <Text style={styles.textContent}>{aboutJob}</Text>
            </View>

            <View style={[styles.second, {marginBottom: heightConverter(0)}]}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(0)},
                ]}>
                Shift's
              </Text>
            </View>

            <FlatList
              data={shifts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View
                      style={{
                        borderWidth: 1,
                        marginBottom: 10,
                        marginLeft: statusJob == 'search' ? 38 : 20,
                        marginRight: statusJob == 'search' ? 38 : 20,
                        borderColor: '#B6BEC7',
                        marginTop: 10,
                        borderRadius: 10,
                      }}>
                      <TouchableOpacity onPress={() => jobDetailsFunc(index)}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              marginBottom: heightConverter(5),
                              fontSize: RFValue(17, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              color: '#24334c',
                              textAlign: 'auto',
                              marginTop: 5,
                              marginLeft: 20,
                            }}>
                            Role:
                          </Text>
                          <Text
                            style={{
                              marginLeft: '10%',
                              fontFamily: 'Europa-Regular',
                              fontSize: RFValue(17, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: '#24334c',
                              textAlign: 'auto',
                              marginTop: 5,
                              marginLeft: '20%',
                            }}>
                            {item?.job_role?.title}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              marginBottom: heightConverter(5),
                              fontSize: RFValue(17, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              color: '#24334c',
                              textAlign: 'auto',
                              marginTop: 5,
                              marginLeft: 20,
                            }}>
                            Shift Fee:
                          </Text>
                          <Text
                            style={{
                              marginLeft: '10%',
                              fontFamily: 'Europa-Regular',
                              fontSize: RFValue(17, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: '#24334c',
                              textAlign: 'auto',
                              marginTop: 5,
                            }}>
                            {'£' + item?.job_fee}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa-Bold',
                              marginBottom: heightConverter(5),
                              fontSize: RFValue(17, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              color: '#24334c',
                              textAlign: 'auto',
                              marginTop: 5,
                              marginLeft: 20,
                            }}>
                            Shift Date:
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Europa-Regular',
                              fontSize: RFValue(17, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: '#24334c',
                              textAlign: 'auto',
                              marginTop: 5,
                              marginLeft: '5%',
                            }}>
                            {'  '}
                            {item?.start_date && item?.end_date
                              ? item?.start_date?.substring(
                                  0,
                                  item?.start_date.length - 5,
                                ) +
                                ' - ' +
                                item?.end_date?.substring(
                                  0,
                                  item?.end_date?.length - 5,
                                )
                              : 'No Date Found'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
            />

            <Modal
              transparent
              animationType="fade"
              visible={vissibleShiftDetails}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  justifyContent: 'center',
                }}>
                {/* <ScrollView style={{flex: 1}}> */}
                <View
                  style={{
                    //flex: 1,
                    width: widthPercentageToDP('85%'),
                    backgroundColor: colors.pureWhite,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    //marginTop: heightPercentageToDP('12%'),
                    //marginBottom: heightPercentageToDP('15%'),
                    paddingBottom: heightPercentageToDP('5%'),
                  }}>
                  <View
                    style={{
                      marginRight: 15,
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{marginLeft: '32%'}}>
                      <Text
                        style={{
                          fontFamily: 'Europa',
                          fontSize: 22,
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: colors.pureBlack,
                          marginTop: Platform.OS === 'ios' ? 10 : 10,
                        }}>
                        Shift Details
                      </Text>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => setVissibleShiftDetails(false)}>
                      <IconCross name="cross" size={30} color={colors.pureBlack} />
                    </TouchableWithoutFeedback>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 17,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                      }}>
                      Quantity Needed
                    </Text>
                    <TextInput
                      style={{
                        //flex: 1,
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                        //height: heightPercentageToDP('6.5%'),
                        //marginTop: Platform.OS === 'ios' ? 20 : 0,
                        fontFamily: 'Europa',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#5b6679' : '#5b6679',
                      }}
                      editable={false}
                      placeholder={shifts[selected]?.no_of_staff}
                      placeholderTextColor={colors.pureBlack}
                    />

                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 17,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                      }}>
                      Job Role
                    </Text>
                    <TextInput
                      style={{
                        //flex: 1,
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                        fontFamily: 'Europa',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#5b6679' : '#5b6679',
                      }}
                      editable={false}
                      placeholder={shifts[selected]?.job_role?.title}
                      placeholderTextColor={colors.pureBlack}
                    />

                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 17,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                      }}>
                      Job Fee
                    </Text>
                    <TextInput
                      style={{
                        //flex: 1,
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                        //marginTop: Platform.OS === 'ios' ? 20 : 0,
                        fontFamily: 'Europa',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#5b6679' : '#5b6679',
                      }}
                      editable={false}
                      placeholder={shifts[selected]?.job_fee}
                      placeholderTextColor={colors.pureBlack}
                    />

                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 17,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                      }}>
                      Date
                    </Text>
                    <TextInput
                      style={{
                        //flex: 1,
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                        // marginTop: Platform.OS === 'ios' ? 20 : 0,
                        fontFamily: 'Europa',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#5b6679' : '#5b6679',
                      }}
                      editable={false}
                      placeholder={
                        shifts[selected]?.start_date?.substring(
                          0,
                          shifts[selected]?.start_date.length - 5,
                        ) +
                        ' - ' +
                        shifts[selected]?.end_date?.substring(
                          0,
                          shifts[selected]?.end_date?.length - 5,
                        )
                      }
                      placeholderTextColor={colors.pureBlack}
                    />

                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 17,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                      }}>
                      Time
                    </Text>
                    <TextInput
                      style={{
                        //flex: 1,
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                        // marginTop: Platform.OS === 'ios' ? 20 : 0,
                        fontFamily: 'Europa',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#5b6679' : '#5b6679',
                      }}
                      editable={false}
                      placeholder={
                        shifts[selected]?.start_date?.substring(
                          0,
                          shifts[selected]?.start_date.length - 5,
                        ) +
                        ' - ' +
                        shifts[selected]?.end_date?.substring(
                          0,
                          shifts[selected]?.end_date?.length - 5,
                        )
                      }
                      placeholder={
                        shifts[selected]?.start_time &&
                        shifts[selected]?.end_time
                          ? shifts[selected]?.start_time?.substring(
                              0,
                              shifts[selected]?.start_time?.length - 3,
                            ) +
                            ' - ' +
                            shifts[selected]?.end_time?.substring(
                              0,
                              shifts[selected]?.end_time?.length - 3,
                            )
                          : 'No Shift Time'
                      }
                      placeholderTextColor={colors.pureBlack}
                    />

                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 17,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                      }}>
                      Job Role Description
                    </Text>
                    <TextInput
                      style={{
                        //flex: 1,
                        marginTop: Platform.OS === 'ios' ? 10 : 10,
                        //marginTop: Platform.OS === 'ios' ? 20 : 0,
                        fontFamily: 'Europa',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#5b6679' : '#5b6679',
                      }}
                      editable={false}
                      placeholder={shifts[selected]?.title}
                      placeholderTextColor={colors.pureBlack}
                    />
                  </View>
                </View>
                {/* </ScrollView> */}
              </View>
            </Modal>

            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                Expiry Date:
              </Text>
              <Text style={styles.textContent}>{jobDate}</Text>
            </View>

            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                Location
              </Text>
              <Text style={styles.textContent}>{jobLocation}</Text>
            </View>

            <View
              style={{
                //...StyleSheet.absoluteFillObject,
                //height: 300,
                //width: 360,
                width: '100%',
                height: heightConverter(260),
                //justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <MapView
                style={{...StyleSheet.absoluteFillObject}}
                // zoomEnabled="false"
                // zoomTapEnabled="false"
                region={{
                  latitude: jobLat !== null ? Number(jobLat) : 33.6666,
                  longitude: jobLong !== null ? Number(jobLong) : 73.071,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}>
                <Marker
                  //key={index}
                  coordinate={{
                    latitude: jobLat !== null ? Number(jobLat) : 33.6666,
                    longitude: jobLong !== null ? Number(jobLong) : 73.071,
                  }}
                  title={jobLocation}
                  description={'Location'}>
                  <Image
                    source={require('../../../Assets/Images/pinLocation.png')}
                    style={{width: 100, height: 100}}
                  />
                </Marker>
              </MapView>
            </View>

            {statusJob == 'live' ? null : statusJob == 'search' ? ( // </View> //   </View> //     /> //       height={heightConverter(28)} //       width={widthConverter(30)} //     <ChatIcon //   <View style={styles.iconCon}> //   </Button> //     CANCEL SHIFT? //     }}> //       backgroundColor: colors.pureWhite, //       borderColor: colors.darkBlue, // borderWidth: 2, // <View style={styles.sticky}> //   <Button //     textStyle={{color: colors.darkBlue}} //style={{ // width: widthConverter(261), //height: heightConverter(50), //borderRadius: widthPercentageToDP('12.8%') / 2, //marginBottom: 10,
              <View style={styles.sticky}>
                <Button
                  onPress={() =>
                    navigation.navigate('SelectShiftsTalent', {jobID: jobID})
                  }
                  textStyle={[styles.btnText, {color: colors.pureWhite}]}
                  style={{
                    width: widthConverter(261),
                    height: heightConverter(50),
                    borderRadius: widthPercentageToDP('12.8%') / 2,
                    marginBottom: 10,
                    backgroundColor: '#3EB561',
                  }}>
                  APPLY FOR JOB ROLE
                </Button>
                <View style={styles.iconCon}>
                  <ChatIcon
                    width={widthConverter(30)}
                    height={heightConverter(28)}
                  />
                </View>
              </View>
            ) : statusJob == 'completed' ? (
              <View style={styles.sticky}>
                <Button
                  onPress={() => setVissibleRatingView(true)}
                  textStyle={{color: colors.darkBlue}}
                  style={{
                    width: widthConverter(261),
                    height: heightConverter(50),
                    borderRadius: widthPercentageToDP('12.8%') / 2,
                    borderWidth: 2,
                    borderColor: colors.darkBlue,
                    backgroundColor: colors.pureWhite,
                  }}>
                  View Rating
                  <Rating
                    ratingCount={5}
                    // showRating
                    type="custom"
                    onFinishRating={5}
                    style={{paddingLeft: 10, paddingTop: 10}}
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
                </Button>
                <View style={styles.iconCon}>
                  <ChatIcon
                    width={widthConverter(30)}
                    height={heightConverter(28)}
                  />
                </View>
              </View>
            ) : null}
          </View>
        )}

        <Modal transparent animationType="fade" visible={vissibleRatingView}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              justifyContent: 'flex-end',
            }}>
            <TouchableHighlight
              onPress={() => setVissibleRatingView(false)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
                backgroundColor: '#3EB561',
                alignSelf: 'flex-end',
                marginRight: 20,
                marginBottom: -25,
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconCross name="cross" size={35} color={colors.pureWhite} />
            </TouchableHighlight>
            <View
              style={{
                // width: widthPercentageToDP('100%'),
                // height: heightPercentageToDP('30%'),
                backgroundColor: colors.pureWhite,
              }}>
              <View style={styles.second}>
                <Text
                  style={[
                    styles.textContent,
                    {
                      fontFamily: 'Europa-Bold',
                      marginBottom: heightConverter(5),
                      marginTop: 20,
                    },
                  ]}>
                  Employer Review:
                </Text>
                <Text
                  style={[
                    styles.textContent,
                    {
                      fontFamily: 'Europa-Bold',
                      marginBottom: heightConverter(5),
                      paddingTop: 10,
                    },
                  ]}>
                  Craig Wilkinson
                </Text>
                <Text style={[styles.textContent, {textAlign: 'justify'}]}>
                  {/* {aboutJob} */}
                  Craig really impressed us with his team managing skills. Would
                  most defintely book carig again for this job. Amazing staff.
                </Text>
              </View>

              <View style={styles.sticky}>
                <TouchableOpacity onPress={() => setVissibleRatingView(true)}>
                  <Button
                    textStyle={{color: colors.darkBlue}}
                    style={{
                      width: widthConverter(261),
                      height: heightConverter(50),
                      borderRadius: widthPercentageToDP('12.8%') / 2,
                      borderWidth: 2,
                      borderColor: colors.darkBlue,
                      backgroundColor: colors.pureWhite,
                    }}>
                    Close Rating
                    <Rating
                      ratingCount={5}
                      // showRating
                      type="custom"
                      onFinishRating={5}
                      style={{
                        paddingLeft: 10,

                        //paddingTop: 10
                      }}
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
                  </Button>
                </TouchableOpacity>
                <View style={styles.iconCon}>
                  <ChatIcon
                    width={widthConverter(30)}
                    height={heightConverter(28)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Container>
  );
}

{
  /* Create excitement in the brand
Participate in awareness and promotional campaigns, engaging with customers, attending events including community centres, shopping centres, outdoor events
 Customer Generation
 Follow up on leads generated at brand awareness events, drive sales whilst maintaining brand image */
}

const styles = StyleSheet.create({
  tag: {
    width: widthConverter(96),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthConverter(12),
  },
  text: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(331),
    alignSelf: 'center',
    marginTop: heightConverter(40),
    marginBottom: heightConverter(19),
  },
  outlined: {
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  second: {
    width: widthConverter(331),
    marginBottom: heightConverter(10),
    alignSelf: 'center',
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
    textAlign: 'auto',
    paddingLeft: 20,
    marginTop: 0,
  },
  sticky: {
    height: heightConverter(105),
    width: widthConverter(375),
    paddingHorizontal: widthConverter(22),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderColor: colors.darkGreyHigh,
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 5,
  },
  map: {
    width: widthConverter(375),
    height: widthConverter(232),
    marginBottom: heightConverter(19),
  },
});
