import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Container, Button} from '../../../Components';
import {widthConverter, heightConverter} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';

import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import IconArrow from 'react-native-vector-icons/AntDesign';
import IconPlus from 'react-native-vector-icons/AntDesign';
import IconStar from 'react-native-vector-icons/FontAwesome';
import IconCross from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconCheck from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import Api from '../../../api/index';
import colors from '../../../Constants/colors';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    val: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    val: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    val: false,
  },
];

export default function Staff(props) {
  const [loading, setLoading] = useState(true);
  let JobID = props?.route?.params?.jobID;
  const navigation = useNavigation();
  const [jobUsers, setJobUsers] = useState('');
  const jwt = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    console.log('JobDetailsInformation');
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/job_detail?job_id=${JobID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Job Details API res', res);
      setJobUsers(res?.data?.data?.job_users);
      // setTotoalShift(res?.data?.data?.shifts?.length);
      // setJobDate(res?.data?.data?.expiry_date);
      // setJobLocation(res?.data?.data?.location);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  console.log('jobUsers', jobUsers);
  return (
    <Container>
      <ScrollView>
        {/* <View style={styles.row}>
        <View style={styles.tag}>
          <Text style={styles.text}>Wed 25 Jun</Text>
        </View>
        <View style={[styles.tag, styles.outlined]}>
          <Text style={[styles.text, {color: '#5b6679'}]}>10:00 - 17:30</Text>
        </View>
      </View>
      <View style={styles.second}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          About Job
        </Text>
        <Text style={styles.textContent}>
          You will be directly responsible for driving brand awareness and
          delivering sales within Southampton by engaging with potential
          customers at local events and at their premises. We are looking for
          rock star sales people that have the potential and want the
          opportunity to earn money!
        </Text>
      </View>

      

      <View style={styles.sticky}>
        <Button
          onPress={() => navigation.navigate('Tab')}
          style={{width: widthConverter(261), height: heightConverter(50),backgroundColor:colors.pureWhite,borderColor: '#636E81',borderWidth:1}}
          textStyle={{color:"#636E81"}}
          >
           
          CANCEL SHIFT
        </Button>
        <View style={styles.iconCon}>
          <ChatIcon width={widthConverter(30)} height={heightConverter(28)} />
        </View>
      </View> */}

        {loading == false ? (
          <View style={{flex: 1, marginTop: 30}}>
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          </View>
        ) : (
          <View style={{flex: 1, marginTop: 40}}>
            <FlatList
              bounces={false}
              //data={DATA}
              data={jobUsers}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Europa',
                      fontSize: RFValue(22, 812),
                      fontWeight: 'bold',
                      fontStyle: 'normal',
                      lineHeight: 24,
                      color: '#303E56',
                    }}>
                    No Talents Found
                  </Text>
                </View>
              }
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      borderTopColor: '#E3E3E5',
                      borderTopWidth: 1,
                      justifyContent: 'center',
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1, marginLeft: 20, marginTop: 8}}>
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            backgroundColor:
                              item?.type == 'confirmed'
                                ? '#3eb561'
                                : item?.type == 'waiting'
                                ? '#F9B313'
                                : item?.type == 'cancelld'
                                ? '#F51313'
                                : item?.type == 'declined'
                                ? '#F51313'
                                : null,
                          }}
                        />
                      </View>
                      <View style={{flex: 8}}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: RFValue(22, 812),
                            fontWeight: 'bold',
                            fontStyle: 'normal',
                            lineHeight: 24,
                            color: '#303E56',
                          }}>
                          {/* Brandon Melton */}
                          {item?.user?.first_name + ' ' + item?.user?.last_name}
                        </Text>
                        {item?.user?.user_sector[index]?.role ? (
                          <Text style={{color: '#64C07F'}}>
                            {/* BRAND AMBASSADOR */}
                            {item?.user?.user_sector[index]?.role
                              ? item?.user?.user_sector[index]?.role?.title
                              : ''}
                          </Text>
                        ) : null}
                      </View>
                      <View style={{flex: 2, marginRight: 20}}>
                        <Image
                          style={{height: 50, width: 50}}
                          // source={require('../../../Assets/Images/avatarRound.png')}
                          source={{
                            uri: item?.user?.avatar,
                          }}
                        />
                      </View>
                    </View>

                    <View style={{marginLeft: 50}}>
                      <Text
                        style={{
                          fontSize: RFValue(20, 812),
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#9CA3AA',
                          marginTop: 5,
                        }}>
                        Wed 25 JUn
                      </Text>

                      <Text
                        style={{
                          fontSize: RFValue(20, 812),
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#9CA3AA',
                          marginTop: 5,
                        }}>
                        08:00 - 16:00
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        marginLeft: 20,
                      }}>
                      <View
                        style={{
                          marginLeft: 30,
                          backgroundColor:
                            item.type == 'confirmed' //confirmed
                              ? colors.green
                              : item.type == 'cancelled' //cancel
                              ? '#FDB4B4'
                              : item.type == 'declined' // declined
                              ? '#FDB4B4'
                              : item.type == 'waiting' //Awaiting
                              ? '#FEF7E7'
                              : item.type == 'pending' //Pending
                              ? '#BFE5C7'
                              : null,
                          borderRadius: 20,
                          paddingVertical: 5,
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        <View>
                          <Text
                            style={{
                              //color: '#78C890',
                              color:
                                item?.type == 'confirmed'
                                  ? colors.pureWhite
                                  : item?.type == 'waiting'
                                  ? '#F9B313'
                                  : item?.type == 'cancelld'
                                  ? '#F51313'
                                  : item?.type == 'declined'
                                  ? '#F51313'
                                  : null,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}>
                            {item.type.charAt(0).toUpperCase() +
                              item.type.slice(1)}
                          </Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                          {item?.type == 'confirmed' ? (
                            <IconCheck
                              name="check"
                              size={14}
                              color={colors.pureWhite}
                              style={{paddingRight: 10}}
                            />
                          ) : null}
                        </View>
                      </View>

                      <View
                        style={{
                          marginLeft: 30,
                          borderColor: '#ABB0BA',
                          backgroundColor: colors.pureWhite,
                          borderWidth: 1,
                          borderRadius: 20,
                          paddingVertical: 5,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#ABB0BA',
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}>
                          Check in
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />

            <View style={styles.sticky}>
              {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              onPress={() => navigation.navigate('ClientTab')}
              style={styles.ButtonTalent}
              textStyle={{color: '#515C70'}}>
              CANCEL SHIFT?
            </Button>
            <View style={{marginLeft: 30}} />
            <View style={styles.iconCon}>
              <ChatIcon
                width={widthConverter(30)}
                height={heightConverter(28)}
              />
            </View>
          </View> */}
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  tag: {
    width: widthConverter(96),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthConverter(12),
  },
  text: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(331),
    alignSelf: 'center',
    marginTop: heightConverter(40),
    marginBottom: heightConverter(19),
  },
  outlined: {
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  second: {
    width: widthConverter(331),
    marginBottom: heightConverter(19),
    alignSelf: 'center',
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  sticky: {
    //height: heightConverter(105),
    width: widthConverter(375),
    //paddingHorizontal: widthConverter(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: widthConverter(375),
    height: widthConverter(232),
    marginBottom: heightConverter(19),
  },
  ButtonTalent: {
    width: widthConverter(261),
    height: heightConverter(50),
    backgroundColor: colors.pureWhite,
    borderColor: '#515C70',
    borderWidth: 2,
  },
});
