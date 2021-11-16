import {widthConverter, heightConverter} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    width: widthConverter(375),
    height: heightConverter(248),
    backgroundColor: '#24334c',
    alignItems: 'center',
    paddingTop: 15,
  },
  card: {
    width: widthConverter(325),
    height: heightConverter(94),
    borderRadius: 5,
    backgroundColor: '#3eb561',
    shadowColor: 'rgba(91, 102, 121, 0.15)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 18,
    shadowOpacity: 1,
    justifyContent: 'center',
    paddingHorizontal: widthConverter(23),
  },
  row: {
    width: widthConverter(331),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: heightConverter(25),
  },
  iconCon: {
    width: heightConverter(46),
    height: heightConverter(46),
    borderRadius: heightConverter(46) / 2,
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
  rotate: {
    transform: [{rotate: '180deg'}],
  },
  details: {
    width: widthConverter(325),
    paddingTop: heightConverter(19),
    paddingBottom: heightConverter(30),
  },
  date: {
    fontFamily: 'Europa',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
  },
  title: {
    fontFamily: 'Europa',
    fontSize: RFValue(27, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
    marginTop: heightConverter(3),
    borderBottomWidth: 1,
    borderBottomColor: '#5C6778',
  },
  net: {
    fontFamily: 'Europa',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  pay: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(36, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
    borderBottomWidth: 0,
    borderBottomColor: '#68DD8A',
  },
});
