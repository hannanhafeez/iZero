import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import  colors  from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    width: widthPercentageToDP('82%'),
    marginTop: heightPercentageToDP('3.3%'),
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(22, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkBlue,
  },
  logo: {
    marginVertical: heightPercentageToDP('5.6%'),
  },
  sub: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5b6679',
    marginTop: heightPercentageToDP('2.5%'),
  },
});
