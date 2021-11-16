import React, { useState,useEffect } from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './Styles';
import {Container, FinanceHeader} from '../../Components';
import {heightConverter, widthPercentageToDP} from '../../Helpers/Responsive';
import LinearGradient from 'react-native-linear-gradient';

export default function FinanceDetails() {
  useEffect(() =>{ console.log('FinanceDetails'),[]})
  return (
    <Container>
      <FinanceHeader />
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{marginTop: heightConverter(70)}}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
          style={{height: 10, width: widthPercentageToDP('100%')}}
        />
        <View style={styles.content}>
          <Text style={styles.Description}>Description</Text>
          <Text style={styles.hourlyPay}>Hourly Pay</Text>
          <Text style={styles.title}>Brand Ambassador</Text>
          <Text style={styles.units}>Units</Text>

          <View style={styles.row}>
            <Text style={styles.units}>Rate</Text>
            <Text style={styles.units}>£14.64</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.units}>Total Payments</Text>
            <Text style={styles.units}>£125.00</Text>
          </View>
        </View>
        <View style={[styles.content, {paddingTop: heightConverter(21)}]}>
          <Text style={styles.title}>Brand Ambassador</Text>
          <Text style={styles.units}>Units</Text>

          <View style={styles.row}>
            <Text style={styles.units}>Rate</Text>
            <Text style={styles.units}>£14.64</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.units}>Total Payments</Text>
            <Text style={styles.units}>£125.00</Text>
          </View>
        </View>
        <View
          style={[
            styles.content,
            {
              paddingTop: heightConverter(21),
              backgroundColor: 'rgba(62, 181, 97, 0.05)',
            },
          ]}>
          <Text style={styles.title}>Brand Ambassador</Text>
          <Text style={styles.units}>Units</Text>

          <View style={styles.row}>
            <Text style={styles.units}>Rate</Text>
            <Text style={styles.units}>£14.64</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.units}>Total Payments</Text>
            <Text style={styles.units}>£125.00</Text>
          </View>
        </View>
        <View
          style={[
            styles.content,
            {
              paddingTop: heightConverter(21),
            },
          ]}>
          <Text style={styles.title}>Pay Period</Text>
          <Text style={styles.units}>Wed 17 Jun - Thu 18 Jun 2020</Text>

          <Text style={styles.title}>Date</Text>
          <Text style={styles.units}>Wed 17 Jun - Thu 18 Jun 2020</Text>

          <Text style={styles.title}>Tax Week</Text>
          <Text style={styles.units}>11</Text>

          <Text style={styles.title}>Employee Name</Text>
          <Text style={styles.units}>Craig Wilkinson</Text>
        </View>
      </ScrollView>
    </Container>
  );
}
