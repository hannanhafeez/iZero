import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TouchableHighlight,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Container, ImageHeader, Heading, Button } from '../../Components';
import styles from './Styles';
import { ArrowIcon, ChatIcon, PhoneaIcon } from '../../Assets/Icons';
import { widthConverter, heightConverter } from '../../Helpers/Responsive';

import {SearchIcon, FilterIcon} from '../../Assets/Icons';

import {useSelector, useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Api from '../../api';
import {RFValue} from 'react-native-responsive-fontsize';

import IconCross from 'react-native-vector-icons/Entypo';
import {useIsFocused} from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../../Constants/colors';

export default function BookingDetailsCalnderClient({ navigation, route }) {
  
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const user = useSelector((state) => state?.auth?.user);



  let today = new Date();

  let day = today?.toString()?.split(' ')[0];
  let date = today?.toString()?.split(' ')[2];
  let month = today?.toString()?.split(' ')[1];

  var currentDate = day + ' ' + date + ' ' + month;

  const [checkSearch, setCheckSearch] = useState(false);

  useEffect(() => {
    console.log('BookingDetailsCalnderClient');
  }, [isFocused]);

  return (
    <Container safeArea>
      {/* <ImageHeader
        name={'Craig Wilkinson'} date={'Mon 22 June'}
        image={require('../../Assets/Demo/Face.png')}
      /> */}
       <View
        style={{
          backgroundColor: colors.pureWhite,
          height: heightPercentageToDP('9%'),
          borderBottomWidth: 0.3,
          borderBottomColor: colors.darkGreyHigh,
          width: widthPercentageToDP('100%'),
          paddingHorizontal: widthPercentageToDP('5.8%'),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={
              user?.avatar !== null
                ? {uri: user?.avatar}
                : require('../../Assets/Images/avatar.png')
            }
            style={{
              borderRadius: widthPercentageToDP('12%'),
              width: widthPercentageToDP('12%'),
              height: widthPercentageToDP('12%'),
            }}
          />
          {checkSearch == false ? (
            <View
              style={{
                marginLeft: widthPercentageToDP('4%'),
              }}>
              <Text
                style={{
                  fontFamily: 'Europa',
                  fontSize: RFValue(16, 812),
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: colors.darkBlue2,
                }}>
                {currentDate}
              </Text>
              <Text
                style={{
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(24, 812),
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: colors.green,
                }}>
                {user?.first_name + ' ' + user?.last_name}
              </Text>
            </View>
          ) : null}
        </View>
        {checkSearch ? (
          <>
            <TextInput
              placeholder="Search iZero"
              underlineColorAndroid="transparent"
              placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                width: widthPercentageToDP('60%'),
                height: widthPercentageToDP('12%'),
                borderWidth: 1,
                borderRadius: 30,
                borderColor: 'rgba(0, 0, 0, 0.07)',
                paddingLeft: 20,
                fontSize: 17,
              }}></TextInput>
            <TouchableOpacity
              //onPress={() => searchFunc()}
              style={{
                width: widthPercentageToDP('12%'),
                height: widthPercentageToDP('12%'),
                borderRadius: widthPercentageToDP('12%') / 2,
                backgroundColor: colors.pureWhite,
                shadowColor: 'rgba(0, 0, 0, 0.07)',
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowRadius: 5,
                shadowOpacity: 1,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#efefef',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconCross name="cross" size={30} color={colors.pureBlack}/>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            //onPress={() => searchFunc()}
            style={{
              width: widthPercentageToDP('12%'),
              height: widthPercentageToDP('12%'),
              borderRadius: widthPercentageToDP('12%') / 2,
              backgroundColor: colors.pureWhite,
              shadowColor: 'rgba(0, 0, 0, 0.07)',
              shadowOffset: {
                width: 1,
                height: 3,
              },
              shadowRadius: 5,
              shadowOpacity: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#efefef',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SearchIcon />
          </TouchableOpacity>
        )}
      </View>
     
      <ScrollView>
        <View style={styles.row}>
          <TouchableHighlight
          underlayColor=""
          onPress={()=>navigation.goBack()}
          >
          <View style={styles.innerrow}>
            <ArrowIcon style={styles.rotate} />
            <Text style={styles.header}>Bookings</Text>
          </View>
          </TouchableHighlight>
          <View style={styles.tag} style={styles.tagOne}>
            <Text style={styles.tagTextOne}>Set Availability</Text>
          </View>
        </View>
        <View style={[styles.section]}>
          <View style={{ paddingHorizontal: widthConverter(22) }}>
            <Text style={styles.title}>Brand Ambassador Set Up</Text>
            <Text style={styles.date}>Tuesday 6 June 2020</Text>

            <Text style={styles.date}>07:00 - 08:30</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.innerrow}>
              <Image
                source={require('../../Assets/Demo/Face.png')}
                style={styles.image}
              />
              <Image
                source={require('../../Assets/Demo/Face.png')}
                style={styles.image}
              />
              <Image
                source={require('../../Assets/Demo/Face.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>Active Job</Text>
            </View>
          </View>

          <View style={[styles.row, styles.div]}>
            <View>
              <Text style={[styles.h1, styles.h1Bold]}>Point of Contact</Text>
              <Text style={[styles.h1]}>Sarah Gillingham</Text>
            </View>
            <View style={styles.innerrow}>
              <View style={styles.iconCon}>
                <ChatIcon
                  width={widthConverter(25)}
                  height={heightConverter(25)}
                  color={'#3eb561'}
                />
              </View>
              <View style={styles.iconCon}>
                <PhoneaIcon
                  width={widthConverter(25)}
                  height={heightConverter(25)}
                />
              </View>
            </View>
          </View>
          <View style={[styles.row, styles.div]}>
            <View>
              <Text style={[styles.h1, styles.h1Bold]}>Location</Text>
              <Text style={[styles.h1]}>
                7th Floor, Aldwych House, Aldwych London WC2B , United Kingdom
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.div]}>
            <View>
              <Text style={[styles.h1, styles.h1Bold]}>Notes</Text>
              <Text style={[styles.h1]}>
                Please make sure you are here 15 minutes early for check in and
                covid checks.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <Button onPress={() => navigation.navigate('BookingAvailability')} style={styles.btn}>Add to Calendar</Button> */}
    </Container>
  );
}
