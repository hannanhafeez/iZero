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
    flex: 1,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: '#24334c',
  },
  lastButton: {
    marginTop: heightPercentageToDP('2.2%'),

    width: widthPercentageToDP('73.6%'),
    backgroundColor: 'rgba(142, 150, 163, 0.15)',
  },
  conSTyle: {
    marginBottom: heightPercentageToDP('2.2%'),
  },
  textStyle: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(16, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  top: {
    bottom: heightPercentageToDP('20%'),
  },
  over: {
    position: 'absolute',
  },
  Button: {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
  },
  sticky: {
    width: widthPercentageToDP('100%'),
    borderStyle: 'solid',
    borderTopWidth: 0.3,
    borderColor: colors.darkGreyHigh,
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP('12%'),
  },
  firstRow: {
    width: widthPercentageToDP('100%'),
   // paddingHorizontal: widthPercentageToDP('5.8%'),
   // paddingVertical: widthPercentageToDP('6%'),
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
  },
  bottomBtn: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    paddingVertical: widthPercentageToDP('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
    paddingLeft:widthPercentageToDP('12%'),
    paddingRight:widthPercentageToDP('12%'),
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(22, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
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
});
