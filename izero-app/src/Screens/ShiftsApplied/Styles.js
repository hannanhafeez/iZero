import {
  heightConverter,
  widthConverter,
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const { StyleSheet } = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    flex: 1,
  },
  firstButton: {
    marginTop: heightPercentageToDP('10%'),
    width: widthPercentageToDP('73.6%'),
    backgroundColor: '#24334c',
  },
  lastButton: {
    marginTop: heightPercentageToDP('2.2%'),

    width: widthPercentageToDP('73.6%'),
    backgroundColor: 'rgba(142, 150, 163, 0.15)',
  },
  conSTyle: {
    marginBottom: heightPercentageToDP('2.2%'),
  },
  textStyle: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(16, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  top: {
    bottom: heightPercentageToDP('20%'),
  },
  over: {
    position: 'absolute',
  },
  Button: {
    width: widthPercentageToDP('88%'),
    alignSelf: 'center',
  },
  sticky: {
    width: widthPercentageToDP('100%'),
    borderColor: colors.darkGreyHigh,
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP('12%'),
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  image: {
    width: widthPercentageToDP('21%'),
    height: widthPercentageToDP('21%'),
  },
  HeadingText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    marginTop: 10,
    marginLeft: 30
  },
  modelMainContainer: {
    flex:1,
    backgroundColor: "rgba(36, 51, 76, 0.8)",
  },
  modelCrossContainer: {
    width: 60, height: 60, borderRadius: 60, backgroundColor: '#3EB561',
    alignSelf: 'flex-end', marginRight: 20,
    marginTop: -35,
    justifyContent: 'center', alignItems: 'center',
  },
  HeadingText: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
    marginTop: 10,
    marginLeft: 30
  },
  ButtonTalent:{
    width: widthConverter(300), height: heightConverter(50),
    backgroundColor: '#3EB561', borderColor: '#636E81',
    borderWidth: 1
  }
});
