import colors from '../../Constants/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    flex: 1,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: colors.blue,
  },
  lastButton: {
    marginTop: heightPercentageToDP('2.2%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: colors.darkGreyLow2,
  },
  textStyle: {
    color: colors.blue,
  },
});
