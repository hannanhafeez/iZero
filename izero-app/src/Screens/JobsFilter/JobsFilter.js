import React,{useEffect} from 'react';
import {View, Text} from 'react-native';
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
import {FilterIcon, BackArrow, CloseIcon} from '../../Assets/Icons';

export default function JobsFilter({navigation}) {
  useEffect(() =>{ console.log('JobsFilter'),[]});
  
  return (
    <Container safeArea>
      <ImageHeader />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.horizontal}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: widthPercentageToDP('5.8%')}}>
            <Button textStyle={styles.btnText} style={styles.category}>
              Live Jobs
            </Button>
            <Button
              textStyle={[styles.btnText, styles.btnTextInActive]}
              style={[styles.category, styles.categoryInactive]}>
              Upcoming Jobs
            </Button>

            <Button
              textStyle={[styles.btnText, styles.btnTextInActive]}
              style={[styles.category, styles.categoryInactive]}>
              Completed Jobs
            </Button>
          </ScrollView>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Jobs</Text>
            <Text style={styles.sub}>1 Job matching your filters</Text>
          </View>
          <CloseIcon />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Job Type</Text>
            <Text style={styles.sub}>No type selected</Text>
          </View>
          <BackArrow color="#3eb561" style={styles.rotate} />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Hourly Rate</Text>
            <Text style={styles.sub}>Price per hour</Text>
          </View>
          <BackArrow color="#3eb561" style={styles.rotate} />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.sub}>No location selected</Text>
          </View>
          <BackArrow color="#3eb561" style={styles.rotate} />
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Jobs</Text>
            <Text style={styles.sub}>2 Jobs match your job sector</Text>
          </View>
          <BackArrow color="#3eb561" style={styles.rotate} />
        </View>
      </ScrollView>
    </Container>
  );
}
