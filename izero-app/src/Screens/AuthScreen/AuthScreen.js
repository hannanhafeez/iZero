import React from 'react';
import {View, Text} from 'react-native';
import {Container, SelectHeader, Button, TextButton} from '../../Components';
import styles from './Styles';
import { useDispatch,useSelector } from 'react-redux';

export default function AuthScreen({navigation}) {

  return (
    <Container safeArea>
      <SelectHeader source={require('../../Assets/Images/AuthImage.png')} />

      <Button
        onPress={() => navigation.navigate('SignUpDetails')}
        style={styles.firstButton}>
        CREATE NEW ACCOUNT
      </Button>
      <Button
        onPress={() => navigation.navigate('Login')}
        style={styles.lastButton}
        textStyle={styles.textStyle}>
        LOG BACK IN
      </Button>
      <TextButton seperator></TextButton>
    </Container>
  );
}
