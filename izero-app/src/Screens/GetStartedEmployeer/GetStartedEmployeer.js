import React, {useState} from 'react';
import {View, Text, Animated} from 'react-native';
import styles from './Styles';
import {Container, Button, Carousel} from '../../Components';
import {Oval, GraphicsOne} from '../../Assets/Graphics';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {PageOne} from '../../Constants/GetStartedEmployeer';

import { useSelector } from 'react-redux';

export default function GetStartedEmployeer({navigation}) {

  const userData = useSelector((state) => state?.auth?.userType);
  
  const [animation] = useState(new Animated.Value(0));

  const startAnimation = (value) =>
    Animated.timing(animation, {
      duration: 500,
      toValue: value,
      useNativeDriver: false,
    }).start();
    
  const backgroundColor = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#3EB561', '#8E96A3', '#24334C'],
    extrapolate: 'clamp',
  });

  return (
    <Container fixedHeight>
      <Carousel onChange={startAnimation} data={PageOne} />
      <Button
        onPress={() => navigation.navigate('AuthScreen')}
        animated
        style={{backgroundColor}}>
        GET STARTED
      </Button>
    </Container>
  );
}
