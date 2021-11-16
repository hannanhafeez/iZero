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
    height: heightPercentageToDP('26%'),
    paddingVertical: heightPercentageToDP('2.7%'),
    borderTopWidth: 0.3,
    borderColor: colors.darkGreyHigh,
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    // alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    width: '100%',
  },
  tag: {
    width: widthPercentageToDP('40%'),
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondTag: {
    width: widthPercentageToDP('30%'),
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  color: {
    color: colors.darkGreyLow,
  },
  tagText: {
    fontFamily: 'Europa',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.darkBlue,
  },
  fee: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.darkBlue,
    marginTop: 14,
  },
  address: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.darkGreyLow,
    marginTop: 14,
  },
  button: {
    width: widthPercentageToDP('88%'),
    height: heightPercentageToDP('5.6%'),
    borderRadius: 23,
    backgroundColor: colors.darkBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.green,
    marginTop: 14,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(18, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.pureWhite,
  },
});
