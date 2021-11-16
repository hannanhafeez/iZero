import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCardClientSecondTab,
  JobCardClientSearchTab,
  JobCardClient,
  Heading,
  Button,
  FinanceCardClient,
  NotificationsCardClient,
  NotificationsCardTalent,
} from '../../Components';
import styles from './Styles';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import ActiveComponent from '../../Components/Active/index';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import types from '../../Redux/types';
import Api from '../../api/index';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

import IconCross from 'react-native-vector-icons/Entypo';
import {SearchIcon, FilterIcon} from '../../Assets/Icons';

import IconBell from 'react-native-vector-icons/Ionicons';

import IconBack from 'react-native-vector-icons/Ionicons';

import IconBellHeader from 'react-native-vector-icons/Entypo';

import colors from '../../Constants/colors';

export default function NotificationsTalent({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const [liveTotal, setliveTotal] = useState(0);
  const [completedTotal, setCompletedTotal] = useState(0);

  const completed = useSelector((state) => state?.app?.completed);
  const live = useSelector((state) => state?.app?.live);
  const liveJobs = useSelector((state) => state?.app?.liveJobs);
  const upComing = useSelector((state) => state?.app?.upComing);

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];
  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const [vissibleDeclined, setVissibleDeclined] = useState(false);
  const [vissibleAccept, setVissibleAccept] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource0, setFilteredDataSource0] = useState([]);
  const [masterDataSource0, setMasterDataSource0] = useState([]);

  const [filteredDataSource1, setFilteredDataSource1] = useState([]);
  const [masterDataSource1, setMasterDataSource1] = useState([]);

  const [filteredDataSource2, setFilteredDataSource2] = useState([]);
  const [masterDataSource2, setMasterDataSource2] = useState([]);

  const expenses = useSelector((state) => state?.app?.expenses);

  const markedDatesArray2 = {};

  const [markedDatesArray, setMarkedDatesArray] = useState();

  const [nextURLUpComimgJobs, setNextURLUpComimgJobs] = useState('');

  const [loadingUpComing, setLoadingUpComing] = useState(true);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log('Notification Staff');
    getNotifications();
    //readNotifications();
  }, [isFocused]);

  const getNotifications = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/notifications', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Notifications Api Response', res);
      setNotifications(res?.data?.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const readNotifications = async (id) => {
    try {
      let res = await Api.get(`/read_notification?id=${id}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Read Notifications Api Response', res);
      // dispatch({
      //   type: types.NOTIFICATION_TOTAL,
      //   notificationTotal: '',
      // });
    } catch (error) {
      console.log({error});
    }
  };

  const EmptyComponent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        No notifications
      </Text>
    </View>
  );

  const navigateDetails = async (itemData, jobOffers, expense, user, item) => {
    readNotifications(item?.id);
    const finalObject = Object.assign(itemData, {user: user});
    if (item?.type === jobOffers) {
      try {
        let res = await Api.get(
          `/jobshiftdetail?id=${itemData?.job_shift_id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              Accept: 'application/json',
            },
          },
        );
        console.log('Job Details API For Staff Side res', res);

        dispatch({
          type: types?.JOB_DETAILS,
          jobDetails: res?.data?.data,
        });

        navigation.navigate('JobDetailsTalent', {
          shiftID: itemData.job_shift_id,
          jobID: itemData?.job_id,
          statusJob: itemData?.status,
          jwt: jwt,
        });
      } catch (error) {
        console.log({error});
      }
    } else if (item?.type === expense) {
      navigation.navigate('ExpenseDetailsTalent', {
        id: itemData?.id,
      });
      dispatch({
        type: types.STAFF_EXPENSE_DETAILS,
        staffExpenseDetails: finalObject,
      });
    }
  };

  return (
    <Container safeArea>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightPercentageToDP('20%'),
          width: widthPercentageToDP('100%'),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: colors.pureWhite,
            paddingLeft: 10,
          }}>
          <IconBack name="arrow-back" size={30} color="#3eb561" />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -15,
            paddingBottom: 10,
            borderBottomWidth: 0.3,
            borderBottomColor: colors.darkGreyHigh,
          }}>
          <IconBell name="notifications" size={100} color="#3eb561" />

          <Text
            style={{
              fontFamily: 'Europa-Bold',
              fontSize: RFValue(20, 812),
              fontWeight: 'bold',
              fontStyle: 'normal',
              letterSpacing: 0,
              color: '#24334c',
            }}>
            Notifications
          </Text>
        </View>
      </View>

      <View style={{marginTop: 20, marginBottom: 20, flex: 1}}>
        <ScrollView
        //contentContainerStyle={{alignItems: 'center'}}
        >
          {loading == false ? (
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => EmptyComponent()}
              renderItem={({item, index}) => {
                let data = item?.data,
                  user = item?.user,
                  checkFav = true;
                let itemData = data; //JSON.parse(data);

                let jobOffers = 'App\\Notifications\\JobOffer';
                let expense = 'App\\Notifications\\ExpenseActioned';

                return (
                  <NotificationsCardTalent
                    onPress={() =>
                      navigateDetails(itemData, jobOffers, expense, user, item)
                    }
                    title={item?.title}
                    message={item?.message}
                  />
                );
              }}
            />
          )}
        </ScrollView>
      </View>
    </Container>
  );
}
