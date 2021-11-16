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
    backgroundColor: colors.blue,
  },
  buttonTEXT: {
    fontSize: RFValue(18, 812),
  },
  button: {
    marginTop: heightPercentageToDP('5%'),
    width: widthPercentageToDP('61%'),
    backgroundColor: colors.green,
  },
  icon: {
    left: 2,
  },
});
