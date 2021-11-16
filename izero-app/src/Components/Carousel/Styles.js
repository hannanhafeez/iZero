import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import colors from '../../Constants/colors';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    // height: heightPercentageToDP('30%'),
    // marginBottom: heightPercentageToDP('%'),
    width: widthPercentageToDP('100%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(29, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#23324d',
  },
  text: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    lineHeight: 25,
    textAlign: 'center',
    color: 'rgba(36, 51, 76, 0.75)',
    marginTop: heightPercentageToDP('2.7%'),
  },
  slide: {
    width: widthPercentageToDP('100%'),
    paddingBottom: heightPercentageToDP('1.7%'),
  },
});
