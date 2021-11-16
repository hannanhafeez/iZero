import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {
  Container,
  Header,
  ImagePicker,
  ProfileOption,
  TextButton,
} from '../../Components';
import {widthPercentageToDP} from '../../Helpers/Responsive';
import {SettingsIcon, LockIcon, ExitIcon, HelpIcon} from '../../Assets/Icons';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

export default function ProfileClient({navigation}) {
  console.log('ProfileClient');
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.user);

  const logOut = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch({type: types.REVERT_AUTH});
          dispatch({type: types.REVERT_APP});
          messaging().deleteToken();
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
          navigation.navigate('SelectSection');
        },
      },
    ]);
  };

  const save = () => {};
  const goBack = () => {};
  
  return (
    <Container safeArea>
      <Header backButton={() => goBack()} save={() => save()}>
        Profile
      </Header>

      <ScrollView
        bounces={false}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <ImagePicker imageSize={widthPercentageToDP('28%')} check={false} />
        <View style={{marginTop: '7%'}} />
        <ProfileOption
          onPress={() => navigation.navigate('EditProfileClient')}
          icon={<SettingsIcon />}
          label="Edit Profile"
        />
        <ProfileOption
          onPress={() => navigation.navigate('ChangePassword')}
          icon={<LockIcon />}
          label="Change Password"
        />

        <ProfileOption
          onPress={() => navigation.navigate('ChatClient', {user: user})}
          icon={<HelpIcon />}
          label="Messages"
        />

        {/* <ProfileOption
          onPress={() => navigation.navigate('HelpCenter')}
          icon={<HelpIcon />}
          label="Help Center"
        /> */}

        <ProfileOption
          icon={<ExitIcon />}
          label="Exit Account"
          onPress={() => logOut()}
        />
        <TextButton style={styles.text}>
          Find the best answer to your questions
        </TextButton>
      </ScrollView>
    </Container>
  );
}
