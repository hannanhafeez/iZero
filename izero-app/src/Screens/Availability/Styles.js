import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../Helpers/Responsive';

import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

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
  textStyle: {
    color: '#24334c',
  },
  arrowCon: {
    width: 41,
    height: 41,
    backgroundColor: 'rgba(62, 181, 97, 0.12)',
    borderRadius: 41 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: widthConverter(331),
    paddingHorizontal: widthPercentageToDP('5.8%'),
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: heightConverter(20)
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Europa',
    fontSize: RFValue(18, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#24334c',
    marginLeft: widthConverter(8)
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(16, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  cardTime: {
    fontFamily: 'Europa',
    fontSize: RFValue(13, 812),
    marginTop: 4,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  btn: {
    marginBottom: 10,
    width: widthConverter(331),
    backgroundColor: '#24334c',
  },
  oval: {
    width: widthConverter(30),
    height: widthConverter(30),
    borderRadius: widthConverter(30) / 2,
    backgroundColor: 'rgba(62, 181, 97, 0.3)',
  },
  tag: {
    width: widthConverter(105),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#3eb561',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagOne: {
    width: widthConverter(135),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(91, 102, 121, 0.09)',
  },
});
