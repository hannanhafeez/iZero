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
import Api from '../../api';
import {useSelector} from 'react-redux';
import colors from '../../Constants/colors';

function DetailsHeaderApplyJobsShifts({
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
  const jwt = useSelector((state) => state.auth.accessToken);
  return (
    <View style={styles.container}>
      <Ovaltwo
        height={heightConverter(170)}
        width={widthConverter(375)}
        color={'#24334c'}
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
              source={
                avatar ? {uri: avatar} : require('../../Assets/Demo/Logo1.png')
              }
            />
          </View>
          <TouchableOpacity>
            <View style={styles.btnCon}>
              <HeartIcon />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.title,
            {color: screen === 'ShiftsApplied' ? colors.pureWhite: '#24334c'},
          ]}>
          {/* Jnr Brand Ambassador */}
          {name}
        </Text>
        <Text
          style={[
            styles.fee,
            {color: screen === 'ShiftsApplied' ?colors.pureWhite : '#24334c'},
          ]}>
          {/* Fee: £90.00 - £120.00 */}
          {checkJobDetails ? fee : fee}
        </Text>
        <Text
          style={[
            styles.address,
            {
              color: screen === 'ShiftsApplied' ? colors.pureWhite : colors.darkGreyHigh,
            },
          ]}>
          {/* Arena Square, Engineers Way London HA9 0AA */}
          {address}
        </Text>
        {checkJobDetails ? (
          <Text
            style={[
              styles.address,
              {
                color:
                  screen === 'ShiftsApplied' ? colors.pureWhite : colors.darkGreyHigh,
              },
            ]}></Text>
        ) : (
          <Text
            style={[
              styles.address,
              {
                color:
                  screen === 'ShiftsApplied' ?colors.pureWhite : colors.darkGreyHigh,
              },
            ]}>
            {'Jobs Completed' + ' ' + jobCompleted}
          </Text>
        )}
      </View>
    </View>
  );
}

export {DetailsHeaderApplyJobsShifts};
