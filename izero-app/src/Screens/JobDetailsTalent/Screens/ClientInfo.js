import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Container, Button} from '../../../Components';
import {widthConverter, heightConverter} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Api from '../../../api/index';
import colors from '../../../Constants/colors';

export default function ClientInfo({route}) {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state?.auth?.accessToken);

  const jobDetails = useSelector((state) => state?.app?.jobDetails);

  const [clientName, setClientName] = useState(
    jobDetails?.job?.user?.first_name + ' ' + jobDetails?.job?.user?.last_name,
  );

  const [clientPointOfContact, setClientPointOfContact] = useState(
    'Not Available',
  );
  const [clientCellNo, setClientCellNo] = useState(
    jobDetails?.job?.user?.phone,
  );
  const [clientLocation, setClientLocation] = useState(
    jobDetails?.job?.user?.address,
  );

  let data = route?.params;
  let shiftID = data?.shiftID;
  let jobID = data?.jobID;
  let statusJob = data?.statusJob;

  console.log('jobDetails', jobDetails);
  const navigation = useNavigation();

  useEffect(() => {
    //getJobDetails();
    console.log('Employer info for Staff side job details');

    setTimeout(function () {
      setLoading(false);
    }, 500);
  }, [isFocused]);

  // const getJobDetails = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get(`/jobshiftdetail?id=${shiftID}`, {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Employer info for Staff side job details', res);
  //     setLoading(true);
  //     setClientName(
  //       res?.data?.data?.job?.user?.first_name +
  //         ' ' +
  //         res?.data?.data?.job?.user?.last_name,
  //     );
  //     setClientPointOfContact('Not Available');
  //     setClientCellNo(res?.data?.data?.job?.user?.phone);
  //     setClientLocation(res?.data?.data?.job?.user?.address);
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading? (
          <View style={{flex: 1, marginTop: 30}}>
            <ActivityIndicator size="large" color={colors.darkBlueHigh} />
          </View>
        ) : (
          <View style={{marginTop: 40, marginLeft: 20}}>
            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                Employer
              </Text>
              <Text style={styles.textContent}>
                {/* Wasserman */}
                {clientName}
              </Text>
            </View>

            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                Point of Contact
              </Text>
              <Text style={styles.textContent}>
                {/* Sarah Gillingham */}
                {clientPointOfContact}
              </Text>
            </View>

            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                Phone No
              </Text>
              <Text style={styles.textContent}>{clientCellNo}</Text>
            </View>

            <View style={styles.second}>
              <Text
                style={[
                  styles.textContent,
                  {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
                ]}>
                Location
              </Text>
              <Text style={styles.textContent}>
                {/* 7th Floor, Aldwych House, Aldwych London WC2B , United Kingdom */}
                {clientLocation}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  tag: {
    width: widthConverter(96),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthConverter(12),
  },
  text: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(331),
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: heightConverter(19),
  },
  outlined: {
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  second: {
    width: widthConverter(331),
    marginBottom: heightConverter(19),
    alignSelf: 'center',
    marginTop: heightConverter(0),
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  sticky: {
    height: heightConverter(105),
    width: widthConverter(375),
    paddingHorizontal: widthConverter(22),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderColor: colors.darkGreyHigh,
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: widthConverter(375),
    height: widthConverter(232),
    marginBottom: heightConverter(19),
  },
});
