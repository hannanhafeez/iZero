import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Styles';
import {EditIcon} from '../../Assets/Icons';
import {widthConverter, heightConverter} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector, dispatch} from 'react-redux';

import defaultImage from '../../Assets/Images/avatar.png';
function ImagePicker({imageSize, edit, check}) {
  const firstName = useSelector((state) => state?.auth?.user?.first_name);
  const lastName = useSelector((state) => state?.auth?.user?.last_name);
  const email = useSelector((state) => state?.auth?.user?.email);
  const phone = useSelector((state) => state?.auth?.user?.phone);
  const user = useSelector((state) => state?.auth?.user);

  return (
    <View style={styles.container}>
      <View style={styles.imageCon}>
        <Image
          style={[
            styles.image,
            imageSize
              ? {
                  width: 140,
                  height: 140,
                  borderRadius: 140,
                }
              : null,
          ]}
          source={
            user?.avatar !== null
              ? {uri: user?.avatar}
              : require('../../Assets/Images/avatar.png')
          }
        />
        {check ? <EditIcon width={35} height={35} style={styles.top} /> : null}
      </View>

      {edit ? (
        <Text style={[styles.name, {fontSize: RFValue(20, 812)}]}>
          Change Profile Picture
        </Text>
      ) : (
        <>
          <Text style={styles.name}>{firstName + '  ' + lastName}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </>
      )}
    </View>
  );
}

export {ImagePicker};
