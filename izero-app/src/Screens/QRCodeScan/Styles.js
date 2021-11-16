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
  container: {
    backgroundColor: colors.pureWhite,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: '#24334c',
  },
  button: {
    height: widthPercentageToDP('12.8%'),
    width: widthPercentageToDP('12.8%'),
    borderRadius: widthPercentageToDP('12.8%') / 2,
    marginTop: heightPercentageToDP('5%'),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '180deg'}],
  },
  firstRow: {
      width: widthPercentageToDP('100%'),
      paddingHorizontal: widthPercentageToDP('5.8%'),
      paddingVertical: widthPercentageToDP('6%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 0.3,
      borderBottomColor: colors.darkGreyHigh,
  },
  row: {
    width: widthPercentageToDP('100%'),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    paddingVertical: widthPercentageToDP('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: colors.darkGreyHigh,
},
  heading: {
    color: '#24334c',
    fontSize: RFValue(21, 812),
  },
  headingCon: {
    marginTop: heightPercentageToDP('2%'),
    width: widthPercentageToDP('88.4%'),
  },
  category: {
    height: heightPercentageToDP('3.2%'),
    width: null,
    paddingHorizontal: widthPercentageToDP('4.2%'),
    marginRight: widthPercentageToDP('3.2%'),
  },
  btnText: {
    fontFamily: 'Europa',
    fontSize: RFValue(15, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  horizontal: {
    width: widthPercentageToDP('100%'),
    marginTop: heightPercentageToDP('2.5%'),
  },
  btnTextInActive: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: '#5b6679',
  },
  categoryInactive: {
    backgroundColor: 'rgba(91, 102, 121, 0.09)',
  },
  textPending:{
    color: '#BABDD0',
    width: widthPercentageToDP('88.4%'),
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    //fontWeight:'bold'
  },
  line:{
    marginTop:3,
    width: widthPercentageToDP('88.4%'),
    height: heightPercentageToDP('2%'),
    borderTopColor: colors.darkWhiteLow,
    borderTopWidth:1
  },
  linebox:{
    width: widthConverter(375),
    alignSelf: 'center',
    //paddingTop: heightConverter(22),
    borderBottomWidth: 0.3,
    borderColor: colors.darkGreyHigh,
    paddingHorizontal: widthConverter(22),
    paddingBottom: heightConverter(13.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: colors.pureWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'lightgray'
  },

});
