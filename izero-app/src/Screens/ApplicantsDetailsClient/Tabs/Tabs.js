import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GetStarted from '../../GetStarted/GetStarted';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';

import Staff from '../Screens/Staff';
import JobDetail from '../Screens/JobDetail';
import colors from '../../../Constants/colors';

const Tab = createMaterialTopTabNavigator();

function Tabs({jobID}) {
  const job_ID = jobID;
  return (
    <View
      style={{
        width: widthPercentageToDP('100%'),
        flex: 1,
        paddingTop: 23,
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 40,
                paddingLeft: 25,
              }}>
              <View
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: focused ? '#3eb561' : '#d5d7dc',
                  borderRadius: 9 / 2,
                  marginRight: 11,
                }}></View>
              <Text
                style={{
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(18, 812),
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: focused ? '#24334c' : 'rgba(142, 150, 163, 0.4)',
                  textTransform: 'capitalize',
                  paddingLeft: 5,
                }}>
                {route.name}
              </Text>
            </View>
          ),
        })}
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          labelPosition: 'labelPosition',
          showIcon: true,
          labelStyle: {
            fontFamily: 'Europa-Bold',
            fontSize: RFValue(18, 812),
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: '#24334c',
            textTransform: 'capitalize',
          },
          iconStyle: {
            width: widthConverter(165.5),
            height: 40,
            justifyContent: 'center',
          },
          tabStyle: {
            width: widthConverter(165.5),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style: {
            width: widthConverter(331),
            justifyContent: 'space-between',
            borderWidth: 0,
            alignSelf: 'center',
            borderRadius: 26.5,
            backgroundColor: 'rgba(187, 192, 216, 0.16)',
            justifyContent: 'center',
          },
          indicatorStyle: {
            width: widthConverter(152),
            height: 40,
            borderRadius: 26.5,
            backgroundColor: colors.pureWhite,
            shadowColor: 'rgba(91, 102, 121, 0.15)',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowRadius: 18,
            shadowOpacity: 1,
            bottom: 6,
            left: 6,
          },
        }}>
        <Tab.Screen
          name="Staff"
          component={Staff}
          initialParams={{jobID: job_ID}}
        />
        <Tab.Screen
          name="Job Detail"
          component={JobDetail}
          initialParams={{jobID: job_ID}}
        />
      </Tab.Navigator>
    </View>
  );
}

export default Tabs;
