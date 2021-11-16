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
    marginVertical: heightPercentageToDP('4.8%'),
    flexDirection: 'row',
    width: widthPercentageToDP('82%'),
    justifyContent: 'space-between',
  },
  checkCon: {
    width: widthPercentageToDP('6%'),
    height: widthPercentageToDP('6%'),
    borderRadius: widthPercentageToDP('6%') / 2,
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  checked: {},
  text: {
    fontFamily: 'Europa',
    fontSize: RFValue(15, 812),
    fontWeight: 'normal',
    fontStyle: 'italic',
    lineHeight: 21,
    letterSpacing: 0,
    color: colors.darkGrey,
    width: widthPercentageToDP('69%'),
  },
  highlighted: {
    fontStyle: 'italic',
    fontFamily: 'Europa-Bold',
    textDecorationLine: 'underline',
  },
});
