import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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

export default function FinancePaySlipTalent({navigation, route}) {
  const jwt = useSelector((state) => state.auth.accessToken);
  let paramsData = route.params;
  let id = paramsData.id;

  const [loading, setLoading] = useState(true);
  const [loadingApproveExpense, setLoadingApproveExpense] = useState(true);
  const [loadingDeclineExpense, setLoadingDeclineExpense] = useState(true);
  const [refresh, setrefresh] = useState(1);
  const [expenseID, setExpenseID] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [reason, setReason] = useState('');
  const [purchaseFrom, setPurchaseFrom] = useState('');
  const [proofPic, setProofPic] = useState('');
  const [pointOfContact, setPointOfContact] = useState('');
  const [userPic, setUserPic] = useState('');
  const [userName, setUserName] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [status, setStatus] = useState('');

  let Data = [1];

  useEffect(() => {
    console.log('FinancePaySlipTalent');
    getDataExpenseDetails();
  }, []);

  const getDataExpenseDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(
        `https://obstechnologia.com/izero/api/expenseDetail?id=${id}`,
        {
          headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
        },
      );
      console.log('Staff Expense Details Api Response', res);
      console.log(res?.data?.data);
      setLoading(true);
      setExpenseID(res?.data?.data?.id);
      setTitle(res?.data?.data?.title);
      setReason(res?.data?.data?.reason);
      setPurchaseFrom(res?.data?.data?.purchase_from);
      setProofPic('');
      setCost(res?.data?.data?.cost);
      setUserName(
        res?.data?.data?.user?.first_name +
          ' ' +
          res?.data?.data?.user?.last_name,
      );
      setUserPic(res?.data?.data?.user?.avatar);
      setUserTitle(res?.data?.data?.user_sector?.title);
      setStatus(res?.data?.data?.status);
      setClientNotes(res?.data?.data?.notes);
      setPointOfContact(res?.data?.data?.pointofcontact);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  return (
    <Container>
      <ExpenseHeader title={title} cost={cost} check={true} />
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
              <View style={{paddingHorizontal: widthConverter(25)}}>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#5C6778',
                      marginTop: Platform.OS === 'ios' ? 10 : 0,
                    },
                  ]}>
                  Description
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#3eb561',
                      marginTop: Platform.OS === 'ios' ? 10 : 0,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Hourly Pay'}
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#BABDD0',
                      marginTop: Platform.OS === 'ios' ? 10 : 0,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Brand Ambassador'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Units
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    -
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Rate
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    £ {'14.64'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Total Payments
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    £ {'125.00'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderBottomColor: '#5C6778',
                  marginTop: 10,
                  borderBottomWidth: 1,
                }}
              />

              <View style={{paddingHorizontal: widthConverter(25)}}>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#BABDD0',
                      marginTop: Platform.OS === 'ios' ? 10 : 10,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Holiday Pay accumlated'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Units
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    -
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Rate
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    -
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Total Payments
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    £ {'0.00'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderBottomColor: '#5C6778',
                  marginTop: 10,
                  borderBottomWidth: 1,
                }}
              />

              <View style={{paddingHorizontal: widthConverter(25)}}>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#5C6778',
                      marginTop: Platform.OS === 'ios' ? 10 : 5,
                    },
                  ]}>
                  Description
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#3eb561',
                      marginTop: Platform.OS === 'ios' ? 10 : 5,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Deductions'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Stripe
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    £ {'0.18'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    PAYE Tax
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    £ {'14.64'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    Total Deuctions
                  </Text>
                  <Text
                    style={[
                      styles.Description,
                      {
                        color: '#5C6778',
                        marginTop: Platform.OS === 'ios' ? 10 : 5,
                      },
                    ]}>
                    £ {'14.82'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderBottomColor: '#5C6778',
                  marginTop: 10,
                  borderBottomWidth: 1,
                }}
              />

              <View style={{paddingHorizontal: widthConverter(25)}}>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#BABDD0',
                      marginTop: Platform.OS === 'ios' ? 10 : 10,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Pay Period'}
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#5C6778',
                      marginTop: Platform.OS === 'ios' ? 10 : 5,
                    },
                  ]}>
                  Wed 17 Jun - Thu 18 Jun 2020
                </Text>

                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#BABDD0',
                      marginTop: Platform.OS === 'ios' ? 10 : 10,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Date'}
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#5C6778',
                      marginTop: Platform.OS === 'ios' ? 10 : 5,
                    },
                  ]}>
                  Wed 17 Jun - Thu 18 Jun 2020
                </Text>

                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#BABDD0',
                      marginTop: Platform.OS === 'ios' ? 10 : 10,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Tax Week'}
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#5C6778',
                      marginTop: Platform.OS === 'ios' ? 10 : 5,
                    },
                  ]}>
                  11
                </Text>

                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#BABDD0',
                      marginTop: Platform.OS === 'ios' ? 10 : 10,
                      fontFamily: 'Europa-Bold',
                    },
                  ]}>
                  {'Employee Name'}
                </Text>
                <Text
                  style={[
                    styles.Description,
                    {
                      color: '#5C6778',
                      marginTop: Platform.OS === 'ios' ? 10 : 5,
                    },
                  ]}>
                  Craig Wilknson
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
