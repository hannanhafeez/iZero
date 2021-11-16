import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './Styles';
import {Container, ExpenseHeader, Button} from '../../Components';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ChatIcon} from '../../Assets/Icons';
import {Dropdown} from 'react-native-material-dropdown-v2';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../Constants/colors';

let data = [
  {
    value: 'Banana', 
  },
  {
    value: 'Mango',
  },
  {
    value: 'Pear',
  },
];
export default function UploadExpenses({navigation}) {
  const [text, onChangeText] = React.useState('');

  useEffect(() => {
    console.log('UploadExpenses'), [];
  });
  const [image, setImage] = useState('');

  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    // Image Show as Preview
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.uri;
        setImage(source);
      }
    });
  };
  return (
    <Container>
      <ExpenseHeader />
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{marginTop: heightConverter(70)}}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
          style={{height: 10, width: widthPercentageToDP('100%')}}
        />
        <View style={styles.content}>
          <Text style={styles.Description}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <Text style={styles.Description}>Reason for purchase</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />

          <Text style={styles.Description}>Purchase From</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <Text style={styles.Description}>
            Please upload proof of purchase
          </Text>
          <View style={{marginTop: 20}}>
            {image ? (
              <Image
                style={styles.ImagePreview}
                source={{
                  uri: image,
                }}
              />
            ) : null}
          </View>
          <View style={styles.sticky}>
            <Button
              onPress={selectPhotoTapped.bind(this)}
              style={{
                width: widthConverter(261),
                height: heightConverter(50),
                backgroundColor: colors.pureWhite,
                borderColor: '#636E81',
                borderWidth: 1,
                marginLeft: 10,
              }}
              textStyle={{color: '#636E81'}}>
              SELECT IMAGE
            </Button>
          </View>
          <View
            style={[
              styles.content,
              {
                paddingTop: heightConverter(21),
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.title}>Pay of Contact</Text>
                <Text style={styles.units}>Sarah Gillingham</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: widthConverter(100),
                }}>
                <View style={styles.iconCon}>
                  <FontAwesome
                    name="phone"
                    //onPress={}
                    size={25}
                    color="#40B562"
                  />
                </View>
                <View style={styles.iconCon}>
                  <ChatIcon
                    width={widthConverter(30)}
                    height={heightConverter(28)}
                    color={'#40B562'}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.title}>Employer Notes</Text>
            <Text style={styles.units}>
              Please call me as i am not sure why this has been purchased and
              put in as an expense. We have declined you expense.
            </Text>
          </View>
          <Text style={styles.Description}>Job</Text>
         <View >
         <Dropdown 
         data={data}
          pickerStyle={{marginTop:40,marginLeft:15}}
         />
          <FontAwesome5
            style={styles.downIcon}
            name="angle-down"
            size={20}
            color="#24334C"
          />
         </View>

          <View style={styles.sticky}>
            <Button
              onPress={() => navigation.navigate('Tab')}
              style={{
                width: widthConverter(261),
                height: heightConverter(50),
                backgroundColor: '#24334C',

                marginLeft: 10,
              }}
              textStyle={{color: colors.pureWhite}}>
              UPLOAD EXPENSE
            </Button>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
