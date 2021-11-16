import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';
import styles from './Styles';

function TextSwitch() {
  const [value, setvalue] = useState(false); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        I’d like to receive marketing, updates, news and job offers via email.
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#3eb561'}}
        value={value}
        onValueChange={() => setvalue(!value)}
      />
    </View>
  );
}

export {TextSwitch};
