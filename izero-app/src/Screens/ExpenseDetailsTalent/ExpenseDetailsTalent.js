import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './Styles';
import {Container, ExpenseHeader, Button} from '../../Components';
import {
  heightConverter,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import LinearGradient from 'react-native-linear-gradient';

import {RFValue} from 'react-native-responsive-fontsize';
import * as ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ChatIcon} from '../../Assets/Icons';
import Api from '../../api';

import {useSelector, dispatch} from 'react-redux';
import colors from '../../Constants/colors';

export default function ExpenseDetailsTalent({navigation, route}) {
  const jwt = useSelector((state) => state?.auth?.accessToken);

  const staffExpenseDetails = useSelector(
    (state) => state?.app?.staffExpenseDetails,
  );

  let paramsData = route.params;
  let id = paramsData.id;

  console.log('staffExpenseDetails',staffExpenseDetails)

  const [loading, setLoading] = useState(false);
  const [loadingApproveExpense, setLoadingApproveExpense] = useState(true);
  const [loadingDeclineExpense, setLoadingDeclineExpense] = useState(true);
  const [refresh, setrefresh] = useState(1);
  const [expenseID, setExpenseID] = useState(staffExpenseDetails?.id);
  const [title, setTitle] = useState(staffExpenseDetails?.title);
  const [cost, setCost] = useState(staffExpenseDetails?.cost);
  const [reason, setReason] = useState(staffExpenseDetails?.reason);

  const [purchaseFrom, setPurchaseFrom] = useState(
    staffExpenseDetails?.purchase_from,
  );
  const [proofPic, setProofPic] = useState('');

  const [pointOfContact, setPointOfContact] = useState(
    staffExpenseDetails?.user?.address,
  );
  const [number, setNumber] = useState(staffExpenseDetails?.user?.phone);
  
  const [userPic, setUserPic] = useState(staffExpenseDetails?.user?.avatar);

  const [userName, setUserName] = useState(
    staffExpenseDetails?.user?.first_name +
      ' ' +
      staffExpenseDetails.user?.last_name,
  );
  const [clientNotes, setClientNotes] = useState(staffExpenseDetails?.notes);

  const [status, setStatus] = useState(staffExpenseDetails?.status);
  
  let Data = [1];

  useEffect(() => {
    console.log('ExpenseDetailsTalent');
    // getDataExpenseDetails();

    setTimeout(function () {
      setLoading(true);
    }, 500);
  }, []);

  // const getDataExpenseDetails = async () => {
  //   setLoading(false);
  //   try {
  //     let res = await Api.get(
  //       `https://obstechnologia.com/izero/api/expenseDetail?id=${id}`,
  //       {
  //         headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //       },
  //     );
  //     console.log('Talent Expense Details Api Response', res);
  //     console.log(res?.data?.data);
  //     setLoading(true);

  //     setExpenseID(res?.data?.data?.id);
  //     setTitle(res?.data?.data?.title);
  //     setReason(res?.data?.data?.reason);
  //     setPurchaseFrom(res?.data?.data?.purchase_from);
  //     setProofPic('');
  //     setCost(res?.data?.data?.cost);
  //     setUserName(
  //       res?.data?.data?.user?.first_name +
  //         ' ' +
  //         res?.data?.data?.user?.last_name,
  //     );

  //     setUserPic(res?.data?.data?.user?.avatar);
  //     setStatus(res?.data?.data?.status);
  //     setClientNotes(res?.data?.data?.notes);

  //     setPointOfContact(res?.data?.data?.user?.address);
  //     setNumber(res?.data?.data?.user?.phone);
  //   } catch (error) {
  //     setLoading(true);
  //     console.log({error});
  //   }
  // };

  return (
    <Container>
      <ExpenseHeader title={title} cost={cost} />
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{marginTop: heightConverter(40)}}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
          style={{height: 10, width: widthPercentageToDP('100%')}}
        />
        {loading == false ? (
          <ActivityIndicator size="large" color={colors.darkBlueHigh} />
        ) : (
          <>
            <View style={[styles.content]}>
              <Text
                style={[
                  styles.Description,
                  {color: '#5C6778', marginTop: Platform.OS === 'ios' ? 10 : 0},
                ]}>
                Description
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  fontSize: RFValue(16, 812),
                }}
                onChangeText={(text) => {
                  console.log(text);
                }}
                placeholder={title}
                editable={false}
                placeholderTextColor={colors.pureBlack}
              />

              {/* <Text
                style={[
                  styles.Description,
                  {color: '#5C6778', marginTop: Platform.OS === 'ios' ? 20 : 0},
                ]}>
                Reason for purchase
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  fontSize: RFValue(16, 812),
                }}
                onChangeText={(text) => {
                  console.log(text);
                }}
                placeholder={reason}
                editable={false}
                placeholderTextColor={colors.pureBlack}
              /> */}
              {/* 
              <Text
                style={[
                  styles.Description,
                  {color: '#5C6778', marginTop: Platform.OS === 'ios' ? 10 : 0},
                ]}>
                Purchase From
              </Text>
              <TextInput
                onChangeText={(text) => {
                  console.log(text);
                }}
                style={{
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                  marginTop: Platform.OS === 'ios' ? 10 : 0,
                  fontSize: RFValue(16, 812),
                }}
                placeholder={purchaseFrom}
                editable={false}
                placeholderTextColor={colors.pureBlack}
              /> */}

              <Text
                style={[
                  styles.Description,
                  {
                    color: '#5C6778',
                    marginTop: Platform.OS === 'ios' ? 15 : 15,
                  },
                ]}>
                {proofPic ? 'Proof of purchase' : 'No proof of purchase'}
              </Text>

              {proofPic ? (
                <>
                  <View style={{marginTop: 20}} />
                  <FlatList
                    horizontal={true}
                    data={Data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    renderItem={() => (
                      <View style={{height: '30%', marginLeft: 15}}>
                        <Image
                          style={{
                            width: widthPercentageToDP('21%'),
                            height: widthPercentageToDP('21%'),
                          }}
                          source={{uri: proofPic}}
                        />
                      </View>
                    )}
                    //keyExtractor={(item) => item}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: widthConverter(375),
                  marginTop: '5%',
                }}>
                <Text style={styles.title}>Point of Contact</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: widthConverter(100),
                    marginRight: '20%',
                    marginTop: '2%',
                  }}>
                  {/* <TouchableOpacity> */}
                  <View
                    style={{
                      marginLeft: widthPercentageToDP('5%'),
                      marginRight: widthPercentageToDP('5%'),
                      width: heightConverter(50),
                      height: heightConverter(50),
                      borderRadius: widthConverter(50) / 2,
                      backgroundColor: colors.pureWhite,
                      justifyContent: 'center',
                      alignItems: 'center',
                      //borderWidth:1,
                      borderColor: 'lightgray',
                      marginLeft: 0,
                      marginRight: 0,
                    }}>
                    {/* <ChatIcon
                        width={widthConverter(30)}
                        height={heightConverter(28)}
                        color={colors.green}
                      /> */}
                  </View>
                  {/* </TouchableOpacity> */}

                  <TouchableHighlight
                    style={{flex: 1}}
                    underlayColor=""
                    onPress={() => {
                      let phoneNumber = '';
                      if (Platform.OS === 'android') {
                        phoneNumber = `tel:${number}`;
                      } else {
                        phoneNumber = `telprompt:${number}`;
                      }
                      if (phoneNumber) {
                        Linking.openURL(phoneNumber);
                      }
                    }}>
                    <View
                      style={{
                        width: heightConverter(50),
                        height: heightConverter(50),
                        borderRadius: widthConverter(50) / 2,
                        backgroundColor: colors.pureWhite,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'lightgray',
                        marginLeft: 0,
                        marginRight: 0,
                      }}>
                      <FontAwesome
                        name="phone"
                        size={25}
                        color={colors.green}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>

              <View
                style={{
                  marginTop: -25,
                }}>
                <Text
                  style={{
                    fontSize: RFValue(16, 812),
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#24334c',
                    textAlign: 'justify',
                    marginBottom: '5%',
                  }}>
                  {pointOfContact ? pointOfContact : 'No address found'}
                </Text>
                {/* </View> */}

                <View
                  style={{
                    marginTop: clientNotes ? 20 : 0,
                  }}>
                  {clientNotes ? (
                    <Text style={styles.title}>Employer Notes</Text>
                  ) : null}
                  <Text
                    style={{
                      fontSize: RFValue(16, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: '#24334c',
                      marginTop: 5,
                      textAlign: 'justify',
                      marginBottom: '5%',
                    }}>
                    {clientNotes ? clientNotes : ''}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  height: heightConverter(50),
                  marginLeft: 0,
                  borderRadius: 0,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    fontFamily: 'Europa-Bold',
                    fontSize: RFValue(18, 812),
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color:
                      status == 'approved'
                        ? colors.green
                        : status == 'pending'
                        ? colors.darkBlueHigh
                        : 'red',
                  }}>
                  {status == 'approved'
                    ? 'EXPENSE APPROVED'
                    : status == 'pending'
                    ? 'EXPENSE PENDING'
                    : 'EXPENSE DECLINED'}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
