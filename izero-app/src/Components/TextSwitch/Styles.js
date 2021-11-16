import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    flexDirection: 'row',
    width: widthPercentageToDP('82%'),
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP('4.8%'),
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5b6679',
    width: widthPercentageToDP('59.4%'),
  },
});
