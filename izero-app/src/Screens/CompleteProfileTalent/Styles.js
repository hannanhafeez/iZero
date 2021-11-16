import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: colors.green,
  },
  button: {
    marginTop: heightPercentageToDP('5%'),
    width: widthPercentageToDP('82%'),
    borderColor: colors.green,
    borderWidth: 2,
    backgroundColor: colors.pureWhite,
  },
  icon: {
    left: 2,
  },
  btnText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.green,
  },

  submitButton: {
    width: widthPercentageToDP('82%'),
    backgroundColor: '#24334c',
  },
  submitButtonText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
});
