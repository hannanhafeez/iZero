import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectSection from '../Screens/SelectSection/SelectSection';
import AuthScreen from '../Screens/AuthScreen/AuthScreen';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function GetStartedStack() {
  return (
    <Stack.Navigator initialRouteName="AuthScreen" headerMode="none">
      {/* <Stack.Screen name="SelectSection" component={SelectSection} /> */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
}
