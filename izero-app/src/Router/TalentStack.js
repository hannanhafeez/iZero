import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GetStarted from '../Screens/GetStarted/GetStarted';

import {
  DashboardIcon,
  JobsIcon,
  CalenderIcon,
  FinanceIcon,
} from '../Assets/Icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
} from '../Helpers/Responsive';

import Login from '../Screens/Login/Login';

import SignUpDetails from '../Screens/SignUpDetails/SignUpDetails';
import SignUpEmail from '../Screens/SignUpEmail/SignUpEmail';
import SignUpPhone from '../Screens/SignUpPhone/SignUpPhone';
import SignUpPassword from '../Screens/SignUpPassword/SignUpPassword';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import SignUpSuccess from '../Screens/SignUpSuccess/SignUpSuccess';
import CompleteProfileTalent from '../Screens/CompleteProfileTalent/CompleteProfileTalent';
import CompleteProfileClient from '../Screens/CompleteProfileClient/CompleteProfileClient';
import PayBillResponse from '../Screens/PayBillResponse/PayBillResponse';
import Iboard from '../Screens/Iboard/Iboard';
import ChangePassword from '../Screens/ChangePassword/ChangePassword';
import Jobs from '../Screens/Jobs/Jobs';
import Calendar from '../Screens/Calendar/Calendar';
import Finance from '../Screens/Finance/Finance';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';
import SelectSection from '../Screens/SelectSection/SelectSection';
import FinanceDetails from '../Screens/FinanceDetails/FinanceDetails';
import SelectShifts from '../Screens/SelectShifts/SelectShifts';
import JobDetails from '../Screens/JobDetails/JobDetails';
//import BookingAvailability from '../Screens/BookingAvailability/BookingAvailability';
import EditProfile from '../Screens/EditProfile/EditProfile';
import HelpCenter from '../Screens/HelpCenter/HelpCenter';
import JobsFilter from '../Screens/JobsFilter/JobsFilter';
import JobsSearch from '../Screens/JobsSearch/JobsSearch';
import Ratings from '../Screens/Ratings/Ratings';
import ShiftsApplied from '../Screens/ShiftsApplied/ShiftsApplied';
import CancelShiftsApplied from '../Screens/CancelShiftsApplied/CancelShiftsApplied';

import PhoneVerification from '../Screens/PhoneVerification/PhoneVerification';

import UploadExpenses from '../Screens/UploadExpenses/UploadExpenses';
import DeclinedExpenses from '../Screens/DeclinedExpenses/DeclinedExpenses';
import ExpenseDetails from '../Screens/ExpenseDetails/ExpenseDetails';
import CompleteProfileClientSecond from '../Screens/CompleteProfileClientSecond/CompleteProfileClientSecond';
import CreateJobClient from '../Screens/CreateJobClient/CreateJobClient';
import QuoteClient from '../Screens/QuoteClient/QuoteClient';
import InvoicePaymentClient from '../Screens/InvoicePaymentClient/InvoicePaymentClient';
import IboardClient from '../Screens/IboardClient/IboardClient';
import TalentInformationBook from '../Screens/TalentInformationBook/TalentInformationBook';
import JobsClient from '../Screens/JobsClient/JobsClient';
import SelectShiftsClient from '../Screens/SelectShiftsClient/SelectShiftsClient';
import ManageShiftAppliedClient from '../Screens/ManageShiftAppliedClient/ManageShiftAppliedClient';

import FinanceClient from '../Screens/FinanceClient/FinanceClient';
import CalendarClient from '../Screens/CalendarClient/CalendarClient';

import {useDispatch, useSelector} from 'react-redux';
import EditProfileClient from '../Screens/EditProfileClient/EditProfileClient';
import EditBusinessProfileClient from '../Screens/EditBusinessProfileClient/EditBusinessProfileClient';
import ProfileClient from '../Screens/ProfileClient/ProfileClient';
import colors from '../Constants/colors';

import GetStartedEmployeer from '../Screens/GetStartedEmployeer/GetStartedEmployeer';

import PhoneVerificationForget from '../Screens/PhoneVerificationForget/PhoneVerificationForget';

import ForgotPasswordEnter from '../Screens/ForgotPasswordEnter/ForgotPasswordEnter';

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
    if (route.name === 'Iboard' || route.name === 'iboard') {
      return (
        <View style={styles.view}>
          <DashboardIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route.name}</Text>
        </View>
      );
    } else if (route.name === 'Jobs' || route.name === 'Jobs') {
      return (
        <View style={styles.view}>
          <JobsIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route.name}</Text>
        </View>
      );
    } else if (route.name === 'Calendar') {
      return (
        <View style={styles.view}>
          <CalenderIcon
            height={widthPercentageToDP('7.2%')}
            height={widthPercentageToDP('7.2%')}
            color={color}
          />
          <Text style={[styles.textStyle, {color}]}>{route.name}</Text>
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
          <Text style={[styles.textStyle, {color}]}>{route.name}</Text>
        </View>
      );
    } else if (route.name === 'Profile') {
      const user = useSelector((state) => state.auth.user);
      return (
        <View style={styles.view}>
          <Image
            style={{
              width: widthPercentageToDP(7.2),
              height: widthPercentageToDP(7.2),
              borderRadius: widthPercentageToDP(7.2) / 2,
            }}
            source={{
              uri: user?.avatar ? user?.avatar : '../../Assets/Demo/Client.png',
            }}
            // source={require('../Assets/Demo/Face.png')}
          />
          <Text style={[styles.textStyle, {color}]}>{route.name}</Text>
        </View>
      );
    }

    // You can return any component that you like here!
  },
});

function TalentTab() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        inactiveTintColor: '#24334c',
        activeTintColor: '#3eb561',
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
      <Tab.Screen name="Iboard" component={Iboard} />
      <Tab.Screen name="Jobs" component={Jobs} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Finance" component={Finance} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function ClientTab() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        inactiveTintColor: '#24334c',
        activeTintColor: '#3eb561',
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
      <Tab.Screen name="iboard" component={IboardClient} />
      <Tab.Screen name="Jobs" component={JobsClient} />
      <Tab.Screen name="Calendar" component={CalendarClient} />
      <Tab.Screen name="Finance" component={FinanceClient} />
      <Tab.Screen name="ProfileClient" component={ProfileClient} />
    </Tab.Navigator>
  );
}

export default function TalentStack() {
  return (
    <Stack.Navigator initialRouteName="SelectSection" headerMode="none">
      <Stack.Screen name="SelectSection" component={SelectSection} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen
        name="GetStartedEmployeer"
        component={GetStartedEmployeer}
      />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpDetails" component={SignUpDetails} />
      <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
      <Stack.Screen name="SignUpPhone" component={SignUpPhone} />
      <Stack.Screen name="SignUpPassword" component={SignUpPassword} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen
        name="ForgotPasswordEnter"
        component={ForgotPasswordEnter}
      />
      <Stack.Screen name="SignUpSuccess" component={SignUpSuccess} />
      <Stack.Screen
        name="CompleteProfileTalent"
        component={CompleteProfileTalent}
      />
      <Stack.Screen name="Tab" component={TalentTab} />
      <Stack.Screen name="ClientTab" component={ClientTab} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
      <Stack.Screen name="SelectShifts" component={SelectShifts} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditProfileClient" component={EditProfileClient} />
      <Stack.Screen
        name="EditBusinessProfileClient"
        component={EditBusinessProfileClient}
      />
      {/* <Stack.Screen
        name="BookingAvailability"
        component={BookingAvailability}
      /> */}
      <Stack.Screen name="FinanceDetails" component={FinanceDetails} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="JobsFilter" component={JobsFilter} />
      <Stack.Screen name="JobsSearch" component={JobsSearch} />
      <Stack.Screen name="Ratings" component={Ratings} />
      <Stack.Screen name="ShiftsApplied" component={ShiftsApplied} />
      <Stack.Screen
        name="CancelShiftsApplied"
        component={CancelShiftsApplied}
      />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />

      <Stack.Screen
        name="PhoneVerificationForget"
        component={PhoneVerificationForget}
      />

      {/* <Stack.Screen name="ForgotPasswordEnter" component={ForgotPasswordEnter} /> */}

      <Stack.Screen name="DeclinedExpenses" component={DeclinedExpenses} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
      <Stack.Screen name="UploadExpenses" component={UploadExpenses} />
      <Stack.Screen
        name="CompleteProfileClient"
        component={CompleteProfileClient}
      />
      <Stack.Screen
        name="CompleteProfileClientSecond"
        component={CompleteProfileClientSecond}
      />
      <Stack.Screen name="CreateJobClient" component={CreateJobClient} />
      <Stack.Screen name="QuoteClient" component={QuoteClient} />
      <Stack.Screen
        name="InvoicePaymentClient"
        component={InvoicePaymentClient}
      />
      <Stack.Screen
        name="TalentInformationBook"
        component={TalentInformationBook}
      />
      <Stack.Screen name="PayBillResponse" component={PayBillResponse} />

      <Stack.Screen name="SelectShiftsClient" component={SelectShiftsClient} />
      <Stack.Screen
        name="ManageShiftAppliedClient"
        component={ManageShiftAppliedClient}
      />
    </Stack.Navigator>
  );
}
