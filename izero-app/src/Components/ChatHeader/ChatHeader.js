import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../Helpers/Responsive';
import {BackArrow, ArrowIcon, HeartIcon} from '../../Assets/Icons';
import {OvalChat} from '../../Assets/Graphics/OvalChat';
import colors from '../../Constants/colors';

function ChatHeader({onBack, screen}) {
  return (
    <View style={styles.container}>
      <OvalChat
        height={heightConverter(170)}
        width={widthConverter(375)}
        color={'#24334c'}
        // style={styles.top}
      />
      <View
        style={[
          styles.overlay,
          {backgroundColor: screen === 'ShiftsApplied' ? '#24334C' : null},
        ]}>
        <View style={styles.over}>
          {screen === 'ShiftsApplied' ? (
            <View />
          ) : (
            <TouchableOpacity onPress={onBack} style={styles.btnCon}>
              <ArrowIcon style={styles.rotate} color={'#24334c'} />
            </TouchableOpacity>
          )}
          <View style={styles.imageCon}>
            <Image
              style={styles.image}
              source={require('../../Assets/Demo/Logo1.png')}
            />
          </View>
          {screen === 'ShiftsApplied' ? (
            <View />
          ) : (
            <View style={styles.btnCon}>
              <HeartIcon />
            </View>
          )}
        </View>
        <Text
          style={[
            styles.title,
            {color: screen === 'ShiftsApplied' ? colors.pureWhite : '#24334c'},
          ]}>
          Wasserman
        </Text>
      </View>
    </View>
  );
}

export {ChatHeader};
