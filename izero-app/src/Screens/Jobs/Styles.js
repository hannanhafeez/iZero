import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthConverter,
  heightConverter,
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
    //paddingHorizontal: widthPercentageToDP('5.8%'),
    paddingVertical: widthPercentageToDP('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
  },
  heading: {
    color: 'rgba(36, 51, 76, 0.75)',
    fontSize: RFValue(21, 812),
  },
  headingCon: {
    marginTop: heightPercentageToDP('3%'),
    width: widthPercentageToDP('88.4%'),
  },
  category: {
    height: heightPercentageToDP('3.2%'),
    width: null,
    paddingHorizontal: widthPercentageToDP('4.2%'),
    marginRight: widthPercentageToDP('3.2%'),
  },
  btnText: {
    fontFamily: 'Europa',
    fontSize: RFValue(15, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  horizontal: {
    width: widthPercentageToDP('100%'),
    marginTop: heightPercentageToDP('2.5%'),
  },
  btnTextInActive: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5b6679',
  },
  categoryInactive: {
    backgroundColor: 'rgba(91, 102, 121, 0.09)',
  },
  row: {
    width: widthConverter(375),
    alignSelf: 'center',
    paddingTop: heightConverter(22),
    borderBottomWidth: 0.3,
    borderColor: colors.darkGreyHigh,
    paddingHorizontal: widthConverter(22),
    paddingBottom: heightConverter(13.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(22, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
  sub: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
  },
});
