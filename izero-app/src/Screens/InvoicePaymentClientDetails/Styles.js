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
  Description: {
    marginTop: 6,
    fontFamily: 'Europa',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
    fontSize: RFValue(18, 812),
    marginLeft: 0, 
    marginRight: 0,
  },
  content: {
    // flex: 1, 
    width: widthConverter(375),
    paddingHorizontal: widthConverter(25),
    alignSelf: 'center',
    borderColor: colors.darkGreyHigh,
    paddingBottom: heightConverter(24),
  },
  hourlyPay: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(18, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  title: {
    fontFamily: 'Europa-Bold',
    fontSize: RFValue(20, 812),
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#24334c',
    marginTop: heightConverter(7),
  },
  units: {
    fontFamily: 'Europa',
    fontSize: RFValue(19, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.darkGreyHigh,
    marginTop: heightConverter(8),
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(325),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  div: {
    width: widthConverter(375),
    height: 1,
    borderStyle: 'solid',
  },
  ImagePreview: {
  width:100,
  height:100,
  borderRadius: 10,
  zIndex: 5,
  alignSelf: "center",
  },
  ImagePreviewView: {
    width:100,
    height:100,
    borderRadius: 10,
    zIndex: 5,
    alignSelf: "center",
    backgroundColor:"lightgray",
    justifyContent:'center',
    alignItems:'center'
    },
    sticky: {
      height: heightConverter(105),
      width: widthConverter(375),
      paddingHorizontal: widthConverter(50),
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    vectorCircle:{
      width:'20%'
    },
    downIcon:
    {
        zIndex: 5,
        position: 'absolute',
        right: widthConverter(20),
        top:heightConverter(25),
    },
});
