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

let dummy = false;

const favAdd = async (jwt) => {
  try {
    let data = new FormData();
    data.append('talent_id', id);
    data.append('status', 1);
    let res = await Api.post('/fav_unfav_job', data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log('Fav api response', res);
    alert(res?.data?.message);
    navigation.goBack();
  } catch (error) {
    alert('Something went wrong please try again latter');
    navigation.goBack();
    console.log({error});
  }
};

const unFavAdd = async (jwt) => {
  try {
    let data = new FormData();
    data.append('talent_id', id);
    data.append('status', 0);
    let res = await Api.post('/fav_unfav_job', data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log('Un fav api response', res);
    alert(res?.data?.message);
    navigation.goBack();
  } catch (error) {
    console.log({error});
    alert('Something went wrong please try again latter');
    navigation.goBack();
  }
};

function DetailsHeader({
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
          {screen === 'ShiftsApplied' ? (
            <View />
          ) : (
            <>
              {status ? (
                <TouchableOpacity
                //onPress={() => favAdd(jwt)}
                >
                  <View
                    style={{
                      width: widthPercentageToDP('12%'),
                      height: widthPercentageToDP('12%'),
                      // backgroundColor: colors.pureWhite,
                      // shadowColor: 'rgba(0, 0, 0, 0.07)',
                      // shadowOffset: {
                      //   width: 1,
                      //   height: 3,
                      // },
                      //shadowRadius: 5,
                      //shadowOpacity: 1,
                      borderStyle: 'solid',
                      //borderWidth: 1,
                      //borderColor: '#efefef',
                      borderRadius: widthPercentageToDP('12%') / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <HeartIcon /> */}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                //onPress={() => unFavAdd(jwt)}
                >
                  <View
                    style={{
                      width: widthPercentageToDP('12%'),
                      height: widthPercentageToDP('12%'),
                      //backgroundColor: colors.pureWhite,
                      // shadowColor: 'rgba(0, 0, 0, 0.07)',
                      // shadowOffset: {
                      //   width: 1,
                      //   height: 3,
                      // },
                      //shadowRadius: 5,
                      //shadowOpacity: 1,
                      borderStyle: 'solid',
                      //borderWidth: 1,
                      //borderColor: '#efefef',
                      borderRadius: widthPercentageToDP('12%') / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <HeartIcon2 /> */}
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <Text
          style={[
            styles.title,
            {color: screen === 'ShiftsApplied' ? colors.pureWhite : '#24334c'},
          ]}>
          {/* Jnr Brand Ambassador */}
          {name}
        </Text>
        <Text
          style={[
            styles.fee,
            {color: screen === 'ShiftsApplied' ? colors.pureWhite: '#24334c'},
          ]}>
          {/* Fee: £90.00 - £120.00 */}
          {checkJobDetails ? 'Fee: £ ' + fee : fee}
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
                  screen === 'ShiftsApplied' ? colors.pureWhite : colors.darkGreyHigh,
              },
            ]}>
            {'Jobs Completed' + ' ' + jobCompleted}
          </Text>
        )}
      </View>
    </View>
  );
}

export {DetailsHeader};
