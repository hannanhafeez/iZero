import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  SectionList,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Heading,
  Button,
  JobCardClientSearchTab,
} from '../../Components';
import styles from './Styles';
import {ArrowIcon, ChatIcon, PhoneaIcon} from '../../Assets/Icons';
import {widthConverter, heightConverter} from '../../Helpers/Responsive';
import {SearchIcon, FilterIcon} from '../../Assets/Icons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {useSelector, useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Api from '../../api';
import {RFValue} from 'react-native-responsive-fontsize';

import IconCross from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import colors from '../../Constants/colors';

export default function BookingListTalent({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  let bookListParams = route.params.daywith;

  const [search, setSearch] = useState('');
  const [filteredDataSource0, setFilteredDataSource0] = useState([]);
  const [masterDataSource0, setMasterDataSource0] = useState([]);

  const [filteredDataSource1, setFilteredDataSource1] = useState([]);
  const [masterDataSource1, setMasterDataSource1] = useState([]);

  const [filteredDataSource2, setFilteredDataSource2] = useState([]);
  const [masterDataSource2, setMasterDataSource2] = useState([]);

  let today = new Date();

  let today2 = new Date(bookListParams);

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  let day1 = today2?.toString()?.split(' ')[0];
  let date1 = today2?.toString()?.split(' ')[2];
  let month1 = today2?.toString()?.split(' ')[1];
  let year1 = today2?.toString()?.split(' ')[3];

  var currentDate1 = day1 + ' ' + date1 + ' ' + month1 + ' ' + year1;

  const [JobsDataSource, setJobsDataSource] = useState();

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);
  var JobsData = {};

  useEffect(() => {
    console.log('BookingListTalent');
    getSearchData();
    //getTalentClanderList();
    getCalenderAdded();
    setCheckSearch(false);
  }, [isFocused]);

  const searchFunc = () => {
    setCheckSearch(!checkSearch);
    getSearchData();
  };

  const getTalentClanderList = async () => {
    setLoading(false);
    let temp = [];
    try {
      let res = await Api.get('/talent_calender_list', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Calendar Staff List Api Response', res);

      for (var v = 0; v < res?.data?.data.length; v++) {
        JobsData[moment(res?.data?.data[v].date_time).format('YYYY-MM-DD')] =
          res?.data?.data[v].jobs;
      }

      temp = JobsData[bookListParams];
      setJobsDataSource(temp);
      console.log('JobsDataSource', JobsDataSource);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getCalenderAdded = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/talent_calender_list?date=${bookListParams}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Calender Show Jobs Staff Api Response', res);
      setJobsDataSource(res?.data?.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const getSearchData = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/search_all_data', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Iboard Search employer Api Response', res);
      setLoading(true);
      setFilteredDataSource0(res?.data?.jobs);
      setMasterDataSource0(res?.data?.jobs);

      setFilteredDataSource1(res?.data?.talents);
      setMasterDataSource1(res?.data?.talents);

      setFilteredDataSource2(res?.data?.finance);
      setMasterDataSource2(res?.data?.finance);
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
        const itemData1 =
          item.first_name && item?.user_sector?.title
            ? item.first_name.toUpperCase() +
              ' ' +
              item?.user_sector?.title.toUpperCase()
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
            image={{uri: item?.company?.logo}}
            title={item?.title}
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
          {checkSearch == false ? (
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
          ) : null}
        </View>
        {checkSearch ? (
          <>
            <TextInput
              placeholder="Search iZero"
              underlineColorAndroid="transparent"
              placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
                paddingLeft: 20,
                fontSize: 17,
              }}
            />
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
              <IconCross name="cross" size={30} color={colors.pureBlack} />
            </TouchableOpacity>
          </>
        ) : (
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
        )}
      </View>

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
                <View style={styles.row}>
                  <View style={styles.innerrow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <ArrowIcon style={styles.rotate} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Bookings</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Available')}>
                    <View style={styles.tag} style={styles.tagOne}>
                      <Text style={styles.tagTextOne}>Set Availability</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* <Text style={styles.heading}>Today, June 6</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('BookingAddCalenderTalent')}>
                  <View style={[styles.section]}>
                    <View style={styles.oval}></View>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                      <Text style={styles.title}>Brand Ambassador Set Up</Text>

                      <Text style={styles.date}>07:00 - 08:30</Text>

                      <View
                        style={[
                          styles.row,
                          {
                            paddingBottom: 0,
                            paddingHorizontal: 0,
                            paddingTop: 0,
                            width: '100%',
                          },
                        ]}>
                        <View style={styles.innerrow}>
                          <Image
                            source={require('../../Assets/Demo/Face.png')}
                            style={styles.image}
                          />
                          <Image
                            source={require('../../Assets/Demo/Face.png')}
                            style={styles.image}
                          />
                          <Image
                            source={require('../../Assets/Demo/Face.png')}
                            style={styles.image}
                          />
                        </View>

                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Active Job</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <Text style={styles.heading}>Today, June 6</Text>

                <View
                  style={[
                    styles.section,
                    {
                      height: heightConverter(88),
                      backgroundColor: '"rgba(0, 145, 255, 0.05)"',
                    },
                  ]}>
                  <View
                    style={[styles.oval, {backgroundColor: colors.darkBlueHigh}]}></View>
                  <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <Text style={styles.title}>Brand Ambassador</Text>

                    <View
                      style={[
                        styles.row,
                        {
                          paddingBottom: 0,
                          paddingHorizontal: 0,
                          paddingTop: 0,
                          width: '100%',
                        },
                      ]}>
                      <View>
                        <Text style={[styles.date, {color: '#24334c'}]}>
                          07:00 - 08:30
                        </Text>
                        <Text style={[styles.date, {color: '#24334c'}]}>
                          Fee: £120.00
                        </Text>
                      </View>
                      <View style={[styles.tag, {borderColor: colors.darkBlueHigh}]}>
                        <Text style={[styles.tagText, {color: colors.darkBlueHigh}]}>
                          Active Job
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[styles.section]}>
                  <View style={styles.oval}></View>
                  <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <Text style={styles.title}>Brand Ambassador Set Up</Text>

                    <Text style={styles.date}>07:00 - 08:30</Text>

                    <View
                      style={[
                        styles.row,
                        {
                          paddingBottom: 0,
                          paddingHorizontal: 0,
                          paddingTop: 0,
                          width: '100%',
                        },
                      ]}>
                      <View style={styles.innerrow}>
                        <Image
                          source={require('../../Assets/Demo/Face.png')}
                          style={styles.image}
                        />
                        <Image
                          source={require('../../Assets/Demo/Face.png')}
                          style={styles.image}
                        />
                        <Image
                          source={require('../../Assets/Demo/Face.png')}
                          style={styles.image}
                        />
                      </View>

                      <View style={styles.tag}>
                        <Text style={styles.tagText}>Active Job</Text>
                      </View>
                    </View>
                  </View>
                </View> */}

                {/* <Text style={styles.heading}>{currentDate1}</Text> */}

                <SectionList
                  sections={JobsDataSource}
                  keyExtractor={(item, index) => item}
                  renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.heading}>{title}</Text>
                  )}
                  renderItem={({item, index}) => {
                    let jobData = item;
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('BookingAddCalenderTalent', {
                              jobData: jobData,
                            })
                          }>
                          <View style={[styles.section]}>
                            <View style={styles.oval}></View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'space-between',
                              }}>
                              <Text style={styles.title}>
                                {item?.job_tilte}
                              </Text>

                              <Text style={styles.date}>
                                {item?.start_time?.substring(
                                  0,
                                  item?.start_time?.length - 3,
                                ) +
                                  ' - ' +
                                  item?.end_time?.substring(
                                    0,
                                    item?.end_time?.length - 3,
                                  )}
                              </Text>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  flex: 1,
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    width: '54%',
                                  }}>
                                  <FlatList
                                    horizontal={true}
                                    data={item?.job_user}
                                    //data={temp1}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    ListEmptyComponent={() => (
                                      <View
                                        style={{
                                          flex: 1,
                                          justifyContent: 'flex-end',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            color: '#24334c',
                                          }}>
                                          No staff found
                                        </Text>
                                      </View>
                                    )}
                                    renderItem={({item, index}) => (
                                      <>
                                        {index < 2 ? (
                                          <>
                                            <View
                                              style={{
                                                flex: 1,
                                                justifyContent: 'flex-end',
                                              }}>
                                              <Image
                                                style={{
                                                  width: 30,
                                                  height: 30,
                                                  borderRadius: 30,
                                                }}
                                                source={
                                                  item?.avatar !== null
                                                    ? {uri: item?.avatar}
                                                    : require('../../Assets/Images/avatar.png')
                                                }
                                              />
                                            </View>
                                            <View style={{marginLeft: 10}} />
                                          </>
                                        ) : (
                                          <>
                                            {index ===
                                              item?.job_user?.length - 1 &&
                                            item?.job_user?.length > 2 ? (
                                              <View
                                                style={{
                                                  marginTop: 35,
                                                  marginLeft: 10,
                                                  width: widthPercentageToDP(
                                                    '20%',
                                                  ),
                                                }}>
                                                <Text>
                                                  + {item?.job_user?.length - 2}{' '}
                                                  other
                                                </Text>
                                              </View>
                                            ) : null}
                                          </>
                                        )}
                                      </>
                                    )}
                                    keyExtractor={(item, index) =>
                                      index.toString()
                                    }
                                  />
                                </View>
                                <View
                                  style={{flex: 1, justifyContent: 'flex-end'}}>
                                  <View style={styles.tag}>
                                    <Text style={styles.tagText}>
                                      Active Job
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            {filteredDataSource0.length > 0 ? (
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
              data={filteredDataSource0}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              //ListEmptyComponent={listEmptyComponent}
              renderItem={ItemView0}
            />
            {filteredDataSource1.length > 0 ? (
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
                  TALENTS
                </Text>
              </View>
            ) : null}
            <FlatList
              data={filteredDataSource1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              //ListEmptyComponent={listEmptyComponent}
              renderItem={ItemView2}
            />
            {filteredDataSource2.length > 0 ? (
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
              data={filteredDataSource2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              //ListEmptyComponent={listEmptyComponent}
              renderItem={ItemView3}
            />
          </>
        )}
      </ScrollView>
    </Container>
  );
}
