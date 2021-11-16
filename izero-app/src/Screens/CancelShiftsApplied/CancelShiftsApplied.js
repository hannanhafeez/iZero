import React,{useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import styles from './Styles';
import Tabs from './Tabs/Tabs';

export default function CancelShiftsApplied({navigation}) { 
  
  useEffect(() =>{ console.log('CancelShiftsApplied'),[]});
  return (
    <Container>
      <ScrollView>
        <DetailsHeader onBack={() => navigation.goBack()} />

        <Tabs />
      </ScrollView>

      {/* <Heading containerStyle={styles.conSTyle} style={styles.textStyle}>
        Please confirm the shift you would like to apply for{' '}
      </Heading>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <ShiftCard />
        <ShiftCard />
      </ScrollView>
      <View style={styles.sticky}>
        <Button style={styles.Button}>APPLY FOR SHIFT(S)</Button>
      </View> */}
    </Container>
  );
}
