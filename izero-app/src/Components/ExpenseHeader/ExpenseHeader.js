import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {ArrowIcon, TextLogo} from '../../Assets/Icons';
import {heightConverter, widthConverter} from '../../Helpers/Responsive';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

function ExpenseHeader({invoice, jobFee, date, title, cost, check}) {
  const navigation = useNavigation();
  
  const userType = useSelector((state) => state?.auth?.userType);

  return (
    <>
      {userType === 'staff' ? (
        <>
          {check == true ? (
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.iconCon}>
                  <ArrowIcon style={styles.rotate} />
                </TouchableOpacity>
                <TextLogo
                  width={widthConverter(155)}
                  height={heightConverter(22)}
                />
              </View>

              <View style={styles.details}>
                <Text style={styles.date}>Due: {'Wed 25 Jun'}</Text>
                <Text style={styles.title}>Payslip #{'1293'}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.net}>NET PAY</Text>
                <Text style={styles.pay}>£ {'110.18'}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.iconCon}>
                  <ArrowIcon style={styles.rotate} />
                </TouchableOpacity>
                <TextLogo
                  width={widthConverter(155)}
                  height={heightConverter(22)}
                />
              </View>

              <View style={styles.details}>
                <Text style={styles.date}>Expenses</Text>
                <Text style={styles.title}>{title}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.net}>NET PAY</Text>
                <Text style={styles.pay}>£ {cost}</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconCon}>
              <ArrowIcon style={styles.rotate} />
            </TouchableOpacity>
            <TextLogo
              width={widthConverter(155)}
              height={heightConverter(22)}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.date}>Expense</Text>
            <Text style={[styles.title, {borderBottomWidth: 1}]}>{title}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.net}>PRICE</Text>
            <Text style={[styles.pay, {borderBottomWidth: 1}]}>£ {cost}</Text>
          </View>
        </View>
      )}
    </>
  );
}

export {ExpenseHeader};
