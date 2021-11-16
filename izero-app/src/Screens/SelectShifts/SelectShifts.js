import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
} from '../../Components';
import { Oval } from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import styles from './Styles';
import colors from '../../Constants/colors';

export default function SelectShifts({ navigation, route }) {

  useEffect(() => { console.log('SelectShifts'), [] })
  
  const [selected, setSelected] = useState(0);
  let bookJobTalent = route?.params?.bookJobTalent;
  let bookingShift = 'bookingShift';

  return (
    <Container>
      <DetailsHeader onBack={() => navigation.goBack()} />
      <Heading containerStyle={styles.conSTyle} style={styles.textStyle}>
        Please confirm the shift you would like to apply for{' '}
      </Heading>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
        <ShiftCard
          onPress={() => {
            setSelected(1)
          }}
          btnStyle={selected === 1 ? null : { backgroundColor: colors.pureWhite, borderColor: '#636E81', }}
          txtStyle={selected === 1 ? null : { color: "#636E81" }}
          text={selected === 1 ? "Selected" : "Select"}
        />
        <ShiftCard
          onPress={() => {
            setSelected(2)
          }}
          btnStyle={selected === 2 ? null : { backgroundColor: colors.pureWhite, borderColor: '#636E81', }}
          txtStyle={selected === 2 ? null : { color: "#636E81" }}
          text={selected === 2 ? "Selected" : "Select"}
        />
        <ShiftCard
          onPress={() => {
            setSelected(3)
          }}
          btnStyle={selected === 3 ? null : { backgroundColor: colors.pureWhite, borderColor: '#636E81', }}
          txtStyle={selected === 3 ? null : { color: "#636E81" }}
          text={selected === 3 ? "Selected" : "Select"}
        />
      </ScrollView>
      <View style={styles.sticky}>
        <Button style={styles.Button}
          onPress={() => bookJobTalent === 'bookJobTalent' ? navigation.navigate("PayBillResponse", { bookingShift }) : navigation.navigate("ShiftsApplied")}
        >{bookJobTalent === 'bookJobTalent' ? 'APPLY FOR SHIFT(S)' : 'BOOK FOR SHIFT(S)'}</Button>
      </View>
    </Container>
  );
}
