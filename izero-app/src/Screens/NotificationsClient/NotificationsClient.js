import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Container, NotificationsCardClient} from '../../Components';
import styles from './Styles';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import ActiveComponent from '../../Components/Active/index';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import types from '../../Redux/types';
import Api from '../../api/index';
import {useIsFocused} from '@react-navigation/native';

import IconBell from 'react-native-vector-icons/Ionicons';
import IconBack from 'react-native-vector-icons/Ionicons';
import colors from '../../Constants/colors';

import * as RootNavigation from '../../Router/navigation/RootNavigation';

export default function NotificationsClient({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log('Iboard Employer');
    getNotifications();
    //readNotifications();
  }, [isFocused]);

  const getNotifications = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/notifications', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Notifications Employer Api Response', res);
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
      setLoading(false);
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
        console.log('Job details API for employeer side res', res);
        setLoading(true);
        dispatch({
          type: types?.JOB_DETAILS,
          jobDetails: res?.data?.data,
        });

        navigation.navigate('JobDetailsClient', {
          shiftID: itemData?.job_shift_id,
          jobID: itemData?.job_id,
          statusJob: itemData?.status,
          jwt: jwt,
        });
      } catch (error) {
        setLoading(true);
        console.log({error});
      }
    } else if (item?.type === expense) {
      // navigation.navigate('ExpenseDetails', {
      //   id: itemData?.id,
      // });
      RootNavigation.navigate('ExpenseDetails', {id: itemData?.id})
      dispatch({
        type: types.EMPLOYEER_EXPENSE_DETAILS,
        employeerExpenseDetails: itemData,
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
        <ScrollView>
          {loading == false ? (
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => EmptyComponent()}
              renderItem={({item, index}) => {
                let data = item?.data;
                let user = item?.user;
                let itemData = (data);//JSON.parse(data);

                let jobOffers = 'App\\Notifications\\JobOffer';
                let expense = 'App\\Notifications\\ExpenseActioned';

                return (
                  <NotificationsCardClient
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
