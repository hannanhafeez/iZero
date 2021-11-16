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
    //marginTop: heightPercentageToDP('5%'),
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
    paddingVertical: widthPercentageToDP('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
  },
  active: {
    width: widthPercentageToDP('100%'),
    //  paddingHorizontal: widthPercentageToDP('5.8%'),
    paddingVertical: widthPercentageToDP('6%'),

    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
  },
  firstRowtwo: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstRowthree: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: 'rgba(36, 51, 76, 0.75)',
    fontSize: RFValue(21, 812),
  },
  headingCon: {
    marginTop: heightPercentageToDP('3%'),
    marginBottom: heightPercentageToDP('0%'),
    width: widthPercentageToDP('88.4%'),
  },
  button: {
    marginTop: heightPercentageToDP('5%'),
    width: widthPercentageToDP('82%'),
    borderColor: '#24334c',
    borderWidth: 2,
    backgroundColor: colors.pureWhite,
  },
  btnText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
});
