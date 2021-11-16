import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {Container, ProfileOption} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {widthConverter, heightConverter} from '../../Helpers/Responsive';
import styles from './Styles';

export default function HelpCenter() {
  return (
    <Container>
      <Oval
        color="#3eb561"
        width={widthConverter(500)}
        height={heightConverter(281)}
      />
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.row}>
            <Text style={styles.back}>Back</Text>
            <Text style={styles.title}>Help Centre</Text>
          </View>
          <Image
            source={require('../../Assets/Images/HelpCenter.png')}
            style={styles.image}
          />
          <ProfileOption label="Account Help" />
          <ProfileOption label="Privacy Policy" />
          <ProfileOption label="Terms of Use" />
          <ProfileOption label="FAQ’s" />
        </SafeAreaView>
      </View>
    </Container>
  );
}
