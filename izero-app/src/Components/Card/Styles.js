import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    width: widthPercentageToDP('42%'),
    paddingVertical: heightPercentageToDP('1.4%'),
    borderRadius: 5,
    backgroundColor: colors.pureWhite,
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowRadius: 25,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#efefef',
    paddingHorizontal: widthPercentageToDP('3.4%'),
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(13, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  value: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(22,812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
});
