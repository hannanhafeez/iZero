import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCardClientSecondTab,
  JobCardClientSearchTab,
  Heading,
  Button,
} from '../../Components';
import styles from './Styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';
import Icon from 'react-native-vector-icons/Entypo';
import IconCross from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
import {useIsFocused} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Api from '../../api';

import IconBell from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

import IconSearch from 'react-native-vector-icons/AntDesign';

export default function JobsClient({navigation, route}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadingAccept, setLoadingAccept] = useState(true);
  const [loadingReject, setLoadingReject] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const userIdMessage = useSelector((state) => state?.app?.userIdMessage);

  const talents = useSelector((state) => state?.app?.talents);
  const favorite = useSelector((state) => state?.app?.favorite);
  const applicants = useSelector((state) => state?.app?.applicants);
  const completed = useSelector((state) => state?.app?.completed);
  const live = useSelector((state) => state?.app?.live);

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  const shiftId = useSelector((state) => state?.app?.shiftId);

  const [selected, setSelected] = useState(
    route && route?.params && route?.params?.open ? route?.params?.open : 1,
  );

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const [checkStaff, setCheckStaff] = useState(false);

  const [checkApplicants, setCheckApplicants] = useState(false);

  const [vissibleDeclined, setVissibleDeclined] = useState(false);
  const [vissibleAccept, setVissibleAccept] = useState(false);

  const [search, setSearch] = useState('');

  const [searchStaff, setSearchStaff] = useState('');

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [masterJobs, setMasterJobs] = useState([]);

  const [filteredTalents, setFilteredTalents] = useState([]);
  const [masterTalents, setMasterTalents] = useState([]);

  const [filteredFinance, setFilteredFinance] = useState([]);
  const [masterFinance, setMasterFinance] = useState([]);

  const [loadingLive, setLoadingLive] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);
  const [loadingTalents, setLoadingTalents] = useState(true);
  const [loadingFavourite, setLoadingFavourite] = useState(true);

  const [nextURLLiveJobs, setNextURLLiveJobs] = useState('');
  const [nextURLCompletedJobs, setNextURLCompletedJobs] = useState('');
  const [nextURLApplicants, setNextURLApplicants] = useState('');
  const [nextURLTalents, setNextURLTalents] = useState('');
  const [nextURLFavouriteJobs, setNextURLFavouriteJobs] = useState('');

  const [filteredStaff, setFilteredStaff] = useState([]);
  const [masterStaff, setMasterStaff] = useState([]);

  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [masterApplicants, setMasterApplicants] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [loadingStaff, setLoadingStaff] = useState(true);

  useEffect(() => {
    console.log('Employer Jobs');
    setCheckSearch(false);
    setCheckStaff(false);
    //getDataFinance();
    //getSearchData();
    getLiveJobs();
    getCompletedJobs();
    getApplicantsJobs();
    getTalents();
    getFavouriteJobs();
    getSearchStaff();
    setSelected(
      route && route?.params && route?.params?.open ? route?.params?.open : 1,
    );
  }, [route?.params, isFocused]);

  const getLiveJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/live_jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Live Jobs Employer Api Response', res);
      setLoading(true);
      setNextURLLiveJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);

      dispatch({
        type: types.LIVE,
        live: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getCompletedJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/completed_jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Completed Jobs Employer Api Response', res);
      setLoading(true);
      setNextURLCompletedJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);

      dispatch({
        type: types.COMPLETED,
        completed: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getApplicantsJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/applicants', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Applicants for Employer Api Response', res);
      setLoading(true);
      setNextURLApplicants(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);

      setFilteredApplicants(res?.data?.data);
      setMasterApplicants(res?.data?.data);

      dispatch({
        type: types.APPLICANTS,
        applicants: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getTalents = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talents', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Talents for Employer Api Response', res);
      setLoading(true);
      setNextURLTalents(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);

      setFilteredStaff(res?.data?.data);
      setMasterStaff(res?.data?.data);

      dispatch({
        type: types.TALENTS,
        talents: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getTalentsSearch = async () => {
    setLoadingStaff(false);

    try {
      let res = await Api.get(`/talents?search=${searchText}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Talents for Employer Api Response', res);

      setNextURLTalents(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setFilteredStaff(res?.data?.data);
      setMasterStaff(res?.data?.data);
      dispatch({
        type: types.TALENTS,
        talents: res?.data?.data,
      });
      setLoadingStaff(true);
    } catch (error) {
      setLoadingStaff(true);
      console.log({error});
    }
  };

  const getFavouriteJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/favoritesUser', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Favourite for Employer Api Response', res);
      setLoading(true);
      setNextURLFavouriteJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(true);

      dispatch({
        type: types.FAVOURITE,
        favorite: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  // const getDataFinance = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get('/client_finance', {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Finance Api Response', res);
  //     setLoading(true);

  //     dispatch({
  //       type: types.TOTAL_SPEND,
  //       totalSpend: res?.data?.total_spent,
  //     });

  //     dispatch({
  //       type: types.TOTAL_FEE,
  //       totalFee: res?.data?.total_fee,
  //     });

  //     dispatch({
  //       type: types.OVER_VIEW,
  //       overView: res?.data?.overview,
  //     });

  //     dispatch({
  //       type: types.IN_PROGRESS,
  //       inProgress: res?.data?.in_process,
  //     });
  //     dispatch({
  //       type: types.COMPLETED_FINANCE,
  //       completedFinance: res?.data?.completed,
  //     });
  //     dispatch({
  //       type: types.EXPENSES,
  //       expenses: res?.data?.expneses,
  //     });
  //     dispatch({
  //       type: types.SAVED_QUOTES,
  //       savedQuotes: res?.data?.saved_quotes,
  //     });
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  const talentInformationBook1 = (item, check) => {
    let id = item?.id;
    navigation.navigate('TalentInformationBook', {
      id,
      check: check,
    });

    dispatch({
      type: types.SHIFT_ID,
      shiftId: '',
    });

    dispatch({
      type: types.FIND_TALENTS,
      findTalents: item?.user_sector,
    });

    dispatch({
      type: types.STAFF_DETAILS,
      staffDetails: item,
    });
  };

  const talentInformationBook2 = (item, check) => {
    let id = item?.user_id;
    navigation.navigate('TalentInformationBook', {
      id,
      check: check,
    });

    dispatch({
      type: types.SHIFT_ID,
      shiftId: '',
    });

    dispatch({
      type: types.FIND_TALENTS,
      findTalents: item?.user_sector,
    });

    dispatch({
      type: types.STAFF_DETAILS,
      staffDetails: item,
    });
  };

  const acceptFunc = async (item) => {
    //setVissibleAccept(true);
    setLoading(false);
    let id = item?.ID;
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
      //setVissibleAccept(false);
      Alert.alert('', 'You have accepted shift successfully.', [
        {
          text: 'OK',
          onPress: () => getApplicantsJobs(),
        },
      ]);
      setLoading(true);
    } catch (error) {
      console.log({error});
      //setVissibleAccept(false);
      setLoading(true);
      alert('Something went wrong please try again latter');
      getApplicantsJobs();
    }
  };

  // const declinedFunc = async (item) => {
  //   setVissibleDeclined(true);
  //   let id = item?.ID;
  //   try {
  //     let data = new FormData();
  //     data.append('ID', id);
  //     data.append('status', 0);
  //     let res = await Api.post('/accept_reject_application', data, {
  //       headers: {
  //         Accept: 'application/json',
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //     });
  //     console.log('Declined Shift api response', res);
  //     setVissibleDeclined(false);
  //     getApplicantsJobs();
  //     Alert.alert('', 'You have declined shift successfully.', [
  //       {
  //         text: 'OK',
  //         onPress: () => getApplicantsJobs(),
  //       },
  //     ]);
  //   } catch (error) {
  //     console.log({error});
  //     setVissibleDeclined(false);
  //     alert('Something went wrong please try again latter');
  //     getApplicantsJobs();
  //   }
  // };

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const searchStaffFunc = () => {
    setCheckStaff(!checkStaff);
    getSearchStaff();
  };

  const searchApplicantsFunc = () => {
    setCheckApplicants(!checkApplicants);
    getSearchApplicants();
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/search_all_data', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search Employer Api Response', res);
      setLoading(true);
      setFilteredJobs(res?.data?.jobs);
      setMasterJobs(res?.data?.jobs);

      setFilteredTalents(res?.data?.talents);
      setMasterTalents(res?.data?.talents);

      setFilteredFinance(res?.data?.finance);
      setMasterFinance(res?.data?.finance);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getSearchStaff = async () => {
    setFilteredStaff(talents);
    setMasterStaff(talents);
  };

  const getSearchApplicants = async () => {
    setFilteredApplicants(applicants);
    setMasterApplicants(applicants);
  };

  const searchFilterStaffFunction = (text) => {
    if (text) {
      const newData0 = masterStaff.filter(function (item) {
        const itemData0 =
          item?.first_name || item?.last_name
            ? item?.first_name.toUpperCase() +
              ' ' +
              item?.last_name.toUpperCase()
            : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredStaff(newData0);
      setSearch(text);
    } else {
      setFilteredStaff(masterStaff);
      setSearch(text);
    }
  };

  const searchFilterApplicantsFunction = (text) => {
    if (text) {
      const newData0 = masterApplicants.filter(function (item) {
        const itemData0 =
          item?.first_name || item?.last_name
            ? item?.first_name.toUpperCase() +
              ' ' +
              item?.last_name.toUpperCase()
            : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredApplicants(newData0);
      setSearch(text);
    } else {
      setFilteredApplicants(masterApplicants);
      setSearch(text);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData0 = masterJobs.filter(function (item) {
        const itemData0 = item?.job_role?.title
          ? item?.job_role?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredJobs(newData0);
      setSearch(text);

      const newData1 = masterTalents.filter(function (item) {
        const itemData1 =
          item.first_name && item?.user_sector?.title
            ? item.first_name.toUpperCase() +
              ' ' +
              item?.user_sector?.title.toUpperCase()
            : ''.toUpperCase();
        const textData1 = text.toUpperCase();
        return itemData1.indexOf(textData1) > -1;
      });
      setFilteredTalents(newData1);
      setSearch(text);

      const newData2 = masterFinance.filter(function (item) {
        const itemData2 = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData2 = text.toUpperCase();
        return itemData2.indexOf(textData2) > -1;
      });
      setFilteredFinance(newData2);
      setSearch(text);
    } else {
      setFilteredJobs(masterJobs);
      setFilteredTalents(masterTalents);
      setFilteredFinance(masterFinance);
      setSearch(text);
    }
  };

  const ItemViewStaff = ({item, index}) => {
    let check = true;
    return (
      <View style={styles.firstRow}>
        <JobCardClientSecondTab
          //navigation={navigation}
          onPress={() => talentInformationBook1(item, check)}
          talentID={item?.id}
          talentBook={true}
          image={{
            uri: item?.avatar
              ? item?.avatar
              : '../../Assets/Images/avatarRound.png',
          }}
          title={item?.first_name + ' ' + item?.last_name}
          designation={
            item?.user_sector?.length > 1
              ? (
                  item?.user_sector[index]?.title +
                  ' ' +
                  (item?.user_sector?.length - 1)
                ).toUpperCase() + '  OTHERS'
              : null
          }
          status={item.availability_status == '1' ? 'Available' : ''}
          ratingTag={item?.rating}
          jobsCompleted={item?.job_completed}
          jobsCompletedLabel={true}
        />
      </View>
    );
  };

  const ItemViewApplicants = ({item, index}) => {
    let check = false;
    let jobID = item?.job?.id,
      shiftID = item?.id;
    return (
      <>
        <View
          style={[
            styles.firstRow,
            {
              borderBottomWidth: 0,
            },
          ]}>
          <JobCardClientSecondTab
            onPress={() => {
              let id = item?.user_id;
              navigation.navigate('TalentInformationBook', {
                id,
                check: check,
              });

              dispatch({
                type: types.SHIFT_ID,
                shiftId: '',
              });

              dispatch({
                type: types.FIND_TALENTS,
                findTalents: item?.user_sector,
              });

              dispatch({
                type: types.STAFF_DETAILS,
                staffDetails: item,
              });
            }}
            //navigation={navigation}
            title={item?.first_name + ' ' + item?.last_name}
            image={{uri: item?.avatar}}
            appliedFor={item?.title}
            price={'Job Fee: £' + item?.total_pay}
            designation={
              item?.user_sector?.length > 0
                ? (
                    item?.user_sector[0]?.title +
                    ' ' +
                    (item?.user_sector?.length - 1)
                  ).toUpperCase() + '  OTHERS'
                : null
            }
            date={item?.start_date + ' - ' + item?.end_date}
            timeTag={
              item?.start_time?.substring(0, item?.start_time?.length - 3) +
              ' - ' +
              item?.end_time?.substring(0, item?.end_time?.length - 3)
            }
            shiftTitle={item?.job_shift_title}
            applicants={true}
          />
        </View>

        <View
          style={{
            width: widthPercentageToDP('80%'),
            height: heightPercentageToDP('5.5%'),
            borderWidth: 0.3,
            borderColor: colors.darkGreyHigh,
            borderTopWidth: 0.3,
            borderTopColor: colors.darkGreyHigh,
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: 100,

            //width: widthPercentageToDP('100%'),
            // paddingHorizontal: widthPercentageToDP('5.8%'),
            // paddingVertical: widthPercentageToDP('6%'),
            //flexDirection: 'row',
            //justifyContent: 'space-between',
            //borderBottomWidth: 0.3,
            //borderBottomColor: colors.darkGreyHigh,
            //paddingLeft:widthPercentageToDP('12%'),
            //paddingRight:widthPercentageToDP('12%'),
          }}>
          <View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => acceptFunc(item)}>
              <Text
                style={{
                  color: '#44B766',
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(18, 812),
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                }}>
                {/* Accept */} Offer this Shift
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View
              style={{
                borderLeftWidth: 0.5,
                borderColor: colors.darkGreyHigh,
              }}>
              <TouchableOpacity
                style={{
                  paddingVertical: widthPercentageToDP('6%'),
                  width: widthPercentageToDP(50),
                  alignItems: 'center',
                }}
                onPress={() => declinedFunc(item)}>
                <Text
                  style={[styles.title, {color: colors.red}]}>
                  Decline
                </Text>
              </TouchableOpacity>
            </View> */}
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.darkGreyHigh,
            width: widthPercentageToDP(100),
            marginTop: 20,
          }}
        />
      </>
    );
  };

  const ItemView0 = ({item}) => {
    let jobID = item?.job?.id,
      shiftID = item?.id,
      status = 'search';
    return (
      <>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            paddingVertical: widthPercentageToDP('6%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <JobCardClientSearchTab
            onPress={() => {
              navigation.navigate('JobDetailsClient', {
                jobID: jobID,
                shiftID: shiftID,
                status: status,
              });
              dispatch({
                type: types?.JOB_DETAILS,
                jobDetails: item,
              });
            }}
            image={{uri: item?.job?.company?.logo}}
            title={item?.job_role?.title}
            checkDate={true}
            date={
              item?.start_date && item?.end_date
                ? item?.start_date?.substring(0, item?.start_date.length - 5) +
                  ' - ' +
                  item?.end_date?.substring(0, item?.end_date?.length - 5)
                : 'No Date Found'
            }
          />
        </View>
      </>
    );
  };

  const ItemView2 = ({item}) => {
    let check = false;
    return (
      <>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            paddingVertical: widthPercentageToDP('6%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <JobCardClientSearchTab
            onPress={() => talentInformationBook2(item, check)}
            image={{uri: item?.avatar ? item?.avatar : ''}}
            title={item?.first_name + ' ' + item?.last_name}
            checkProfession={true}
            profession={item?.user_sector?.title}
          />
        </View>
      </>
    );
  };

  const ItemView3 = ({item}) => {
    return (
      <>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            paddingVertical: widthPercentageToDP('6%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <JobCardClientSearchTab
            onPress={() => navigation.navigate('FinanceDetails')}
            image={{uri: item?.company?.logo}}
            title={item?.title}
            checkJobStatus={true}
            jobStatus={true}
          />
        </View>
      </>
    );
  };

  const listEmptyComponent = () => {
    return (
      <View
        style={{
          marginTop: '60%',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(20, 812),
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
            marginBottom: heightPercentageToDP('1.1%'),
          }}>
          {filteredJobs !== '' &&
          filteredTalents !== '' &&
          filteredFinance !== ''
            ? 'No Expense Found'
            : ''}
        </Text>
      </View>
    );
  };

  const listEmptyComponentStaff = () => {
    return (
      <View
        style={{
          marginTop: '60%',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(20, 812),
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
            marginBottom: heightPercentageToDP('1.1%'),
          }}>
          {filteredStaff !== '' ? 'No staff found' : ''}
        </Text>
      </View>
    );
  };

  const listEmptyComponentApplicants = () => {
    return (
      <View
        style={{
          marginTop: '60%',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(20, 812),
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
            marginBottom: heightPercentageToDP('1.1%'),
          }}>
          {filteredApplicants !== '' ? 'No applicants found' : ''}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const LoadMoreLiveData = async () => {
    setLoadingLive(false);
    try {
      let res = await Api.get(`${nextURLLiveJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });
      console.log('Next Live Jobs Employer Api Response', res);

      setNextURLLiveJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );

      let nextData = res?.data?.data;
      let temp = live;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }
      dispatch({
        type: types.LIVE,
        live: temp,
      });
      setLoadingLive(true);
    } catch (error) {
      setLoadingLive(true);
      console.log({error});
    }
  };

  const LoadMoreCompletedData = async () => {
    setLoadingCompleted(false);
    if (!nextURLCompletedJobs == null) {
      try {
        let res = await Api.get(`${nextURLCompletedJobs}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/json',
          },
        });
        console.log('Next Completed Jobs Api Response', res);
        setNextURLCompletedJobs(
          res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
        );
        let nextData = res?.data?.data;
        let temp = completed;
        for (var v = 0; v < nextData.length; v++) {
          temp.push(nextData[v]);
        }
        console.log('Next2', temp);
        dispatch({
          type: types.COMPLETED,
          completed: temp,
        });
        setLoadingCompleted(true);
      } catch (error) {
        setLoadingCompleted(true);
        console.log({error});
      }
    }
  };

  const LoadMoreApplicantsData = async () => {
    setLoadingApplicants(false);
    try {
      let res = await Api.get(`${nextURLApplicants}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });
      console.log('Next Applicants Jobs Api Response', res);
      setNextURLApplicants(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;
      let temp = applicants;
      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }
      console.log('Next2', temp);
      dispatch({
        type: types.APPLICANTS,
        applicants: temp,
      });
      setLoadingApplicants(true);
    } catch (error) {
      setLoadingApplicants(true);
      console.log({error});
    }
  };

  const LoadMoreTalentData = async () => {
    setLoadingTalents(false);
    try {
      let res = await Api.get(`${nextURLTalents}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });
      console.log('Next Applied Jobs Api Response', res);
      setNextURLTalents(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;
      let temp = talents;
      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      dispatch({
        type: types.TALENTS,
        talents: temp,
      });
      setLoadingTalents(true);
    } catch (error) {
      setLoadingTalents(true);
      console.log({error});
    }
  };

  const LoadMoreFavouriteData = async () => {
    setLoadingFavourite(false);
    try {
      let res = await Api.get(`${nextURLFavouriteJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });
      console.log('Next Favourite Jobs Api Response', res);

      setNextURLFavouriteJobs(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      let nextData = res?.data?.data;
      let temp = favorite;

      for (var v = 0; v < nextData.length; v++) {
        temp.push(nextData[v]);
      }

      dispatch({
        type: types.FAVOURITE,
        favorite: temp,
      });
      setLoadingFavourite(true);
    } catch (error) {
      setLoadingFavourite(true);
      console.log({error});
    }
  };

  return (
    <Container safeArea>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightPercentageToDP('9%'),
          borderBottomWidth: 0.3,
          borderBottomColor: colors.darkGreyHigh,
          width: widthPercentageToDP('100%'),
          paddingHorizontal: widthPercentageToDP('5.8%'),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {checkSearch == false ? (
            <>
              <Image
                source={
                  user?.avatar !== null
                    ? {uri: user?.avatar}
                    : require('../../Assets/Images/avatar.png')
                }
                style={{
                  borderRadius: widthPercentageToDP('12%'),
                  width: widthPercentageToDP('12%'),
                  height: widthPercentageToDP('12%'),
                }}
              />
              <View
                style={{
                  marginLeft: widthPercentageToDP('4%'),
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: RFValue(16, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue2,
                  }}>
                  {currentDate}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(24, 812),
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'center',
                    color: colors.green,
                  }}>
                  {user?.first_name + ' ' + user?.last_name}
                </Text>
              </View>
            </>
          ) : null}
        </View>
        {checkSearch ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationsClient')}
              style={{
                marginRight: 10,
              }}>
              <View>
                {notificationTotal > 0 ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 12,
                      backgroundColor: colors.red,
                      marginBottom: -12,
                      marginLeft: 15,
                      zIndex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: colors.pureWhite,
                        }}>
                        {notificationTotal}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <IconBell name="bell-o" size={30} color={colors.green} />
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Search iZero"
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.lightWhite}
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                fontSize: 17,
                color: colors.darkGrey,
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                paddingLeft: 20,
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
              }}
            />
            <TouchableOpacity
              onPress={() => setCheckSearch(!checkSearch)}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                borderRadius: widthPercentageToDP('12%') / 2,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconCross name="cross" size={30} color={colors.darkBlue} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => searchFunc()}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                borderRadius: widthPercentageToDP('12%') / 2,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SearchIcon />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationsClient')}
              style={{
                marginLeft: 10,
                marginTop: 10,
              }}>
              <View>
                {notificationTotal > 0 ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 12,
                      backgroundColor: colors.red,
                      marginBottom: -12,
                      marginLeft: 15,
                      zIndex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: colors.pureWhite,
                        }}>
                        {notificationTotal}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <IconBell name="bell-o" size={30} color={colors.green} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {checkSearch == false ? (
        <>
          <View style={{paddingBottom: 10}}>
            <View style={styles.horizontal}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingLeft: widthPercentageToDP('5.8%'),
                }}>
                <Button
                  textStyle={styles.btnText}
                  style={styles.category}
                  onPress={() => {
                    setSelected(1);
                    setCheckApplicants(false);
                    setCheckStaff(false);
                  }}
                  textStyle={[
                    selected === 1
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 1
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Live Jobs
                </Button>
                <Button
                  onPress={() => {
                    setSelected(2);
                    setCheckApplicants(false);
                    setCheckStaff(false);
                  }}
                  textStyle={[
                    selected === 2
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 2
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Completed Jobs
                </Button>
                <Button
                  onPress={() => {
                    setSelected(3);
                    setCheckApplicants(false);
                    setCheckStaff(false);
                  }}
                  textStyle={[
                    selected === 3
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 3
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Applicants
                </Button>
                <Button
                  onPress={() => {
                    setSelected(4);
                    setCheckApplicants(false);
                    setCheckStaff(false);
                  }}
                  textStyle={[
                    selected === 4
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 4
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Staff
                </Button>
                <Button
                  onPress={() => {
                    setSelected(5);
                    setCheckApplicants(false);
                    setCheckStaff(false);
                  }}
                  textStyle={[
                    selected === 5
                      ? {...styles.btnText}
                      : {...styles.btnText, ...styles.btnTextInActive},
                  ]}
                  style={[
                    selected === 5
                      ? {...styles.category}
                      : {...styles.category, ...styles.categoryInactive},
                  ]}>
                  Favourites
                </Button>
              </ScrollView>
            </View>
          </View>
        </>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        //contentContainerStyle={{alignItems: 'center'}}
      >
        {checkSearch == false ? (
          <>
            {loading == false ? (
              <View style={{marginTop: 30}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {selected === 1 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Jobs</Text>
                        <Text style={styles.sub}>{live?.length} Live Jobs</Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 45,
                          position: 'absolute',
                          bottom: 10,
                          right: 20,
                          height: 45,
                          backgroundColor: '#3EB561',
                          borderRadius: 100,
                        }}
                        onPress={() => navigation.navigate('CreateJobClient')}>
                        <Icon name="plus" size={30} color={colors.pureWhite} />
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={live}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        let jobID = item?.job?.id,
                          shiftID = item?.id;
                        let status = 'live';

                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCardClientSecondTab
                                onPress={() => {
                                  navigation.navigate('JobDetailsClient', {
                                    jobID: jobID,
                                    shiftID: shiftID,
                                    status: status,
                                  });
                                  dispatch({
                                    type: types?.JOB_DETAILS,
                                    jobDetails: item,
                                  });
                                }}
                                navigation={navigation}
                                title={item?.job_role?.title}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                jobID={item?.job?.id}
                                image={{
                                  uri:
                                    item?.job?.company.logo !== ''
                                      ? item?.job?.company.logo
                                      : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
                                }}
                                address={item?.address_data}
                                price={'Shift Fee: £' + item?.total_pay}
                                time={
                                  'Shift Time: ' +
                                  item?.start_time?.substring(
                                    0,
                                    item?.start_time?.length - 3,
                                  ) +
                                  ' - ' +
                                  item?.end_time?.substring(
                                    0,
                                    item?.end_time?.length - 3,
                                  )
                                }
                                //data={data}
                                //data={item?.job_users}
                                //data={item?.job_users}
                                checkData={item?.job_users?.user ? true : false}
                                date={
                                  item?.start_date?.substring(
                                    0,
                                    item?.start_date?.length - 5,
                                  ) +
                                  ' - ' +
                                  item?.end_date?.substring(
                                    0,
                                    item?.end_date?.length - 5,
                                  )
                                }
                                jobDetails={true}
                                live={true}
                                shiftID={shiftID}
                                item={item}
                              />
                            </View>
                          </>
                        );
                      }}
                    />

                    {nextURLLiveJobs !== null ? (
                      <>
                        {loadingLive == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreLiveData()}
                            underlayColor=""
                            style={{
                              flex: 1,
                              width: '25%',
                              borderRadius: 10,
                              backgroundColor: colors.pureWhite,
                              alignItems: 'center',
                              alignContent: 'flex-end',
                              alignSelf: 'center',
                              marginTop: 10,
                              marginBottom: 10,
                              marginRight: 10,
                            }}>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#3eb561'}}>Load more</Text>
                            </View>
                          </TouchableHighlight>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}

                {selected === 2 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Jobs</Text>
                        <Text style={styles.sub}>
                          {completed?.length} Jobs Completed
                        </Text>
                      </View>

                      {/* <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 45,
                          position: 'absolute',
                          bottom: 10,
                          right: 20,
                          height: 45,
                          backgroundColor: '#3EB561',
                          borderRadius: 100,
                        }}
                        onPress={() => navigation.navigate('CreateJobClient')}>
                        <Icon name="plus" size={30} color={colors.pureWhite} />
                      </TouchableOpacity> */}
                    </View>

                    <FlatList
                      data={completed}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        let jobID = item?.job?.id,
                          shiftID = item?.id;
                        let status = 'completed';
                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCardClientSecondTab
                                jobDetails={true}
                                onPress={() => {
                                  navigation.navigate('JobDetailsClient', {
                                    jobID: jobID,
                                    shiftID: shiftID,
                                    status: status,
                                  });
                                  dispatch({
                                    type: types?.JOB_DETAILS,
                                    jobDetails: item,
                                  });
                                }}
                                //navigation={navigation}
                                title={item?.job_role?.title}
                                jobTitle={'Job Title: ' + item?.job?.title}
                                jobID={item?.job?.id}
                                address={item?.address_data}
                                price={'Shift Fee: £' + item?.total_pay}
                                time={
                                  'Shift Time: ' +
                                  item?.start_time?.substring(
                                    0,
                                    item?.start_time?.length - 3,
                                  ) +
                                  ' - ' +
                                  item?.end_time?.substring(
                                    0,
                                    item?.end_time?.length - 3,
                                  )
                                }
                                // //data={data}
                                // data={item?.job_users}
                                date={
                                  item?.start_date?.substring(
                                    0,
                                    item?.start_date?.length - 5,
                                  ) +
                                  ' - ' +
                                  item?.end_date?.substring(
                                    0,
                                    item?.end_date?.length - 5,
                                  )
                                }
                                jobDetails={true}
                                jobStatus={'Completed'}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLCompletedJobs !== null ? (
                      <>
                        {loadingCompleted == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreCompletedData()}
                            underlayColor=""
                            style={{
                              flex: 1,
                              width: '25%',
                              borderRadius: 10,
                              backgroundColor: colors.pureWhite,
                              alignItems: 'center',
                              alignContent: 'flex-end',
                              alignSelf: 'center',
                              marginTop: 10,
                              marginBottom: 10,
                              marginRight: 10,
                            }}>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#3eb561'}}>Load more</Text>
                            </View>
                          </TouchableHighlight>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}
                {selected === 3 ? (
                  <>
                    {checkApplicants ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search applicants"
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.lightWhite}
                            onChangeText={(text) =>
                              searchFilterApplicantsFunction(text)
                            }
                            style={{
                              fontSize: 17,
                              color: colors.darkGrey,
                              width: widthPercentageToDP('75%'),
                              height: widthPercentageToDP('12%'),
                              paddingLeft: 20,
                              borderWidth: 1,
                              borderRadius: 30,
                              borderColor: 'rgba(0, 0, 0, 0.07)',
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => searchApplicantsFunc()}
                            style={{
                              width: widthPercentageToDP('12%'),
                              height: widthPercentageToDP('12%'),
                              borderRadius: widthPercentageToDP('12%') / 2,
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
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 20,
                            }}>
                            <IconCross
                              name="cross"
                              size={30}
                              color={colors.darkBlue}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <>
                        <View style={styles.row}>
                          <View>
                            <Text style={styles.title}>Applicants</Text>
                            <Text style={styles.sub}>
                              {applicants?.length} Applicants
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() =>
                              setCheckApplicants(!checkApplicants)
                            }>
                            <FilterIcon />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                    {checkApplicants ? (
                      <FlatList
                        data={filteredApplicants}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        ListEmptyComponent={listEmptyComponentApplicants}
                        renderItem={ItemViewApplicants}
                      />
                    ) : (
                      <FlatList
                        data={applicants}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          let check = false;
                          let jobID = item?.job?.id,
                            shiftID = item?.id;
                          return (
                            <>
                              <View
                                style={[
                                  styles.firstRow,
                                  {
                                    borderBottomWidth: 0,
                                  },
                                ]}>
                                <JobCardClientSecondTab
                                  onPress={() => {
                                    let id = item?.user_id;
                                    navigation.navigate(
                                      'TalentInformationBook',
                                      {
                                        id,
                                        check: check,
                                      },
                                    );

                                    dispatch({
                                      type: types.SHIFT_ID,
                                      shiftId: '',
                                    });

                                    dispatch({
                                      type: types.FIND_TALENTS,
                                      findTalents: item?.user_sector,
                                    });

                                    dispatch({
                                      type: types.STAFF_DETAILS,
                                      staffDetails: item,
                                    });
                                  }}
                                  //navigation={navigation}
                                  title={
                                    item?.first_name + ' ' + item?.last_name
                                  }
                                  image={{uri: item?.avatar}}
                                  appliedFor={item?.title}
                                  price={'Job Fee: £' + item?.total_pay}
                                  designation={
                                    item?.user_sector?.length > 0
                                      ? (
                                          item?.user_sector[0]?.title +
                                          ' ' +
                                          (item?.user_sector?.length - 1)
                                        ).toUpperCase() + '  OTHERS'
                                      : null
                                  }
                                  date={
                                    item?.start_date + ' - ' + item?.end_date
                                  }
                                  timeTag={
                                    item?.start_time?.substring(
                                      0,
                                      item?.start_time?.length - 3,
                                    ) +
                                    ' - ' +
                                    item?.end_time?.substring(
                                      0,
                                      item?.end_time?.length - 3,
                                    )
                                  }
                                  shiftTitle={item?.job_shift_title}
                                  applicants={true}
                                />
                              </View>

                              <View
                                style={{
                                  width: widthPercentageToDP('80%'),
                                  height: heightPercentageToDP('5.5%'),
                                  borderWidth: 0.3,
                                  borderColor: colors.darkGreyHigh,
                                  borderTopWidth: 0.3,
                                  borderTopColor: colors.darkGreyHigh,
                                  justifyContent: 'center',
                                  alignSelf: 'center',
                                  borderRadius: 100,
                                }}>
                                <View>
                                  <TouchableOpacity
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                    onPress={() => acceptFunc(item)}>
                                    <Text
                                      style={{
                                        color: '#44B766',
                                        fontFamily: 'Europa-Bold',
                                        fontSize: RFValue(18, 812),
                                        fontWeight: 'bold',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                      }}>
                                      {/* Accept */} Offer this Shift
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View
                                style={{
                                  borderWidth: 0.5,
                                  borderColor: colors.darkGreyHigh,
                                  width: widthPercentageToDP(100),
                                  marginTop: 20,
                                }}
                              />
                            </>
                          );
                        }}
                      />
                    )}
                    {nextURLApplicants !== null && checkApplicants === false ? (
                      <>
                        {loadingApplicants == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreApplicantsData()}
                            underlayColor=""
                            style={{
                              flex: 1,
                              width: '25%',
                              borderRadius: 10,
                              backgroundColor: colors.pureWhite,
                              alignItems: 'center',
                              alignContent: 'flex-end',
                              alignSelf: 'center',
                              marginTop: 10,
                              marginBottom: 10,
                              marginRight: 10,
                            }}>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#3eb561'}}>Load more</Text>
                            </View>
                          </TouchableHighlight>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}
                {selected === 4 ? (
                  <>
                    {checkStaff ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search staff"
                            placeholderTextColor={colors.lightWhite}
                            underlineColorAndroid="transparent"
                            onChangeText={(
                              text, //searchFilterStaffFunction(text)
                            ) => setSearchText(text)}
                            style={{
                              fontSize: 17,
                              color: colors.darkGrey,
                              width: widthPercentageToDP('55%'),
                              height: widthPercentageToDP('12%'),
                              paddingLeft: 20,
                              borderWidth: 1,
                              borderRadius: 30,
                              borderColor: 'rgba(0, 0, 0, 0.07)',
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => getTalentsSearch()}
                            style={{
                              width: widthPercentageToDP('12%'),
                              height: widthPercentageToDP('12%'),
                              borderRadius: widthPercentageToDP('12%') / 2,
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
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 20,
                            }}>
                            <IconSearch
                              name="search1"
                              size={20}
                              color={colors.darkBlue}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => searchStaffFunc()}
                            style={{
                              width: widthPercentageToDP('12%'),
                              height: widthPercentageToDP('12%'),
                              borderRadius: widthPercentageToDP('12%') / 2,
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
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 20,
                            }}>
                            <IconCross
                              name="cross"
                              size={30}
                              color={colors.darkBlue}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.row}>
                        <View>
                          <Text style={styles.title}>Find Staff</Text>
                          <Text style={styles.sub}>
                            {talents?.length} staff matching your job sector
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => setCheckStaff(!checkStaff)}>
                          <FilterIcon />
                        </TouchableOpacity>
                      </View>
                    )}
                    {loadingStaff == false ? (
                      <View
                        style={{
                          alignSelf: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                          width: widthPercentageToDP(100),
                          marginTop: 30,
                        }}>
                        <ActivityIndicator
                          size="large"
                          color={colors.darkBlueHigh}
                        />
                      </View>
                    ) : (
                      <>
                        {checkStaff ? (
                          <FlatList
                            data={filteredStaff}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            ListEmptyComponent={listEmptyComponentStaff}
                            renderItem={ItemViewStaff}
                          />
                        ) : (
                          <FlatList
                            data={talents}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => {
                              let check = true;
                              return (
                                <View style={styles.firstRow}>
                                  <JobCardClientSecondTab
                                    //navigation={navigation}
                                    onPress={() =>
                                      talentInformationBook1(item, check)
                                    }
                                    talentID={item?.id}
                                    talentBook={true}
                                    image={{
                                      uri: item?.avatar
                                        ? item?.avatar
                                        : '../../Assets/Images/avatarRound.png',
                                    }}
                                    title={
                                      item?.first_name + ' ' + item?.last_name
                                    }
                                    designation={
                                      item?.user_sector?.length > 1
                                        ? (
                                            item?.user_sector[index]?.title +
                                            ' ' +
                                            (item?.user_sector?.length - 1)
                                          ).toUpperCase() + '  OTHERS'
                                        : null
                                    }
                                    status={
                                      item.availability_status == '1'
                                        ? 'Available'
                                        : ''
                                    }
                                    ratingTag={item?.rating}
                                    jobsCompleted={item?.job_completed}
                                    jobsCompletedLabel={true}
                                  />
                                </View>
                              );
                            }}
                          />
                        )}
                      </>
                    )}
                    {nextURLTalents !== null && checkStaff == false ? (
                      <>
                        {loadingTalents == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreTalentData()}
                            underlayColor=""
                            style={{
                              flex: 1,
                              width: '25%',
                              borderRadius: 10,
                              backgroundColor: colors.pureWhite,
                              alignItems: 'center',
                              alignContent: 'flex-end',
                              alignSelf: 'center',
                              marginTop: 10,
                              marginBottom: 10,
                              marginRight: 10,
                            }}>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#3eb561'}}>Load more</Text>
                            </View>
                          </TouchableHighlight>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}
                {selected === 5 ? (
                  <>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.title}>Favourites</Text>
                        <Text style={styles.sub}>
                          {favorite?.length} Favourites
                        </Text>
                      </View>
                      {/* <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 45,
                          position: 'absolute',
                          bottom: 10,
                          right: 20,
                          height: 45,
                          backgroundColor: '#3EB561',
                          borderRadius: 100,
                        }}
                        onPress={() => navigation.navigate('CreateJobClient')}>
                        <Icon name="plus" size={30} color={colors.pureWhite} />
                      </TouchableOpacity> */}
                    </View>
                    <FlatList
                      data={favorite}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        let check = false;
                        return (
                          <>
                            <View style={styles.firstRow}>
                              <JobCardClientSecondTab
                                //navigation={navigation}
                                onPress={() => {
                                  let id = item?.id;
                                  navigation.navigate('TalentInformationBook', {
                                    id,
                                    check: check,
                                  });

                                  dispatch({
                                    type: types.SHIFT_ID,
                                    shiftId: '',
                                  });

                                  dispatch({
                                    type: types.FIND_TALENTS,
                                    findTalents: item?.user_sector,
                                  });

                                  dispatch({
                                    type: types.STAFF_DETAILS,
                                    staffDetails: item,
                                  });
                                }}
                                image={{
                                  uri: item?.avatar
                                    ? item?.avatar
                                    : '../../Assets/Images/avatarRound.png',
                                }}
                                title={item?.first_name + ' ' + item?.last_name}
                                designation={
                                  item?.user_sector.length > 0
                                    ? (
                                        item?.user_sector[index]?.title +
                                        ' ' +
                                        (item?.user_sector?.length - 1)
                                      ).toUpperCase() + '  OTHERS'
                                    : null
                                }
                                status={
                                  item?.availability_status == '1'
                                    ? 'Available'
                                    : ''
                                }
                                ratingTag={item?.rating}
                                jobsCompleted={item?.job_completed}
                                jobsCompletedLabel={true}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {nextURLFavouriteJobs !== null ? (
                      <>
                        {loadingFavourite == false ? (
                          <View style={{marginTop: 20}}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          <TouchableHighlight
                            onPress={() => LoadMoreFavouriteData()}
                            underlayColor=""
                            style={{
                              flex: 1,
                              width: '25%',
                              borderRadius: 10,
                              backgroundColor: colors.pureWhite,
                              alignItems: 'center',
                              alignContent: 'flex-end',
                              alignSelf: 'center',
                              marginTop: 10,
                              marginBottom: 10,
                              marginRight: 10,
                            }}>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                              }}>
                              <Text style={{color: '#3eb561'}}>Load more</Text>
                            </View>
                          </TouchableHighlight>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            )}
          </>
        ) : (
          <>
            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {filteredJobs.length > 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: -10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(16, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.green,
                      }}>
                      IN JOBS
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={filteredJobs}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView0}
                />
                {filteredTalents.length > 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: -10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(16, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.green,
                      }}>
                      STAFF
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={filteredTalents}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView2}
                />
                {filteredFinance.length > 0 ? (
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: -10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontSize: RFValue(16, 812),
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.green,
                      }}>
                      FINANCE
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={filteredFinance}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView3}
                />
              </>
            )}
          </>
        )}

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
      </ScrollView>
    </Container>
  );
}
