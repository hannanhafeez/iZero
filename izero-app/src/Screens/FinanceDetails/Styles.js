import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  Description: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
  },
  content: {
    // flex: 1,
    
    width: widthConverter(375),
    paddingHorizontal: widthConverter(25),
    alignSelf: 'center',
    borderBottomWidth: 0.3,
    borderColor: colors.darkGreyHigh,
    paddingBottom: heightConverter(24),
  },
  hourlyPay: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(18, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    marginTop: heightConverter(7),
  },
  units: {
    fontFamily: 'Europa',
    fontSize: RFValue(19, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
    marginTop: heightConverter(8),
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(325),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  div: {
    width: widthConverter(375),
    height: 1,
    borderStyle: 'solid',
  },
});
