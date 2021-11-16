import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../Constants/colors';
import styles from './Styles';

function TextButton({children, style}) {
  return (
    <View style={styles.container}>
      {children ? (
        <Text style={[styles.label, style]}>{children}</Text>
      ) : (
        <Text style={styles.label}>
          Terms & Conditions <Text style={{color: colors.green}}>•</Text> Privacy
          Policy
        </Text>
      )}
    </View>
  );
}

export {TextButton};
