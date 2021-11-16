import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Container, Button} from '../../../Components';
import {widthConverter, heightConverter} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../Constants/colors';

export default function ClientInfo() {
  const navigation = useNavigation();
  return (
    <Container>
      <View style={styles.second}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          Employer
        </Text>
        <Text style={styles.textContent}>Wasserman</Text>
      </View>

      <View style={styles.second}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          Point of Contact
        </Text>
        <Text style={styles.textContent}>Sarah Gillingham</Text>
      </View>

      <View style={styles.second}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          Call: 0207 986 6674
        </Text>
      </View>

      <View style={styles.second}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          Location
        </Text>
        <Text style={styles.textContent}>
          7th Floor, Aldwych House, Aldwych London WC2B , United Kingdom
        </Text>
      </View>
      <View style={styles.sticky}>
        <Button
          onPress={() => navigation.navigate('SelectShifts')}
          style={{width: widthConverter(261), height: heightConverter(50)}}>
          APPLY FOR JOB ROLE
        </Button>
        <View style={styles.iconCon}>
          <ChatIcon width={widthConverter(30)} height={heightConverter(28)} />
        </View>
      </View>
    </Container>
  );
}

// Create excitement in the brand
// Participate in awareness and promotional campaigns, engaging with customers, attending events including community centres, shopping centres, outdoor events
// Customer Generation
// Follow up on leads generated at brand awareness events, drive sales whilst maintaining brand image

const styles = StyleSheet.create({
  tag: {
    width: widthConverter(96),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthConverter(12),
  },
  text: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(331),
    alignSelf: 'center',
    marginTop: heightConverter(40),
    marginBottom: heightConverter(19),
  },
  outlined: {
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  second: {
    width: widthConverter(331),
    marginBottom: heightConverter(19),
    alignSelf: 'center',
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  sticky: {
    height: heightConverter(105),
    width: widthConverter(375),
    paddingHorizontal: widthConverter(22),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderColor: colors.darkGreyHigh,
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: widthConverter(375),
    height: widthConverter(232),
    marginBottom: heightConverter(19),
  },
});
