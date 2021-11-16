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
  header: {
    position: 'absolute',
    paddingTop: heightConverter(20),
  },
  row: {
    width: widthConverter(375),
    paddingHorizontal: widthConverter(22),
    justifyContent: 'center',
    height: heightConverter(50),
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
    alignSelf: 'center',
  },
  back: {
    fontFamily: 'Europa',
    fontSize: RFValue(16, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.pureWhite,
  },
  image: {
    height: heightConverter(331),
    width: widthConverter(375),
    resizeMode: 'contain',
  },
});
