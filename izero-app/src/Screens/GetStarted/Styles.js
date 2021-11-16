import {heightPercentageToDP} from '../../Helpers/Responsive';

const {StyleSheet} = require('react-native');

export default StyleSheet.create({
  header: {
    height: heightPercentageToDP('53%'),
    marginBottom: heightPercentageToDP('4%')
  },
  over: {
    position: 'absolute',
    marginTop: heightPercentageToDP('3.8%'),
  },
});
