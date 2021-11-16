import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './Styles';
import {Oval} from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../Helpers/Responsive';
import {BackArrow, ArrowIcon, HeartIcon, HeartIcon2} from '../../Assets/Icons';
import {Ovaltwo} from '../../Assets/Graphics/Ovaltwo';
import {RFValue} from 'react-native-responsive-fontsize';

function QRCodeScanHeader({
  onBack,
  screen,
  name,
  avatar,
  jobCompleted,
  fee,
  address,
  id,
  flagFav,
  checkJobDetails,
  status,
}) {
  return (
    <View style={styles.container}>
      <Ovaltwo
        height={heightConverter(170)}
        width={widthConverter(375)}
        color={'#24334c'}
        style={styles.top}
      />
      <View style={styles.overlay}>
        <View style={styles.over}>
          <View>
            <TouchableOpacity onPress={onBack} style={styles.btnCon}>
              <ArrowIcon style={styles.rotate} color={'#24334c'} />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: '25%', marginTop: '16%'}}>
          <View style={styles.imageCon}>
            <Image
              style={styles.image}
              source={
                avatar ? {uri: avatar} : require('../../Assets/Demo/qrCode.png')
              }
            />
        </View>
        </View>
        </View>
        {/* <Text style={styles.title}>{name}</Text>
        <Text style={styles.fee}>
          {checkJobDetails ? 'Fee: £ ' + fee : fee}
        </Text>
        <Text style={styles.address}>{address}</Text> */}
      </View>
    </View>
  );
}

export {QRCodeScanHeader};
