import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCard,
  Heading,
  Button,
} from '../../Components';
import styles from './Styles';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {useDispatch, useSelector} from 'react-redux';

import types from '../../Redux/types';
import Api from '../../api/index';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import IconCross from 'react-native-vector-icons/Entypo';

import {ArrowIcon, SearchIcon} from '../../Assets/Icons';
import {TextInput} from 'react-native';

import {IboardHeaderTalent} from '../../Components/IboardHeaderTalent/IboardHeaderTalent';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

export default function SearchListTalent({navigation, route}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const completed = useSelector((state) => state?.app?.completed);
  const live = useSelector((state) => state?.app?.live);
  const upComing = useSelector((state) => state?.app?.upComing);

  const [liveTotal, setliveTotal] = useState(0);
  const [completedTotal, setCompletedTotal] = useState(0);

  const [checkSearch, setCheckSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [nextURLUpComimgJobs, setNextURLUpComimgJobs] = useState('');

  const [loadingUpComing, setLoadingUpComing] = useState(true);

  const markedDatesArray2 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  let data = route?.params;
  let dataArr = data?.data;
  let title = data?.title;
  let statusJob = data?.statusJob;

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];
  var currentDate = day + ' ' + date + ' ' + month;

  useEffect(() => {
    console.log('Iboard Staff');
    getIboardData();
    getSearchData();
    setCheckSearch(false);
  }, [isFocused]);

  const getIboardData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/dashboard', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Staff Api Response', res);

      setLoading(true);
      setliveTotal(res?.data?.no_live_jobs);
      setCompletedTotal(res?.data?.no_completed_jobs);

      setNextURLUpComimgJobs(
        res?.data?.appllied?.next_page_url !== null
          ? res?.data?.appllied?.next_page_url
          : null,
      );
      dispatch({
        type: types.UP_COMINGS,
        upComing: res?.data?.appllied?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/all_jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search Staff Api Response', res);
      setLoading(true);
      setFilteredDataSource(res?.data?.data);
      setMasterDataSource(res?.data?.data);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item?.job_role?.title
          ? item?.job_role?.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const LoadMoreUpComingData = async () => {
    setLoadingUpComing(false);
    try {
      let res = await Api.get(`${nextURLUpComimgJobs}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
      });

      console.log('Next UpComing Jobs Api Response', res);

      setNextURLUpComimgJobs(
        res?.data?.appllied?.next_page_url !== null
          ? res?.data?.appllied?.next_page_url
          : null,
      );

      let nextUpComing = res?.data?.appllied?.data;

      let tempUpComing = upComing;

      for (var v = 0; v < nextUpComing.length; v++) {
        tempUpComing.push(nextUpComing[v]);
      }

      dispatch({
        type: types.UP_COMINGS,
        upComing: tempUpComing,
      });
      setLoadingUpComing(true);
    } catch (error) {
      setLoadingUpComing(true);
      console.log({error});
    }
  };

  const ItemView = ({item}) => {
    let shiftID = item?.id,
      jobID = item?.job?.id,
      checkFav = true,
      statusJob = 'search',
      checkIn = true;
    return (
      <View style={styles.firstRow}>
        <JobCard
          title={item?.job_role?.title}
          //navigation={navigation}
          onPress={() => {
            navigation.navigate('JobDetailsTalent', {
              shiftID: shiftID,
              statusJob: statusJob,
              checkFav: checkFav,
              jobID: jobID,
              jwt: jwt,
              statusJob: statusJob
            });
            dispatch({
              type: types?.JOB_DETAILS,
              jobDetails: item,
            });
          }}
          checkFav={true}
          jobTitle={'Job Title: ' + item?.job?.title}
          statusJob={'search'}
          jobID={item?.job?.id}
          price={'Shift Fee: ' + '£' + item?.total_pay}
          address={item?.address_data}
          image={{
            uri:
              item?.job?.company?.logo !== ''
                ? item?.job?.company?.logo
                : 'https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg',
          }}
          time={
            item?.start_time?.substring(0, item?.start_time?.length - 3) +
            ' - ' +
            item?.end_time?.substring(0, item?.end_time?.length - 3)
          }
          date={
            item?.start_date.substring(0, item?.start_date.length - 5) +
            ' - ' +
            item?.end_date.substring(0, item?.end_date.length - 5)
          }
          jobDetails={true}
          checkIn={true}
        />
      </View>
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
          No Jobs Found
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

  return (
    <Container check={true} safeArea>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 20,
          paddingVertical: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowIcon
            style={{
              transform: [{rotate: '180deg'}],
              marginRight: 17,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(22, 812),
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
          }}>
          {title}
        </Text>
      </View>
      <FlatList
        data={dataArr}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        ListEmptyComponent={listEmptyComponent}
        renderItem={ItemView}
      />
    </Container>
  );
}
