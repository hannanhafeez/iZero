import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { StyleSheet } from "react-native";
  
  import { RFPercentage } from "react-native-responsive-fontsize";
import colors from "../../Constants/colors";
  
  const styles = StyleSheet.create({
    activeMainTouchContainer: {
      flexDirection: "row",
      marginTop: hp(1),
      marginLeft: wp(1),
      width: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    activeLinearGradientContainer: {
      width: 72,
      height: 72,
      borderRadius: wp(12),
      alignItems: "center",
      justifyContent: "center",
    },
    addUserContainer: {
      width: 62,
      height: 62,
      borderRadius: wp(12),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.pureWhite,
    },
    activeFirstnameViewContainer: {
      paddingTop: hp(1),
    },
    activeFirstnameTextContainer: {
      fontSize: RFPercentage(1.5),
      color: "gray",
    },
    activeBadgeContainer: {
      position: "absolute",
      top: 1,
      right: 3,
      borderColor: colors.pureWhite,
      backgroundColor: colors.pureWhite,
      borderWidth: 2,
      borderRadius: 20,
    },
    activeBadgeStyleContainer: {
      width: 15,
      height: 15,
      borderRadius: 10,
      backgroundColor: "#6ED440",
    },
  });
  
  export default styles;