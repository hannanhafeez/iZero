import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import {
  Oval,
  GraphicsOne,
  GraphicsTwo,
  GraphicsThree,
} from '../../Assets/Graphics';

function One() {
  return (
    <View style={styles.header}>
      <Oval
        color={'#3EB561'}
        width={widthPercentageToDP('100%')}
        height={heightPercentageToDP('46%')}
      />
      <Image
        source={require('../../Assets/Images/GraphicsOne.png')}
        style={styles.over}
      />
    </View>
  );
}

function Two() {
  return (
    <View style={styles.header}>
      <Oval
        color={'#8E96A3'}
        width={widthPercentageToDP('100%')}
        height={heightPercentageToDP('46%')}
      />
      <Image
        source={require('../../Assets/Images/GraphicsTwo.png')}
        style={styles.over}
      />
    </View>
  );
}

function Three() {
  return (
    <View style={styles.header}>
      <Oval
        color={'#24334C'}
        width={widthPercentageToDP('100%')}
        height={heightPercentageToDP('46%')}
      />
      <Image
        source={require('../../Assets/Images/GraphicsFour.png')}
        style={styles.over}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: heightPercentageToDP('53%'),
    marginBottom: heightPercentageToDP('4%'),
  },
  over: {
    position: 'absolute',
    marginTop: heightPercentageToDP('3.8%'),
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('60%'),
    resizeMode: 'contain'
  },
});

export {One, Two, Three};
