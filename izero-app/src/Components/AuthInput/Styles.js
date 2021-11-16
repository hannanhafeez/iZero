import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {Platform} from 'react-native';
import colors  from '../../Constants/colors';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    width: widthPercentageToDP('82%'),
    //marginTop: heightPercentageToDP('3%'),
  },
  label: {
    fontFamily: 'Europa',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#5b6679',
    marginTop: Platform.OS === 'ios' ? 20 : 20,
    
  },
  input: {
    flex: 1,
    height:
      Platform.OS === 'ios'
        ? heightPercentageToDP('7.5%')
        : heightPercentageToDP('6.5%'),
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontFamily: 'Europa',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
  },
  active: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
    borderColor: Platform.OS === 'ios' ? '#3eb561' : '#3eb561',
  },
  inputCon: {
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
    borderColor: Platform.OS === 'ios' ? '#e0e3eb' : '#e0e3eb',
    width: widthPercentageToDP('82%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  symbol: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: '#24334c',
    paddingRight: 30,
    marginTop: heightPercentageToDP('1%'),
  },
  perhour: {
    fontFamily: 'Europa-Bold',
    marginTop: heightPercentageToDP('1%'),
    fontSize: RFValue(13, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: '#3eb561',
    textTransform: 'uppercase',
  },
});
