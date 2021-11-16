import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import styles from './Styles';
import Tabs from './Tabs/Tabs';

import {BackArrow, ArrowIcon, HeartIcon, HeartIcon2} from '../../Assets/Icons';
import {Ovaltwo} from '../../Assets/Graphics/Ovaltwo';
import {RFValue} from 'react-native-responsive-fontsize';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../Constants/colors';

import Api from '../../api/index';
import types from '../../Redux/types';
import {useDispatch, useSelector} from 'react-redux';

export default function JobDetailsTalent({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const jobDetails = useSelector((state) => state?.app?.jobDetails);

  const isFocused = useIsFocused();

  const [loadingFavUnFav, setLoadingFavUnFav] = useState(true);

  const [jobName, setJobName] = useState(jobDetails?.job?.title);
  const [jobAddress, setJobAddress] = useState(jobDetails?.job?.title);

  const [jobFee, setJobFee] = useState(jobDetails?.job_fee);

  const [jobUsers, setJobUsers] = useState(jobDetails?.job_users);
  const [avatar, setAvatar] = useState(jobDetails?.logo);
  const [status, setStatus] = useState(jobDetails?.is_favorite);

  const [selected, setSelected] = useState(false);

  const [checkJobDetails, setCheckJobDetails] = useState(true);

  console.log('jobDetails', jobDetails);

  let data = route?.params;
  
  let shiftID = data?.shiftID;
  let jobID = data?.jobID;
  let statusJob = data?.statusJob;
  let jwtTocken = data?.jwt;

  useEffect(() => {
    console.log('JobDetailsTalent');
    //getJobDetails();
  }, [isFocused]);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/jobshiftdetail?id=${shiftID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Job Details API For Staff Side res', res);
      setLoading(true);

      setJobName(res?.data?.data?.job?.title);
      setJobFee(res?.data?.data?.job_fee);
      setJobAddress(res?.data?.data?.job?.title);

      setJobUsers(res?.data?.data?.job_users);
      setAvatar(res?.data?.data?.logo);
      setStatus(res?.data?.data?.is_favorite);

      dispatch({
        type: types?.JOB_DETAILS,
        jobDetails: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const favAdd = async () => {
    setLoadingFavUnFav(false);
    try {
      let data = new FormData();
      data.append('job_id', shiftID);
      data.append('status', 1);
      let res = await Api.post('/fav_unfav_job', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Fav api response', res);
      setLoadingFavUnFav(true);
      Alert.alert('', 'You have successfully added job in favourite list', [
        {
          text: 'OK',
          onPress: () => getJobDetails(),
        },
      ]);
    } catch (error) {
      setLoadingFavUnFav(true);
      alert('Something went wrong please try again latter');
      console.log({error});
    }
  };

  const unFavAdd = async () => {
    setLoadingFavUnFav(false);
    try {
      let data = new FormData();
      data.append('job_id', shiftID);
      data.append('status', 0);
      let res = await Api.post('/fav_unfav_job', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Un fav api response', res);
      setLoadingFavUnFav(true);
      Alert.alert('', 'You have successfully removed job from favourite list.', [
        {
          text: 'OK',
          onPress: () => getJobDetails(),
        },
      ]);
    } catch (error) {
      console.log({error});
      setLoadingFavUnFav(true);
      alert('Something went wrong please try again latter');
    }
  };

  return (
    <Container>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightConverter(329),
        }}>
        <Ovaltwo
          height={heightConverter(170)}
          width={widthConverter(375)}
          color={'#24334c'}
        />
        <View
          style={{
            backgroundColor: 'null',
            position: 'absolute',
          }}>
          <View
            style={{
              width: widthPercentageToDP('100%'),
              paddingHorizontal: widthPercentageToDP('5.8%'),
              paddingTop: heightConverter(100),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                backgroundColor: colors.pureWhite,
                shadowColor: 'rgba(0, 0, 0, 0.07)',
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#efefef',
                borderRadius: widthPercentageToDP('12%') / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ArrowIcon
                style={{
                  transform: [{rotate: '180deg'}],
                }}
                color={'#24334c'}
              />
            </TouchableOpacity>
            <View
              style={{
                width: widthPercentageToDP('22%'),
                height: widthPercentageToDP('22%'),
                backgroundColor: colors.pureWhite,
                shadowColor: 'rgba(36, 51, 76, 0.14)',
                shadowOffset: {
                  width: 0,
                  height: 11,
                },
                shadowRadius: 22,
                shadowOpacity: 1,
                borderRadius: widthPercentageToDP('22%') / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  borderRadius: 40,
                  width: widthPercentageToDP('21%'),
                  height: widthPercentageToDP('21%'),
                }}
                source={
                  avatar
                    ? {uri: avatar}
                    : require('../../Assets/Demo/Logo1.png')
                }
              />
            </View>

            <>
              {status == false ? (
                <TouchableOpacity
                  disabled={loadingFavUnFav == false ? true : false}
                  onPress={() => favAdd()}>
                  <View
                    style={{
                      width: widthPercentageToDP('12%'),
                      height: widthPercentageToDP('12%'),
                      backgroundColor: colors.pureWhite,
                      shadowColor: 'rgba(0, 0, 0, 0.07)',
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1,
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderColor: '#efefef',
                      borderRadius: widthPercentageToDP('12%') / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {loadingFavUnFav == false ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      <HeartIcon />
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={loadingFavUnFav == false ? true : false}
                  onPress={() => unFavAdd()}>
                  <View
                    style={{
                      width: widthPercentageToDP('12%'),
                      height: widthPercentageToDP('12%'),
                      backgroundColor: colors.pureWhite,
                      shadowColor: 'rgba(0, 0, 0, 0.07)',
                      shadowOffset: {
                        width: 1,
                        height: 3,
                      },
                      shadowRadius: 5,
                      shadowOpacity: 1,
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderColor: '#efefef',
                      borderRadius: widthPercentageToDP('12%') / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {loadingFavUnFav == false ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      //  <HeartIcon2 />
                      <Image
                        style={{
                          borderRadius: 30,
                          width: 30,
                          height: 30,
                        }}
                        source={require('../../Assets/Images/fav.png')}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </>
          </View>
          <Text
            style={{
              color: '#24334c',
              fontFamily: 'Europa-Bold',
              fontSize: RFValue(20, 812),
              fontWeight: 'bold',
              fontStyle: 'normal',
              letterSpacing: 0,
              textAlign: 'center',
              marginTop: 25,
            }}>
            {jobName}
          </Text>
          <Text
            style={{
              color: '#24334c',
              fontFamily: 'Europa',
              fontSize: RFValue(18, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0,
              textAlign: 'center',
            }}>
            {'Fee: £ ' + jobFee}
          </Text>
          {/* <Text
            style={{
              color: colors.darkGreyHigh,
              fontFamily: 'Europa',
              fontSize: RFValue(18, 812),
              fontWeight: 'normal',
              fontStyle: 'normal',
              lineHeight: 24,
              letterSpacing: 0,
              textAlign: 'center',
              width: widthPercentageToDP('60%'),
              alignSelf: 'center',
              marginTop: 5,
            }}>
            {jobAddress}
          </Text> */}
          {checkJobDetails ? (
            <Text style={[styles.address, {color: colors.pureWhite}]}></Text>
          ) : (
            <Text style={[styles.address, {color: colors.darkGreyHigh}]}>
              {/* {'Jobs Completed' + ' ' + jobCompleted} */}
            </Text>
          )}
        </View>
      </View>
      <Tabs
        shiftID={shiftID}
        jobID={jobID}
        statusJob={statusJob}
        jwtTocken={jwtTocken}
      />
    </Container>
  );
}
