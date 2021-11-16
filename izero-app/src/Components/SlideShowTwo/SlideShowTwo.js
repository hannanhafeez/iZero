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

function Success() {
  return (
    <View style={styles.header}>
      <Oval
        color="#3eb561"
        width={widthPercentageToDP('100%')}
        height={heightPercentageToDP('46%')}
      />
      <Image
        source={require('../../Assets/Images/SuccessImage.png')}
        style={styles.image}
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
  },
  image: {
    width: widthPercentageToDP('100%'),
    height: heightPercentageToDP('55%'),
    position: 'absolute',
    marginTop: heightPercentageToDP('3.8%'),
    alignSelf: 'center'
  },
});

export {Success};
