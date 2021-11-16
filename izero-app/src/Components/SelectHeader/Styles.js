const {StyleSheet} = require('react-native');
import colors from '../../Constants/colors';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Europa',
    width: widthPercentageToDP('81.8%'),
    fontSize: RFValue(20, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.darkGreyHigh,
    marginTop: heightPercentageToDP('6.1%'),
    marginBottom: heightPercentageToDP('4%'),
  },
  image: {
    width: widthPercentageToDP('87.4%'),
    height: heightPercentageToDP('46%'),
    resizeMode: 'contain',
  },
});
