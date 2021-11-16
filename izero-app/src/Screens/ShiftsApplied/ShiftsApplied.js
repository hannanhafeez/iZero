import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
  wi,
} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Helpers/Responsive';
import styles from './Styles';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import IconArrow from 'react-native-vector-icons/AntDesign';
import IconCheck from 'react-native-vector-icons/AntDesign';
import IconStar from 'react-native-vector-icons/FontAwesome';
import IconCross from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Dropdown} from 'react-native-material-dropdown-v2';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../Assets/Icons';
import colors from '../../Constants/colors';



export default function ShiftsApplied({navigation, route}) {
  const [vissible, setVissible] = useState(true);

  const moveFaorward = () => {
    setVissible(false);
    //navigation.navigate('CancelShiftsApplied');
    navigation.navigate('JobDetails');
  };



  useEffect(() => {
    console.log('ShiftsApplied'), [];
  });

  return (
    <Container>
      <ScrollView>
        <Modal transparent animationType="fade" visible={vissible}>
          <View style={styles.modelMainContainer}>
            <View
              style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={styles.image}
                source={require('../../Assets/Demo/Logo1.png')}
              />
              <Text style={styles.HeadingText}>Apple Iphone 12 Launch</Text>
              <Text style={styles.HeadingText}>
                128 New St, Birgmingham B2 4DB
              </Text>
             
               <View style={{flexDirection:'row'}}>
               <View
                  style={{
                    marginLeft: 30,
                    backgroundColor: '#284C4F',
                    borderRadius: 20,
                    marginTop: 20,
                    paddingVertical: 5,
                    justifyContent: 'center',
                   
                  }}>
                  <Text
                    style={{
                      color: '#78C890',
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    Wed 25 Jun 2020
                  </Text>
                </View>
             
              <View
                style={{
                  marginLeft: 30,
                  borderColor: '#ABB0BA',
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingVertical: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: colors.pureWhite, paddingLeft: 10, paddingRight: 10}}>
                  08:00 - 16: 00
                </Text>
              </View>
               </View>
            </View>

            <View
              style={{
                flex: 2.5,
                backgroundColor: '#1C2B43',
                marginHorizontal: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 120,
                  borderWidth: 3,
                  borderColor: '#3CAF5F',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconCheck name="check" size={80} color="#5FC07B" />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text style={styles.HeadingText}>Shift(s)</Text>
                <Text
                  style={[
                    styles.HeadingText,
                    {
                      marginLeft: 5,
                      color: '#3CAF5F',
                    },
                  ]}>
                  Applied
                </Text>
              </View>
            </View>

            <View style={{flex: 1.5, justifyContent: 'flex-end'}}>
              <View style={styles.sticky}>
                <Button
                  onPress={() => moveFaorward()}
                  style={styles.ButtonTalent}
                  textStyle={{color: colors.pureWhite}}>
                  MANAGE SHIFT(S)
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Container>
  );
}
