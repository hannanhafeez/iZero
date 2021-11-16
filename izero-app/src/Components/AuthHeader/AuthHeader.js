import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {BackArrow, TextLogo} from '../../Assets/Icons';

function AuthHeader({children, sub, navigaton}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigaton?.goBack()}>
        <BackArrow />
      </TouchableOpacity>
      <TextLogo style={styles.logo} />
      <Text style={styles.title}>{children}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

export {AuthHeader};
