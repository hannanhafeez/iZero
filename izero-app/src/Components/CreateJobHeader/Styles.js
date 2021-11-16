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
    height: heightPercentageToDP('9%'),
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  over: {
    position: 'absolute',
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
});
