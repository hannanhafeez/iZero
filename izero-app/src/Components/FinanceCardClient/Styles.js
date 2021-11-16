import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    width: widthPercentageToDP('88%'),
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
    padding: 16,
    //marginBottom: heightPercentageToDP('2%'),
  },
  titled: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(13, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkBlueHigh,
    marginBottom: 5,
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
    //alignItems: 'center',
    width: widthPercentageToDP('72%'),
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    //marginBottom: heightPercentageToDP('0%'),
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
    borderColor: "transparent",
    borderWidth: 1,
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
    borderColor: colors.darkBlueHigh,
    backgroundColor: colors.pureWhite,
  },
  secondText: {
    color: colors.darkBlueHigh,
  },
  fee: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    //color: '#24334c',
    color:'#26354C',
  },
  image: {
    width: widthPercentageToDP('15.2%'),
    height: widthPercentageToDP('15.2%'),
    borderRadius: widthPercentageToDP('15.2%') / 2,
  },
});
