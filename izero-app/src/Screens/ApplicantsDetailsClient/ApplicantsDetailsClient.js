import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
  JobCardClientSecondTab,
} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import styles from './Styles';
import Tabs from './Tabs/Tabs';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api/index';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

export default function ApplicantsDetailsClient({navigation, route}) {
  let data = route?.params;
  let shiftID = data?.shiftID;
  let shiftDetails = data?.item;
  
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state.auth.accessToken);
  const [jobName, setJobName] = useState('');
  const [jobAddress, setJobAddress] = useState('');
  const [shift, setShift] = useState(data?.item);

  const [jobUsers, setJobUsers] = useState([]);

  const [vissibleDeclined, setVissibleDeclined] = useState(false);
  const [vissibleAccept, setVissibleAccept] = useState(false);

  useEffect(() => {
    console.log('ApplicantsDetailsEmployer');
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/job_applicants?job_shift_id=${shiftID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Applicants for this Shift API res', res);
      setLoading(true);
      setJobUsers(res?.data?.data);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const acceptFunc = async (item) => {
    setVissibleAccept(true);
    let id = item?.id;
    try {
      let data = new FormData();
      data.append('ID', id);
      data.append('status', 1);
      let res = await Api.post('/accept_reject_application', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Accept Shift api response', res);
      setVissibleAccept(false);
      Alert.alert('', 'You have accepted shift successfully.', [
        {
          text: 'OK',
          onPress: () => getJobDetails(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setVissibleAccept(false);
      alert('Something went wrong please try again latter');
    }
  };

  const declinedFunc = async (item) => {
    setVissibleDeclined(true);
    let id = item?.id;
    try {
      let data = new FormData();
      data.append('ID', id);
      data.append('status', 0);
      let res = await Api.post('/accept_reject_application', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Declined Shift api response', res);
      setVissibleDeclined(false);
      Alert.alert('', 'You have declined shift successfully.', [
        {
          text: 'OK',
          onPress: () => getJobDetails(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setVissibleDeclined(false);
      alert('Something went wrong please try again latter');
    }
  };

  const EmptyComponent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        No applicants found yet
      </Text>
    </View>
  );

  return (
    <Container>
      <DetailsHeader
        checkJobDetails={true}
        name={shift?.job?.title}
        address={jobAddress}
        fee={shift?.total_pay}
        onBack={() => navigation.goBack()}
      />
      <ScrollView>
        {loading == false ? (
          <View style={{flex: 1, marginTop: 30}}>
            <ActivityIndicator size="large" color={colors.darkBlueHigh}/>
          </View>
        ) : (
          <>
            <FlatList
              data={jobUsers}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => EmptyComponent()}
              renderItem={({item, index}) => {
                let check = false;
                return (
                  <>
                    <View
                      style={{
                        borderBottomWidth: 0,
                        width: widthPercentageToDP('100%'),
                        paddingHorizontal: widthPercentageToDP('5.8%'),
                        paddingVertical: widthPercentageToDP('6%'),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          backgroundColor: colors.pureWhite,
                          width: widthPercentageToDP('88%'),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              width: widthPercentageToDP('2.4%'),
                              height: widthPercentageToDP('2.4%'),
                              borderRadius: widthPercentageToDP('2.4%') / 2,
                              backgroundColor: '#3eb561',
                              marginRight: widthPercentageToDP('3.4%'),
                              marginTop: heightPercentageToDP('1.1%'),
                              backgroundColor: '#3eb561',
                            }}
                          />
                          <View>
                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(20, 812),
                                  fontWeight: 'bold',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  marginBottom: heightPercentageToDP('0.5%'),
                                }}>
                                {item?.name}
                              </Text>
                            </View>

                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Europa',
                                  fontSize: RFValue(18, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',

                                  color: '#24334c',
                                }}>
                                Shift Title: {shift?.title}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Europa',
                                  fontSize: RFValue(18, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                }}>
                                Shift Fee: {'£' + shift?.total_pay}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginBottom: heightPercentageToDP('0.5%'),
                              }}>
                              <View
                                style={{
                                  paddingHorizontal: widthPercentageToDP(
                                    '2.6%',
                                  ),
                                  height: heightPercentageToDP('3.2%'),
                                  borderRadius: 13,
                                  backgroundColor: 'rgba(62, 181, 97, 0.2)',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginTop: heightPercentageToDP('1.1%'),
                                  marginRight: widthPercentageToDP('3%'),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa',
                                    fontSize: RFValue(14, 812),
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: '#3eb561',
                                  }}>
                                  {shift?.start_date?.substring(
                                    0,
                                    shift?.start_date?.length - 4,
                                  ) +
                                    ' - ' +
                                    shift?.end_date?.substring(
                                      0,
                                      shift?.end_date?.length - 4,
                                    )}
                                </Text>
                              </View>
                              <View
                                style={{
                                  paddingHorizontal: widthPercentageToDP(
                                    '2.6%',
                                  ),
                                  height: heightPercentageToDP('3.2%'),
                                  borderRadius: 13,
                                  backgroundColor: 'rgba(249, 179, 18, 0.1)',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginTop: heightPercentageToDP('1.1%'),
                                  marginRight: widthPercentageToDP('3%'),
                                  borderColor: '#26354C',
                                  backgroundColor: colors.pureWhite,
                                  borderWidth: 1,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa',
                                    fontSize: RFValue(14, 812),
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: '#5b6679',
                                  }}>
                                  {shift?.start_time?.substring(
                                    0,
                                    shift?.start_time?.length - 3,
                                  ) +
                                    ' - ' +
                                    shift?.end_time?.substring(
                                      0,
                                      shift?.end_time?.length - 3,
                                    )}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              alignItems: 'flex-end',
                              flex: 1,
                            }}>
                            <Image
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                              source={{
                                uri: item?.avatar,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingVertical: widthPercentageToDP('0%'),
                        paddingHorizontal: widthPercentageToDP('0%'),
                        paddingLeft: widthPercentageToDP('0%'),
                        paddingRight: widthPercentageToDP('0%'),
                        flexDirection: 'row',
                        borderBottomWidth: 0.3,
                        borderBottomColor: colors.darkGreyHigh,
                        borderTopWidth: 0.3,
                        borderTopColor: colors.darkGreyHigh,
                        width: widthPercentageToDP('100%'),
                      }}>
                      
                        <TouchableOpacity
                          style={{
                            paddingVertical: widthPercentageToDP('4%'),
                            paddingHorizontal: widthPercentageToDP('15%'),
                          }}
                          onPress={() => acceptFunc(item)}>
                          <Text style={[styles.title, {color: '#44B766'}]}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                      
                      <View
                        style={{
                          width: 0.5,
                          backgroundColor: colors.darkGreyHigh,
                          height: widthPercentageToDP('14.8%'),
                          marginLeft: widthPercentageToDP('50'),
                          position: 'absolute',
                        }}
                      />

                      
                        <TouchableHighlight
                          style={{
                            paddingVertical: widthPercentageToDP('4%'),
                            paddingHorizontal: widthPercentageToDP('22%'),
                          }}
                          onPress={() => declinedFunc(item)}>
                          <Text style={styles.title}>Decline</Text>
                        </TouchableHighlight>
                      </View>
                    
                  </>
                );
              }}
            />

            <Modal transparent animationType="fade" visible={vissibleAccept}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '20%',
                    backgroundColor: colors.pureWhite,
                    borderRadius: 4,
                    paddingTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text>Accepting Shift...</Text>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal transparent animationType="fade" visible={vissibleDeclined}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '20%',
                    backgroundColor: colors.pureWhite,
                    borderRadius: 4,
                    paddingTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text>Declining Shift...</Text>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
