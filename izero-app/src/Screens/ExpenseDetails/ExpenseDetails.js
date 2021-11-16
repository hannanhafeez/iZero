import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './Styles';
import {Container, ExpenseHeader, Button} from '../../Components';
import {
  heightConverter,
  heightPercentageToDP,
  widthConverter,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ChatIcon} from '../../Assets/Icons';
import Api from '../../api';

import {useDispatch, useSelector} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from '../../Constants/colors';

import types from '../../Redux/types';

export default function ExpenseDetails({navigation, route}) {
  const jwt = useSelector((state) => state?.auth?.accessToken);

  const dispatch = useDispatch();

  const employeerExpenseDetails = useSelector(
    (state) => state?.app?.employeerExpenseDetails,
  );

  let paramsData = route?.params;
  let id = paramsData?.id;

  const [loading, setLoading] = useState(true);

  const [loadingApproveExpense, setLoadingApproveExpense] = useState(true);
  const [loadingDeclineExpense, setLoadingDeclineExpense] = useState(true);

  const [refresh, setrefresh] = useState(1);

  const [expenseNotes, setExpenseNotes] = useState('');
  const [notes, setNotes] = useState(employeerExpenseDetails?.notes);
  const [expenseID, setExpenseID] = useState(employeerExpenseDetails?.id);
  const [title, setTitle] = useState(employeerExpenseDetails?.title);
  const [cost, setCost] = useState(employeerExpenseDetails?.cost);
  const [reason, setReason] = useState(employeerExpenseDetails?.reason);
  const [purchaseFrom, setPurchaseFrom] = useState(
    employeerExpenseDetails?.purchase_from,
  );
  const [proofPic, setProofPic] = useState('');
  const [userName, setUserName] = useState(
    employeerExpenseDetails?.user?.first_name +
      ' ' +
      employeerExpenseDetails?.user?.last_name,
  );
  const [userPic, setUserPic] = useState(employeerExpenseDetails?.user?.avatar);
  const [userTitle, setUserTitle] = useState(
    employeerExpenseDetails?.user_sector?.title,
  );
  const [status, setStatus] = useState(employeerExpenseDetails?.status);

  const [userId, setUserId] = useState(employeerExpenseDetails?.user?.id);

  const [userConversationId, setUserConversationId] = useState('');

  let Data = [1];

  useEffect(() => {
    console.log('ExpenseDetails');
   //getDataExpenseDetails();
    setTimeout(function () {
      setLoading(true);
    }, 500);
  }, []);

  const getDataExpenseDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/expenseDetail?id=${id}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Employer Expense Details Api Response', res);
      setLoading(true);

      setExpenseID(res?.data?.data?.id);
      setTitle(res?.data?.data?.title);
      setReason(res?.data?.data?.reason);
      setPurchaseFrom(res?.data?.data?.purchase_from);
      setProofPic('');

      setCost(res?.data?.data?.cost);
      setNotes(res?.data?.data?.notes);
      setUserName(
        res?.data?.data?.user?.first_name +
          ' ' +
          res?.data?.data?.user?.last_name,
      );
      setUserPic(res?.data?.data?.user?.avatar);
      setUserTitle(res?.data?.data?.user_sector?.title);
      setStatus(res?.data?.data?.status);
      setUserId(res?.data?.data?.user?.id);

      dispatch({
        type: types.EMPLOYEER_EXPENSE_DETAILS,
        employeerExpenseDetails: res?.data?.data,
      });
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  const approveExpense = async () => {
    setLoadingApproveExpense(false);
    let data = new FormData();
    data.append('expense_id', expenseID);
    data.append('status', 'approved');
    data.append('note', expenseNotes);

    try {
      let res = await Api.post('/accept_reject_expense', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('Approve Expense API for employer response', res);
      setLoadingApproveExpense(true);
      
      Alert.alert('', 'You have successfully approved expense', [
        {
          text: 'OK',
          onPress: () => getDataExpenseDetails(),
        },
      ]);
    } catch (error) {
      setLoadingApproveExpense(true);
      Alert.alert('Alert', 'Something went wrong please try again', [
        {
          text: 'OK',
          onPress: () => getDataExpenseDetails(),
        },
      ]);
      console.log({error});
    }
  };

  const declineExpense = async () => {
    setLoadingDeclineExpense(false);
    let data = new FormData();
    data.append('expense_id', expenseID);
    data.append('status', 'declined');
    data.append('note', expenseNotes);

    if (expenseNotes == '') {
      setLoadingDeclineExpense(true);
      alert('Kindly Add notes');
    } else {
      try {
        let res = await Api.post('/accept_reject_expense', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        console.log('Decline Expense API for employer response', res);
        setLoadingDeclineExpense(true);
        Alert.alert('', 'You have successfully decline expense', [
          {
            text: 'OK',
            onPress: () => getDataExpenseDetails(),
          },
        ]);
      } catch (error) {
        setLoadingDeclineExpense(true);
        Alert.alert('Alert', 'Something went wrong please try again', [
          {
            text: 'OK',
            onPress: () => getDataExpenseDetails(),
          },
        ]);
        console.log({error});
      }
    }
  };

  const sendMessageAPI = async () => {
    let conversation_id = [];

    conversation_id.push(userId);

    let data = new FormData();

    data.append('user', conversation_id);

    console.log({data});

    try {
      let res = await Api.post('/create_conversation', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log('Create Chat API response', res);

      // navigation?.navigate('Chat', {
      //   conversationID: res?.data?.conversation_id,
      //   name: userName,
      //   avatar: userPic,
      //   singleMultiChat: false,
      // });
    } catch (error) {
      alert('Something went wrong please try again later');
      console.log({error});
    }
  };

  return (
    <Container>
      <ExpenseHeader title={title} cost={cost} />
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
          <>
            <View style={styles.content}>
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
                  marginTop: Platform.OS === 'ios' ? 5 : 0,
                  height:
                    Platform.OS === 'ios'
                      ? heightPercentageToDP('4.5%')
                      : heightPercentageToDP('5.5%'),
                }}
                //style={styles.input}
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
                  {color: '#5C6778', marginTop: Platform.OS === 'ios' ? 10 : 0},
                ]}>
                Reason for purchase
              </Text>
              <TextInput
                //style={styles.input}
                style={{
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                  marginTop: Platform.OS === 'ios' ? 5 : 0,
                }}
                onChangeText={(text) => {
                  console.log(text);
                }}
                placeholder={reason}
                editable={false}
                placeholderTextColor={colors.pureBlack}
              />

              <Text
                style={[
                  styles.Description,
                  {color: '#5C6778', marginTop: Platform.OS === 'ios' ? 10 : 0},
                ]}>
                Purchase From
              </Text>
              <TextInput
                //style={styles.input}
                style={{
                  borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderBottomColor: Platform.OS === 'ios' ? '#D0D2D0' : null,
                  marginTop: Platform.OS === 'ios' ? 5 : 0,
                }}
                onChangeText={(text) => {
                  console.log(text);
                }}
                placeholder={purchaseFrom}
                editable={false}
                placeholderTextColor={colors.pureBlack}
              />
              <Text
                style={[
                  styles.Description,
                  {color: '#5C6778', marginTop: Platform.OS === 'ios' ? 10 : 0},
                ]}>
                Proof of purchase
              </Text> */}

              {proofPic ? (
                <>
                  <View style={{marginTop: 20}} />
                  <FlatList
                    horizontal={true}
                    data={Data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    renderItem={({item, index}) => (
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
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              ) : null}

              <View
                style={[
                  styles.content,
                  {
                    paddingTop: heightConverter(21),
                  },
                ]}>
                <Text style={styles.title}>Staff Member</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={{
                      width: widthPercentageToDP('10%'),
                      height: widthPercentageToDP('10%'),
                      borderRadius: 20,
                      marginTop: widthPercentageToDP('2.6%'),
                    }}
                    source={userPic?{uri: userPic}:require('../../Assets/Images/nopic.jpeg')}
                  />
                  <View>
                    <Text style={styles.title}>
                      {userName !== '' || userName !== undefined
                        ? userName
                        : null}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Europa-Bold',
                        fontWeight: 'bold',
                        fontStyle: 'normal',
                        letterSpacing: 0,
                        color: '#5ABF78',
                        marginTop: heightConverter(7),
                      }}>
                      {userTitle}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: widthConverter(100),
                    }}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        sendMessageAPI();
                      }}>
                      <View
                        style={[
                          styles.iconCon,
                          {marginLeft: widthPercentageToDP('10%')},
                        ]}>
                        <ChatIcon
                          width={widthConverter(30)}
                          height={heightConverter(28)}
                          color={'#40B562'}
                        />
                      </View>
                    </TouchableOpacity> */}
                  </View>
                </View>

                {status == 'pending' ? (
                  <View style={{marginTop: 20}}>
                    <Text style={styles.title}>Add Notes</Text>
                    <TextInput
                      style={{
                        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                        borderBottomColor:
                          Platform.OS === 'ios' ? '#D0D2D0' : null,
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                        color: colors.darkBlue,
                        height:
                          Platform.OS === 'ios'
                            ? heightPercentageToDP('4.5%')
                            : heightPercentageToDP('5.5%'),
                      }}
                      placeholder="Please type your notes..."
                      placeholderTextColor={colors.darkGrey}
                      onChangeText={(text) => {
                        setExpenseNotes(text);
                      }}
                    />
                  </View>
                ) : (
                  <>
                    {notes !== null ? (
                      <View
                        style={{
                          marginTop: 20,
                        }}>
                        <Text style={styles.title}>Notes</Text>
                        <Text
                          style={{
                            fontSize: RFValue(16, 812),
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#24334c',
                            marginTop: heightConverter(7),
                          }}>
                          {notes}
                        </Text>
                      </View>
                    ) : null}
                  </>
                  // </View>
                )}
              </View>

              {status == 'approved' || status == 'declined' ? (
                // <View style={{alignItems: 'center'}}>
                //   <Button
                //     style={{
                //       width: widthConverter(200),
                //       height: heightConverter(50),
                //       backgroundColor: colors.pureWhite,
                //       borderColor:
                //         status == 'approved' ? '#3DB560' : colors.red,
                //       borderWidth: 1,
                //       marginLeft: 15,
                //     }}
                //     textStyle={{
                //       color: status == 'approved' ? '#3DB560' : colors.red,
                //     }}>
                //     {status == 'approved'
                //       ? 'EXPENSE APPROVED'
                //       : 'EXPENSE DECLINED'}
                //   </Button>
                // </View>
                <View
                  style={{
                    width: '100%',
                    height: heightConverter(50),
                    marginLeft: 0,
                    borderRadius: 0,
                    justifyContent: 'center',
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
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'center'
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    //onPress={() => navigation.navigate('Tab')}
                    onPress={() => approveExpense()}
                    style={{
                      width: widthConverter(140),
                      height: heightConverter(50),
                      backgroundColor: '#3EB561',
                      marginRight: 15,
                    }}
                    textStyle={{color: colors.pureWhite}}>
                    {loadingApproveExpense == false ? (
                      <ActivityIndicator
                        size="large"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      'APPROVE'
                    )}
                  </Button>
                  <Button
                    onPress={() => declineExpense()}
                    //onPress={() => navigation.navigate('Tab')}
                    style={{
                      width: widthConverter(140),
                      height: heightConverter(50),
                      backgroundColor: colors.pureWhite,
                      borderColor: colors.red,
                      borderWidth: 1,
                      marginLeft: 15,
                    }}
                    textStyle={{color: colors.red}}>
                    {loadingDeclineExpense == false ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      'DECLINE'
                    )}
                  </Button>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
