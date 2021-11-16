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
    transform: [{rotate: '180deg'}],
  },
  firstRow: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    paddingVertical: widthPercentageToDP('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
  },
  heading: {
    color: 'rgba(36, 51, 76, 0.75)',
    fontSize: RFValue(21, 812),
    textAlign: 'auto',
  },
  headingCon: {
    marginTop: heightPercentageToDP('3%'),
    width: widthPercentageToDP('88.4%'),
  },
});
