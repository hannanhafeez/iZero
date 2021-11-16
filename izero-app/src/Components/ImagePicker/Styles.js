import colors from '../../Constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    marginTop: heightPercentageToDP('4.5%'),
    marginBottom: heightPercentageToDP('2%'),
    alignItems: 'center',
  },
  image: {
    width: widthPercentageToDP('40%'),
    height: widthPercentageToDP('40%'),
    alignSelf: 'center',
    marginBottom: heightPercentageToDP('2%'),
    borderRadius: 100,
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
  email: {
    fontFamily: 'Europa',
    fontSize: RFValue(20, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 44,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#24334c',
  },
  phone: {
    fontFamily: 'Europa',
    fontSize: RFValue(20, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
  imageCon: {
    width: widthPercentageToDP('40%'),
    alignSelf: 'center',
  },
  top: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 5,
    top: 10,
  },
});
