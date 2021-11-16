import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCard,
  Heading,
  Button,
  FinanceCardClient,
  JobCardClientSearchTab,
} from '../../Components';
import styles from './Styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Api from '../../api/index';

import {useIsFocused} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

import IconCross from 'react-native-vector-icons/Entypo';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';
import Icon from 'react-native-vector-icons/Entypo';

import IconBell from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

import * as RootNavigation from '../../Router/navigation/RootNavigation';

export default function FinanceClient({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.user);
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const totalSpend = useSelector((state) => state?.app?.totalSpend);
  const totalFee = useSelector((state) => state?.app?.totalFee);

  const overView = useSelector((state) => state?.app?.overView);
  const inProgress = useSelector((state) => state?.app?.inProgress);
  const completedFinance = useSelector((state) => state?.app?.completedFinance);
  const expenses = useSelector((state) => state?.app?.expenses);
  const savedQuotes = useSelector((state) => state?.app?.savedQuotes);

  const [checkFinanceInprocess, setCheckFinanceInprocess] = useState(false);
  const [checkFinanceCompleted, setCheckFinanceCompleted] = useState(false);
  const [checkFinanceExpenses, setCheckFinanceExpenses] = useState(false);
  const [checkFinanceSavedEstimate, setCheckFinanceSavedEstimate] = useState(
    false,
  );

  const notificationTotal = useSelector(
    (state) => state?.app?.notificationTotal,
  );

  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [masterJobs, setMasterJobs] = useState([]);

  const [filteredTalents, setFilteredTalents] = useState([]);
  const [masterTalents, setMasterTalents] = useState([]);

  const [filteredFinance, setFilteredFinance] = useState([]);
  const [masterFinance, setMasterFinance] = useState([]);

  const [filteredFinanceInProcess, setFilteredFinanceInProcess] = useState([]);

  const [masterFinanceInProcess, setMasterFinanceInProcess] = useState([]);

  const [filteredFinanceCompleted, setFilteredFinanceCompleted] = useState([]);

  const [masterFinanceCompleted, setMasterFinanceCompleted] = useState([]);

  const [filteredFinanceExpenses, setFilteredFinanceExpenses] = useState([]);

  const [masterFinanceExpenses, setMasterFinanceExpenses] = useState([]);

  const [
    filteredFinanceSavedEstimate,
    setFilteredFinanceSavedEstimate,
  ] = useState([]);

  const [masterFinanceSavedEstimate, setMasterFinanceSavedEstimate] = useState(
    [],
  );

  useEffect(() => {
    console.log('Finance Employer');
    getDataFinance();
    //getSearchData();
    setCheckSearch(false);
    getSearchFinanceInProcess();
    getSearchFinanceCompleted();
    getSearchFinanceExpenses();
    getSearchFinanceSavedEstimate();
  }, [isFocused]);

  const [selected, setSelected] = useState(1);

  const getDataFinance = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/client_finance', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Finance Api Response Emplyeer', res);
      setLoading(true);

      dispatch({
        type: types.TOTAL_SPEND,
        totalSpend: res?.data?.total_spent,
      });

      dispatch({
        type: types.TOTAL_FEE,
        totalFee: res?.data?.total_fee,
      });

      dispatch({
        type: types.OVER_VIEW,
        overView: res?.data?.overview,
      });

      dispatch({
        type: types.IN_PROGRESS,
        inProgress: res?.data?.in_process,
      });
      dispatch({
        type: types.COMPLETED_FINANCE,
        completedFinance: res?.data?.completed,
      });
      dispatch({
        type: types.EXPENSES,
        expenses: res?.data?.expneses,
      });
      dispatch({
        type: types.SAVED_QUOTES,
        savedQuotes: res?.data?.saved_quotes,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const saveQuotePress = (id) => {
    dispatch({
      type: types.CREATE_JOB_ID,
      createJobID: '',
    });
    navigation.navigate('QuoteClient', {id: id});
  };

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/search_all_data', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search employer Api Response', res);
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

  const ItemView0 = ({item}) => {
    let jobID = item?.job?.id,
      shiftID = item?.id;
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

  const talentInformationBook2 = (item, check) => {
    let id = item?.id;
    navigation.navigate('TalentInformationBook', {
      id,
      check,
    });
    dispatch({
      type: types.FIND_TALENTS,
      findTalents: item?.user_sector,
    });
  };

  const ItemView2 = ({item}) => {
    let check = false;
    let id = item?.id;
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

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  //
  const getSearchFinanceInProcess = async () => {
    setFilteredFinanceInProcess(inProgress);
    setMasterFinanceInProcess(inProgress);
  };

  const searchFinanceInPrrocessFunc = () => {
    setCheckFinanceInprocess(!checkFinanceInprocess);
    getSearchFinanceInProcess();
  };

  const searchFilterFinanceInProcessFunction = (text) => {
    if (text) {
      const newData0 = masterFinanceInProcess.filter(function (item) {
        const itemData0 = item?.title
          ? item?.title.toUpperCase() + ' ' + item?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredFinanceInProcess(newData0);
      setSearch(text);
    } else {
      setFilteredFinanceInProcess(masterFinanceInProcess);
      setSearch(text);
    }
  };

  const ItemViewFinanceInProcess = ({item, index}) => {
    return (
      <FinanceCardClient
        onPress={() => navigation.navigate('FinanceDetails')}
        title={item?.title}
        invoiceNumber={item?.invoice + ': ' + ' £ ' + item?.total_cost}
        date={item?.date}
        fragmentSelected="inProcess"
        type="inProcess"
      />
    );
  };

  const listEmptyComponentFinanceInProcess = () => {
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
          {filteredFinanceInProcess !== '' ? 'No pending finance found' : ''}
        </Text>
      </View>
    );
  };
  //

  const getSearchFinanceCompleted = async () => {
    setFilteredFinanceCompleted(completedFinance);
    setMasterFinanceCompleted(completedFinance);
  };

  const searchFinanceCompletedFunc = () => {
    setCheckFinanceCompleted(!checkFinanceCompleted);
    getSearchFinanceCompleted();
  };

  const searchFilterFinanceCompletedFunction = (text) => {
    if (text) {
      const newData0 = masterFinanceCompleted.filter(function (item) {
        const itemData0 = item?.title
          ? item?.title.toUpperCase() + ' ' + item?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredFinanceCompleted(newData0);
      setSearch(text);
    } else {
      setFilteredFinanceCompleted(masterFinanceCompleted);
      setSearch(text);
    }
  };

  const ItemViewFinanceCompleted = ({item, index}) => {
    return (
      <FinanceCardClient
        onPress={() => navigation.navigate('FinanceDetails')}
        title={item?.title}
        invoiceNumber={item?.invoice + ': ' + ' £ ' + item?.total_cost}
        date={item?.date}
        fragmentSelected="completed"
        type="completed"
        download={false}
      />
    );
  };

  const listEmptyComponentFinanceCompleted = () => {
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
          {filteredFinanceCompleted !== '' ? 'No pending finance found' : ''}
        </Text>
      </View>
    );
  };

  //////

  const getSearchFinanceExpenses = async () => {
    setFilteredFinanceExpenses(expenses);
    setMasterFinanceExpenses(expenses);
  };

  const searchFinanceExpensesFunc = () => {
    setCheckFinanceExpenses(!checkFinanceExpenses);
    getSearchFinanceExpenses();
  };

  const searchFilterFinanceExpensesFunction = (text) => {
    if (text) {
      const newData0 = masterFinanceExpenses.filter(function (item) {
        const itemData0 = item?.expense?.title
          ? item?.title.toUpperCase() + ' ' + item?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredFinanceExpenses(newData0);
      setSearch(text);
    } else {
      setFilteredFinanceExpenses(masterFinanceExpenses);
      setSearch(text);
    }
  };

  const ItemViewFinanceExpenses = ({item, index}) => {
    let id = item?.id;
    return (
      <FinanceCardClient
        onPress={() => {
          dispatch({
            type: types.EMPLOYEER_EXPENSE_DETAILS,
            employeerExpenseDetails: item,
          });
          RootNavigation.navigate('ExpenseDetails', {
            id,
          });
        }}
        title={item?.title}
        price={`£ ${item?.cost}`}
        description={item?.expense.title}
        fragmentSelected="ExpensesAwaiting"
        status={item?.status}
        type="Expenses"
      />
    );
  };

  const listEmptyComponentFinanceExpenses = () => {
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
          {filteredFinanceExpenses !== '' ? 'No expenses found' : ''}
        </Text>
      </View>
    );
  };

  const getSearchFinanceSavedEstimate = async () => {
    setFilteredFinanceSavedEstimate(savedQuotes);
    setMasterFinanceSavedEstimate(savedQuotes);
  };

  const searchFinanceSavedEstimateFunc = () => {
    setCheckFinanceSavedEstimate(!checkFinanceSavedEstimate);
    getSearchFinanceSavedEstimate();
  };

  const searchFilterFinanceSavedEstimateFunction = (text) => {
    if (text) {
      const newData0 = masterFinanceSavedEstimate.filter(function (item) {
        const itemData0 = item?.title
          ? item?.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredFinanceSavedEstimate(newData0);
      setSearch(text);
    } else {
      setFilteredFinanceSavedEstimate(masterFinanceSavedEstimate);
      setSearch(text);
    }
  };

  const ItemViewFinanceSavedEstimate = ({item, index}) => {
    let id = item.job_id;
    return (
      <FinanceCardClient
        onPress={() => saveQuotePress(id)}
        title={item?.title}
        date={item?.date}
        quote={`${item?.id}:  £${item?.total_cost}`}
        fragmentSelected="ExpensesAwaiting"
        status={item?.status}
        type="Expenses"
      />
    );
  };

  const listEmptyComponentSavedEstimate = () => {
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
          {filteredFinanceSavedEstimate !== '' ? 'No saved estimate found' : ''}
        </Text>
      </View>
    );
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
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
                paddingLeft: 20,
                fontSize: 17,
                color: colors.darkGrey,
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
                contentContainerStyle={{
                  paddingLeft: widthPercentageToDP('5.8%'),
                }}>
                <Button
                  onPress={() => {
                    setSelected(1);
                    setCheckFinanceInprocess(false);
                    setCheckFinanceCompleted(false);
                    setCheckFinanceExpenses(false);
                    setCheckFinanceSavedEstimate(false);
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
                  Overview
                </Button>
                <Button
                  onPress={() => {
                    setSelected(2);
                    setCheckFinanceInprocess(false);
                    setCheckFinanceCompleted(false);
                    setCheckFinanceExpenses(false);
                    setCheckFinanceSavedEstimate(false);
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
                  In Process
                </Button>

                <Button
                  onPress={() => {
                    setSelected(3);
                    setCheckFinanceInprocess(false);
                    setCheckFinanceCompleted(false);
                    setCheckFinanceExpenses(false);
                    setCheckFinanceSavedEstimate(false);
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
                  Completed
                </Button>
                <Button
                  onPress={() => {
                    setSelected(4);
                    setCheckFinanceInprocess(false);
                    setCheckFinanceCompleted(false);
                    setCheckFinanceExpenses(false);
                    setCheckFinanceSavedEstimate(false);
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
                  Expenses
                </Button>
                <Button
                  onPress={() => {
                    setSelected(5);
                    setCheckFinanceInprocess(false);
                    setCheckFinanceCompleted(false);
                    setCheckFinanceExpenses(false);
                    setCheckFinanceSavedEstimate(false);
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
                  Saved Estimate
                </Button>
              </ScrollView>
            </View>
          </View>
        </>
      ) : null}
      <ScrollView
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
                    <Heading
                      containerStyle={[styles.headingCon, {marginLeft: 20}]}
                      style={styles.heading}>
                      Finance
                    </Heading>

                    <View
                      style={[
                        styles.firstRow,
                        {marginTop: heightPercentageToDP('1.5%')},
                      ]}>
                      <Card
                        smallText
                        label="TOTAL SPEND"
                        total={`£ ${totalSpend}`}
                      />
                      <Card
                        smallText
                        label="TOTAL FEES"
                        total={`£ ${totalFee}`}
                      />
                    </View>

                    <FlatList
                      data={
                        overView?.last_invoice_due
                          ? [overView?.last_invoice_due]
                          : []
                      }
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <>
                            <View
                              style={[
                                styles.firstRow,
                                {
                                  paddingVertical: widthPercentageToDP('3%'),
                                  marginTop: heightPercentageToDP('1.5%'),
                                },
                              ]}>
                              <FinanceCardClient
                                onPress={() =>
                                  navigation.navigate(
                                    'InvoicePaymentClientDetails',
                                    {details: item},
                                  )
                                }
                                title={
                                  item?.title ? item?.title : 'No Invoice Due'
                                }
                                invoiceHeadingLast={'INVOICE DUE'}
                                date={item?.date}
                                invoiceNumber={
                                  item?.invoice && item?.total_cost
                                    ? item?.invoice +
                                      ': ' +
                                      ' £' +
                                      item?.total_cost
                                    : null
                                }
                                check={false}
                                image={{uri: item?.company?.logo}}
                                fragmentSelected="overView"
                                type="new"
                                completedDateStatus={item?.due_by}
                                //completedDateStatus={item?.date}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    <FlatList
                      data={
                        overView?.last_invoice_completed
                          ? [overView?.last_invoice_completed]
                          : []
                      }
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <>
                            <View
                              style={[
                                styles.firstRow,
                                {paddingVertical: widthPercentageToDP('3%')},
                              ]}>
                              <FinanceCardClient
                                onPress={() =>
                                  navigation.navigate(
                                    'InvoicePaymentClientDetails',
                                  )
                                }
                                title={
                                  item?.title
                                    ? item?.title
                                    : 'No Completed Invoice'
                                }
                                invoiceHeadingLast={'LAST INVOICE COMPLETE'}
                                check={true}
                                image={{uri: item?.company?.logo}}
                                date={item?.date}
                                invoiceNumber={
                                  item?.invoice && item?.total_cost
                                    ? item?.invoice +
                                      ': ' +
                                      ' £' +
                                      item?.total_cost
                                    : null
                                }
                                fragmentSelected="overView"
                                type="new"
                                completedDateStatus={item?.due_by}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                  </>
                ) : null}
                {selected === 2 ? (
                  <>
                    {checkFinanceInprocess ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search pending invoices"
                            placeholderTextColor={colors.lightWhite}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) =>
                              searchFilterFinanceInProcessFunction(text)
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
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => searchFinanceInPrrocessFunc()}
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

                              marginTop: 20,
                              marginBottom: 20,
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
                      <View style={styles.linebox}>
                        <View>
                          <Heading
                            containerStyle={styles.headingCon}
                            style={styles.heading}>
                            Finance
                          </Heading>
                          <Text style={styles.textPending}>
                            {inProgress?.length} Pending Invoices
                          </Text>
                        </View>
                        <View style={{marginTop: 20, marginLeft: -20}}>
                          <TouchableOpacity
                            onPress={() =>
                              setCheckFinanceInprocess(!checkFinanceInprocess)
                            }>
                            <FilterIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {checkFinanceInprocess ? (
                      <FlatList
                        data={filteredFinanceInProcess}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        ListEmptyComponent={listEmptyComponentFinanceInProcess}
                        renderItem={ItemViewFinanceInProcess}
                      />
                    ) : (
                      <FlatList
                        data={inProgress}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          return (
                            <>
                              <View
                                style={[
                                  styles.firstRow,
                                  {
                                    paddingHorizontal: widthPercentageToDP(
                                      '0%',
                                    ),
                                  },
                                ]}>
                                <FinanceCardClient
                                  onPress={() =>
                                    navigation.navigate('FinanceDetails')
                                  }
                                  title={item?.title}
                                  invoiceNumber={
                                    item?.invoice +
                                    ': ' +
                                    ' £ ' +
                                    item?.total_cost
                                  }
                                  date={item?.date}
                                  fragmentSelected="inProcess"
                                  type="inProcess"
                                />
                              </View>
                            </>
                          );
                        }}
                      />
                    )}
                  </>
                ) : null}

                {selected === 3 ? (
                  <>
                    {checkFinanceCompleted ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search completed payments"
                            placeholderTextColor={colors.lightWhite}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) =>
                              searchFilterFinanceCompletedFunction(text)
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
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => searchFinanceCompletedFunc()}
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

                              marginTop: 20,
                              marginBottom: 20,
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
                      <View style={styles.linebox}>
                        <View>
                          <Heading
                            containerStyle={styles.headingCon}
                            style={styles.heading}>
                            Finance
                          </Heading>
                          <Text style={styles.textPending}>
                            {completedFinance?.length} Completed Payments
                          </Text>
                        </View>
                        <View style={{marginTop: 20, marginLeft: -20}}>
                          <TouchableOpacity
                            onPress={() =>
                              setCheckFinanceCompleted(!checkFinanceCompleted)
                            }>
                            <FilterIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {checkFinanceCompleted ? (
                      <FlatList
                        data={filteredFinanceCompleted}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        ListEmptyComponent={listEmptyComponentFinanceCompleted}
                        renderItem={ItemViewFinanceCompleted}
                      />
                    ) : (
                      <FlatList
                        data={completedFinance}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          return (
                            <>
                              <View
                                style={[
                                  styles.firstRow,
                                  {
                                    paddingHorizontal: widthPercentageToDP(
                                      '0%',
                                    ),
                                  },
                                ]}>
                                <FinanceCardClient
                                  onPress={() =>
                                    navigation.navigate('FinanceDetails')
                                  }
                                  title={item?.title}
                                  invoiceNumber={
                                    item?.invoice +
                                    ': ' +
                                    ' £ ' +
                                    item?.total_cost
                                  }
                                  date={item?.date}
                                  fragmentSelected="completed"
                                  type="completed"
                                  download={false}
                                />
                              </View>
                            </>
                          );
                        }}
                      />
                    )}
                  </>
                ) : null}
                {selected === 4 ? (
                  <>
                    {checkFinanceExpenses ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search pending invoices"
                            placeholderTextColor={colors.lightWhite}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) =>
                              searchFilterFinanceExpensesFunction(text)
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
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => searchFinanceExpensesFunc()}
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

                              marginTop: 20,
                              marginBottom: 20,
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
                      <View style={styles.linebox}>
                        <View>
                          <Heading
                            containerStyle={styles.headingCon}
                            style={styles.heading}>
                            Finance
                          </Heading>
                          <Text style={styles.textPending}>
                            {expenses?.length} Expenses
                          </Text>
                        </View>
                        <View style={{marginTop: 20, marginLeft: -20}}>
                          <TouchableOpacity
                            onPress={() =>
                              setCheckFinanceExpenses(!checkFinanceExpenses)
                            }>
                            <FilterIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {checkFinanceExpenses ? (
                      <FlatList
                        data={filteredFinanceExpenses}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        ListEmptyComponent={listEmptyComponentFinanceExpenses}
                        renderItem={ItemViewFinanceExpenses}
                      />
                    ) : (
                      <FlatList
                        data={expenses}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          let id = item?.id;
                          return (
                            <>
                              <View
                                style={[
                                  styles.firstRow,
                                  {
                                    paddingHorizontal: widthPercentageToDP(
                                      '0%',
                                    ),
                                  },
                                ]}>
                                <FinanceCardClient
                                  onPress={() => {
                                    dispatch({
                                      type: types.EMPLOYEER_EXPENSE_DETAILS,
                                      employeerExpenseDetails: item,
                                    });
                                    RootNavigation.navigate('ExpenseDetails', {
                                      id,
                                    });
                                  }}
                                  title={item?.title}
                                  price={`£ ${item?.cost}`}
                                  description={item?.expense.title}
                                  fragmentSelected="ExpensesAwaiting"
                                  status={item?.status}
                                  type="Expenses"
                                />
                              </View>
                            </>
                          );
                        }}
                      />
                    )}
                  </>
                ) : null}
                {selected === 5 ? (
                  <>
                    {checkFinanceSavedEstimate ? (
                      <View style={styles.row}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextInput
                            placeholder="Search saved estimates"
                            placeholderTextColor={colors.lightWhite}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) =>
                              searchFilterFinanceSavedEstimateFunction(text)
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
                              marginTop: 20,
                              marginBottom: 20,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => searchFinanceSavedEstimateFunc()}
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

                              marginTop: 20,
                              marginBottom: 20,
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
                      <View style={styles.linebox}>
                        <View>
                          <Heading
                            containerStyle={styles.headingCon}
                            style={styles.heading}>
                            Finance
                          </Heading>
                          <Text style={styles.textPending}>
                            {savedQuotes.length} Saved Estimate
                          </Text>
                        </View>
                        <View style={{marginTop: 20, marginLeft: -20}}>
                          <TouchableOpacity
                            onPress={() =>
                              setCheckFinanceSavedEstimate(
                                !checkFinanceSavedEstimate,
                              )
                            }>
                            <FilterIcon />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {checkFinanceSavedEstimate ? (
                      <FlatList
                        data={filteredFinanceSavedEstimate}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        ListEmptyComponent={listEmptyComponentSavedEstimate}
                        renderItem={ItemViewFinanceSavedEstimate}
                      />
                    ) : (
                      <FlatList
                        data={savedQuotes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          let id = item.job_id;
                          return (
                            <>
                              <View
                                style={[
                                  styles.firstRow,
                                  {
                                    paddingHorizontal: widthPercentageToDP(
                                      '0%',
                                    ),
                                  },
                                ]}>
                                <FinanceCardClient
                                  onPress={() => saveQuotePress(id)}
                                  title={item?.title}
                                  date={item?.date}
                                  quote={`${item?.id}:  £${item?.total_cost}`}
                                  fragmentSelected="ExpensesAwaiting"
                                  status={item?.status}
                                  type="Expenses"
                                />
                              </View>
                            </>
                          );
                        }}
                      />
                    )}
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
                        color: '#3EB561',
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
                        color: '#3EB561',
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
                        color: '#3EB561',
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
      </ScrollView>
    </Container>
  );
}
