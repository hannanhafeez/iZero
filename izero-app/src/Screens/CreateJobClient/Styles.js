import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthConverter,
  heightConverter
} from '../../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor:colors.pureWhite,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: '#24334c',
  },
  button: {
    width: widthPercentageToDP('84.6'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('3%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.pureWhite,
    borderWidth: 2,
    borderColor: '#24334c'
  },

  buttonGetQuote: {
    width: widthPercentageToDP('84.6'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('3%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3EB561',
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
  downIcon:
  {
    zIndex: 5,
    position: 'absolute',
    right: widthConverter(2),
    top: heightConverter(25),
  },
});
