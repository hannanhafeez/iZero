import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
  wi,
} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Helpers/Responsive';
import styles from './Styles';
import IconArrow from 'react-native-vector-icons/AntDesign';
import IconCheck from 'react-native-vector-icons/AntDesign';
import IconStar from 'react-native-vector-icons/FontAwesome';
import IconCross from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Dropdown} from 'react-native-material-dropdown-v2';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../Assets/Icons';

import types from '../../Redux/types';

import {useSelector, useDispatch} from 'react-redux';
import colors from '../../Constants/colors';
import * as RootNavigation from '../../Router/navigation/RootNavigation';

let data = [
  {
    value: 'Banana',
  },
  {
    value: 'Mango',
  },
  {
    value: 'Pear',
  },
];

export default function ManageShiftAppliedClient({navigation, route}) {
  const dispatch = useDispatch();
  let data = route?.params;
  let jobName = data?.jobName;
  let jobAddress = data?.jobAddress;
  let avatar = data?.avatar;

  const [vissible, setVissible] = useState(true);
  const [loading, setLoading] = useState(true);

  const moveFaorward = () => {
    setVissible(false);
    //navigation.navigate('FindStaff');
    //navigation.goBack();
    RootNavigation.navigate('Jobs')
    dispatch({
      type: types.LIVE_BOOK,
      liveBook: false,
    });

    dispatch({
      type: types.SHIFT_ID,
      shiftId: '',
    });
  };

  useEffect(() => {
    console.log('ManageShiftAppliedClient'), [];
  });

  return (
    <Modal transparent animationType="fade" visible={vissible}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.darkBlue,
          width: widthPercentageToDP('100%'),
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: widthPercentageToDP('100%'),
          }}>
          {/* <Image
            style={{
              width: 100,
              height: 100,
              marginBottom: '5%',
            }}
            source={
              avatar
                ? {uri: avatar}
                : require('../../Assets/Images/appleLogo.png')
            }
          /> */}
          <Text
            style={{
              fontFamily: 'Europa-Bold',
              fontSize: RFValue(20, 812),
              fontWeight: 'bold',
              fontStyle: 'normal',
              letterSpacing: 0,
              color: colors.pureWhite,
            }}>
            {jobName}
          </Text>
          <Text
            style={{
              fontFamily: 'Europa-Bold',
              fontSize: RFValue(20, 812),
              fontWeight: 'bold',
              fontStyle: 'normal',
              letterSpacing: 0,
              color: colors.pureWhite,
            }}>
            {jobAddress}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#3CAF5F',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconCheck name="check" size={60} color="#5FC07B" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(20, 812),
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: colors.pureWhite,
                }}>
                Shift(s)
              </Text>
              <Text
                style={{
                  color: '#3CAF5F',
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(20, 812),
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  marginLeft: 5,
                }}>
                Offered
              </Text>
            </View>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              justifyContent: 'flex-end',
              marginBottom: 20,
            }}>
            <View style={styles.sticky}>
              <Button
                onPress={() => moveFaorward()}
                style={styles.ButtonTalent}
                textStyle={{color: colors.pureWhite}}>
                MANAGE SHIFT(S)
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
