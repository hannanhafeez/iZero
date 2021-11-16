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

export default function InvoicePaymentClientDetails({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const jobID = useSelector((state) => state?.app?.createJobID);

  let dataParams = route?.params;
  let details = dataParams?.details;

  console.log('details', details);

  let address = JSON.parse(details?.company_address_data.trim(''));

  console.log('address', address);

  let DateSet = new Date(details?.created_at);

  let jobCreatedDay = DateSet?.toString()?.split(' ')[0];
  let jobCreatedDate = DateSet?.toString()?.split(' ')[2];
  let jobCreatedMonth = DateSet?.toString()?.split(' ')[1];

  var jobCreatedDateFinal =
    jobCreatedDay + ' ' + jobCreatedDate + ' ' + jobCreatedMonth;

  const [data, setData] = useState('');
  const [user, setUser] = useState('');

  const [shiftFee, setShiftFee] = useState(details?.fee?.shift_fee);

  const [total, setTotal] = useState(
    Number(details?.fee?.izero_fee) + Number(details?.fee?.taxes),
  );
  const [jobShitfs, setJobShitfs] = useState([]);
  const [jobLocation, setJobLocation] = useState('');
  const [jobName, setJobName] = useState(details?.job?.title);

  const [iZeroFee, setiZeroFee] = useState(details?.fee?.izero_fee);
  const [taxes, setTaxes] = useState(details?.fee?.taxes);

  const [date, setDate] = useState(jobCreatedDateFinal);

  useEffect(() => {
    console.log('InvoiceClientDetails');

    setTimeout(function () {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Container>
      <InvoiceHeader
        invoice={details?.invoice ? `Invoice #${details?.invoice}` : null}
        jobFee={details?.total_cost}
        date={date}
      />
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{marginTop: heightConverter(70)}}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
          style={{height: 10, width: widthPercentageToDP('100%')}}
        />

        {loading ? (
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
            {/* 
            <Text style={styles.Description}>{jobLocation}</Text> */}

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
                  £{iZeroFee}
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
                  £{taxes}
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
                  Shift's Fee
                </Text>
                <Text
                  style={{
                    color: '#A5ADB5',
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                  }}>
                  £{shiftFee}
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
                flex: 1,
                paddingLeft: 20,
                paddingRight: 10,
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(22, 812),
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                  }}>
                  Booked in by:
                </Text>
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
                  {details?.user?.first_name + ' ' + details?.user?.last_name}
                </Text>
              </View>
              <View>
                <Image
                  style={{height: 80, width: 80, borderRadius: 80}}
                  source={
                    details?.user?.avatar !== null
                      ? {uri: details?.user?.avatar}
                      : require('../../Assets/Images/nopic.jpeg')
                  }
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
