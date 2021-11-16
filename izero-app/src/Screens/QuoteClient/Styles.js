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
    backgroundColor: colors.pureWhite,
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
    backgroundColor: colors.pureWhite,
    borderWidth: 2,
    borderColor: '#24334c'
  },

  buttonGetQuote: {
    width: widthPercentageToDP('85'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('3%'),
    alignSelf: 'center',
    backgroundColor: '#3EB561',
  },

  buttonNoThanksQuote: {
    width: widthPercentageToDP('38.6'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('3%'),
    marginLeft: 10,
    borderWidth: 2,
    borderColor: colors.pureBlack,
    backgroundColor: colors.pureWhite,
    marginRight: 15,
  },

  buttonSaveQuote: {
    width: widthPercentageToDP('38.6'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('3%'),
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.pureBlack,
    backgroundColor: colors.pureWhite,
    marginLeft: 15,
  },
  btnText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
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
    right: widthConverter(20),
    top: heightConverter(25),
  },
});
