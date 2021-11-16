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

function ChatScreenHeader({onBack, screen, name, pic}) {
  return (
    <View style={styles.container}>
      <OvalChat
        height={heightConverter(170)}
        width={widthConverter(375)}
        color={'#24334c'}
        // style={styles.top}
      />
      <View style={styles.overlay}>
        <View style={styles.over}>
          <TouchableOpacity onPress={onBack} style={styles.btnCon}>
            <ArrowIcon style={styles.rotate} color={'#24334c'} />
          </TouchableOpacity>

          <View style={styles.imageCon}>
            {/* <Image
              style={styles.image}
              source={require('../../Assets/Demo/Logo1.png')}
            /> */}
            {name=='Group Chat'?<Image
              style={styles.image}
              source={require('../../Assets/Images/group-chat.png')
              }
            />:
            <Image
              style={styles.image}
              source={
                pic !== null
                  ? {uri: pic}
                  : require('../../Assets/Demo/Logo1.png')
              }
            />}
          </View>

          <View
            style={{
              width: widthPercentageToDP('12%'),
              height: widthPercentageToDP('12%'),
              //backgroundColor: colors.pureWhite,
              //shadowColor: 'rgba(0, 0, 0, 0.07)',
              // shadowOffset: {
              //   width: 1,
              //   height: 3,
              // },
              //shadowRadius: 5,
              //shadowOpacity: 1,
              // borderStyle: 'solid',
              //borderWidth: 1,
              //borderColor: '#efefef',
              //borderRadius: widthPercentageToDP('12%') / 2,
              //justifyContent: 'center',
              //alignItems: 'center',
              //marginBottom:20
            }}>
            {/* <HeartIcon /> */}
          </View>
        </View>
        <Text style={[styles.title, {color: '#24334c'}]}>
          {name ? name : 'Wasserman'}
        </Text>
      </View>
    </View>
  );
}

export {ChatScreenHeader};
