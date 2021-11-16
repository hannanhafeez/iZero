import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  ImageHeader,
  Card,
  JobCard,
  Heading,
  Button,
  FinanceCard,
  DetailsHeader,
  QRCodeScanHeader,
} from '../../Components';
import styles from './Styles';

import {
  widthPercentageToDP,
  heightPercentageToDP,
  heightConverter,
} from '../../Helpers/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Api from '../../api/index';

import {useIsFocused} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

import IconCross from 'react-native-vector-icons/Entypo';
import {
  SearchIcon,
  BackArrow,
  ArrowIcon,
  HeartIcon,
  HeartIcon2,
} from '../../Assets/Icons';

import QRCodeScanner from 'react-native-qrcode-scanner';

import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native';

export default function QRCodeScan({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state.auth.accessToken);
  const [jobID, setJobID] = useState(route?.params?.jobID);
  const [jobName, setJobName] = useState('');
  const [jobAddress, setJobAddress] = useState('');
  const [jobFee, setJobFee] = useState('');
  const [jobUsers, setJobUsers] = useState([]);


  useEffect(() => {
    console.log('QRCode Employer');
    getJobDetails();
  }, []);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/job_detail?job_id=${jobID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Job Details API res', res);
      setLoading(true);
      setJobName(res?.data?.data?.title);
      setJobAddress(res?.data?.data?.location);
      setJobUsers(res?.data?.data?.job_users);

      let jobFee = [];
      let TotalJobFee = 0;

      for (var v = 0; v < res?.data?.data?.shifts?.length; v++) {
        jobFee[v] = parseFloat(res?.data?.data?.shifts[v]?.total_pay);
        TotalJobFee = TotalJobFee + parseFloat(jobFee[v]);
      }
      setJobFee(TotalJobFee);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const qrCodeScaner = async (e) => {
    console.log('QR code scanned!', e);
    if (e !== null) {
      let data = new FormData();
      data.append('job_id', jobID);
      data.append('status', 'check_in');
  
      console.log({data});
      try {
        let res = await Api.post('/check_in_out', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Check In Check Out API response', res);
        navigation.goBack();
      } catch (error) {
        console.log({error});
      }
    } else {
      // let data = new FormData();
      // data.append('conversation_id', conversationID);
      // data.append('message', newMessage[0].text);
  
      // console.log({data});
      // try {
      //   let res = await Api.post('/send_message', data, {
      //     headers: {
      //       Accept: 'application/json',
      //       Authorization: `Bearer ${jwt}`,
      //     },
      //   });
      //   console.log('Send Message API response', res);
      //   setCheckMessages(true);
      // } catch (error) {
      //   setCheckMessages(true);
      //   console.log({error});
      // }
    }
  };

  return (
    <Container>
      <View>
        <QRCodeScanHeader
          checkJobDetails={true}
          name={jobName}
          address={jobAddress}
          fee={jobFee}
          onBack={() => navigation.goBack()}
        />
      </View>

      <Text
        style={{
          fontFamily: 'Europa-Bold',
          fontSize: RFValue(24, 812),
          fontWeight: 'bold',
          fontStyle: 'normal',
          textAlign: 'center',
          color: '#3eb561',
          paddingTop: 20,
        }}>
        Scan QR Code for CHECK IN
      </Text>
      <QRCodeScanner
        showMarker={true}
        fadeIn={true}
        onRead={(e) => qrCodeScaner(e)}
        containerStyle={{height: 50}}
        flashMode={RNCamera.Constants.FlashMode.auto}
        // bottomContent={
        //   <TouchableOpacity style={{fontSize: 21, color: 'rgb(0,122,255)'}}>
        //     <Text style={{padding: 16}}>Save QR Code</Text>
        //   </TouchableOpacity>
        // }
      />
    </Container>
  );
}
