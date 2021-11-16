import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import CarouselRN, {Pagination} from 'react-native-snap-carousel';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';

function Carousel({data = [], onChange = () => {}}) {
  const [activeSlide, setactiveSlide] = useState(0);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        {item.Header()}
        <View style={{width: widthPercentageToDP('81%'), alignSelf: 'center'}}>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: 'transparent',
          width: widthPercentageToDP('3.2%'),
          height: widthPercentageToDP('3.2%'),
        }}
        dotStyle={{
          width: widthPercentageToDP('3.2%'),
          height: widthPercentageToDP('3.2%'),
          borderRadius: widthPercentageToDP('3.2%') / 2,
          backgroundColor: '#3eb561',
        }}
        dotContainerStyle={{
          marginRight: 10,
        }}
        inactiveDotOpacity={0.25}
        inactiveDotScale={1}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CarouselRN
        data={data}
        contentContainerStyle={{
          height: heightPercentageToDP('25%'),
          marginBottom: heightPercentageToDP('2.8%'),
        }}
        layoutCardOffset={0}
        sliderHeight={heightPercentageToDP('25%')}
        renderItem={_renderItem}
        sliderWidth={widthPercentageToDP('100%')}
        itemWidth={widthPercentageToDP('100%')}
        onSnapToItem={(index) => {
          setactiveSlide(index);
          onChange(index);
        }}
      />
      <View>{pagination()}</View>
    </View>
  );
}

export {Carousel};
