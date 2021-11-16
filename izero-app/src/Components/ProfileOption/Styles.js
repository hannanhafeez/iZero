import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    width: widthPercentageToDP('88.4%'),
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e3eb',
    height: heightPercentageToDP('8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Europa',
    fontSize: RFValue(20, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    // marginLeft: widthPercentageToDP('8.5%'),
  },
  top: {
    flexDirection: 'row',
  },
  icon: {
    transform: [{rotate: '180deg'}],
  },
});
