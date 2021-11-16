import colors from '../../Constants/colors';
import {heightPercentageToDP} from '../../Helpers/Responsive';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    marginTop: heightPercentageToDP('2.7%'),
  },
  label: {
    fontFamily: 'Europa',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
  },
});
