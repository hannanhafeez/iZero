import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const { StyleSheet } = require('react-native');

export default StyleSheet.create({

  mainContainer: {
    backgroundColor: colors.pureWhite,
    width: widthPercentageToDP('82%'),
    marginTop: heightPercentageToDP('3%'),
  },
  container: {
    backgroundColor: colors.pureWhite,
  },
  label: {
    fontFamily: 'Europa',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5b6679',
  },
  input: {
   //flex: 1,
    height: heightPercentageToDP('6%'),
    //marginTop: heightPercentageToDP('1%'),
    fontFamily: 'Europa',
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    marginTop: -10,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: '#24334c',
  },
  button: {
    height: widthPercentageToDP('12.8%'),
    width: widthPercentageToDP('12.8%'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('5%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  icon: {
    left: 2,
  },
  forgotButton: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  forgotButtonText: {
    fontFamily: 'Europa',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
});
