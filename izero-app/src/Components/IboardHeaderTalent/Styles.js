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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: widthPercentageToDP('12%'),
    width: widthPercentageToDP('12%'),
    height: widthPercentageToDP('12%'),
  },
  details: {
    marginLeft: widthPercentageToDP('4%'),
  },
  date: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkBlue2,
  },
  name: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(24, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#3eb561',
  },
  left: {
    flexDirection: 'row',
  },
  IconCon: {
    width: widthPercentageToDP('12%'),
    height: widthPercentageToDP('12%'),
    borderRadius: widthPercentageToDP('12%') / 2,
    backgroundColor: colors.pureWhite,
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
