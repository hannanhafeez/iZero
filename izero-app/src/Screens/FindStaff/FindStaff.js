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

import {SearchIcon, FilterIcon, ArrowIcon} from '../../Assets/Icons';
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

export default function FindStaff({navigation, route}) {
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

  const [checkStaff, setCheckStaff] = useState(false);

  const [search, setSearch] = useState('');

  const [loadingTalents, setLoadingTalents] = useState(true);

  const [nextURLTalents, setNextURLTalents] = useState('');

  const [filteredStaff, setFilteredStaff] = useState([]);
  const [masterStaff, setMasterStaff] = useState([]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('Staff');
    setCheckStaff(false);
    getTalents();
    //getSearchStaff();
  }, [isFocused]);

  const getTalents = async () => {
    setLoading(true);
    try {
      let res = await Api.get('/talents', {
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

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const getTalentsSearch = async () => {
    setLoading(true);
    try {
      let res = await Api.get(`/talents?search=${searchText}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Talents for Employer Api Response', res);
      setLoading(false);

      setNextURLTalents(
        res?.data?.next_page_url !== null ? res?.data?.next_page_url : null,
      );
      setLoading(false);

      setFilteredStaff(res?.data?.data);
      setMasterStaff(res?.data?.data);

      dispatch({
        type: types.TALENTS,
        talents: res?.data?.data,
      });
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const talentInformationBook1 = (item, check) => {
    let id = item?.id;
    navigation.navigate('TalentInformationBook', {
      id,
      check,
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

  const searchStaffFunc = () => {
    setCheckStaff(!checkStaff);
    getSearchStaff();
  };

  const getSearchStaff = async () => {
    setFilteredStaff(talents);
    setMasterStaff(talents);
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

  return (
    <Container check={true} safeArea>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          //borderBottomWidth: 0.5,
          borderBottomColor: colors.darkGrey,
          width: widthPercentageToDP(100),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 20,
          }}>
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
          Back
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
                  <IconCross name="cross" size={30} color={colors.darkBlue} />
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
              <TouchableOpacity onPress={() => setCheckStaff(!checkStaff)}>
                <FilterIcon />
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                width: widthPercentageToDP(100),
                marginTop: 30,
              }}>
              <ActivityIndicator size="large" color={colors.darkBlueHigh} />
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
                          status={
                            item.availability_status == '1' ? 'Available' : ''
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
          )}
        </>
      </ScrollView>
    </Container>
  );
}
