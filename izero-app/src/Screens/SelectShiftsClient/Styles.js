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
    marginBottom: heightPercentageToDP('1%'),
    marginLeft: 0,
    alignItems: 'flex-start'
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
});
