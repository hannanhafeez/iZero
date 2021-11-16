import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCard,
  Heading,
  Button,
} from '../../Components';
import styles from './Styles';
import {ScrollView} from 'react-native-gesture-handler';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {
  FilterIcon,
  BackArrow,
  CloseIcon,
  LocationIcon,
} from '../../Assets/Icons';

export default function JobsSearch({navigation}) {
  return (
    <Container safeArea>
      <ImageHeader />

      <ScrollView>
        <Text style={styles.heading}>Near Me</Text>
        <View style={styles.search}>
          <Text style={styles.searchText}>Search by me</Text>
          <LocationIcon />
        </View>
        <Text style={styles.heading}>IN JOBS</Text>
        <View style={styles.row}>
          <View style={styles.minirow}>
            <Image
              source={require('../../Assets/Demo/Logo1.png')}
              style={styles.logo}
            />
            <View>
              <Text style={styles.title}>Jobs</Text>
              <Text style={styles.sub}>Sat 25 Jun - Wed 03 Jul</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.minirow}>
            <Image
              source={require('../../Assets/Demo/Logo2.png')}
              style={styles.logo}
            />
            <View>
              <Text style={styles.title}>Jobs</Text>
              <Text style={styles.sub}>Sat 13 Jul - Mon 15 Jul</Text>
            </View>
          </View>
        </View>

      
      </ScrollView>
    </Container>
  );
}
