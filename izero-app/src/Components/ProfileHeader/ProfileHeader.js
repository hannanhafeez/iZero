import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {BackArrow, TextLogo} from '../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';

function ProfileHeader({children, sub}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextLogo style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.over}>
        <BackArrow />
      </TouchableOpacity>
    </View>
  );
}

export {ProfileHeader};
