import React from 'react';
import {View, Text, Animated, TouchableWithoutFeedback} from 'react-native';
import styles from './Styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import colors from '../../Constants/colors';

function RatingButton({children, animated, style, textStyle, icon, onPress}) {
  const Root = animated ? Animated.View : View;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Root style={[styles.container, style]}>
        {icon ? (
          icon
        ) : (
          <View style={{flexDirection:'row'}}>
            <View style={{marginTop:10,marginRight:8}}>
            <Text style={[styles.label, textStyle]}>{children}</Text>
            </View>
            <View>
            <Rating
            ratingCount={5}
              // showRating
              type="custom"
              //onFinishRating={ratingCompleted}
              style={{paddingVertical: 10}}
              ratingColor="#24334C"
              // selectedColor={colors.red}
              reviewColor="blue"
              tintColor={colors.pureWhite}
              ratingBackgroundColor="#c8c7c8"
              imageSize={20}
            />
            </View>
          </View>
        )}
      </Root>
    </TouchableWithoutFeedback>
  );
}

export {RatingButton};
