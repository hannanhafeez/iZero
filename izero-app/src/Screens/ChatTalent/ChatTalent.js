import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
} from 'react-native';
import {Container, Button} from '../../Components';
import {widthConverter, heightConverter} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';

import IconCross from 'react-native-vector-icons/Entypo';
import IconCheck from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Api from '../../api/index';

import {useIsFocused} from '@react-navigation/native';
import colors from '../../Constants/colors';

export default function ChatTalent({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const userIdMessage = useSelector((state) => state?.app?.userIdMessage);

  const jwt = useSelector((state) => state?.auth?.accessToken);

  const user = useSelector((state) => state?.auth?.user);


  let ParamsUser = route?.params;


  const [firebaseArr, setFirebaseArr] = useState();

  const [chatList, setChatList] = useState();

  useEffect(() => {
    console.log('ChatScreenClientChat');
    getAllChatList();
  }, [isFocused]);

  const getAllChatList = async () => {
    setLoading(false);
    try {
      let res = await Api.get('/get_conversation', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Chat List Api Response', res);
      setChatList(res?.data?.data);
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const EmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(18, 812),
            fontWeight: 'normal',
            fontStyle: 'normal',
            lineHeight: 24,
            color: '#303E56',
          }}>
          No Chat Found
        </Text>
      </View>
    );
  };

  return (
    <Container safeArea={true}>
      <View
        style={{
          backgroundColor: colors.pureWhite,
          borderBottomWidth: 0.3,
          borderBottomColor: colors.darkGreyHigh,
          height: heightConverter(45),
        }}>
        <View
          style={{
            width: widthPercentageToDP('100%'),
            flexDirection: 'row',
            flex: 1,
            paddingBottom: 10,
          }}>
          <View
            style={{
              flex: 0.6,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation?.goBack()}>
              <Text
                style={{
                  color: '#24334c',
                  fontSize: RFValue(18, 812),
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  marginTop: 5,
                  paddingTop: 10,
                  paddingLeft: 20,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: colors.pureWhite,
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text
              style={{
                color: '#24334c',
                fontFamily: 'Europa-Bold',
                fontSize: RFValue(20, 812),
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                marginTop: 5,
                paddingTop: 10,
              }}>
              Messages
            </Text>
          </View>
        </View>
      </View>
      {loading == false ? (
        <View style={{marginTop: 30}}>
          <ActivityIndicator size="large" color={colors.darkBlueHigh} />
        </View>
      ) : (
        <ScrollView style={{flex: 1, width: '100%'}}>
          <View style={{marginTop: 10}}>
            <FlatList
              bounces={false}
              //data={firebaseArr}
              data={chatList}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => EmptyComponent()}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <View
                      style={{
                        flex: 1,
                        borderBottomColor: '#E3E3E5',
                        borderBottomWidth: 1,
                        justifyContent: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}>
                      <TouchableHighlight
                        underlayColor=""
                        //onPress={() => sendMessage(item, index)}
                        onPress={() =>
                          navigation?.navigate('Chat', {
                            conversationID: item?.conversation_id,
                            name:
                              item?.participants.length < 2
                                ? item?.participants[0]?.first_name +
                                  ' ' +
                                  item?.participants[0]?.last_name
                                : 'Group Chat',
                            avatar:
                              item?.participants.length < 2
                                ? item?.participants[0]?.avatar
                                : '../../../Assets/Images/group-chat.png',
                            singleMultiChat:
                              item?.participants.length < 2 ? false : true,
                          })
                        }
                        style={{
                          flexDirection: 'row',
                          marginLeft: 25,
                          marginRight: 30,
                        }}>
                        <>
                          <View
                            style={{
                              flex: 1,
                            }}>
                            {item?.participants?.length < 2 ? (
                              <Image
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 50,
                                }}
                                source={
                                  item?.participants[0]?.avatar !== null
                                    ? {uri: item?.participants[0]?.avatar}
                                    : require('../../Assets/Demo/Logo1.png')
                                }
                              />
                            ) : (
                              <Image
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 50,
                                }}
                                source={require('../../Assets/Images/group-chat.png')}
                              />
                            )}
                          </View>
                          <View
                            style={{
                              flex: 4,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: RFValue(18, 812),
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                lineHeight: 24,
                                color: '#303E56',
                              }}>
                              {item?.participants.length < 2
                                ? item?.participants[0]?.first_name +
                                  ' ' +
                                  item?.participants[0]?.last_name
                                : item?.title}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                              }}>
                              <View style={{width: '75%'}}>
                                <Text style={{color: colors.pureBlack}}>
                                  {item?.last_message?.message.length > 30
                                    ? item?.last_message?.message.slice(0, 30)
                                    : item?.last_message?.message}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{color: '#ABB1BB', marginRight: 20}}>
                                  {item?.last_message?.create_time.slice(
                                    0,
                                    item?.last_message?.create_time.length - 9,
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View
                            style={{
                              marginTop: 3,
                            }}>
                            <View
                              style={{
                                height: 10,
                                width: 10,
                                borderRadius: 10,
                                backgroundColor: 'rgba(68,179,101, 1)',
                              }}
                            />
                          </View>
                        </>
                      </TouchableHighlight>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
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
