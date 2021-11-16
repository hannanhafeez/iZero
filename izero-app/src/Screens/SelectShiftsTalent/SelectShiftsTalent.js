import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  DetailsHeaderApplyJobsShifts,
  Heading,
  JobCard,
  ShiftCard,
  Button,
} from '../../Components';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Api from '../../api';
import {Ovaltwo} from '../../Assets/Graphics';
import {ArrowIcon, HeartIcon, HeartIcon2} from '../../Assets/Icons';
import {heightConverter, widthConverter} from '../../Helpers/Responsive';
import styles from './Styles';
import colors from '../../Constants/colors';

class SelectShiftsTalent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      avatar: '',
      status: '',
      loadingFavUnFav: true,
      jobName: '',
      jobFee: '',
      jobAddress: '',
      checkJobDetails: true,
      loading: true,

      id: '',
      jobId: '',
      startTime: '',
      endTime: '',
      jobShifts: [],

      loadingFavUnFav: true,

      loadingBook: true,
      checkButtonShifts: true,

      applliedAlready: [],
      jobShiftIdsArr: [],
      jobShiftStartTime: '',
      jobShiftEndTime: '',
      jobShiftFee: '',
      shiftRoleTitle: '',
      id: '',
      job_id: '',
      jobUserId: this?.props?.route?.params?.jobUserId,
      checkBook: true,
    };
  }

  componentDidMount() {
    console.log('SelectShiftsTalent');
    this.getJobDetails();
  }

  getJobDetails = async () => {
    this.setState({loading: false});
    try {
      let res = await Api.get(
        `/jobshiftdetail?id=${this?.props?.route?.params?.shiftID}`,
        {
          headers: {
            Authorization: `Bearer ${this?.props?.route?.params?.jwtTocken}`,
            Accept: 'application/json',
          },
        },
      );
      console.log('Job details for Apply job Shifts API res', res);

      this.setState({loading: true});

      let data = [];

      for (var v = 0; v < res?.data?.data?.splits?.length; v++) {
        data.push({data: res.data.data.splits[v], isSelect: false});
      }

      this.setState({
        jobName: res?.data?.data?.job?.title,
        avatar: res?.data?.data?.logo,
        status: res?.data?.data?.is_favorite,
        jobFee: res?.data?.data?.job_fee,
        jobShifts: data,
        applliedAlready: res?.data?.data?.applied_date,
        jobShiftStartTime: res?.data?.data?.start_time,
        jobShiftEndTime: res?.data?.data?.end_time,
        jobShiftFee: res?.data?.data?.total_pay,
        id: res?.data?.data?.id,
        job_id: res?.data?.data?.job?.id,
        shiftRoleTitle: res?.data?.data?.job_role?.title,
      });

      //Check for apply button if empty
      for (var i = 0; i < this.state.jobShifts?.length; i++) {
        if (
          this?.state?.applliedAlready[i]?.includes(
            this?.state?.jobShifts[i]?.data,
          )
        ) {
          this.setState({checkBook: false});
        } else {
          this.setState({checkBook: true});
        }
      }
    } catch (error) {
      this.setState({loading: true});
      console.log({error});
    }
  };

  favAdd = async () => {
    this.setState({loadingFavUnFav: false});
    try {
      let data = new FormData();
      data.append('job_id', this.props.route.params.shiftID);
      data.append('status', 1);
      let res = await Api.post('/fav_unfav_job', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.props.route.params.jwtTocken}`,
        },
      });
      console.log('Fav api response', res);

      this.setState({loadingFavUnFav: true});
      Alert.alert('', 'You have successfully added job in favourite list', [
        {
          text: 'OK',
          onPress: () => this.getJobDetails(),
        },
      ]);
    } catch (error) {
      this.setState({loadingFavUnFav: true});
      alert('Something went wrong please try again latter');
      this.props.navigation.goBack();
      console.log({error});
    }
  };

  unFavAdd = async () => {
    this.setState({loadingFavUnFav: false});
    try {
      let data = new FormData();
      data.append('job_id', this.props.route.params.shiftID);
      data.append('status', 0);
      let res = await Api.post('/fav_unfav_job', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.props.route.params.jwtTocken}`,
        },
      });
      console.log('Un fav api response', res);

      this.setState({loadingFavUnFav: true});
      Alert.alert(
        '',
        'You have successfully removed job from favourite list.',
        [
          {
            text: 'OK',
            onPress: () => this.getJobDetails(),
          },
        ],
      );
    } catch (error) {
      console.log({error});
      this.setState({loadingFavUnFav: true});
      alert('Something went wrong please try again latter');
      this.props.navigation.goBack();
    }
  };

  selectShiftForJobApply = (item, index) => {
    item.isSelect = !item.isSelect;

    let jobShifts = [...this.state.jobShifts];

    //let ind = jobShifts.findIndex((item) => item.data === item.data);
    //console.log('ind',ind);
    jobShifts[index] = {...jobShifts[index], isSelect: item.isSelect};

    this.setState({jobShifts});

    for (var v = 0; v < this.state.jobShifts.length; v++) {
      if (item.isSelect == true) {
        this.setState({
          jobShiftIdsArr: [...this.state.jobShiftIdsArr, item.data],
        });
      } else {
        var array = [...this.state.jobShiftIdsArr];
        var index = array.indexOf(item.data);
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({jobShiftIdsArr: array});
        }
      }
    }
  };

  bookShiftsForJob = async () => {
    let data = new FormData();
    data.append('id', this?.state?.id);
    data.append('job_id', this?.state?.job_id);
    data.append('start_time', this?.state?.jobShiftStartTime);
    data.append('end_time', this?.state?.jobShiftEndTime);

    data.append('client_id', this?.state?.jobUserId);

    for (var i = 0; i < this?.state?.jobShiftIdsArr?.length; i++) {
      data.append('job_shift_data[' + i + ']', this?.state?.jobShiftIdsArr[i]);
    }

    if (!this.state.checkBook) {
      alert('No shifts available');
    } else if (this?.state?.jobShiftIdsArr?.length < 1) {
      alert('Please select shift');
    } else {
      this.setState({loadingBook: false});
      try {
        let res = await Api.post('/apply_job', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.props.route.params.jwtTocken}`,
          },
        });
        console.log('Apply job API res', res);
        this.setState({loadingBook: true});
        Alert.alert('', 'You have successfully applied for this shift', [
          {
            text: 'OK',
            onPress: () =>
              this.props.navigation.navigate('ManageShiftAppliedTalent', {
                jobName: this.state.jobName,
                jobAddress: this.state.jobAddress,
                avatar: this.state.jobName,
              }),
          },
        ]);
      } catch (error) {
        alert('Something went wrong please try again later');
        this.setState({loadingBook: true});
        console.log({error});
      }
    }
  };

  render() {
    return (
      <Container>
        <View
          style={{
            backgroundColor: colors.pureWhite,
            height: heightConverter(329),
          }}>
          <Ovaltwo
            height={heightConverter(170)}
            width={widthConverter(375)}
            color={'#24334c'}
          />
          <View
            style={{
              backgroundColor: 'null',
              position: 'absolute',
            }}>
            <View
              style={{
                width: widthPercentageToDP('100%'),
                paddingHorizontal: widthPercentageToDP('5.8%'),
                paddingTop: heightConverter(100),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  width: widthPercentageToDP('12%'),
                  height: widthPercentageToDP('12%'),
                  backgroundColor: colors.pureWhite,
                  shadowColor: 'rgba(0, 0, 0, 0.07)',
                  shadowOffset: {
                    width: 1,
                    height: 3,
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: '#efefef',
                  borderRadius: widthPercentageToDP('12%') / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ArrowIcon
                  style={{
                    transform: [{rotate: '180deg'}],
                  }}
                  color={'#24334c'}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: widthPercentageToDP('22%'),
                  height: widthPercentageToDP('22%'),
                  backgroundColor: colors.pureWhite,
                  shadowColor: 'rgba(36, 51, 76, 0.14)',
                  shadowOffset: {
                    width: 0,
                    height: 11,
                  },
                  shadowRadius: 22,
                  shadowOpacity: 1,
                  borderRadius: widthPercentageToDP('22%') / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    borderRadius: 40,
                    width: widthPercentageToDP('21%'),
                    height: widthPercentageToDP('21%'),
                  }}
                  source={
                    this.state.avatar
                      ? {uri: this.state.avatar}
                      : require('../../Assets/Demo/Logo1.png')
                  }
                />
              </View>

              <>
                {this.state.status == false ? (
                  <TouchableOpacity
                    disabled={
                      this.state.loadingFavUnFav == false ? true : false
                    }
                    onPress={() => this.favAdd()}>
                    <View
                      style={{
                        width: widthPercentageToDP('12%'),
                        height: widthPercentageToDP('12%'),
                        backgroundColor: colors.pureWhite,
                        shadowColor: 'rgba(0, 0, 0, 0.07)',
                        shadowOffset: {
                          width: 1,
                          height: 3,
                        },
                        shadowRadius: 5,
                        shadowOpacity: 1,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#efefef',
                        borderRadius: widthPercentageToDP('12%') / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.loadingFavUnFav == false ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.darkBlueHigh}
                        />
                      ) : (
                        <HeartIcon />
                      )}
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={
                      this.state.loadingFavUnFav == false ? true : false
                    }
                    onPress={() => this.unFavAdd()}>
                    <View
                      style={{
                        width: widthPercentageToDP('12%'),
                        height: widthPercentageToDP('12%'),
                        backgroundColor: colors.pureWhite,
                        shadowColor: 'rgba(0, 0, 0, 0.07)',
                        shadowOffset: {
                          width: 1,
                          height: 3,
                        },
                        shadowRadius: 5,
                        shadowOpacity: 1,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#efefef',
                        borderRadius: widthPercentageToDP('12%') / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.loadingFavUnFav == false ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.darkBlueHigh}
                        />
                      ) : (
                        <Image
                          style={{
                            borderRadius: 30,
                            width: 30,
                            height: 30,
                          }}
                          source={require('../../Assets/Images/fav.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              </>
            </View>
            <Text
              style={{
                color: '#24334c',
                fontFamily: 'Europa-Bold',
                fontSize: RFValue(20, 812),
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                marginTop: 25,
              }}>
              {this.state.jobName}
            </Text>
            <Text
              style={{
                color: '#24334c',
                fontFamily: 'Europa',
                fontSize: RFValue(18, 812),
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
              }}>
              {'Fee: ' + this.state.jobFee}
            </Text>
            <Text
              style={{
                color: colors.darkGreyHigh,
                fontFamily: 'Europa',
                fontSize: RFValue(18, 812),
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 24,
                letterSpacing: 0,
                textAlign: 'center',
                width: widthPercentageToDP('60%'),
                alignSelf: 'center',
                marginTop: 5,
              }}>
              {this.state.jobAddress}
            </Text>
            {this.state.checkJobDetails ? (
              <Text style={[styles.address, {color: colors.pureWhite}]}></Text>
            ) : (
              <Text
                style={[styles.address, {color: colors.darkGreyHigh}]}></Text>
            )}
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          {this.state.loading == false ? (
            <View style={{marginTop: 20}}>
              <ActivityIndicator size="large" color={colors.darkBlueHigh} />
            </View>
          ) : (
            <FlatList
              data={this.state.jobShifts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <>
                    <ShiftCard
                      onPress={() => this.selectShiftForJobApply(item, index)}
                      btnStyle={
                        item.isSelect
                          ? null
                          : {
                              backgroundColor: colors.pureWhite,
                              borderColor: '#636E81',
                            }
                      }
                      txtStyle={item.isSelect ? null : {color: '#636E81'}}
                      text={
                        this.state.applliedAlready.includes(item.data)
                          ? 'Already Applied'
                          : item.isSelect
                          ? 'Applied'
                          : 'Select'
                      }
                      startDate={item.data}
                      totalPay={this.state.jobShiftFee}
                      startTime={this.state.jobShiftStartTime}
                      endTime={this.state.jobShiftEndTime}
                      role={this.state.shiftRoleTitle}
                      applied={
                        this.state.applliedAlready.includes(item.data)
                          ? true
                          : false
                      }
                      check={item.isSelect ? true : false}
                    />
                  </>
                );
              }}
            />
          )}
        </ScrollView>
        {this.state.checkButtonShifts == true ? (
          <View style={styles.sticky}>
            <Button
              style={styles.Button}
              onPress={() => this.bookShiftsForJob()}>
              {this.state.loadingBook == false ? (
                <ActivityIndicator size="large" color={colors.darkBlueHigh} />
              ) : (
                'APPLY FOR SHIFT(S)'
              )}
            </Button>
          </View>
        ) : null}
      </Container>
    );
  }
}

export default SelectShiftsTalent;
