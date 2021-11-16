import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Styles';
import {SelectGraphicsOne} from '../../Assets/Graphics';
import {Button} from '../Button/Button';

function SelectHeader({source}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        iZero takes the pressure off zero out contracts
      </Text>

      <Image source={source} style={styles.image} />
    </View>
  );
}

export {SelectHeader};
