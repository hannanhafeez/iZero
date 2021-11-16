import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
  wi,
} from '../../Components';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  heightConverter,
  widthConverter,
} from '../../Helpers/Responsive';
import styles from './Styles';
import IconCheck from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import Api from '../../api';
import types from '../../Redux/types';
import colors from '../../Constants/colors';


export default function PayBillResponse({navigation, route}) {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const [vissible, setVissible] = useState(true);
  const [findTalents, setfindTalents] = useState('');
  const [findTalent, setfindTalent] = useState('');
  
  let dataParams = route?.params;
  let jobLocation = dataParams?.jobLocation,
    jobTitle = dataParams?.jobTitle;
  let jobShitfs = [];
  jobShitfs = dataParams?.jobShitfs;

  useEffect(() => {
    console.log('PayBillResponse');
    getData();
  }, []);

  const getData = async () => {
    try {
      let res = await Api.get('/find_talent', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Find Staff Api Response', res);

      dispatch({
        type: types.FIND_TALENT,
        findTalent: res?.data?.data?.data,
      });
      console.log(res?.data?.data?.data);
    } catch (error) {
      console.log({error});
    }
  };

  const findTalentButton = () => {
    setVissible(false);
    navigation.navigate('JobsClient', {open: 4});
    dispatch({
      type: types.LIVE_BOOK,
      liveBook: true,
    });
  };

  return (
    <Container>
      <ScrollView>
        <Modal visible={vissible}>
          <View style={styles.modelMainContainer}>
            <View
              style={{
                flex: 3,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Image
                style={styles.image}
                source={
                  //user.avatar !== null
                  //? { uri: user?.avatar?.url }
                  //:
                  require('../../Assets/Images/appleLogo.png')
                }
              />
              <Text style={styles.HeadingText}>{jobTitle}</Text>
              <Text style={styles.HeadingText}>{jobLocation}</Text>
              {/* <FlatList
                data={jobShitfs}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) => (
                  <> */}
                    <View
                      style={{
                        marginLeft: 30,
                        backgroundColor: '#284C4F',
                        borderRadius: 20,
                        marginTop: 20,
                        paddingVertical: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#78C890',
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}>
                        {/* {item.item.start_date+' - '+item.item.end_date} */}
                        {jobShitfs[0]?.start_date+' - '+jobShitfs[0]?.end_date}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 30,
                        borderColor: '#ABB0BA',
                        marginTop: 20,
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingVertical: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: colors.pureWhite,
                          paddingLeft: 10,
                          paddingRight: 10,
                          alignSelf: 'center',
                        }}>
                        {/* {item.item.start_time} - {item.item.end_time} */}
                        {jobShitfs[0]?.start_time} - {jobShitfs[0]?.end_time}
                      </Text>
                    </View>
                  {/* </>
                )}
                keyExtractor={(item) => item.id}
              /> */}
            </View>

            <View
              style={{
                flex: 1.6,
                paddingTop: 10,
                paddingBottom: 10,
                marginTop: 0,
                backgroundColor: '#1C2B43',
                marginHorizontal: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 120,
                  borderWidth: 3,
                  borderColor: '#3CAF5F',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconCheck name="check" size={80} color="#5FC07B" />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text style={styles.HeadingText}>Payment</Text>
                <Text
                  style={[
                    styles.HeadingText,
                    {
                      marginLeft: 5,
                      color: '#3CAF5F',
                    },
                  ]}>
                  Successful
                </Text>
              </View>
            </View>

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <View style={styles.sticky}>
                <Button
                  onPress={() => findTalentButton()}
                  style={styles.ButtonTalent}
                  textStyle={{color: colors.pureWhite}}>
                  FIND STAFF
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Container>
  );
}
