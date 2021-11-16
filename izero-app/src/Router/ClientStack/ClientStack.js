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

import IboardClient from '../../Screens/IboardClient/IboardClient';
import JobsClient from '../../Screens/JobsClient/JobsClient';
import FinanceClient from '../../Screens/FinanceClient/FinanceClient';
import CalendarClient from '../../Screens/CalendarClient/CalendarClient';

import JobDetails from '../../Screens/JobDetails/JobDetails';
import { useSelector} from 'react-redux';
import PayBillResponse from '../../Screens/PayBillResponse/PayBillResponse';
import TalentInformationBook from '../../Screens/TalentInformationBook/TalentInformationBook';
import InvoicePaymentClient from '../../Screens/InvoicePaymentClient/InvoicePaymentClient';
import QuoteClient from '../../Screens/QuoteClient/QuoteClient';
import CreateJobClient from '../../Screens/CreateJobClient/CreateJobClient';
import UploadExpenses from '../../Screens/UploadExpenses/UploadExpenses';
import ExpenseDetails from '../../Screens/ExpenseDetails/ExpenseDetails';
import DeclinedExpenses from '../../Screens/DeclinedExpenses/DeclinedExpenses';
import FinanceDetails from '../../Screens/FinanceDetails/FinanceDetails';
import EditProfileClient from '../../Screens/EditProfileClient/EditProfileClient';
import ChangePassword from '../../Screens/ChangePassword/ChangePassword';
import EditBusinessProfileClient from '../../Screens/EditBusinessProfileClient/EditBusinessProfileClient';
import ProfileClient from '../../Screens/ProfileClient/ProfileClient';
import SelectShiftsClient from '../../Screens/SelectShiftsClient/SelectShiftsClient';
import ManageShiftAppliedClient from '../../Screens/ManageShiftAppliedClient/ManageShiftAppliedClient';
import JobDetailsClient from '../../Screens/JobDetailsClient/JobDetailsClient';
import BookingAddCalenderClient from '../../Screens/BookingAddCalenderClient/BookingAddCalenderClient';
import BookingListClient from '../../Screens/BookingListClient/BookingListClient';
import BookingDetailsCalnderClient from '../../Screens/BookingDetailsCalnderClient/BookingDetailsCalnderClient';
import ApplicantsDetailsClient from '../../Screens/ApplicantsDetailsClient/ApplicantsDetailsClient';

import ChatClient from '../../Screens/ChatClient/ChatClient';

import Chat from '../../Screens/Chat/Chat';

import NotificationsClient from '../../Screens/NotificationsClient/NotificationsClient';

import colors from '../../Constants/colors';

import FindStaff from '../../Screens/FindStaff/FindStaff';

import InvoicePaymentClientDetails from '../../Screens/InvoicePaymentClientDetails/InvoicePaymentClientDetails';

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
    } else if (route.name === 'Calendar') {
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
            style={styles.image}
            source={
              user?.avatar !== null
                ? {uri: user?.avatar}
                :
                 require('../../Assets/Images/avatar.png')
            }
          />
          <Text style={[styles.textStyle, {color}]}>{route?.name}</Text>
        </View>
      );
    }
  },
});

export default function ClientTab() {
  return (
    <Stack.Navigator headerMode="none">

      <Stack.Screen name="Stack" component={TabScreens} />
      <Stack.Screen name="CreateJobClient" component={CreateJobClient} />
      
      <Stack.Screen
        name="InvoicePaymentClient"
        component={InvoicePaymentClient}
      />

        <Stack.Screen
        name="InvoicePaymentClientDetails"
        component={InvoicePaymentClientDetails}
      />
      <Stack.Screen name="PayBillResponse" component={PayBillResponse} />
      <Stack.Screen name="QuoteClient" component={QuoteClient} />
      <Stack.Screen name="FinanceClient" component={FinanceClient} />
      <Stack.Screen name="UploadExpenses" component={UploadExpenses} />
      <Stack.Screen name="DeclinedExpenses" component={DeclinedExpenses} />
      <Stack.Screen name="FinanceDetails" component={FinanceDetails} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />

      <Stack.Screen name="JobDetails" component={JobDetails} />

      <Stack.Screen name="JobDetailsClient" component={JobDetailsClient} />

      <Stack.Screen name="FindStaff" component={FindStaff} />

      <Stack.Screen
        name="ManageShiftAppliedClient"
        component={ManageShiftAppliedClient}
      />


      <Stack.Screen
        name="ApplicantsDetailsClient"
        component={ApplicantsDetailsClient}
      />
      <Stack.Screen name="EditProfileClient" component={EditProfileClient} />

      <Stack.Screen
        name="EditBusinessProfileClient"
        component={EditBusinessProfileClient}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="TalentInformationBook"
        component={TalentInformationBook}
      />
      <Stack.Screen name="SelectShiftsClient" component={SelectShiftsClient} />

      <Stack.Screen
        name="BookingAddCalenderClient"
        component={BookingAddCalenderClient}
      />
      <Stack.Screen
        name="BookingDetailsCalnderClient"
        component={BookingDetailsCalnderClient}
      />
      
      <Stack.Screen name="ChatClient" component={ChatClient} />

      <Stack.Screen name="Chat" component={Chat} />

    </Stack.Navigator>
  );
}

const TabScreens = ({navigation}) => {
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
      <Tab.Screen name="iboard" component={IboardClientStack} />
      <Tab.Screen name="Jobs" component={JobsClientStack} />
      <Tab.Screen name="Calendar" component={CalendarStack} />
      <Tab.Screen name="Finance" component={FinanceStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

function IboardClientStack() {
  return (
    <Stack.Navigator initialRouteName="IboardClient" headerMode="none">
      <Stack.Screen name="Iboard" component={IboardClient} />

      {/* <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} /> */}
      {/* <Stack.Screen name="JobDetailsClient" component={JobDetailsClient} /> */}

      <Stack.Screen
        name="NotificationsClient"
        component={NotificationsClient}
      />
    </Stack.Navigator>
  );
}

function JobsClientStack() {
  return (
    <Stack.Navigator initialRouteName="Jobs" headerMode="none">
      <Stack.Screen name="JobsClient" component={JobsClient} />
      {/* <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} /> */}
      {/* <Stack.Screen name="JobDetailsClient" component={JobDetailsClient} /> */}
      <Stack.Screen
        name="NotificationsClient"
        component={NotificationsClient}
      />
    </Stack.Navigator>
  );
}

function CalendarStack() {
  return (
    <Stack.Navigator initialRouteName="CalendarClient" headerMode="none">
      <Stack.Screen name="CalendarClient" component={CalendarClient} />
      <Stack.Screen name="BookingListClient" component={BookingListClient} />
      {/* <Stack.Screen name="JobDetailsClient" component={JobDetailsClient} /> */}
      {/* <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} /> */}
      <Stack.Screen
        name="NotificationsClient"
        component={NotificationsClient}
      />
    </Stack.Navigator>
  );
}

function FinanceStack() {
  return (
    <Stack.Navigator initialRouteName="FinanceClient" headerMode="none">
      <Stack.Screen name="FinanceClient" component={FinanceClient} />
      {/* <Stack.Screen name="JobDetailsClient" component={JobDetailsClient} /> */}
      {/* <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} /> */}
      <Stack.Screen
        name="NotificationsClient"
        component={NotificationsClient}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileClient" headerMode="none">
      <Stack.Screen name="ProfileClient" component={ProfileClient} />
      {/* <Stack.Screen name="ChatClient" component={ChatClient} /> */}
    </Stack.Navigator>
  );
}
