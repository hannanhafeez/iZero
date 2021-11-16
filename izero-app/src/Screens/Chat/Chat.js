import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {ChatScreenHeader} from '../../Components';

import Api from '../../api/index';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import {ArrowIcon} from '../../Assets/Icons';
import {OvalChat} from '../../Assets/Graphics/OvalChat';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';
import IconDoubleDown from 'react-native-vector-icons/FontAwesome';

export default function Chat({navigation, route}) {
  let data = route?.params;

  let conversationID = data?.conversationID;
  let name = data?.name;
  let avatar = data?.avatar;

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);

  const [messages, setMessages] = useState([]);

  const [time, setTime] = useState(false);

  const [checkMessages, setCheckMessages] = useState(false);

  useEffect(() => {
    console.log('Chat');
    getAllMessages();
    setTimeout(function () {
      setTime({time: true});
    }, 5000);
  }, [checkMessages, time]);

  const getAllMessages = async () => {
    try {
      let res = await Api.get(
        `/conversation_by_id?conversation_id=${conversationID}`,
        {
          headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
        },
      );
      console.log('Get All Messages API res', res);
      let tempArr = [];
      var date = [];
      for (var v = 0; v < res?.data?.msgs.length; v++) {
        if (res?.data?.msgs[v]?.message_by === 'self') {
          date[v] = moment
            .unix(res?.data?.msgs[v]?.date_time)
            .format('YYYY-MM-DD HH:mm:ss');

          tempArr.push({
            _id: user?.id,
            text: res?.data?.msgs[v]?.message,
            createdAt: date[v],
            user: {
              _id: user?.id,
              name:
                res?.data?.msgs[v]?.first_name +
                ' ' +
                res?.data?.msgs[v]?.last_name,
              avatar: res?.data?.msgs[v]?.avatar,
            },
          });
        } else {
          tempArr.push({
            _id: user?.id,
            text: res?.data?.msgs[v]?.message,
            createdAt: date[v],
            user: {
              _id: res?.data?.msgs[v]?.user_id,
              name:
                res?.data?.msgs[v]?.first_name +
                ' ' +
                res?.data?.msgs[v]?.last_name,
              avatar: res?.data?.msgs[v]?.avatar,
            },
          });
        }
      }
      setMessages(tempArr);
    } catch (error) {
      console.log({error});
    }
  };

  const handleSend = async (newMessage) => {
    let data = new FormData();
    data.append('conversation_id', conversationID);
    data.append('message', newMessage[0].text);

    console.log({data});
    try {
      let res = await Api.post('/send_message', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log('Send Message API response', res);
      setCheckMessages(true);
    } catch (error) {
      setCheckMessages(true);
      console.log({error});
    }
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View
          style={{
            backgroundColor: 'rgb(37, 52, 75)',
            width: 30,
            height: 30,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            marginBottom: 5,
          }}>
          <Image
            style={{
              width: 15,
              height: 15,
            }}
            source={require('../../Assets/Images/messageNew.png')}
          />
        </View>
      </Send>
    );
  };

  const scroolToBottomComponent = () => {
    return (
      <IconDoubleDown name="angle-double-down" size={22} color={colors.green} />
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgb(143,150,163)',//colors.green,
          },
          left: {
            backgroundColor: 'rgb(244,244,246)',//colors.darkGreyHigh,
          },
        }}
        
        textStyle={{
          left: {
            color: colors.pureBlack,
          },
          right: {
            color: colors.pureWhite,
          },
        }}
      />
    );
  };
  return (
    <>
      <ChatScreenHeader
        onBack={() => navigation?.goBack()}
        name={name}
        pic={
          name === 'Group Chat'
            ? require('../../Assets/Images/messageNew.png')
            : avatar
        }
      />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: colors.pureWhite}}
        behavior="padding"
        keyboardVerticalOffset={-300}
        enabled>
        <GiftedChat
          renderBubble={renderBubble}
          messages={messages}
          onSend={(newMessage) => handleSend(newMessage)}
          user={{_id: user?.id}}
          alwaysShowSend
          renderSend={renderSend}
          renderUsernameOnMessage={true}
          scrollToBottom
          scrollToBottomComponent={scroolToBottomComponent}
        />
      </KeyboardAvoidingView>
    </>
  );
}
