import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import colors from '../../Constants/colors';

function JobCardClient({
  type = 'new',
  title,
  job,
  item,
  price,
  aprovalStatus,
  time,
  onPress,
  image,
  rate,
  tagText,
  tagText2,
  showIcon,
}) {
  const types = {
    new: {
      solid: '#3eb561',
      trans: 'rgba(62, 181, 97, 0.2)',
    },
    completed: {
      solid: '#f9b312',
      trans: 'rgba(249, 179, 18, 0.1)',
    },
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.oval, {backgroundColor: types[type].solid}]} />
          <View>
            <Text style={styles.title}>{title}</Text>

            {time ? <Text style={styles.fee}>Shift Time: {time}</Text> : null}
            <Text style={styles.address}>Job: {job}</Text>
            {item ? <Text style={styles.address}>Item: {item}</Text> : null}
            {price ? <Text style={styles.address}>Fee: {price}</Text> : null}
            {price ? <Text style={styles.address}>{aprovalStatus}</Text> : null}
            <View style={styles.row}>
              {showIcon?<View style={{marginLeft:'2%',paddingTop:'5%',justifyContent:'space-between',flexDirection:'row'}}>
              <View style={{marginRight:10}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
             
                  bottom: 10,
                  right: 10,
                  height: 32,
                  backgroundColor: '#3EB561',
                  borderRadius: 100,
                }}>
                <Icon name="check" size={20} color={colors.pureWhite} />
              </TouchableOpacity>
              </View>
              <View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                
                  bottom: 10,
                  right: 10,
                  height: 32,
                  backgroundColor: '#E892A4',
                  borderRadius: 100,
                }}>
                <Icon2 name="do-not-disturb" size={20} color={colors.pureWhite} />
              </TouchableOpacity>
              </View>
              </View>:null}
          
              {tagText ? (
                <View
                  style={[styles.tagCon, {backgroundColor: types[type].trans}]}>
                  <Text style={[styles.tagText, {color: types[type].solid}]}>
                    {tagText}
                  </Text>
                </View>
              ) : null}

              {tagText2 ? (
                <View
                  style={[
                    styles.tagCon,
                    {
                      backgroundColor: colors.pureWhite,
                      borderWidth: 1,
                      borderColor: 'gray',
                    },
                  ]}>
                  <Text style={[styles.tagText, {color: 'gray'}]}>
                    {tagText2}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <Image source={image} style={styles.image} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export {JobCardClient};
