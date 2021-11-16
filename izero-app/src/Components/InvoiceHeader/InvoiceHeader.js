import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {ArrowIcon, TextLogo} from '../../Assets/Icons';
import {heightConverter, widthConverter} from '../../Helpers/Responsive';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

function InvoiceHeader({invoice, jobFee, date, title, cost}) {
  const navigation = useNavigation();
  const userType = useSelector((state) => state.auth.userType);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconCon}>
          <ArrowIcon style={styles.rotate} />
        </TouchableOpacity>
        <TextLogo width={widthConverter(155)} height={heightConverter(22)} />
      </View>

      <View style={styles.details}>
        {date ? (
          <Text style={styles.date}>{date}</Text>
        ) : (
          <Text style={styles.date}>Expense</Text>
        )}
        <Text style={styles.title}>{invoice}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.net}>PRICE</Text>
        <Text style={styles.pay}>£{jobFee}</Text>
      </View>
    </View>
  );
}

export {InvoiceHeader};
