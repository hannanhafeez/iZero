import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, } from 'react-native';
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
export default function Ratings({navigation}) {

  const ratingCompleted = (rating) => {
  };
 

  useEffect(() => {
    console.log('Ratings'), [];
  });

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
/* <Rating
        // showRating
        type="custom"
        onFinishRating={ratingCompleted}
        style={{paddingVertical: 10}}
        ratingColor="#24334C"
        // selectedColor={colors.red}
        reviewColor="blue"
        tintColor={colors.pureWhite}
        ratingBackgroundColor="#c8c7c8"
        imageSize={20}
        
      /> */
