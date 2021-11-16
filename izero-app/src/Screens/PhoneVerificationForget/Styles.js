import colors from '../../Constants/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';

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

 
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20,},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    marginLeft:10,
    marginRight:10,
    borderRadius:6
  },
  focusCell: {
    borderColor: '#3EB561',
  },
  button: {
    height: heightPercentageToDP('6%'),
    width: widthPercentageToDP('70%'),
    alignItems: "center",
    backgroundColor: "#24334C",
    padding: 10,
    borderRadius:40
  },
});
