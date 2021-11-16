import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {
  BottomTabView,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  DashboardIcon,
  JobsIcon,
  CalenderIcon,
  FinanceIcon,
} from '../../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';

import Iboard from '../../Screens/Iboard/Iboard';
import Jobs from '../../Screens/Jobs/Jobs';
import Calendar from '../../Screens/Calendar/Calendar';
import Finance from '../../Screens/Finance/Finance';

import {useDispatch, useSelector} from 'react-redux';
import ChangePassword from '../../Screens/ChangePassword/ChangePassword';
import SelectShifts from '../../Screens/SelectShifts/SelectShifts';
import DeclinedExpenses from '../../Screens/DeclinedExpenses/DeclinedExpenses';
import UploadExpenses from '../../Screens/UploadExpenses/UploadExpenses';
import PayBillResponse from '../../Screens/PayBillResponse/PayBillResponse';
import UploadExpensesTalent from '../../Screens/UploadExpensesTalent/UploadExpensesTalent';
import ExpenseDetailsTalent from '../../Screens/ExpenseDetailsTalent/ExpenseDetailsTalent';
import EditProfileTalent from '../../Screens/EditProfileTalent/EditProfileTalent';
import ProfileTalent from '../../Screens/ProfileTalent/ProfileTalent';
import ShiftsApplied from '../../Screens/ShiftsApplied/ShiftsApplied';
import ManageShiftAppliedTalent from '../../Screens/ManageShiftAppliedTalent/ManageShiftAppliedTalent';
import JobDetailsTalent from '../../Screens/JobDetailsTalent/JobDetailsTalent';
import FinancePaySlipTalent from '../../Screens/FinancePaySlipTalent/FinancePaySlipTalent';
import SelectShiftsTalent from '../../Screens/SelectShiftsTalent/SelectShiftsTalent';import QRCodeScan from '../../Screens/QRCodeScan/QRCodeScan';
import CalendarTalent from '../../Screens/CalendarTalent/CalendarTalent';
import BookingListTalent from '../../Screens/BookingListTalent/BookingListTalent';
import BookingAddCalenderTalent from '../../Screens/BookingAddCalenderTalent/BookingAddCalenderTalent';
//import Available from '../../Screens/BookingAvailability/BookingAvailability';
import Available from '../../Screens/Availability/Available';
import SearchListTalent from '../../Screens/SearchListTalent/SearchListTalent';

import ChatTalent from '../../Screens/ChatTalent/ChatTalent';

import Chat from '../../Screens/Chat/Chat';

import NotificationsTalent from '../../Screens/NotificationsTalent/NotificationsTalent';

import colors from '../../Constants/colors';
import EditBusinessProfileTalent from '../../Screens/EditBusinessProfileTalent/EditBusinessProfileTalent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Europa',
    fontSize: RFValue(11, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: heightPercentageToDP('0.7%'),
  },
  view: {
    alignItems: 'center',
    height: heightPercentageToDP('8%'),
    justifyContent: 'center',
    marginTop: heightPercentageToDP('3%'),
  },
  image: {
    width: widthPercentageToDP('7.2%'),
    height: widthPercentageToDP('7.2%'),
    borderRadius: widthPercentageToDP('7.2%') / 2,
  },
});

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color}) => {
    if (route?.name === 'Iboard' || route?.name === 'iboard') {
      return (
        <View style={styles.view}>
          <DashboardIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route?.name}</Text>
        </View>
      );
    } else if (route?.name === 'Jobs' || route?.name === 'Jobs') {
      return (
        <View style={styles.view}>
          <JobsIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route?.name}</Text>
        </View>
      );
    } else if (route?.name === 'Calendar') {
      return (
        <View style={styles.view}>
          <CalenderIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route?.name}</Text>
        </View>
      );
    } else if (route.name === 'Finance') {
      return (
        <View style={styles.view}>
          <FinanceIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route?.name}</Text>
        </View>
      );
    } else if (route.name === 'Profile') {
      const user = useSelector((state) => state?.auth?.user);
      return (
        <View style={styles.view}>
           <Image
            style={{
              width: widthPercentageToDP(7.2),
              height: widthPercentageToDP(7.2),
              borderRadius: widthPercentageToDP(7.2) / 2,
            }}
            source={
              user?.avatar !== null
                ? {uri: user?.avatar}
                : require('../../Assets/Images/avatar.png')
            }
          />
          <Text style={[styles.textStyle, {color}]}>{route?.name}</Text>
        </View>
      );
    }
  },
});

export default function TalentTab() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Stack" component={TabScreens} />
      <Stack.Screen name="JobDetailsTalent" component={JobDetailsTalent} />
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen
        name="FinancePaySlipTalent"
        component={FinancePaySlipTalent}
      />
      <Stack.Screen name="UploadExpenses" component={UploadExpenses} />

      <Stack.Screen
        name="UploadExpensesTalent"
        component={UploadExpensesTalent}
      />

      <Stack.Screen name="DeclinedExpenses" component={DeclinedExpenses} />

      <Stack.Screen
        name="EditBusinessProfileTalent"
        component={EditBusinessProfileTalent}
      />
      <Stack.Screen
        name="ExpenseDetailsTalent"
        component={ExpenseDetailsTalent}
      />
      <Stack.Screen name="SelectShifts" component={SelectShifts} />
      <Stack.Screen name="ShiftsApplied" component={ShiftsApplied} />
      <Stack.Screen name="PayBillResponse" component={PayBillResponse} />
      <Stack.Screen name="SelectShiftsTalent" component={SelectShiftsTalent} />
      <Stack.Screen
        name="ManageShiftAppliedTalent"
        component={ManageShiftAppliedTalent}
      />
      <Stack.Screen
        name="BookingAddCalenderTalent"
        component={BookingAddCalenderTalent}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfileTalent" component={EditProfileTalent} />
    
      <Stack.Screen name="QRCodeScan" component={QRCodeScan} />
      {/* <Stack.Screen name="Available" component={Available} /> */}

      <Stack.Screen name="Available" component={Available} />
      <Stack.Screen name="ChatTalent" component={ChatTalent} />
      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen name="SearchListTalent" component={SearchListTalent} />
    </Stack.Navigator>
  );
}

const TabScreens = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        inactiveTintColor: '#24334c',
        activeTintColor: '#3eb561',
        keyboardHidesTabBar: true,
        tabStyle: {
          bottom: heightConverter(8),
        },

        showLabel: false,
        style: {
          backgroundColor: '#f6f8fb',
          borderTopWidth: 0.3,
          borderColor: colors.darkGreyHigh,
          height: heightPercentageToDP('10%'),
        },
      }}>
      <Tab.Screen name="iboard" component={IboardTalentStack} />
      <Tab.Screen name="Jobs" component={JobsTalentStack} />
      <Tab.Screen name="Calendar" component={CalenderStack} />
      <Tab.Screen name="Finance" component={FinanceStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

function IboardTalentStack() {
  return (
    <Stack.Navigator initialRouteName="Iboard" headerMode="none">
      <Stack.Screen name="Iboard" component={Iboard} />
      
      {/* <Stack.Screen name="SearchListTalent" component={SearchListTalent} /> */}

      <Stack.Screen
        name="NotificationsTalent"
        component={NotificationsTalent}
      />
    </Stack.Navigator>
  );
}

function JobsTalentStack() {
  return (
    <Stack.Navigator initialRouteName="Jobs" headerMode="none">

      <Stack.Screen
        name="Jobs"
        component={Jobs}
      />
      {/* <Stack.Screen name="SearchListTalent" component={SearchListTalent} /> */}

      <Stack.Screen
        name="NotificationsTalent"
        component={NotificationsTalent}
      />
    </Stack.Navigator>
  );
}

function CalenderStack() {
  return (
    <Stack.Navigator initialRouteName="CalendarTalent" headerMode="none">
      <Stack.Screen name="CalendarTalent" component={CalendarTalent} />
      <Stack.Screen name="BookingListTalent" component={BookingListTalent} />

      <Stack.Screen
        name="NotificationsTalent"
        component={NotificationsTalent}
      />
    </Stack.Navigator>
  );
}

function FinanceStack() {
  return (
    <Stack.Navigator initialRouteName="Finance" headerMode="none">
      <Stack.Screen name="Finance" component={Finance} />

      <Stack.Screen
        name="NotificationsTalent"
        component={NotificationsTalent}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileTalent" headerMode="none">
      <Stack.Screen name="ProfileTalent" component={ProfileTalent} />
      {/* <Stack.Screen name="ChatScreenTalent" component={ChatScreenTalent} /> */}

      {/* <Stack.Screen name="ChatTalent" component={ChatTalent} /> */}
      {/* <Stack.Screen
        name="ChatScreenNewMesssageTalent"
        component={ChatScreenNewMesssageTalent}
      /> */}
    </Stack.Navigator>
  );
}
