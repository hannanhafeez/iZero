import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
  },
  oval: {
    width: widthPercentageToDP('2.4%'),
    height: widthPercentageToDP('2.4%'),
    borderRadius: widthPercentageToDP('2.4%') / 2,
    backgroundColor: '#3eb561',
    marginRight: widthPercentageToDP('3.4%'),
    marginTop: heightPercentageToDP('1.1%'),
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    marginBottom: heightPercentageToDP('1.1%'),
  },
  address: {
    fontFamily: 'Europa',
    fontSize: RFValue(19, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
    width: widthPercentageToDP('52%'),
  },
  tagCon: {
    paddingHorizontal: widthPercentageToDP('2.6%'),
    height: heightPercentageToDP('3.2%'),
    borderRadius: 13,
    backgroundColor: 'rgba(249, 179, 18, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP('1.1%'),
    marginRight: widthPercentageToDP('3%'),
  },
  tagText: {
    fontFamily: 'Europa',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  border: {
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
    backgroundColor: colors.pureWhite,
  },
  secondText: {
    color: '#5b6679',
  },
  fee: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: '#24334c',
  },
  image: {
    width: heightConverter(59),
    height: heightConverter(59),
  },
});
