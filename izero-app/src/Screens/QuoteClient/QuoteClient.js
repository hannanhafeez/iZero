import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput2,
  Button,
  CreateJobHeader,
  ImagePicker,
  Heading,
} from '../../Components';
import {Formik} from 'formik';
import {compose} from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import styles from './Styles';

import {
  widthPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../Helpers/Responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {RFValue} from 'react-native-responsive-fontsize';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {useSelector, dispatch} from 'react-redux';
import Api from '../../api';
import {Platform} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import IconCross from 'react-native-vector-icons/Entypo';
import colors from '../../Constants/colors';

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput2);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function QuoteClient({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [loadingAccept, setLoadingAccept] = useState(true);
  const [loadingNoThanks, setLoadingNoThanks] = useState(true);
  const [loadingSaveEstimate, setLoadingSaveEstimate] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);

  let paramsData = route?.params;
  let id = paramsData?.id;
  let jobID = paramsData?.jobID;

  const [location, setLocation] = useState();
  const [title, setTitle] = useState();
  const [DATA, setDATA] = useState([]);
  const [totalPay, setTotalPay] = useState('');
  const [visible, setVissible] = useState(false);

  const [openView, setOpenView] = useState(0);
  const [status, setStatus] = useState('');
  const [quoteNumber, setQuoteNumber] = useState('');
  const [iZeroFee, setiZeroFee] = useState('');
  const [taxes, setTaxes] = useState('');
  const [checkDetails, setCheckDetails] = useState('');

  //Modal Show Values
  const [addressShift, setAddressShift] = useState('');
  const [quantityNeededShift, setQuantityNeededShift] = useState('');
  const [jobRoleTitle, setJobRoleTitle] = useState('');
  const [feeShift, setFeeShift] = useState('');
  const [startEndDateShift, setStartEndDateShift] = useState('');
  const [startEndTimeShift, setStartEndTimeShift] = useState('');
  const [jobRoleDescriptionShift, setJobRoleDescriptionShift] = useState('');
  //

  useEffect(() => {
    console.log('QuoteClient');
    getData();
  }, []);

  const getData = async () => {
    if (id) {
      setLoading(false);
      try {
        let res = await Api.get(`/your_quote?job_id=${id}`, {
          headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
        });
        console.log('Get Your Quote Api Response id pase', res);

        setLoading(true);
        setDATA(res?.data?.data?.shifts);
        setLocation(res?.data?.data?.location);
        setTotalPay(res?.data?.data?.total_pay);
        setiZeroFee(res?.data?.data?.izero_fee);
        setTaxes(res?.data?.data?.taxes);
        setCheckDetails(res?.data?.data);
        setTitle(res?.data?.data?.title);
        setQuoteNumber(res?.data?.data?.quote_id);
      } catch (error) {
        setLoading(true);
        console.log({error});
      }
    } else {
      setLoading(false);
      try {
        let res = await Api.get(`/your_quote?job_id=${jobID}`, {
          headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
        });
        console.log('Get Your Quote Api Response Job id', res);
        setLoading(true);
        setDATA(res?.data?.data?.shifts);
        setLocation(res?.data?.data?.location);
        setTotalPay(res?.data?.data?.total_pay);
        setiZeroFee(res?.data?.data?.izero_fee);
        setTaxes(res?.data?.data?.taxes);
        setCheckDetails(res?.data?.data);
        setTitle(res?.data?.data?.title);
        setQuoteNumber(res?.data?.data?.quote_id);
        console.log(res?.data?.data?.total_pay);
      } catch (error) {
        setLoading(true);
        console.log({error});
      }
    }
  };

  const noThanks = async () => {
    if (id) {
      setLoading(false);
      setLoadingNoThanks(false);
      let data = new FormData();
      data.append('job_id', id);
      data.append('status', 'cancelled');

      try {
        let res = await Api.post('/accept_reject_quote', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Quote API response', res);
        setLoadingNoThanks(true);
        navigation.navigate('iboard');
      } catch (error) {
        setLoadingNoThanks(true);
        console.log({error});
      }
    } else {
      setLoading(false);
      setLoadingNoThanks(false);
      let data = new FormData();
      data.append('job_id', jobID);
      data.append('status', 'cancelled');

      try {
        let res = await Api.post('/accept_reject_quote', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Quote API response', res);
        setLoadingNoThanks(true);
        navigation.navigate('iboard');
      } catch (error) {
        setLoadingNoThanks(true);
        console.log({error});
      }
    }
  };

  const saveEstimate = async () => {
    if (id) {
      setLoadingSaveEstimate(false);
      let data = new FormData();
      data.append('job_id', id);
      data.append('status', 'saved');

      try {
        let res = await Api.post('/accept_reject_quote', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Save Estimate API response', res);
        setLoadingSaveEstimate(true);
        navigation.navigate('FinanceClient', {open: 4});
      } catch (error) {
        setLoadingSaveEstimate(true);
        console.log({error});
      }
    } else {
      setLoadingSaveEstimate(false);
      let data = new FormData();
      data.append('job_id', jobID);
      data.append('status', 'saved');

      try {
        let res = await Api.post('/accept_reject_quote', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Save Estimate API response', res);
        setLoadingSaveEstimate(true);
        navigation.navigate('Finance', {open: 4});
      } catch (error) {
        setLoadingSaveEstimate(true);
        console.log({error});
      }
    }
  };

  const createQuote = async (values) => {
    setLoadingAccept(false);

    // let data = new FormData();
    // data.append('job_id', jobID === undefined ? id : jobID);
    // data.append('status', 'published');

    // try {
    //   let res = await Api.post('/accept_reject_quote', data, {
    //     headers: {
    //       Accept: 'application/json',
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //   });

    //   console.log('Quote API response', res);
    //   setLoadingAccept(true);
    //   if (jobID == '' || jobID == undefined) {
    //     navigation.navigate('InvoicePaymentClient', {id});
    //   } else {
    //     navigation.navigate('InvoicePaymentClient');
    //   }
    // } catch (error) {
    //   setLoadingAccept(true);
    //   console.log({error});
    // }

    let data = new FormData();
    data.append('job_id', jobID ? jobID : id);
    try {
      let res = await Api.post('/paynow', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('Yes, I Accept API response', res);
      setLoadingAccept(true);
      // dispatch({
      //   type: types.LIVE_BOOK,
      //   liveBook: true,
      // });
      // navigation.navigate('JobsClient', {open: 4});
      navigation.navigate('Jobs');
    } catch (error) {
      setLoadingAccept(true);
      //alert('Something went Wrong');
    }
  };

  const _showModal = ({item, index}) => {
    console.log(item);
    setAddressShift(item?.address_data);
    setQuantityNeededShift(item?.no_of_staff);
    setJobRoleTitle(item?.job_role?.title);
    setFeeShift(item?.shift_fee);
    setStartEndDateShift(item?.start_date + ' - ' + item?.end_date);
    setStartEndTimeShift(item?.start_time + ' - ' + item?.end_time);
    setJobRoleDescriptionShift(item?.title);
    setVissible(true);
  };

  return (
    <Container safeArea>
      <CreateJobHeader backButton={() => navigation.goBack()}>
        Estimate
      </CreateJobHeader>

      <Formik
        onSubmit={(values) => createQuote(values)}
        initialValues={{star: true}}>
        {(props) => {
          return (
            <Form
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
                width: '100%',
              }}>
              {loading == false ? (
                <View style={{flex: 1, marginTop: 20}}>
                  <ActivityIndicator size="large" color={colors.darkBlueHigh} />
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '90%',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Heading
                      containerStyle={{
                        marginTop: heightPercentageToDP('2%'),
                      }}
                      containerStyle={{width: widthPercentageToDP('38%')}}>
                      Your Estimate
                    </Heading>

                    <Heading
                      containerStyle={{
                        width: widthPercentageToDP('38%'),
                      }}
                      style={{
                        textAlign: 'right',
                        fontFamily: 'Europa',
                        fontWeight: 'normal',
                        fontSize: RFValue(20, 812),
                      }}>
                      {quoteNumber}
                    </Heading>
                  </View>

                  <View
                    style={{
                      width: '90%',
                      alignContent: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Europa',
                        fontSize: 18,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5b6679',
                      }}>
                      Job Name
                    </Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder={title}
                      placeholderTextColor={colors.darkBlue}
                      editable={false}
                      style={{
                        flex: 1,
                        height:
                          Platform.OS === 'ios'
                            ? heightPercentageToDP('5%')
                            : heightPercentageToDP('6%'),
                        fontFamily: 'Europa',
                        fontSize: Platform.OS === 'ios' ? 14 : 14,
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#24334c',
                        borderBottomWidth: 1,
                        borderColor: '#e0e3eb',
                      }}
                    />
                  </View>

                  {/* <MyInput
                      label="Job Name"
                      name="jobname"
                      type="jobname"
                      editable={false}
                      value={title}
                    /> */}

                  {checkDetails?.shifts?.length > 1 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '90%',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <Heading>Shifts Details</Heading>
                    </View>
                  ) : null}

                  {checkDetails?.shifts?.length > 1 ? (
                    <FlatList
                      data={DATA}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <>
                            <TouchableHighlight
                              underlayColor=""
                              style={{
                                borderBottomWidth: 1,
                                width: '100%',
                                borderBottomColor: '#d5d7dc',
                                paddingTop: 20,
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginTop: 10,
                                paddingBottom: 10,
                              }}
                              onPress={() => _showModal({item, index})}>
                              <>
                                <View
                                  style={{
                                    marginBottom: heightConverter(5),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    {/* Staff Needed: */}
                                    Quantity Needed:
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    {item?.no_of_staff}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    marginBottom: heightConverter(5),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    Shift Fee:
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    {'£' + item?.job_fee}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    marginBottom: heightConverter(5),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    Shift Time:
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    {item?.start_time + ' - ' + item?.end_time}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    marginBottom: heightConverter(5),
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    Shift Date:
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa-Bold',
                                      fontSize: RFValue(14, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      color: colors.darkBlue,
                                      textAlign: 'auto',
                                    }}>
                                    {item?.start_date + ' - ' + item?.end_date}
                                  </Text>
                                </View>
                              </>
                            </TouchableHighlight>
                          </>
                        );
                      }}
                    />
                  ) : (
                    <>
                      {/* <MyInput
                        label="Staff Needed"
                        name="staffneeded"
                        type="staffneeded"
                        editable={false}
                        value={DATA[0]?.no_of_staff}
                      /> */}

                      <View
                        style={{
                          width: '90%',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#5b6679',
                          }}>
                          Quantity Needed
                        </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={DATA[0]?.no_of_staff}
                          placeholderTextColor="#24334c"
                          editable={false}
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>

                      <View
                        style={{
                          width: '90%',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#5b6679',
                          }}>
                          Job Role
                        </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={DATA[0]?.job_role?.title}
                          placeholderTextColor="#24334c"
                          editable={false}
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>

                      {/* <MyInput
                        label="Job Role"
                        name="jobrole"
                        type="jobrole"
                        editable={false}
                        value={DATA[0]?.job_role?.title}
                      /> */}

                      <View
                        style={{
                          width: '90%',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#5b6679',
                          }}>
                          Date
                        </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={
                            DATA[0]?.start_date + ' - ' + DATA[0]?.end_date
                          }
                          placeholderTextColor="#24334c"
                          editable={false}
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>
                      {/* <MyInput
                        label="Date"
                        name="Date"
                        type="Date"
                        editable={false}
                        value={DATA[0]?.start_date + ' - ' + DATA[0]?.end_date}
                      /> */}

                      <View
                        style={{
                          width: '90%',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#5b6679',
                          }}>
                          Job Fee
                        </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={DATA[0]?.job_fee}
                          placeholderTextColor="#24334c"
                          editable={false}
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>
                      {/* <MyInput
                        label="Job Fee"
                        name="jobfee"
                        type="jobfee"
                        editable={false}
                        value={DATA[0]?.job_fee}
                      /> */}

                      <View
                        style={{
                          width: '90%',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#5b6679',
                          }}>
                          Shift Time(s)
                        </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={
                            DATA[0]?.start_time + ' - ' + DATA[0]?.end_time
                          }
                          placeholderTextColor="#24334c"
                          editable={false}
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>

                      {/* <MyInput
                        label="Shift Time(s)"
                        name="shifttime"
                        type="shifttime"
                        editable={false}
                        value={DATA[0]?.start_time + ' - ' + DATA[0]?.end_time}
                      /> */}

                      <View
                        style={{
                          width: '90%',
                          alignContent: 'center',
                          alignSelf: 'center',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#5b6679',
                          }}>
                          Shift Fee(s)
                        </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder={DATA[0]?.shift_fee}
                          placeholderTextColor="#24334c"
                          editable={false}
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>
                      {/* <MyInput
                        label="Shift Fee(s)"
                        name="shiftfee"
                        type="shiftfee"
                        editable={false}
                        value={DATA[0]?.shift_fee}
                      /> */}
                    </>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
                    <View style={{width: '40%'}}>
                      <Text
                        style={{
                          fontFamily: 'Europa',
                          fontSize: 18,
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#5b6679',
                        }}>
                        iZero Fee
                      </Text>
                      <TextInput
                        placeholder={'£' + iZeroFee}
                        placeholderTextColor="#24334c"
                        underlineColorAndroid="transparent"
                        editable={false}
                        style={{
                          flex: 1,
                          height:
                            Platform.OS === 'ios'
                              ? heightPercentageToDP('5%')
                              : heightPercentageToDP('6%'),
                          fontFamily: 'Europa',
                          fontSize: Platform.OS === 'ios' ? 14 : 14,
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: colors.darkBlue,
                          borderBottomWidth: 1,
                          borderColor: '#e0e3eb',
                        }}
                      />
                    </View>

                    <View style={{width: '10%'}} />

                    <View style={{width: '40%', marginRight: 15}}>
                      <Text
                        style={{
                          fontFamily: 'Europa',
                          fontSize: 18,
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0,
                          color: '#5b6679',
                        }}>
                        Taxes
                      </Text>
                      <View>
                        <TextInput
                          placeholder={'£' + taxes}
                          placeholderTextColor="#24334c"
                          editable={false}
                          underlineColorAndroid="transparent"
                          style={{
                            flex: 1,
                            height:
                              Platform.OS === 'ios'
                                ? heightPercentageToDP('5%')
                                : heightPercentageToDP('6%'),
                            fontFamily: 'Europa',
                            fontSize: Platform.OS === 'ios' ? 14 : 14,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: colors.darkBlue,
                            borderBottomWidth: 1,
                            borderColor: '#e0e3eb',
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        marginTop: 20,
                        fontFamily: 'Europa',
                        fontSize: RFValue(18, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: colors.green,
                      }}>
                      Total (you pay)
                    </Text>

                    <Text
                      style={{
                        marginTop: 15,
                        fontFamily: 'Europa',
                        fontSize: RFValue(24, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0,
                        color: colors.darkBlue,
                      }}>
                      £{totalPay}
                    </Text>
                  </View>

                  <View>
                    <Button
                      onPress={props.handleSubmit}
                      textStyle={[styles.btnText, {color: colors.pureWhite}]}
                      style={styles.buttonGetQuote}>
                      {loadingAccept == false ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ActivityIndicator
                            size="large"
                            color={colors.darkBlueHigh}
                          />
                        </View>
                      ) : (
                        'YES, I ACCEPT'
                      )}
                    </Button>
                  </View>

                   <View style={{alignItems: 'center'}}>
                    {id ? (
                      <Button
                        onPress={() => noThanks()}
                        textStyle={[
                          styles.btnText,
                          {
                            color: colors.darkBlue,
                          },
                        ]}
                        style={[
                          styles.buttonGetQuote,
                          {
                            borderWidth: 2,
                            borderColor: colors.darkBlue,
                            backgroundColor: colors.pureWhite,
                          },
                        ]}>
                        {loadingNoThanks == false ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ActivityIndicator
                              size="large"
                              color={colors.darkBlueHigh}
                            />
                          </View>
                        ) : (
                          'NO, THANKS'
                        )}
                      </Button>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 10,
                        }}>
                        <TouchableHighlight
                          onPress={() => noThanks()}
                          style={{
                            width: widthPercentageToDP('40'),
                            height: heightPercentageToDP('6%'),
                            borderRadius: widthPercentageToDP('12.8%') / 2,
                            marginTop: heightPercentageToDP('3%'),
                            marginLeft: 10,
                            borderWidth: 2,
                            borderColor: colors.pureBlack,
                            backgroundColor: colors.pureWhite,
                            marginRight: 15,
                          }}>
                          {loadingNoThanks == false ? (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <ActivityIndicator
                                size="large"
                                color={colors.darkBlueHigh}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(16, 812),
                                  fontWeight: 'bold',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                }}>
                                NO, THANKS
                              </Text>
                            </View>
                          )}
                        </TouchableHighlight>

                        <TouchableHighlight
                          onPress={() => saveEstimate()}
                          style={{
                            width: widthPercentageToDP('40'),
                            height: heightPercentageToDP('6%'),
                            borderRadius: widthPercentageToDP('12.8%') / 2,
                            marginTop: heightPercentageToDP('3%'),
                            //marginLeft: 10,
                            borderWidth: 2,
                            borderColor: colors.pureBlack,
                            backgroundColor: colors.pureWhite,
                            //marginRight: 15,
                          }}>
                          {loadingSaveEstimate == false ? (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <ActivityIndicator
                                size="large"
                                color={colors.darkBlueHigh}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(16, 812),
                                  fontWeight: 'bold',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                }}>
                                SAVE ESTIMATE
                              </Text>
                            </View>
                          )}
                        </TouchableHighlight>
                      </View>
                    )}
                  </View> 

                  <View
                    style={{
                      marginBottom: 10,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Heading
                      containerStyle={{width: widthPercentageToDP('80%')}}
                      style={{
                        textAlign: 'justify',
                        fontFamily: 'Europa',
                        fontWeight: 'normal',
                        fontSize: RFValue(16, 812),
                        color: '#818995',
                      }}>
                      This Estimate includes all management fees. Any additional
                      cost would be agreed separately either as additional
                      expenses or as a new estimate. If you feel you will be
                      changing timings then consider saving the estimate to give
                      you more time. You cannot book any gaurd on the until you
                      have confirmed it.
                    </Heading>
                  </View>
                </>
              )}
            </Form>
          );
        }}
      </Formik>

      <Modal transparent animationType="fade" visible={visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height:
                Platform.OS === 'ios'
                  ? heightPercentageToDP(73)
                  : heightPercentageToDP(93),
              backgroundColor: colors.pureWhite,
              width: widthPercentageToDP('85%'),
              borderWidth: 5,
              borderColor: '#24334c',
              borderRadius: 20,
              alignSelf: 'center',
              paddingBottom: 20,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={true}
              style={{
                flex: 1,
              }}>
              <TouchableHighlight
                onPress={() => setVissible(false)}
                style={{
                  backgroundColor: '#24334c',
                  width: 25,
                  height: 25,
                  borderRadius: 25,
                  marginTop: 10,
                  alignSelf: 'flex-end',
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <IconCross name="cross" size={20} color={colors.pureWhite} />
              </TouchableHighlight>

              <View
                style={{
                  width: '80%',
                  borderRadius: 80,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: '#24334c',
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    color: colors.pureWhite,
                    marginTop: Platform.OS === 'ios' ? 10 : 10,
                  }}>
                  Shift Details
                </Text>
              </View>

              {/* <Text
                style={{
                  fontFamily: 'Europa',
                  fontSize: 17,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: '#24334c',
                  marginTop: Platform.OS === 'ios' ? 10 : 10,
                  marginLeft: '5%',
                }}>
                Shift Location
              </Text>
              <TextInput
                style={{
                  width: '90%',
                  paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                  marginTop: Platform.OS === 'ios' ? 5 : 0,
                  paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                  alignSelf: 'center',
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                  borderBottomColor:
                    Platform.OS === 'ios' ? '#24334c' : '#24334c',
                  fontFamily: 'Europa',
                  fontSize: 15,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: '#24334c',
                }}
                multiline={true}
                underlineColorAndroid="transparent"
                editable={false}
                placeholder={addressShift}
                placeholderTextColor={colors.pureBlack}
              />
               */}

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Shift Location
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={addressShift}
                  placeholderTextColor="#24334c"
                  multiline={true}
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('4.5%')
                        : heightPercentageToDP('8%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Quantity Needed
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={quantityNeededShift}
                  placeholderTextColor="#24334c"
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('5%')
                        : heightPercentageToDP('6%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Shift Role
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={jobRoleTitle}
                  placeholderTextColor="#24334c"
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('5%')
                        : heightPercentageToDP('6%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Shift Fee
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={feeShift}
                  placeholderTextColor="#24334c"
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('5%')
                        : heightPercentageToDP('6%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Date
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={startEndDateShift}
                  placeholderTextColor="#24334c"
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('5%')
                        : heightPercentageToDP('6%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>

              {/* 
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 17,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#24334c',
                    marginTop: Platform.OS === 'ios' ? 10 : 10,
                    marginLeft: '5%',
                  }}>
                  Shift Time
                </Text>
                <TextInput
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                    height: Platform.OS === 'ios' ? '6%' : '7.5%',
                    marginTop: Platform.OS === 'ios' ? 5 : 0,
                    paddingBottom: Platform.OS === 'ios' ? 5 : 5,
                    borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                    borderBottomColor:
                      Platform.OS === 'ios' ? '#24334c' : '#24334c',
                    fontFamily: 'Europa',
                    fontSize: 15,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    color: '#24334c',
                  }}
                  underlineColorAndroid="transparent"
                  editable={false}
                  placeholder={startEndTimeShift}
                  placeholderTextColor={colors.pureBlack}
                /> */}

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Shift Time
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={startEndTimeShift}
                  placeholderTextColor="#24334c"
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('5%')
                        : heightPercentageToDP('6%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  alignContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#5b6679',
                  }}>
                  Job Role Description
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={jobRoleDescriptionShift}
                  placeholderTextColor="#24334c"
                  editable={false}
                  style={{
                    flex: 1,
                    height:
                      Platform.OS === 'ios'
                        ? heightPercentageToDP('5%')
                        : heightPercentageToDP('6%'),
                    fontFamily: 'Europa',
                    fontSize: 13.5,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: colors.darkBlue,
                    borderBottomWidth: 1,
                    borderColor: '#e0e3eb',
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
