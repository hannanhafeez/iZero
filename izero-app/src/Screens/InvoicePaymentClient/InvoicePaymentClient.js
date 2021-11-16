import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import styles from './Styles';
import {Container, ExpenseHeader, Button, Heading} from '../../Components';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector, dispatch} from 'react-redux';
import Api from '../../api';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {InvoiceHeader} from '../../Components/InvoiceHeader/InvoiceHeader';
import types from '../../Redux/types';
import {useDispatch} from 'react-redux';
import colors from '../../Constants/colors';

export default function InvoicePaymentClient({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const jobID = useSelector((state) => state?.app?.createJobID);

  let dataParams = route?.params;
  let id = dataParams?.id;

  const [data, setData] = useState('');
  const [user, setUser] = useState('');
  const [total, setTotal] = useState('');
  const [jobShitfs, setJobShitfs] = useState([]);
  const [jobLocation, setJobLocation] = useState('');
  const [jobName, setJobName] = useState('');

  const [cardHolderRandomNumber, setCardRandomNumber] = useState();
  const [cardHolderName, setCardHolderName] = useState();
  const [cardHolderNumber, setCardHolderNumber] = useState();
  const [cardHolderExpiryDate, setCardHolderExpiryDate] = useState();
  const [cardHolderCvc, setCardHolderCvc] = useState();

  useEffect(() => {
    console.log('InvoicePaymentClient');
    console.log('Pass ID', id);
    setCardRandomNumber(Math.floor(100000 + Math.random() * 9000000000000000));
   // getData();
  }, []);

  // const getData = async () => {
  //   setLoading(false);
  //   if (jobID == '' || jobID == undefined) {
  //     try {
  //       let res = await Api.get(`/invoice?job_id=${id}`, {
  //         headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //       });
  //       console.log('Get Your Invoice Api Response', res);
  //       setLoading(true);
  //       setData(res?.data?.data);
  //       setUser(res?.data?.data?.user);
  //       setJobShitfs(res?.data?.data?.shifts);
  //       setTotal(res?.data?.data?.izero_fee + res?.data?.data?.taxes);
  //       setJobLocation(res?.data?.data?.location);
  //       setJobName(res?.data?.data?.title);
  //     } catch (error) {
  //       setLoading(true);
  //       console.log({error});
  //     }
  //   } else {
  //     try {
  //       let res = await Api.get(`/invoice?job_id=${jobID}`, {
  //         headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //       });
  //       console.log('Get Your Invoice Api Response', res);
  //       setLoading(true);
  //       setData(res?.data?.data);
  //       setUser(res?.data?.data?.user);
  //       setJobShitfs(res?.data?.data?.shifts);
  //       setTotal(res?.data?.data?.izero_fee + res?.data?.data?.taxes);
  //       setJobLocation(res?.data?.data?.location);
  //       setJobName(res?.data?.data?.title);
  //     } catch (error) {
  //       setLoading(true);
  //       console.log({error});
  //     }
  //   }
  // };

  const payInvoice = async () => {
    setLoadingPayment(false);
    if (jobID == '' || jobID == undefined) {
      let data = new FormData();
      data.append('job_id', id);
      try {
        let res = await Api.post('/paynow', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Payment Job Create API response', res);
        setLoadingPayment(false);
        navigation.navigate('PayBillResponse', {
          jobLocation,
          jobName,
          jobShitfs,
        });
      } catch (error) {
        alert('Something went Wrong');
      }
    } else {
      let data = new FormData();
      data.append('job_id', jobID);
      try {
        let res = await Api.post('/paynow', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Payment Job Create API response', res);
        setLoadingPayment(false);
        navigation.navigate('PayBillResponse', {
          jobLocation,
          jobName,
          jobShitfs,
        });
      } catch (error) {
        alert('Something went Wrong', error);
        console.log('Job ID', jobID);
        console.log('Something went Wrong', error);
      }
    }
  };

  return (
    <Container>
      <InvoiceHeader
        invoice={data?.invoice}
        jobFee={data?.total_pay}
        date={''}
      />
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{marginTop: heightConverter(70)}}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
          style={{height: 10, width: widthPercentageToDP('100%')}}
        />

        {loading == false ? (
          <ActivityIndicator size="large" color={colors.darkBlueHigh} />
        ) : (
          <View style={styles.content}>
            <Text style={[styles.Description, {marginTop: 0}]}>
              Description
            </Text>
            <Heading
              containerStyle={{
                marginTop: heightPercentageToDP('2%'),
              }}>
              {jobName}
            </Heading>

            <Text style={styles.Description}>{jobLocation}</Text>

            <View
              style={{
                backgroundColor: '#E5EBE7',
                flex: 1,
                paddingTop: 20,
                paddingLeft: 20,
                paddingBottom: 20,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: '#3EB561',
                  fontFamily: 'Europa-Bold',
                  fontSize: RFValue(22, 812),
                }}>
                Fees
              </Text>

              <FlatList
                data={jobShitfs}
                renderItem={(item, index) => (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: 20,
                      }}>
                      <Text
                        style={{
                          color: '#A5ADB5',
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(22, 812),
                        }}>
                        Shift Fees
                      </Text>
                      <Text
                        style={{
                          color: '#A5ADB5',
                          fontFamily: 'Europa-Bold',
                          fontSize: RFValue(22, 812),
                        }}>
                        £{item.item.shift_fee}
                      </Text>
                    </View>
                  </>
                )}
                //keyExtractor={(item) => item.id}
                keyExtractor={(item, index) => index.toString()}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text
                  style={{
                    color: '#A5ADB5',
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  iZero Fee
                </Text>
                <Text
                  style={{
                    color: '#A5ADB5',
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  £{data?.izero_fee}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text
                  style={{
                    color: '#A5ADB5',
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  Tax
                </Text>
                <Text
                  style={{
                    color: '#A5ADB5',
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  £{data?.taxes}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  Total Fees
                </Text>
                <Text
                  style={{
                    color: colors.pureBlack,
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  £{total}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 20,
              }}>
              <View>
                <Heading>Booked in by:</Heading>
                <Text
                  style={
                    ([styles.Description],
                    {
                      marginTop: 5,
                      marginBottom: 20,
                      color: colors.darkGreyHigh,
                      fontSize: RFValue(21, 812),
                    })
                  }>
                  {user?.first_name + ' ' + user?.last_name}
                </Text>
              </View>
              <View style={{marginTop: 40, right: 70}}>
                <Image
                  style={{height: 80, width: 80}}
                  source={
                    user?.avatar !== null
                      ? {uri: user?.avatar}
                      : require('../../Assets/Images/avatarRound.png')
                  }
                />
              </View>
            </View>

            <Text style={styles.Description}>Name on card</Text>
            <TextInput
              //style={styles.input}
              style={{
                borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
              }}
              onChangeText={(text) => {
                setCardHolderName(text);
              }}
              // value={text}
            />

            <Text style={styles.Description}>Card Number</Text>
            <TextInput
              //style={styles.input}
              style={{
                borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
              }}
              onChangeText={(text) => {
                setCardHolderNumber(text);
              }}
              //value={text}
            />

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text style={styles.Description}>Expiry Date</Text>
              <Text style={[styles.Description, {marginLeft: 105}]}>CVC</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 20,
                marginTop: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <TextInput
                //style={{width: 160}}
                style={{
                  width: 160,
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                }}
                onChangeText={(text) => {
                  setCardHolderExpiryDate(text);
                }}
                //value={text}
                placeholder="mm/yy"></TextInput>
              <TextInput
                //style={{width: 140}}
                style={{
                  width: 165,
                  marginLeft: 30,
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                }}
                onChangeText={(text) => {
                  setCardHolderCvc(text);
                }}
                //value={text}
                placeholder="123"
              />
              <View
                style={{
                  borderBottomColor: '#A4A9B4',
                  borderBottomWidth: 1,
                  marginBottom: 7.5,
                  marginRight: 20,
                }}>
                {/* <IconCard
                  name="credit-card"
                  size={25}
                  color="#A4A9B4"
                /> */}
              </View>
            </View>

            <View style={styles.sticky}>
              <Button
                onPress={() => payInvoice()}
                style={{
                  width: widthConverter(261),
                  height: heightConverter(50),
                  backgroundColor: '#3EB561',

                  marginLeft: 10,
                }}
                textStyle={{color: colors.pureWhite}}>
                {loadingPayment == false ? (
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                ) : (
                  `PAY £ ${data?.total_pay}`
                )}
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
