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
  FinanceCard,
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
import {SearchIcon} from '../../Assets/Icons';

import IconBell from 'react-native-vector-icons/FontAwesome';
import colors from '../../Constants/colors';

export default function Finance({navigation, route}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(route?.params ? 4 : 1);
  const [loading, setLoading] = useState(true);

  const [expenseApproved, setExpenseApproved] = useState('');
  const [expenseDeclined, setExpenseDeclined] = useState('');
  const [expensePending, setExpensePending] = useState('');

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const totalSpend = useSelector((state) => state?.app?.totalSpend);
  const totalFee = useSelector((state) => state?.app?.totalFee);
  const user = useSelector((state) => state?.auth?.user);

  const overView = useSelector((state) => state?.app?.overView);
  const inProgress = useSelector((state) => state?.app?.inProgress);
  const completedFinance = useSelector((state) => state?.app?.completedFinance);
  const expenses = useSelector((state) => state?.app?.expenses);

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
  const [filteredDataSource0, setFilteredDataSource0] = useState([]);
  const [masterDataSource0, setMasterDataSource0] = useState([]);

  const [filteredDataSource1, setFilteredDataSource1] = useState([]);
  const [masterDataSource1, setMasterDataSource1] = useState([]);

  const [filteredDataSource2, setFilteredDataSource2] = useState([]);
  const [masterDataSource2, setMasterDataSource2] = useState([]);

  useEffect(() => {
    console.log('Finance Staff');
    setCheckSearch(false);
    //getSearchData();
    getDataFinance();
    //getDataJobs();
  }, [isFocused]);

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const getDataJobs = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/jobs', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Jobs Staff Api Response', res);
      setLoading(true);

      dispatch({
        type: types.APPLICANTS,
        applicants: res?.data?.data?.applicants,
      });
      dispatch({
        type: types.COMPLETED,
        completed: res?.data?.data?.completed,
      });
      dispatch({
        type: types.FAVOURITE,
        favorite: res?.data?.data?.favorites,
      });
      dispatch({
        type: types.LIVE,
        live: res?.data?.data?.live,
      });

      dispatch({
        type: types.UP_COMINGS,
        upComing: res?.data?.data?.upcoming,
      });

      dispatch({
        type: types.TALENTS,
        talents: res?.data?.data?.talents,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getDataFinance = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talent_finance', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Finance Api Response', res);
      setLoading(true);

      dispatch({
        type: types.TOTAL_SPEND,
        totalSpend: res?.data?.total_earn,
      });

      dispatch({
        type: types.TOTAL_FEE,
        totalFee: res?.data?.total_deduction,
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
        expenses: res?.data?.expenses?.expense_data,
      });

      setExpenseApproved(res?.data?.expenses?.approved);
      setExpenseDeclined(res?.data?.expenses?.declined);
      setExpensePending(res?.data?.expenses?.pending);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/talent_finance', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search Staff Api Response', res);

      setFilteredDataSource0(res?.data?.completed);
      setMasterDataSource0(res?.data?.completed);

      setFilteredDataSource1(res?.data?.expenses?.expense_data);
      setMasterDataSource1(res?.data?.expenses?.expense_data);

      setFilteredDataSource2(res?.data?.in_process);
      setMasterDataSource2(res?.data?.in_process);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData0 = masterDataSource0.filter(function (item) {
        const itemData0 = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData0 = text.toUpperCase();
        return itemData0.indexOf(textData0) > -1;
      });
      setFilteredDataSource0(newData0);
      setSearch(text);

      const newData1 = masterDataSource1.filter(function (item) {
        const itemData1 = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData1 = text.toUpperCase();
        return itemData1.indexOf(textData1) > -1;
      });
      setFilteredDataSource1(newData1);
      setSearch(text);

      const newData2 = masterDataSource2.filter(function (item) {
        const itemData2 = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData2 = text.toUpperCase();
        return itemData2.indexOf(textData2) > -1;
      });
      setFilteredDataSource2(newData2);
      setSearch(text);
    } else {
      setFilteredDataSource0(masterDataSource0);
      setFilteredDataSource1(masterDataSource1);
      setFilteredDataSource2(masterDataSource2);
      setSearch(text);
    }
  };

  const ItemView0 = ({item}) => {
    let id = item?.id;
    return (
      <>
        <View style={styles.firstRow}>
          <View style={{marginLeft: 5}}>
            <FinanceCard
              onPress={() =>
                navigation.navigate('FinancePaySlipTalent', {
                  id,
                })
              }
              title={item?.title}
              price={'£' + item?.total_cost}
              time={'12:30 - 16:30'}
              completedDate={'Wed 25 Jun'}
              fragmentSelected="completed"
              type="completed"
            />
          </View>
        </View>
      </>
    );
  };

  const ItemView2 = ({item}) => {
    let id = item?.id;

    let expenseActionDate = new Date(item?.actioned_date);
    let expenseDayAction = expenseActionDate?.toString()?.split(' ')[0];
    let expenseDateAction = expenseActionDate?.toString()?.split(' ')[2];
    let expenseMonthAction = expenseActionDate?.toString()?.split(' ')[1];

    var expenseActionDateFinal =
      expenseDayAction + ' ' + expenseDateAction + ' ' + expenseMonthAction;

    let expenseCreatedDate = new Date(item?.created_at);
    let expenseDayCreated = expenseCreatedDate?.toString()?.split(' ')[0];
    let expenseDateCreated = expenseCreatedDate?.toString()?.split(' ')[2];
    let expenseMonthCreated = expenseCreatedDate?.toString()?.split(' ')[1];

    var expenseActionDateFinal =
      expenseDayCreated + ' ' + expenseDateCreated + ' ' + expenseMonthCreated;

    return (
      <>
        <View style={styles.firstRow}>
          <FinanceCard
            onPress={() => {
              dispatch({
                type: types.STAFF_EXPENSE_DETAILS,
                staffExpenseDetails: item,
              });
              navigation.navigate('ExpenseDetailsTalent', {
                id,
              });
            }}
            title={item?.title}
            price={'£' + item?.cost}
            description={item?.description}
            //time={'12:30 - 16:30'}
            date={
              item.actioned_date
                ? expenseActionDateFinal
                : expenseActionDateFinal
            }
            status={item?.status}
            fragmentSelected="Expenses"
            type="Expenses"
          />
        </View>
      </>
    );
  };

  const ItemView3 = ({item}) => {
    let id = item?.id;
    return (
      <>
        <View style={styles.firstRow}>
          <FinanceCard
            onPress={() =>
              navigation.navigate('FinancePaySlipTalent', {
                id,
              })
            }
            title={item?.title}
            price={'£' + item?.total_cost}
            time={'12:30 - 16:30'}
            date={item?.date}
            dueDate={'Wed 25 Jun'}
            fragmentSelected="inProcess"
            type="inProcess"
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
          {filteredDataSource0 !== '' &&
          filteredDataSource1 !== '' &&
          filteredDataSource2 !== ''
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
              onPress={() => navigation.navigate('NotificationsTalent')}
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
              onPress={() => navigation.navigate('NotificationsTalent')}
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
                  onPress={() => setSelected(2)}
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
                  onPress={() => setSelected(3)}
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
                  onPress={() => setSelected(4)}
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
              </ScrollView>
            </View>
          </View>
        </>
      ) : null}
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {checkSearch == false ? (
          <>
            {loading == false ? (
              <View style={{marginTop: 20}}>
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              </View>
            ) : (
              <>
                {selected === 1 ? (
                  <>
                    <Heading
                      containerStyle={styles.headingCon}
                      style={styles.heading}>
                      Finance
                    </Heading>
                    <View
                      style={[
                        styles.firstRow,
                        {
                          paddingVertical: widthPercentageToDP('2.5%'),
                          paddingBottom: 20,
                        },
                      ]}>
                      <View
                        style={{
                          width: widthPercentageToDP('88%'),
                          paddingVertical: heightPercentageToDP('1.4%'),
                          borderRadius: 5,
                          backgroundColor: colors.pureWhite,
                          shadowColor: 'rgba(0, 0, 0, 0.07)',
                          shadowOffset: {
                            width: 7,
                            height: 7,
                          },
                          shadowRadius: 25,
                          shadowOpacity: 1,
                          borderStyle: 'solid',
                          borderWidth: 1,
                          borderColor: '#efefef',
                          paddingHorizontal: widthPercentageToDP('3.4%'),
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa-Bold',
                            fontSize: RFValue(13, 812),
                            fontWeight: 'bold',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#3eb561',
                          }}>
                          TOTAL EARNINGS
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Europa-Bold',
                            fontSize: RFValue(22, 812),
                            fontWeight: 'bold',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            fontSize: RFValue(22, 812),
                          }}>
                          {totalSpend ? `£ ${totalSpend}` : '0'}
                        </Text>
                      </View>

                      {/* <Card
                        smallText
                        label="TOTAL EARNINGS"
                        total={`£ ${totalSpend}`}
                        width={{width: '80%'}}
                      /> */}
                      {/* <Card
                        smallText
                        label="TOTAL DEDUCTIONS"
                        total={`£ ${totalFee}`}
                      /> */}
                    </View>

                    <FlatList
                      data={
                        overView?.last_invoice_due
                          ? [overView?.last_invoice_due]
                          : []
                      }
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let id = item?.id;
                        return (
                          <>
                            <View
                              style={[
                                styles.firstRow,
                                {
                                  paddingVertical: widthPercentageToDP('3%'),
                                  marginTop: heightPercentageToDP('1%'),
                                },
                              ]}>
                              <FinanceCard
                                onPress={() =>
                                  navigation.navigate('FinancePaySlipTalent', {
                                    id,
                                  })
                                }
                                title={item?.title}
                                //address="11 Hunstable Area, London, NW8 6LJ"
                                price={'£' + item?.total_cost}
                                image={item?.company?.logo}
                                time="12:30 - 16:30"
                                date={'Wed 25 june'}
                                fragmentSelected="overView"
                                type="new"
                                nextPay={true}
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
                        let id = item?.id;
                        return (
                          <>
                            <View
                              style={[
                                styles.firstRow,
                                {
                                  paddingVertical: widthPercentageToDP('3%'),
                                  marginTop: heightPercentageToDP('1%'),
                                },
                              ]}>
                              <FinanceCard
                                onPress={() =>
                                  navigation.navigate('FinancePaySlipTalent', {
                                    id,
                                  })
                                }
                                title={item?.title}
                                //address="11 Hunstable Area, London, NW8 6LJ"
                                price={'£' + item?.total_cost}
                                image={item?.company?.logo}
                                time="12:30 - 16:30"
                                fragmentSelected="overView"
                                type="new"
                                completedDate={'Wed 25 june'}
                                nextPay={false}
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
                    <Heading
                      containerStyle={styles.headingCon}
                      style={styles.heading}>
                      Finance
                    </Heading>
                    <View style={styles.row}>
                      <Text style={styles.textPending}>
                        {inProgress?.length} Pending Payments
                      </Text>
                    </View>

                    <FlatList
                      data={inProgress}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let id = item?.id;
                        return (
                          <>
                            {/* <FinanceCard
                  onPress={() => navigation.navigate('FinanceDetails')}
                  title="Brand Ambassador"
                  address="11 Hunstable Area, 
              London, NW8 6LJ"
                  price="125.00"
                  time="12:30 - 16:30"
                  fragmentSelected="inProcess"
                  type="inProcess"
                /> */}
                            <View style={styles.firstRow}>
                              <FinanceCard
                                onPress={() =>
                                  navigation.navigate('FinancePaySlipTalent', {
                                    id,
                                  })
                                }
                                title={item?.title}
                                price={'£' + item?.total_cost}
                                time={'12:30 - 16:30'}
                                date={item?.date}
                                dueDate={'Wed 25 Jun'}
                                fragmentSelected="inProcess"
                                type="inProcess"
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                  </>
                ) : null}

                {selected === 3 ? (
                  <>
                    <Heading
                      containerStyle={styles.headingCon}
                      style={styles.heading}>
                      Finance
                    </Heading>
                    <View style={styles.row}>
                      <Text style={styles.textPending}>
                        {completedFinance?.length} Completed Payments
                      </Text>
                    </View>

                    <FlatList
                      data={completedFinance}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let id = item?.id;
                        return (
                          <>
                            <View style={styles.firstRow}>
                              <FinanceCard
                                onPress={() =>
                                  navigation.navigate('FinancePaySlipTalent', {
                                    id,
                                  })
                                }
                                title={item?.title}
                                price={'£' + item?.total_cost}
                                time={'12:30 - 16:30'}
                                completedDate={'Wed 25 Jun'}
                                //completedDate={item?.date?.split(' ')[0]}
                                fragmentSelected="completed"
                                type="completed"
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                  </>
                ) : null}

                {selected === 4 ? (
                  <>
                    <Heading
                      containerStyle={styles.headingCon}
                      style={styles.heading}>
                      Finance
                    </Heading>
                    <View style={styles.row}>
                      <Text style={styles.textPending}>
                        {expenseApproved ? expenseApproved : 0} Confirmed,{' '}
                        {expensePending ? expensePending : 0} Pending,{' '}
                        {expenseDeclined ? expenseDeclined : 0} Declined Expense
                      </Text>
                    </View>

                    <FlatList
                      data={expenses}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        let id = item?.id;

                        let expenseActionDate = new Date(item?.actioned_date);
                        let expenseDayAction = expenseActionDate
                          ?.toString()
                          ?.split(' ')[0];
                        let expenseDateAction = expenseActionDate
                          ?.toString()
                          ?.split(' ')[2];
                        let expenseMonthAction = expenseActionDate
                          ?.toString()
                          ?.split(' ')[1];

                        var expenseActionDateFinal =
                          expenseDayAction +
                          ' ' +
                          expenseDateAction +
                          ' ' +
                          expenseMonthAction;

                        let expenseCreatedDate = new Date(item?.created_at);
                        let expenseDayCreated = expenseCreatedDate
                          ?.toString()
                          ?.split(' ')[0];
                        let expenseDateCreated = expenseCreatedDate
                          ?.toString()
                          ?.split(' ')[2];
                        let expenseMonthCreated = expenseCreatedDate
                          ?.toString()
                          ?.split(' ')[1];

                        var expenseActionDateFinal =
                          expenseDayCreated +
                          ' ' +
                          expenseDateCreated +
                          ' ' +
                          expenseMonthCreated;

                        return (
                          <>
                            <View style={styles.firstRow}>
                              <FinanceCard
                                onPress={() => {
                                  dispatch({
                                    type: types.STAFF_EXPENSE_DETAILS,
                                    staffExpenseDetails: item,
                                  });
                                  navigation.navigate('ExpenseDetailsTalent', {
                                    id,
                                  });
                                }}
                                title={item?.title}
                                price={'£' + item?.cost}
                                description={item?.description}
                                //time={'12:30 - 16:30'}
                                date={
                                  item.actioned_date
                                    ? expenseActionDateFinal
                                    : expenseActionDateFinal
                                }
                                status={item?.status}
                                fragmentSelected="Expenses"
                                type="Expenses"
                              />
                            </View>
                          </>
                        );
                      }}
                    />
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
                <FlatList
                  data={filteredDataSource0}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView0}
                />
                <FlatList
                  data={filteredDataSource1}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  //ListEmptyComponent={listEmptyComponent}
                  renderItem={ItemView2}
                />
                <FlatList
                  data={filteredDataSource2}
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
      {checkSearch ? null : (
        <>
          {selected === 4 ? (
            <TouchableOpacity
              style={{
                borderWidth: 8,
                borderColor: 'rgba(60,179,113,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 63,
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 63,
                backgroundColor: '#3EB561',
                borderRadius: 100,
              }}
              onPress={() => navigation.navigate('UploadExpensesTalent')}>
              <Text style={{color: colors.pureWhite, fontWeight: 'bold'}}>
                ADD
              </Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </Container>
  );
}
