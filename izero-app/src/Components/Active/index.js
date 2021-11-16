import styles from "./style";
import React, { PureComponent } from "react";
import { Avatar, Badge } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class ActiveComponent extends PureComponent {
  render() {
    let item = this.props.item;
  //  let props = this.props.props;
   // let language = this.props.language;
   //let Identifier = this.props.Identifier.toString();
   // let IdentifierAvatar = this.props.IdentifierAvatar;
  //  let ShipmentMasterImage=this.props.item.ShipmentMasterImage;
    return (
      <>
        <TouchableOpacity
       //   onPress={() =>}
          style={styles.activeMainTouchContainer}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           
              {item.Avatar_base64 ? (
                <Avatar
                rounded
                size={60}
               // title="MD"
                source={{
                  uri:
                  item.Avatar_base64
                }}
              />
              ) : (
                <View style={styles.addUserContainer}>
                  <FontAwesome5 name={"user-alt"} size={40} color={"#909497"} />
                </View>
              )}
         
            <View style={styles.activeFirstnameViewContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.activeFirstnameTextContainer
               }
              >
                {item.FirstName}
              </Text>
            </View>
            {item.IsOnline && (
              <Badge
                status="success"
                containerStyle={styles.activeBadgeContainer}
                badgeStyle={styles.activeBadgeStyleContainer}
              />
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

export default ActiveComponent;