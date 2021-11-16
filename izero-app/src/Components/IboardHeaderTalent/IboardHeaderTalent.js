import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {SearchIcon} from '../../Assets/Icons';

function IboardHeaderTalent({onPress, name, date, image}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={image}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.IconCon}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
}

export {IboardHeaderTalent};
