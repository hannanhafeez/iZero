import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {Platform} from 'react-native';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    //height: heightConverter(100),
  },
  top: {
    // bottom: heightPercentageToDP('25%'),
  },
  over: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    paddingTop: heightConverter(30),
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 13 : 0,
  },
  imageCon: {
    width: widthPercentageToDP('22%'),
    height: widthPercentageToDP('22%'),
    backgroundColor: colors.pureWhite,
    shadowColor: 'rgba(36, 51, 76, 0.14)',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowRadius: 22,
    shadowOpacity: 1,
    borderRadius: widthPercentageToDP('22%') / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3eb561',
    opacity:2,
  },
  overlay: {
    position: 'absolute',
  },
  btnCon: {
    width: widthPercentageToDP('12%'),
    height: widthPercentageToDP('12%'),
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
    borderRadius: widthPercentageToDP('12%') / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotate: {
    transform: [{rotate: '180deg'}],
  },
  image: {
    borderRadius: 30,
    width: widthPercentageToDP('18%'),
    height: widthPercentageToDP('18%'),
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#24334c',
    marginTop: 25,
  },
  fee: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#24334c',
  },
  address: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.darkGreyHigh,
    width: widthPercentageToDP('60%'),
    alignSelf: 'center',
    marginTop: 5,
  },
});
