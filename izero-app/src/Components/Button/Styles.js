import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';

import colors from '../../Constants/colors';
const {StyleSheet} = require('react-native');
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    height: heightPercentageToDP('6.1%'),
    borderRadius: widthPercentageToDP('7.6%'),
    backgroundColor: '#3EB561',
    width: widthPercentageToDP('61.3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(18,812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
});
