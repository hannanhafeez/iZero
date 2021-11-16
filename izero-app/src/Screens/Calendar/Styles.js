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
  textStyle: {
    color: '#24334c',
  },
  arrowCon: {
    width: 41,
    height: 41,
    backgroundColor: 'rgba(62, 181, 97, 0.12)',
    borderRadius: 41 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    position: 'absolute',
    alignItems: 'flex-end',
  },
  time: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(10, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(16, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  cardTime: {
    fontFamily: 'Europa',
    fontSize: RFValue(13, 812),
    marginTop: 4,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
});
