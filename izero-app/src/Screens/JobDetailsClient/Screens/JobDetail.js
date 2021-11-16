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
  Linking,
  Platform,
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

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Calender from 'react-native-vector-icons/AntDesign';
import colors from '../../../Constants/colors';

export default function Description({route, props}) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const jobDetails = useSelector((state) => state?.app?.jobDetails);

  const [aboutJob, setAboutJob] = useState(jobDetails?.job?.title);

  const [jobTitle, setJobTitle] = useState(jobDetails?.job?.title);

  const [vissibleRatingView, setVissibleRatingView] = useState(false);

  const [vissibleShiftDetails, setVissibleShiftDetails] = useState(false);

  const [shifts, setShifts] = useState([1]);

  const [shiftTitle, setShiftTitle] = useState(jobDetails?.job_role?.title);

  const [shiftFee, setShiftFee] = useState(jobDetails?.job_fee);

  const [shiftStartDate, setShiftStartDate] = useState(jobDetails?.start_date);

  const [shiftEndDate, setShiftEndDate] = useState(jobDetails?.end_date);

  const [shiftFinalDate, setShiftFinalDate] = useState(
    jobDetails?.start_date?.substring(0, jobDetails?.start_date?.length - 5) +
      ' - ' +
      jobDetails?.end_date?.substring(0, jobDetails?.end_date?.length - 5),
  );

  const [shiftStartTime, setShiftStartTime] = useState(jobDetails?.start_time);
  const [shiftEndTime, setShiftEndTime] = useState(jobDetails?.end_time);

  const [shiftFinalTime, setShiftFinalTime] = useState(
    jobDetails?.start_time && jobDetails?.end_time
      ? jobDetails?.start_time?.substring(
          0,
          jobDetails?.start_time?.length - 3,
        ) +
          ' - ' +
          jobDetails?.end_time?.substring(0, jobDetails?.end_time?.length - 3)
      : 'No Shift Time',
  );

  const [shiftStaffNeeded, setShiftStaffNeeded] = useState(
    jobDetails?.no_of_staff,
  );

  const [shiftRoleDescription, setShiftRoleDescription] = useState(jobDetails?.title);
  const [shiftLocation, setShiftLocation] = useState(jobDetails?.address_data);
  const [shiftLat, setShiftLat] = useState(Number(jobDetails?.latitude));
  const [shiftLong, setShiftLong] = useState(Number(jobDetails?.longitude));
  const [selected, setSelected] = useState(-1);

  let data = route?.params;
  let jobID = data.jobID;
  let shiftID = data?.shiftID;
  let statusJob = data?.statusJob;

  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${shiftLat},${shiftLong}`;
  const label = shiftLocation;

  useEffect(() => {
    //getJobDetails();
  }, []);

  // const getJobDetails = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get(`/jobshiftdetail?id=${shiftID}`, {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Description for Employer side job details', res);
  //     setLoading(true);

  //     setJobTitle(res?.data?.data?.job?.title);
  //     setAboutJob(res?.data?.data?.job?.title);

  //     setShiftTitle(res?.data?.data?.job_role?.title);
  //     setShiftFee(res?.data?.data?.job_fee);
  //     setShiftStartDate(res?.data?.data?.start_date);
  //     setShiftEndDate(res?.data?.data?.end_date);

  //     setShiftLocation(res?.data?.data?.address_data);

  //     setShiftLat(Number(res?.data?.data?.latitude));
  //     setShiftLong(Number(res?.data?.data?.longitude));

  //     setShiftStaffNeeded(res?.data?.data?.no_of_staff);
  //     setShiftStartTime(res?.data?.data?.start_time);
  //     setShiftEndTime(res?.data?.data?.end_time);
  //     setShiftFinalTime(
  //       res?.data?.data?.start_time && res?.data?.data?.end_time
  //         ? res?.data?.data?.start_time?.substring(
  //             0,
  //             res?.data?.data?.start_time?.length - 3,
  //           ) +
  //             ' - ' +
  //             res?.data?.data?.end_time?.substring(
  //               0,
  //               res?.data?.data?.end_time?.length - 3,
  //             )
  //         : 'No Shift Time',
  //     );

  //     setShiftFinalDate(
  //       res?.data?.data?.start_date?.substring(
  //         0,
  //         res?.data?.data?.start_date?.length - 5,
  //       ) +
  //         ' - ' +
  //         res?.data?.data?.end_date?.substring(
  //           0,
  //           res?.data?.data?.end_date?.length - 5,
  //         ),
  //     );
  //     setShiftRoleDescription(res?.data?.data?.title);
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  const jobDetailsFunc = () => {
    setVissibleShiftDetails(true);
    //setSelected(index);
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, width: '100%'}}>
        {loading == false ? (
          <View style={{flex: 1, marginTop: 30}}>
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          </View>
        ) : (
          <View style={{width: '100%'}}>
            <View
              style={{
                marginTop: 10,
              }}>
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
                  <Text style={[styles.tagText, {color: colors.pureWhite}]}>
                    Completed
                  </Text>
                  <CheckIcon
                    name="check"
                    size={15}
                    color={colors.pureWhite}
                    style={{marginLeft: 5}}
                  />
                </View>
              ) : null}

              <View
                style={{
                  flex: 1,
                  width: '85%',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[styles.textContent, {fontFamily: 'Europa-Bold'}]}>
                    About Job
                  </Text>
                </View>

                <View
                  style={{
                    marginBottom: heightConverter(0),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Europa-Bold',
                      marginBottom: heightConverter(0),
                    }}>
                    Shift
                  </Text>
                  <Text style={{textAlign: 'justify'}}>{aboutJob}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  width: '85%',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => jobDetailsFunc()}
                    style={{
                      borderWidth: 1,
                      width: '100%',
                      borderRadius: 20,
                      borderColor: '#d5d7dc',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        marginBottom: heightConverter(5),
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(14, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          color: '#24334c',
                          textAlign: 'auto',
                          marginTop: 5,
                          marginLeft: 10,
                        }}>
                        Role:
                      </Text>
                      <Text
                        style={{
                          marginLeft: '10%',
                          fontFamily: 'Europa-Regular',
                          fontSize: RFValue(14, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#24334c',
                          textAlign: 'auto',
                          marginTop: 5,
                          marginLeft: 10,
                        }}>
                        {shiftTitle}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderColor: '#3eb561',
                        borderWidth: 0.5,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(14, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          color: '#24334c',
                          textAlign: 'auto',
                          marginTop: 5,
                          marginLeft: 10,
                        }}>
                        Shift Fee:
                      </Text>
                      <Text
                        style={{
                          marginLeft: '10%',
                          fontFamily: 'Europa-Regular',
                          fontSize: RFValue(14, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#24334c',
                          textAlign: 'auto',
                          marginTop: 5,
                          marginLeft: 20,
                        }}>
                        {'£' + shiftFee}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderColor: '#3eb561',
                        borderWidth: 0.5,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(14, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          color: '#24334c',
                          textAlign: 'auto',
                          marginTop: 5,
                          marginLeft: 10,
                        }}>
                        Date:
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Europa-Regular',
                          fontSize: RFValue(14, 812),
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#24334c',
                          textAlign: 'auto',
                          marginTop: 7,
                          marginLeft: '5%',
                        }}>
                        {shiftStartDate && shiftEndDate
                          ? shiftStartDate?.substring(
                              0,
                              shiftStartDate?.length - 5,
                            ) +
                            ' - ' +
                            shiftEndDate?.substring(0, shiftEndDate?.length - 5)
                          : 'No Date Found'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* </>
                );
              }}
            /> */}
              </View>

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
                  <View
                    style={{
                      height:
                        Platform.OS === 'ios'
                          ? heightPercentageToDP(65)
                          : heightPercentageToDP(80),
                      backgroundColor: colors.pureWhite,
                      width: widthPercentageToDP('85%'),
                      borderWidth: 5,
                      borderColor: '#24334c',
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      bounces={true}
                      style={{
                        flex: 1,
                      }}>
                      {Platform.OS === 'ios' ? (
                        <TouchableWithoutFeedback
                          onPress={() => setVissibleShiftDetails(false)}
                          style={{
                            backgroundColor: '#24334c',
                            width: 25,
                            height: 25,
                            borderRadius: 25,
                            marginTop: 10,
                            alignSelf: 'flex-end',
                            marginRight: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}>
                          <IconCross
                            name="cross"
                            size={20}
                            color={colors.pureWhite}
                          />
                        </TouchableWithoutFeedback>
                      ) : (
                        <TouchableOpacity
                          onPress={() => setVissibleShiftDetails(false)}
                          style={{
                            backgroundColor: '#24334c',
                            width: 25,
                            height: 25,
                            borderRadius: 25,
                            marginTop: 10,
                            alignSelf: 'flex-end',
                            marginRight: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}>
                          <IconCross
                            name="cross"
                            size={20}
                            color={colors.pureWhite}
                          />
                        </TouchableOpacity>
                      )}

                      <View
                        style={{
                          width: '80%',
                          borderRadius: 80,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                          backgroundColor: '#24334c',
                          paddingBottom: 10,
                          //marginTop: 10,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 20,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            color: colors.pureWhite,
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                          }}>
                          Shift Details
                        </Text>
                      </View>

                      <View
                        style={{
                          marginTop: '10%',
                          flex: 1,
                          marginLeft: 10,
                          marginRight: 10,
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 17,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Shift Location
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            //height: Platform.OS === 'ios' ? '6%' : '7.5%',
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            alignSelf: 'center',
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios' ? '#24334c' : '#24334c',
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                          }}
                          multiline={true}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholder={
                            shiftLocation
                              ? shiftLocation
                              : 'I 8 Markaz I-8, Islamabad, Islamabad Capital Territory Pakistan'
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
                            color: '#24334c',
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Quantity Needed
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            height: Platform.OS === 'ios' ? '6%' : '7.5%',
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            alignSelf: 'center',
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios' ? '#24334c' : '#24334c',
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                          }}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholder={shiftStaffNeeded}
                          placeholderTextColor={colors.pureBlack}
                        />

                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 17,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Shift Role
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            alignSelf: 'center',
                            height: Platform.OS === 'ios' ? '6%' : '7.5%',
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios' ? '#24334c' : '#24334c',
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                          }}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholder={jobTitle}
                          placeholderTextColor={colors.pureBlack}
                        />

                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 17,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Shift Fee
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            alignSelf: 'center',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            height: Platform.OS === 'ios' ? '6%' : '7.5%',
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios' ? '#24334c' : '#24334c',
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                          }}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholder={'£' + shiftFee}
                          placeholderTextColor={colors.pureBlack}
                        />

                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 17,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Date
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            alignSelf: 'center',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            height: Platform.OS === 'ios' ? '6%' : '7.5%',
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios' ? '#24334c' : '#24334c',
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                          }}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholder={shiftFinalDate}
                          placeholderTextColor={colors.pureBlack}
                        />

                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 17,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            marginTop: Platform.OS === 'ios' ? 10 : 10,
                            marginLeft: '5%',
                          }}>
                          Time
                        </Text>
                        <TextInput
                          style={{
                            width: '90%',
                            alignSelf: 'center',
                            paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                            height: Platform.OS === 'ios' ? '6%' : '7.5%',
                            marginTop: Platform.OS === 'ios' ? 5 : 0,
                            paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                            borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                            borderBottomColor:
                              Platform.OS === 'ios' ? '#24334c' : '#24334c',
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            color: '#24334c',
                          }}
                          underlineColorAndroid="transparent"
                          editable={false}
                          placeholder={shiftFinalTime}
                          placeholderTextColor={colors.pureBlack}
                        />
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>

              <View style={{marginTop: 20}} />
              {/* <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#3eb561',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  height: 30,
                  borderRadius: 20,
                  alignSelf: 'center',
                  width: '85%',
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <Text
                  style={[
                    styles.textContent,
                    {fontFamily: 'Europa-Bold', color:colors.pureWhite},
                  ]}>
                  Expiry Date:
                </Text>
                <Text
                  style={[
                    styles.textContent,
                    {
                      color: colors.pureWhite,
                      marginLeft: 10,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {jobDate}
                </Text>
              </View> */}

              <View
                style={{
                  width: '85%',
                  height: heightConverter(260),
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                  overflow: 'hidden',
                  borderRadius: 20,
                }}>
                <MapView
                  style={{
                    ...StyleSheet.absoluteFillObject,
                  }}
                  zoomEnabled={true}
                  showsScale={true}
                  pitchEnabled={false}
                  rotateEnabled={false}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  region={{
                    latitude: shiftLat === null ? 33.716073 : shiftLat,
                    longitude: shiftLong === null ? 73.071506 : shiftLong,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: shiftLat === null ? 33.716073 : shiftLat,
                      longitude: shiftLong === null ? 73.071506 : shiftLong,
                    }}
                    title={
                      shiftLocation
                        ? shiftLocation
                        : 'I 8 Markaz I-8, Islamabad, Islamabad Capital Territory Pakistan'
                    }
                    onPress={() =>
                      // Linking.openURL(`https://www.google.de/maps/@" +
                      //     ${shiftLat ? shiftLat : 33.716073} +
                      //     "," +
                      //     ${shiftLong ? shiftLong : 73.071506} +
                      //     "?q=" +
                      //     ${
                      //       shiftLocation
                      //         ? shiftLocation
                      //         : 'I 8 Markaz I-8, Islamabad, Islamabad Capital Territory Pakistan'
                      //     }`)
                      Linking.openURL(
                        Platform.select({
                          ios: `${scheme}${label}@${latLng}`,
                          android: `${scheme}${latLng}(${label})`,
                        }),
                      )
                    }>
                    <Image
                      source={require('../../../Assets/Images/pinLocation.png')}
                      style={{width: 100, height: 100}}
                    />
                  </Marker>
                </MapView>
              </View>

              {statusJob == 'live' ? null : statusJob == 'search' ? (
                <View //style={styles.sticky}
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 20,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0.3,
                    borderColor: colors.darkGreyHigh,
                    width: '100%',
                    paddingTop: 20,
                    justifyContent: 'center',
                  }}>
                  <Button
                    onPress={() =>
                      navigation.navigate('SelectShiftsTalent', {
                        jobID: jobID,
                      })
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
                  <TouchableHighlight
                    underlayColor=""
                    onPress={() =>
                      navigation.navigate('Chat', {
                        name: user?.first_name + ' ' + user?.last_name,
                        pic: user?.avatar,
                      })
                    }>
                    <View style={styles.iconCon}>
                      <ChatIcon
                        width={widthConverter(30)}
                        height={heightConverter(28)}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              ) : statusJob == 'completed' ? (
                <View
                  //style={[styles.sticky, {width: widthPercentageToDP(100)}]}
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 20,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0.3,
                    borderColor: colors.darkGreyHigh,
                    width: '100%',
                    paddingTop: 20,
                    justifyContent: 'center',
                  }}>
                  <Button
                    onPress={() => setVissibleRatingView(true)}
                    textStyle={{color: colors.darkBlue, marginBottom: 5}}
                    style={{
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
                      style={{
                        paddingLeft: 10,
                        paddingTop: 10,
                      }}
                      ratingColor="#24334C"
                      reviewColor="blue"
                      tintColor={colors.pureWhite}
                      ratingBackgroundColor="#c8c7c8"
                      imageSize={17}
                      defaultRating={5}
                      readonly={true}
                      // isDisabled={false}
                    />
                  </Button>
                  <TouchableHighlight
                    underlayColor=""
                    style={{marginLeft: 10}}
                    onPress={() =>
                      navigation.navigate('Chat', {
                        name: user?.first_name + ' ' + user?.last_name,
                        pic: user?.avatar,
                      })
                    }>
                    <View style={styles.iconCon}>
                      <ChatIcon
                        width={widthConverter(30)}
                        height={heightConverter(28)}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              ) : null}
            </View>
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
                <TouchableHighlight
                  underlayColor=""
                  onPress={() =>
                    navigation.navigate('Chat', {
                      name: user?.first_name + ' ' + user?.last_name,
                      pic: user?.avatar,
                    })
                  }>
                  <View style={styles.iconCon}>
                    <ChatIcon
                      width={widthConverter(30)}
                      height={heightConverter(28)}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Container>
  );
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
    //marginBottom: heightConverter(10),
    alignSelf: 'center',
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#24334c',
    textAlign: 'auto',
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
