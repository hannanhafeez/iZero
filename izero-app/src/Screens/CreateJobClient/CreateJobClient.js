import React, {useState, useCallback, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableOpacity as TouchableOpacity1,
  Switch,
  Platform,
  Alert,
  //TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  AuthHeader,
  AuthInput,
  AuthInput3,
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
import {BackArrow} from '../../Assets/Icons';
import {
  widthPercentageToDP,
  widthConverter,
  heightConverter,
} from '../../Helpers/Responsive';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconCross from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  TouchableHighlight as TouchableHighlight1,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useSelector, dispatch} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Api from '../../api';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import types from '../../Redux/types';
import {useDispatch} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';
import colors from '../../Constants/colors';
import Icon from 'react-native-vector-icons/Entypo';

import DropDownPicker from 'react-native-dropdown-picker';

DropDownPicker.setListMode('SCROLLVIEW');

import IconArrow from 'react-native-vector-icons/Entypo';

let jobRoleData = [];
let jobFeeData = [];

let jobRateData = [
  {
    value: 'Hourly',
  },
  {
    value: 'Fixed',
  },
];

let test = [
  {
    value: 'Hourly',
  },
];

let dataStaffNeeded = [
  {value: 1},
  {value: 2},
  {value: 3},
  {value: 4},
  {value: 5},
  {value: 6},
  {value: 7},
  {value: 8},
  {value: 9},
  {value: 10},
];

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(AuthInput3);

const Form = withNextInputAutoFocusForm(ScrollView, {
  submitAfterLastInput: false,
});

export default function CreateJobClient({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const jwt = useSelector((state) => state?.auth?.accessToken);
  const userName = useSelector((state) => state?.auth?.user);
  const [staffShift, setStaffShift] = useState('');

  const jobSectors = useSelector((state) => state?.app?.jobSectors);
  const jobFees = useSelector((state) => state?.app?.jobFees);

  console.log('jobFees', jobFees);

  const [jobRole, setjobRole] = useState('');

  const [loadingDropDown, setLoadingDropDown] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(jobSectors);

  const [shiftRoleTitle, setShiftRoleTitle] = useState('');
  const [jobRate, setJobRate] = useState('');
  const [jobFee, setJobFee] = useState('');

  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTimeMain, setStartTimeMain] = useState('');

  const [totalFee, setTotalFee] = useState('');

  //const [date, setdate] = useState('');

  const [totalHours, setTotalHours] = useState('');
  const [logoImage, setLogoImage] = useState({});
  const [ExpireDate, setExpireDate] = useState('');

  const [jobLat, setJobLat] = useState('');
  const [jobLong, setJobLong] = useState('');
  const [jobAddress, setJobAddress] = useState('');

  const [uris, setUris] = useState([]);
  const [showStartTimePicker, setshowStartTimePicker] = useState(false);
  const [showEndTimePicker, setshowEndTimePicker] = useState(false);
  const [showDatePicker, setshowDatePicker] = useState(false);

  const [showStartDatePicker, setshowStartDatePicker] = useState(false);
  const [showEndDatePicker, setshowEndDatePicker] = useState(false);

  const [showExpireDatePicker, setshowExpireDatePicker] = useState(false);
  const [jobDec, setJobDec] = useState('');

  const [jobTitle, setJobTitle] = useState('');

  const [addShifts, setAddShifts] = useState(false);
  const [finialaddShifts, setFinialAddShifts] = useState(0);

  const [staffShiftArr, setStaffShiftArr] = useState([]);
  const [jobRoleArr, setjobRoleArr] = useState([]);
  const [shiftRoleTitleArr, setShiftRoleTitleArr] = useState([]);

  const [jobRateArr, setJobRateArr] = useState([]);

  const [jobFeeArr, setJobFeeArr] = useState([]);

  const [startTimeArr, setStartTimeArr] = useState([]);
  const [endTimeArr, setEndTimeArr] = useState([]);

  const [dateArr, setdateArr] = useState([]);
  const [startDateArr, setStartDateArr] = useState([]);
  const [endDateArr, setEndDateArr] = useState([]);
  const [jobDecArr, setJobDecArr] = useState([]);

  const [jobRoleTitleArr, setJobRoleTitleArr] = useState([]);

  const [jobLatArr, setJobLatArr] = useState([]);
  const [jobLongArr, setJobLongArr] = useState([]);
  const [jobAddressArr, setJobAddressArr] = useState([]);

  const [vissible, setVissible] = useState(false);
  const [disabledButton, setdisabledButton] = useState(true);

  const [vissibleFirstShift, setVissibleFirstShift] = useState(false);
  const [vissibleSecondShift, setVissibleSecondShift] = useState(false);
  const [vissibleThirdShift, setVissibleThirdShift] = useState(false);
  const [vissibleFourthShift, setVissibleFourthShift] = useState(false);

  const [vissibleFirstShiftFee, setVissibleFirstShiftFee] = useState(false);
  const [vissibleSecondShiftFee, setVissibleSecondShiftFee] = useState(false);
  const [vissibleThirdShiftFee, setVissibleThirdShiftFee] = useState(false);
  const [vissibleFourthShiftFee, setVissibleFourthShiftFee] = useState(false);

  const [firstShiftCount, setFirstShiftCount] = useState(0);
  const [secondShiftCount, setSecondShiftCount] = useState(0);
  const [thirdShiftCount, setThirdShiftCount] = useState(0);
  const [fourthShiftCount, setFourthShiftCount] = useState(0);
  const [total, setTotal] = useState(0);

  const [isClientPublicPrivate, setIsClientPublicPrivate] = useState(false);
  const [isJobPublicPrivate, setIsJobPublicPrivate] = useState(false);

  const [check, setCheck] = useState(false);

  const [checkFirst, setCheckFirst] = useState(false);

  const [checkSecond, setCheckSecond] = useState(false);

  const [checkThird, setCheckThird] = useState(false);

  const [checkFourth, setCheckFourth] = useState(false);

  const [vissibleAddress, setVissibleAddress] = useState(false);

  const [customFileds, setCustomFileds] = useState([]);

  //
  const [vissibleShiftFirstRoles, setVissibleShiftFirstRoles] = useState(false);

  const [vissibleShiftSecondRoles, setVissibleShiftSecondRoles] = useState(
    false,
  );

  const [vissibleShiftThirdRoles, setVissibleShiftThirdRoles] = useState(false);

  const [vissibleShiftFourthRoles, setVissibleShiftFourthRoles] = useState(
    false,
  );
  //

  const [nextShifts, setNextShifts] = useState(0);

  //Set Values

  const [shiftRateIconArr, setShiftRateIconArr] = useState('');

  const [shiftLatIcon, setShiftLatIcon] = useState('');
  const [shiftLongIcon, setShiftLongIcon] = useState('');
  const [shiftAddressIcon, setShiftAddressIcon] = useState('');

  const [shiftRoleIcon, setShiftRoleIcon] = useState('');

  const [shiftRoleTitleIcon, setShiftRoleTitleIcon] = useState('');

  const [staffNeededIcon, setStaffNeededIcon] = useState('');

  const [shiftFeeIcon, setShiftFeeIcon] = useState('');

  const [staffStartTimeIcon, setStaffStartTimeIcon] = useState('');

  const [staffEndTimeIcon, setStaffEndTimeIcon] = useState('');

  const [showStartTimePickerIcon, setShowStartTimePickerIcon] = useState(false);
  const [showEndTimePickerIcon, setShowEndTimePickerIcon] = useState(false);

  const [StartTimeMainIcon, setStartTimeMainIcon] = useState('');

  const [totalHoursIcon, setTotalHoursIcon] = useState('');

  const [orderIDArr, setOrderIDArr] = useState([]);

  //////
  const [firstShiftRolesCount, setFirstShiftRolesCount] = useState(0);

  const [secondShiftRolesCount, setSecondShiftRolesCount] = useState(0);

  const [thirdShiftRolesCount, setThirdShiftRolesCount] = useState(0);

  const [fourthShiftRolesCount, setFourthShiftRolesCount] = useState(0);

  const [checkShiftFirstRoles, setCheckShiftFirstRoles] = useState(false);

  const [checkShiftSecondRoles, setCheckShiftSecondRoles] = useState(false);

  const [checkShiftThirdRoles, setCheckShiftThirdRoles] = useState(false);

  const [checkShiftFourthRoles, setCheckShiftFourthRoles] = useState(false);
  ////

  //Array 1

  const [shiftRateIconArr1, setShiftRateIconArr1] = useState('');

  const [shiftOrderIdIconArr1, setShiftOrderIdIconArr1] = useState('');

  const [shiftRoleTitleIconArr1, setShiftRoleTitleIconArr1] = useState('');

  const [staffNeededIconArr1, setStaffNeededIconArr1] = useState('');

  const [shiftRoleIconArr1, setShiftRoleIconArr1] = useState('');

  const [shiftFeeIconArr1, setShiftFeeIconArr1] = useState('');

  const [staffStartTimeIconArr1, setStaffStartTimeIconArr1] = useState('');

  const [staffEndTimeIconArr1, setStaffEndTimeIconArr1] = useState('');

  const [
    shiftRoleDescriptionIconArr1,
    setShiftRoleDescriptionIconArr1,
  ] = useState('');

  const [staffStartDateIconArr1, setStaffStartDateIconArr1] = useState('');

  const [staffEndDateIconArr1, setStaffEndDateIconArr1] = useState('');

  const [shiftAddressIconArr1, setShiftAddressIconArr1] = useState('');

  const [shiftLatIconArr1, setShiftLatIconArr1] = useState('');

  const [shiftLongIconArr1, setShiftLongIconArr1] = useState('');

  //Array 2

  const [shiftRateIconArr2, setShiftRateIconArr2] = useState('');

  const [shiftOrderIdIconArr2, setShiftOrderIdIconArr2] = useState('');

  const [shiftRoleTitleIconArr2, setShiftRoleTitleIconArr2] = useState('');

  const [staffNeededIconArr2, setStaffNeededIconArr2] = useState('');

  const [shiftRoleIconArr2, setShiftRoleIconArr2] = useState('');

  const [shiftFeeIconArr2, setShiftFeeIconArr2] = useState('');

  const [staffStartTimeIconArr2, setStaffStartTimeIconArr2] = useState('');

  const [staffEndTimeIconArr2, setStaffEndTimeIconArr2] = useState('');

  const [
    shiftRoleDescriptionIconArr2,
    setShiftRoleDescriptionIconArr2,
  ] = useState('');

  const [staffStartDateIconArr2, setStaffStartDateIconArr2] = useState('');

  const [staffEndDateIconArr2, setStaffEndDateIconArr2] = useState('');

  const [shiftAddressIconArr2, setShiftAddressIconArr2] = useState('');

  const [shiftLatIconArr2, setShiftLatIconArr2] = useState('');

  const [shiftLongIconArr2, setShiftLongIconArr2] = useState('');

  //Array 3

  const [shiftRateIconArr3, setShiftRateIconArr3] = useState('');

  const [shiftOrderIdIconArr3, setShiftOrderIdIconArr3] = useState('');

  const [shiftRoleTitleIconArr3, setShiftRoleTitleIconArr3] = useState('');

  const [staffNeededIconArr3, setStaffNeededIconArr3] = useState('');

  const [shiftRoleIconArr3, setShiftRoleIconArr3] = useState('');

  const [shiftFeeIconArr3, setShiftFeeIconArr3] = useState('');

  const [staffStartTimeIconArr3, setStaffStartTimeIconArr3] = useState('');

  const [staffEndTimeIconArr3, setStaffEndTimeIconArr3] = useState('');

  const [
    shiftRoleDescriptionIconArr3,
    setShiftRoleDescriptionIconArr3,
  ] = useState('');

  const [staffStartDateIconArr3, setStaffStartDateIconArr3] = useState('');

  const [staffEndDateIconArr3, setStaffEndDateIconArr3] = useState('');

  const [shiftAddressIconArr3, setShiftAddressIconArr3] = useState('');

  const [shiftLatIconArr3, setShiftLatIconArr3] = useState('');

  const [shiftLongIconArr3, setShiftLongIconArr3] = useState('');

  //Array 4

  const [shiftRateIconArr4, setShiftRateIconArr4] = useState('');

  const [shiftOrderIdIconArr4, setShiftOrderIdIconArr4] = useState('');

  const [shiftRoleTitleIconArr4, setShiftRoleTitleIconArr4] = useState('');

  const [staffNeededIconArr4, setStaffNeededIconArr4] = useState('');

  const [shiftRoleIconArr4, setShiftRoleIconArr4] = useState('');

  const [shiftFeeIconArr4, setShiftFeeIconArr4] = useState('');

  const [staffStartTimeIconArr4, setStaffStartTimeIconArr4] = useState('');

  const [staffEndTimeIconArr4, setStaffEndTimeIconArr4] = useState('');

  const [
    shiftRoleDescriptionIconArr4,
    setShiftRoleDescriptionIconArr4,
  ] = useState('');

  const [staffStartDateIconArr4, setStaffStartDateIconArr4] = useState('');

  const [staffEndDateIconArr4, setStaffEndDateIconArr4] = useState('');

  const [shiftAddressIconArr4, setShiftAddressIconArr4] = useState('');

  const [shiftLatIconArr4, setShiftLatIconArr4] = useState('');

  const [shiftLongIconArr4, setShiftLongIconArr4] = useState('');

  //Final
  const [shiftRateIconArrFinal, setShiftRateIconArrFinal] = useState('');

  const [shiftOrderIdIconArrFinal, setShiftOrderIdIconArrFinal] = useState('');

  const [shiftRoleTitleIconArrFinal, setShiftRoleTitleIconArrFinal] = useState(
    '',
  );

  const [staffNeededIconArrFinal, setStaffNeededIconArrFinal] = useState('');

  const [shiftRoleIconArrFinal, setShiftRoleIconArrFinal] = useState('');

  const [shiftFeeIconArrFinal, setShiftFeeIconArrFinal] = useState('');

  const [staffStartTimeIconArrFinal, setStaffStartTimeIconArrFinal] = useState(
    '',
  );

  const [staffEndTimeIconArrFinal, setStaffEndTimeIconArrFinal] = useState('');

  const [
    shiftRoleDescriptionIconArrFinal,
    setShiftRoleDescriptionIconArrFinal,
  ] = useState('');

  const [staffStartDateIconArrFinal, setStaffStartDateIconArrFinal] = useState(
    '',
  );

  const [staffEndDateIconArrFinal, setStaffEndDateIconArrFinal] = useState('');

  const [shiftAddressIconArrFinal, setShiftAddressIconArrFinal] = useState('');

  const [shiftLatIconArrFinal, setShiftLatIconArrFinal] = useState('');

  const [shiftLongIconArrFinal, setShiftLongIconArrFinal] = useState('');

  ///Show Modal
  const [vissibleShiftsFirst, setVissibleShiftsFirst] = useState(false);

  const [vissibleShiftsIndexFirst, setVissibleShiftsIndexFirst] = useState(0);

  const [vissibleShiftsSecond, setVissibleShiftsSecond] = useState(false);

  const [vissibleShiftsIndexSecond, setVissibleShiftsIndexSecond] = useState(0);

  const [vissibleShiftsThird, setVissibleShiftsThird] = useState(false);

  const [vissibleShiftsIndexThird, setVissibleShiftsIndexThird] = useState(0);

  const [vissibleShiftsFourth, setVissibleShiftsFourth] = useState(false);

  const [vissibleShiftsIndexFourth, setVissibleShiftsIndexFourth] = useState(0);

  //Show Modal

  const toggleSwitchClient = () => {
    setIsClientPublicPrivate((previousState) => !previousState);
  };

  const toggleSwitchJob = () => {
    setIsJobPublicPrivate((previousState) => !previousState);
  };

  useEffect(() => {
    console.log('CreateJobClient');
    //getData();
    //getShiftFeeRate();
    getJobSectors();
    getShiftFeeRate();
  }, [isFocused]);

  // useEffect(() => {
  //   console.log('CreateJobClient');
  //   getData(), getShiftFeeRate(), [isFocused];
  // });

  const AddMoreShifts = (counter) => {
    let randomID = Math.floor(100000 + Math.random() * 9000000000000000);
    console.log('randomID', randomID);

    setCheckFirst(false);
    setCheckSecond(false);
    setCheckThird(false);
    setCheckFourth(false);

    if (jobTitle == '') {
      alert('Please enter the shift title');
    } else if (jobLat == '' || jobLong == '' || jobAddress == '') {
      alert('Please select shift location');
    } else if (startDate == '') {
      alert('Please select start date');
    } else if (endDate == '') {
      alert('Please select end date');
    } else if (staffShift == '') {
      alert('Please enter the quantity needed');
    } else if (jobRole == '') {
      alert('Please select shift role');
    } else if (startTime == '') {
      alert('Please select start time');
    } else if (endTime == '') {
      alert('Please select end time');
    } else if (jobFee == '') {
      alert('Please enter the shift fee');
    } else if (jobDec == '') {
      alert('Please enter the shift role description');
    } else if (counter <= 4) {
      setTotal(counter);
      setVissible(false);
      setdisabledButton(false);
      setStaffShiftArr([...staffShiftArr, staffShift]);
      setjobRoleArr([...jobRoleArr, jobRole]);
      setJobRateArr([...jobRateArr, jobRate]);
      setJobFeeArr([...jobFeeArr, jobFee]);
      setStartTimeArr([...startTimeArr, startTime]);
      setEndTimeArr([...endTimeArr, endTime]);
      setStartDateArr([...startDateArr, startDate]);
      setEndDateArr([...endDateArr, endDate]);
      setJobDecArr([...jobDecArr, jobDec]);

      setJobRoleTitleArr([...jobRoleTitleArr, jobTitle]);

      setJobLatArr([...jobLatArr, jobLat]);
      setJobLongArr([...jobLongArr, jobLong]);
      setJobAddressArr([...jobAddressArr, jobAddress]);

      setFinialAddShifts(counter);
      setShiftRoleTitleArr([...shiftRoleTitleArr, shiftRoleTitle]);
      setOrderIDArr([...orderIDArr, randomID]);

      if (counter == 1) {
        setAddShifts(false);
        setStaffShift('');
        setjobRole('');
        setJobRate('');
        setJobFee('');
        setStartTime('');
        setEndTime('');
        setStartDate('');
        setEndDate('');
        setJobDec('');
        setJobTitle('');

        setJobLat('');
        setJobLong('');
        setJobAddress('');

        setFirstShiftCount(1);
        setSecondShiftCount(0);
        setThirdShiftCount(0);
        setFourthShiftCount(0);

        setCheckFirst(true);
        setCheckSecond(false);
        setCheckThird(false);
        setCheckFourth(false);
      } else if (counter == 2) {
        setAddShifts(false);
        setStaffShift('');
        setjobRole('');
        setJobRate('');
        setJobFee('');
        setStartTime('');
        setEndTime('');
        setStartDate('');
        setEndDate('');

        setJobDec('');
        setJobLat('');
        setJobLong('');
        setJobAddress('');
        setJobTitle('');

        setFirstShiftCount(1);
        setSecondShiftCount(1);
        setThirdShiftCount(0);
        setFourthShiftCount(0);

        setCheckFirst(false);
        setCheckSecond(true);
        setCheckThird(false);
        setCheckFourth(false);
      } else if (counter == 3) {
        setAddShifts(false);
        setStaffShift('');
        setjobRole('');
        setJobRate('');
        setJobFee('');
        setStartTime('');
        setEndTime('');
        setStartDate('');
        setEndDate('');
        setJobDec('');
        setJobTitle('');

        setJobLat('');
        setJobLong('');
        setJobAddress('');

        setFirstShiftCount(1);
        setSecondShiftCount(1);
        setThirdShiftCount(1);
        setFourthShiftCount(0);

        setCheckFirst(false);
        setCheckSecond(false);
        setCheckThird(true);
        setCheckFourth(false);
      } else {
        setAddShifts(false);
        setStaffShift('');
        setjobRole('');
        setJobRate('');
        setJobFee('');
        setStartTime('');
        setEndTime('');
        setStartDate('');
        setEndDate('');
        setJobDec('');
        setJobTitle('');

        setJobLat('');
        setJobLong('');
        setJobAddress('');

        setFirstShiftCount(1);
        setSecondShiftCount(1);
        setThirdShiftCount(1);
        setFourthShiftCount(1);

        setCheckFirst(false);
        setCheckSecond(false);
        setCheckThird(false);
        setCheckFourth(true);
      }
    } else {
      alert('Sorry you can not add more then 4 shifts.');
      setAddShifts(false);
    }
  };

  const addShiftFunc = () => {
    setCheckFirst(false);
    setCheckSecond(false);
    setCheckThird(false);
    setCheckFourth(false);
    if (total <= 4) {
      setAddShifts(true);
      setVissible(true);
    }
  };

  const RemoveImage = (index) => {
    const data = [...uris];
    const item = data[index];
    const newData = data.filter((i) => i !== item);
    setUris(newData);
  };

  const getJobSectors = async () => {
    try {
      let res = await Api.get('/job_sectors', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Job Sector Api Response', res);
      let jobRoleData = [];
      for (var i = 0; i < res?.data?.data?.length - 1; i++) {
        // jobRoleData[i] = {
        //   label: res?.data?.data[i]?.title,
        //   value: parseInt(res?.data?.data[i]?.id),
        // };
        jobRoleData[i] = {
          label: res.data.data[i].title,
          value: {
            label: res.data.data[i].title,
            value: parseInt(res.data.data[i].id),
          },
        };
      }
      dispatch({
        type: types.JOB_SECTORS,
        jobSectors: jobRoleData,
      });
      //setItems(jobRoleData);
    } catch (error) {
      console.log({error});
    }
  };

  const getShiftFeeRate = async () => {
    let jobFeeData = [];
    try {
      let res = await Api.get('/wages_rate', {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Get All Shift Fee Rate Api Response', res);

      for (var i = 0; i < res?.data?.data?.length; i++) {
        jobFeeData[i] = {
          label: res?.data?.data[i]?.title,
          value: parseInt(res?.data?.data[i]?.rate),
        };
      }
      dispatch({
        type: types.JOB_FEES,
        jobFees: jobFeeData,
      });
    } catch (error) {
      console.log({error});
    }
  };

  const selectPhotoFromLibaray = () => {
    let source;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      var responseImage = {};
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('respon', response);
        let sourceSend = response.base64;
        setLogoImage(response);
      }
    });
  };

  const selectPhotoFromLibarayList = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response) => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var source = response.uri;
        setUris([...uris, source]);
      }
    });
  };

  const StartTimeFunc = (time) => {
    setStartTimeMain(time);
    setshowStartTimePicker(false);
    setStartTime(moment(time).format('HH:mm').toString());
    let minutesfromhours = new Date(time).getHours() * 60;
    let minutes = new Date(time).getMinutes();
    let totalminutes = minutesfromhours + minutes;
  };

  const EndTimeFunc = (time) => {
    setshowEndTimePicker(false);
    setEndTime(moment(time).format('HH:mm').toString());
    let minutesfromhours = new Date(time).getHours() * 60;
    let minutes = new Date(time).getMinutes();
    let totalminutes = minutesfromhours + minutes;

    let minutesfromhoursS = new Date(startTimeMain).getHours() * 60;
    let minutesS = new Date(startTimeMain).getMinutes();
    let totalminutesS = minutesfromhoursS + minutesS;

    if (totalminutes < totalminutesS) {
      totalminutes = totalminutes + 1440;
    }
    let hours = parseInt((totalminutes - totalminutesS) / 60);
    let minu = parseInt((totalminutes - totalminutesS) % 60);

    console.log(totalminutes);
    console.log(parseInt((totalminutes - totalminutesS) / 60));
    console.log((totalminutes - totalminutesS) % 60);

    setTotalHours(hours + ' ' + 'Hour(s)' + ' ' + minu + ' ' + 'Minute(s)');
  };

  const dateFunc = (date) => {
    setshowDatePicker(false);
    setdate(moment(date).format('YYYY-MM-DD').toString());
  };

  const StartDateFunc = (date) => {
    setshowStartDatePicker(false);
    setStartDate(moment(date).format('YYYY-MM-DD').toString());
  };

  const EndDateFunc = (date) => {
    setshowEndDatePicker(false);
    setEndDate(moment(date).format('YYYY-MM-DD').toString());
  };

  const ExpireDateFunc = (date) => {
    setshowExpireDatePicker(false);
    setExpireDate(moment(date).format('YYYY-MM-DD').toString());
  };

  const StartTimeFuncIcon = (time) => {
    setStartTimeMain(time);
    let minutesfromhours = new Date(time).getHours() * 60;
    let minutes = new Date(time).getMinutes();
    let totalminutes = minutesfromhours + minutes;

    setShowStartTimePickerIcon(false);
    setStaffStartTimeIcon(moment(time).format('HH:mm').toString());
  };

  const EndTimeFuncIcon = (time) => {
    setShowEndTimePickerIcon(false);
    setStaffEndTimeIcon(moment(time).format('HH:mm').toString());

    let minutesfromhours = new Date(time).getHours() * 60;
    let minutes = new Date(time).getMinutes();
    let totalminutes = minutesfromhours + minutes;

    let minutesfromhoursS = new Date(startTimeMain).getHours() * 60;
    let minutesS = new Date(startTimeMain).getMinutes();
    let totalminutesS = minutesfromhoursS + minutesS;

    if (totalminutes < totalminutesS) {
      totalminutes = totalminutes + 1440;
    }
    let hours = parseInt((totalminutes - totalminutesS) / 60);
    let minu = parseInt((totalminutes - totalminutesS) % 60);

    console.log(totalminutes);
    console.log(parseInt((totalminutes - totalminutesS) / 60));
    console.log((totalminutes - totalminutesS) % 60);

    setTotalHours(hours + ' ' + 'Hour(s)' + ' ' + minu + ' ' + 'Minute(s)');
  };

  const plusMoreFirstFunc = () => {
    setCheckShiftFirstRoles(!checkShiftFirstRoles);
    setVissibleShiftFirstRoles(true);

    setCheckShiftSecondRoles(false);
    setCheckShiftThirdRoles(false);
    setCheckShiftFourthRoles(false);
  };

  const plusMoreSecondFunc = () => {
    setCheckShiftSecondRoles(!checkShiftSecondRoles);
    setVissibleShiftSecondRoles(true);

    setCheckShiftFirstRoles(false);
    setCheckShiftThirdRoles(false);
    setCheckShiftFourthRoles(false);
  };

  const plusMoreThirdFunc = () => {
    setCheckShiftThirdRoles(!checkShiftThirdRoles);
    setVissibleShiftThirdRoles(true);

    setCheckShiftFirstRoles(false);
    setCheckShiftSecondRoles(false);
    setCheckShiftFourthRoles(false);
  };

  const plusMoreFourthFunc = () => {
    setCheckShiftFourthRoles(!checkShiftFourthRoles);
    setVissibleShiftFourthRoles(true);

    setCheckShiftFirstRoles(false);
    setCheckShiftSecondRoles(false);
    setCheckShiftThirdRoles(false);
  };

  const saveDetailsFirstFunc = () => {
    if (shiftRoleIcon == '') {
      alert('Please select the shift role');
    }
    else if (staffStartTimeIcon == '') {
      alert('Please select the start time');
    }
    else if (staffEndTimeIcon == '') {
      alert('Please select the end time');
    }
    else if (staffNeededIcon == '') {
      alert('Please enter the quantity needed');
    }
    else if (shiftFeeIcon == '') {
      alert('Please enter the shift fee');
    } else {
      setFirstShiftRolesCount(firstShiftRolesCount + 1);
      setCheckShiftFirstRoles(!checkShiftFirstRoles);
      setNextShifts(nextShifts + 1);

      //////////////////////////////////////////////////////////////////////////////////////

      setShiftRateIconArr1([...shiftRateIconArr1, shiftRateIconArr]);

      setShiftOrderIdIconArr1([...shiftOrderIdIconArr1, orderIDArr[0]]);

      setShiftRoleIconArr1([...shiftRoleIconArr1, shiftRoleIcon]);

      setShiftRoleTitleIconArr1([
        ...shiftRoleTitleIconArr1,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArr1([...staffNeededIconArr1, staffNeededIcon]);

      setShiftFeeIconArr1([...shiftFeeIconArr1, shiftFeeIcon]);

      setStaffStartTimeIconArr1([
        ...staffStartTimeIconArr1,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArr1([...staffEndTimeIconArr1, staffEndTimeIcon]);

      setShiftRoleDescriptionIconArr1([
        ...shiftRoleDescriptionIconArr1,
        jobDecArr[0],
      ]);

      setStaffStartDateIconArr1([...staffStartDateIconArr1, startDateArr[0]]);

      setStaffEndDateIconArr1([...staffEndDateIconArr1, endDateArr[0]]);

      setShiftAddressIconArr1([...shiftAddressIconArr1, jobAddressArr[0]]);

      setShiftLatIconArr1([...shiftLatIconArr1, jobLatArr[0]]);

      setShiftLongIconArr1([...shiftLongIconArr1, jobLongArr[0]]);

      ////////////////////////////////////////////FINAL ARRAY//////////////////////////////////////

      setShiftRateIconArrFinal([...shiftRateIconArrFinal, shiftRateIconArr]);

      setShiftOrderIdIconArrFinal([...shiftOrderIdIconArrFinal, orderIDArr[0]]);

      setShiftRoleTitleIconArrFinal([
        ...shiftRoleTitleIconArrFinal,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArrFinal([...staffNeededIconArrFinal, staffNeededIcon]);

      setShiftRoleIconArrFinal([...shiftRoleIconArrFinal, shiftRoleIcon]);

      setShiftFeeIconArrFinal([...shiftFeeIconArrFinal, shiftFeeIcon]);

      setStaffStartTimeIconArrFinal([
        ...staffStartTimeIconArrFinal,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArrFinal([
        ...staffEndTimeIconArrFinal,
        staffEndTimeIcon,
      ]);

      setShiftRoleDescriptionIconArrFinal([
        ...shiftRoleDescriptionIconArrFinal,
        jobDecArr[0],
      ]);

      setStaffStartDateIconArrFinal([
        ...staffStartDateIconArrFinal,
        startDateArr[0],
      ]);

      setStaffEndDateIconArrFinal([...staffEndDateIconArrFinal, endDateArr[0]]);

      setShiftAddressIconArrFinal([
        ...shiftAddressIconArrFinal,
        jobAddressArr[0],
      ]);

      setShiftLatIconArrFinal([...shiftLatIconArrFinal, jobLatArr[0]]);

      setShiftLongIconArrFinal([...shiftLongIconArrFinal, jobLongArr[0]]);

      ///////////////////////////////////////////////////////////////////////////////////////////

      setShiftRoleIcon('');
      setShiftRoleTitleIcon('');
      setStaffNeededIcon('');
      setShiftFeeIcon('');
      setStaffStartTimeIcon('');
      setStaffEndTimeIcon('');
    }
  };

  const saveDetailsSecondFunc = () => {
    if (shiftRoleIcon == '') {
      alert('Please select the shift role');
    }
    else if (staffStartTimeIcon == '') {
      alert('Please select the start time');
    }
    else if (staffEndTimeIcon == '') {
      alert('Please select the end time');
    }
    else if (staffNeededIcon == '') {
      alert('Please enter the quantity needed');
    }
    else if (shiftFeeIcon == '') {
      alert('Please enter the shift fee');
    } else {
      setSecondShiftRolesCount(secondShiftRolesCount + 1);
      setCheckShiftSecondRoles(!checkShiftSecondRoles);
      setNextShifts(nextShifts + 1);

      setShiftRateIconArr2([...shiftRateIconArr2, shiftRateIconArr]);

      setShiftOrderIdIconArr2([...shiftOrderIdIconArr2, orderIDArr[1]]);

      setShiftRoleIconArr2([...shiftRoleIconArr2, shiftRoleIcon]);

      setShiftRoleTitleIconArr2([
        ...shiftRoleTitleIconArr2,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArr2([...staffNeededIconArr2, staffNeededIcon]);

      setShiftFeeIconArr2([...shiftFeeIconArr2, shiftFeeIcon]);

      setStaffStartTimeIconArr2([
        ...staffStartTimeIconArr2,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArr2([...staffEndTimeIconArr2, staffEndTimeIcon]);

      setShiftRoleDescriptionIconArr2([
        ...shiftRoleDescriptionIconArr2,
        jobDecArr[1],
      ]);

      setStaffStartDateIconArr2([...staffStartDateIconArr2, startDateArr[1]]);

      setStaffEndDateIconArr2([...staffEndDateIconArr2, endDateArr[1]]);

      setShiftAddressIconArr2([...shiftAddressIconArr2, jobAddressArr[1]]);

      setShiftLatIconArr2([...shiftLatIconArr2, jobLatArr[1]]);

      setShiftLongIconArr2([...shiftLongIconArr2, jobLongArr[1]]);

      ////////////////////////////////////////////FINAL ARRAY//////////////////////////////////////

      setShiftRateIconArrFinal([...shiftRateIconArrFinal, shiftRateIconArr]);

      setShiftOrderIdIconArrFinal([...shiftOrderIdIconArrFinal, orderIDArr[1]]);

      setShiftRoleTitleIconArrFinal([
        ...shiftRoleTitleIconArrFinal,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArrFinal([...staffNeededIconArrFinal, staffNeededIcon]);

      setShiftRoleIconArrFinal([...shiftRoleIconArrFinal, shiftRoleIcon]);

      setShiftFeeIconArrFinal([...shiftFeeIconArrFinal, shiftFeeIcon]);

      setStaffStartTimeIconArrFinal([
        ...staffStartTimeIconArrFinal,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArrFinal([
        ...staffEndTimeIconArrFinal,
        staffEndTimeIcon,
      ]);

      setShiftRoleDescriptionIconArrFinal([
        ...shiftRoleDescriptionIconArrFinal,
        jobDecArr[1],
      ]);

      setStaffStartDateIconArrFinal([
        ...staffStartDateIconArrFinal,
        startDateArr[1],
      ]);

      setStaffEndDateIconArrFinal([...staffEndDateIconArrFinal, endDateArr[1]]);

      setShiftAddressIconArrFinal([
        ...shiftAddressIconArrFinal,
        jobAddressArr[1],
      ]);

      setShiftLatIconArrFinal([...shiftLatIconArrFinal, jobLatArr[1]]);

      setShiftLongIconArrFinal([...shiftLongIconArrFinal, jobLongArr[1]]);

      ///////////////////////////////////////////////////////////////////////////////////////////

      setShiftRoleIcon('');
      setShiftRoleTitleIcon('');
      setStaffNeededIcon('');
      setShiftFeeIcon('');
      setStaffStartTimeIcon('');
      setStaffEndTimeIcon('');
    }
  };

  const saveDetailsThirdFunc = () => {
    if (shiftRoleIcon == '') {
      alert('Please select the shift role');
    }
    else if (staffStartTimeIcon == '') {
      alert('Please select the start time');
    }
    else if (staffEndTimeIcon == '') {
      alert('Please select the end time');
    }
    else if (staffNeededIcon == '') {
      alert('Please enter the quantity needed');
    }
    else if (shiftFeeIcon == '') {
      alert('Please enter the shift fee');
    } else {
      setThirdShiftRolesCount(thirdShiftRolesCount + 1);
      setCheckShiftThirdRoles(!checkShiftThirdRoles);
      setNextShifts(nextShifts + 1);

      setShiftRateIconArr3([...shiftRateIconArr3, shiftRateIconArr]);

      setShiftOrderIdIconArr3([...shiftOrderIdIconArr3, orderIDArr[2]]);

      setShiftRoleIconArr3([...shiftRoleIconArr3, shiftRoleIcon]);

      setShiftRoleTitleIconArr3([
        ...shiftRoleTitleIconArr3,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArr3([...staffNeededIconArr3, staffNeededIcon]);

      setShiftFeeIconArr3([...shiftFeeIconArr3, shiftFeeIcon]);

      setStaffStartTimeIconArr3([
        ...staffStartTimeIconArr3,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArr3([...staffEndTimeIconArr2, staffEndTimeIcon]);

      setShiftRoleDescriptionIconArr3([
        ...shiftRoleDescriptionIconArr3,
        jobDecArr[2],
      ]);

      setStaffStartDateIconArr3([...staffStartDateIconArr3, startDateArr[2]]);

      setStaffEndDateIconArr3([...staffEndDateIconArr3, endDateArr[2]]);

      setShiftAddressIconArr3([...shiftAddressIconArr3, jobAddressArr[2]]);

      setShiftLatIconArr3([...shiftLatIconArr3, jobLatArr[2]]);

      setShiftLongIconArr3([...shiftLongIconArr3, jobLongArr[2]]);

      ////////////////////////////////////////////FINAL ARRAY//////////////////////////////////////

      setShiftRateIconArrFinal([...shiftRateIconArrFinal, shiftRateIconArr]);

      setShiftOrderIdIconArrFinal([...shiftOrderIdIconArrFinal, orderIDArr[2]]);

      setShiftRoleTitleIconArrFinal([
        ...shiftRoleTitleIconArrFinal,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArrFinal([...staffNeededIconArrFinal, staffNeededIcon]);

      setShiftRoleIconArrFinal([...shiftRoleIconArrFinal, shiftRoleIcon]);

      setShiftFeeIconArrFinal([...shiftFeeIconArrFinal, shiftFeeIcon]);

      setStaffStartTimeIconArrFinal([
        ...staffStartTimeIconArrFinal,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArrFinal([
        ...staffEndTimeIconArrFinal,
        staffEndTimeIcon,
      ]);

      setShiftRoleDescriptionIconArrFinal([
        ...shiftRoleDescriptionIconArrFinal,
        jobDecArr[2],
      ]);

      setStaffStartDateIconArrFinal([
        ...staffStartDateIconArrFinal,
        startDateArr[2],
      ]);

      setStaffEndDateIconArrFinal([...staffEndDateIconArrFinal, endDateArr[2]]);

      setShiftAddressIconArrFinal([
        ...shiftAddressIconArrFinal,
        jobAddressArr[2],
      ]);

      setShiftLatIconArrFinal([...shiftLatIconArrFinal, jobLatArr[2]]);

      setShiftLongIconArrFinal([...shiftLongIconArrFinal, jobLongArr[2]]);

      ///////////////////////////////////////////////////////////////////////////////////////////

      setShiftRoleIcon('');
      setShiftRoleTitleIcon('');
      setStaffNeededIcon('');
      setShiftFeeIcon('');
      setStaffStartTimeIcon('');
      setStaffEndTimeIcon('');
    }
  };

  const saveDetailsFourthFunc = () => {
    if (shiftRoleIcon == '') {
      alert('Please select the shift role');
    }
    else if (staffStartTimeIcon == '') {
      alert('Please select the start time');
    }
    else if (staffEndTimeIcon == '') {
      alert('Please select the end time');
    }
    else if (staffNeededIcon == '') {
      alert('Please enter the quantity needed');
    }
    else if (shiftFeeIcon == '') {
      alert('Please enter the shift fee');
    } else {
      setFourthShiftRolesCount(fourthShiftRolesCount + 1);
      setCheckShiftFourthRoles(!checkShiftFourthRoles);
      setNextShifts(nextShifts + 1);

      setShiftRateIconArr4([...shiftRateIconArr4, shiftRateIconArr]);

      setShiftOrderIdIconArr4([...shiftOrderIdIconArr4, orderIDArr[3]]);

      setShiftRoleIconArr4([...shiftRoleIconArr4, shiftRoleIcon]);

      setShiftRoleTitleIconArr4([
        ...shiftRoleTitleIconArr4,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArr4([...staffNeededIconArr4, staffNeededIcon]);

      setShiftFeeIconArr4([...shiftFeeIconArr4, shiftFeeIcon]);

      setStaffStartTimeIconArr4([
        ...staffStartTimeIconArr4,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArr4([...staffEndTimeIconArr4, staffEndTimeIcon]);

      setShiftRoleDescriptionIconArr4([
        ...shiftRoleDescriptionIconArr4,
        jobDecArr[3],
      ]);

      setStaffStartDateIconArr4([...staffStartDateIconArr4, startDateArr[3]]);

      setStaffEndDateIconArr4([...staffEndDateIconArr4, endDateArr[3]]);

      setShiftAddressIconArr4([...shiftAddressIconArr4, jobAddressArr[3]]);

      setShiftLatIconArr4([...shiftLatIconArr4, jobLatArr[3]]);

      setShiftLongIconArr4([...shiftLongIconArr4, jobLongArr[3]]);

      ////////////////////////////////////////////FINAL ARRAY//////////////////////////////////////

      setShiftRateIconArrFinal([...shiftRateIconArrFinal, shiftRateIconArr]);

      setShiftOrderIdIconArrFinal([...shiftOrderIdIconArrFinal, orderIDArr[3]]);

      setShiftRoleTitleIconArrFinal([
        ...shiftRoleTitleIconArrFinal,
        shiftRoleTitleIcon,
      ]);

      setStaffNeededIconArrFinal([...staffNeededIconArrFinal, staffNeededIcon]);

      setShiftRoleIconArrFinal([...shiftRoleIconArrFinal, shiftRoleIcon]);

      setShiftFeeIconArrFinal([...shiftFeeIconArrFinal, shiftFeeIcon]);

      setStaffStartTimeIconArrFinal([
        ...staffStartTimeIconArrFinal,
        staffStartTimeIcon,
      ]);

      setStaffEndTimeIconArrFinal([
        ...staffEndTimeIconArrFinal,
        staffEndTimeIcon,
      ]);

      setShiftRoleDescriptionIconArrFinal([
        ...shiftRoleDescriptionIconArrFinal,
        jobDecArr[3],
      ]);

      setStaffStartDateIconArrFinal([
        ...staffStartDateIconArrFinal,
        startDateArr[3],
      ]);

      setStaffEndDateIconArrFinal([...staffEndDateIconArrFinal, endDateArr[3]]);

      setShiftAddressIconArrFinal([
        ...shiftAddressIconArrFinal,
        jobAddressArr[3],
      ]);

      setShiftLatIconArrFinal([...shiftLatIconArrFinal, jobLatArr[3]]);

      setShiftLongIconArrFinal([...shiftLongIconArrFinal, jobLongArr[3]]);

      ///////////////////////////////////////////////////////////////////////////////////////////

      setShiftRoleIcon('');
      setShiftRoleTitleIcon('');
      setStaffNeededIcon('');
      setShiftFeeIcon('');
      setStaffStartTimeIcon('');
      setStaffEndTimeIcon('');
    }
  };

  const _showModalShiftsFirst = (index) => {
    setVissibleShiftsIndexFirst(index);
    setVissibleShiftsFirst(true);
  };

  const _showModalShiftsSecond = (index) => {
    setVissibleShiftsIndexSecond(index);
    setVissibleShiftsSecond(true);
  };

  const _showModalShiftsThird = (index) => {
    setVissibleShiftsIndexThird(index);
    setVissibleShiftsThird(true);
  };

  const _showModalShiftsFourth = (index) => {
    setVissibleShiftsIndexFourth(index);
    setVissibleShiftsFourth(true);
  };

  const createJob = async (values) => {
    setLoading(false);
    let jobName = values.jobname;

    let clientname = values.clientname;
    let jobdescription = values.jobdescription;

    let data = new FormData();

    data.append('title', jobName);

    data.append('client_name', clientname);

    data.append('description', jobdescription);

    data.append(
      'logo',
      logoImage == null || logoImage == undefined ? '' : logoImage?.base64,
    );
    data.append('expiry_date', ExpireDate);

    data.append('client_status', isClientPublicPrivate);

    data.append('job_status', isJobPublicPrivate);

    for (var i = 0; i < jobFeeArr?.length; i++) {
      data.append('job_shift[' + i + '][order_id]', orderIDArr[i]);
      data.append('job_shift[' + i + '][title]', jobRoleTitleArr[i]);
      data.append('job_shift[' + i + '][no_of_staff]', staffShiftArr[i]);
      data.append('job_shift[' + i + '][job_role_id]', jobRoleArr[i]);
      data.append('job_shift[' + i + '][job_fee]', jobFeeArr[i]);
      data.append('job_shift[' + i + '][izero_fee]', 8);
      data.append('job_shift[' + i + '][taxes]', '123');
      data.append(
        'job_shift[' + i + '][rate_type]',
        //jobRateArr[i]
        '',
      );
      data.append('job_shift[' + i + '][start_time]', startTimeArr[i]);
      data.append('job_shift[' + i + '][end_time]', endTimeArr[i]);
      data.append('job_shift[' + i + '][job_role_description]', jobDecArr[i]);
      data.append('job_shift[' + i + '][start_date]', startDateArr[i]);
      data.append('job_shift[' + i + '][end_date]', endDateArr[i]);
      data.append('job_shift[' + i + '][address_data]', jobAddressArr[i]);
      data.append('job_shift[' + i + '][latitude]', jobLatArr[i]);
      data.append('job_shift[' + i + '][longitude]', jobLongArr[i]);
    }

    let count = jobFeeArr?.length;

    for (var k = 0; k < nextShifts; k++) {
      data.append(
        'job_shift[' + parseInt(count + k) + '][order_id]',
        shiftOrderIdIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][title]',
        shiftRoleTitleIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][no_of_staff]',
        staffNeededIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][job_role_id]',
        shiftRoleIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][job_fee]',
        shiftFeeIconArrFinal[k],
      );
      data.append('job_shift[' + parseInt(count + k) + '][izero_fee]', 8);
      data.append('job_shift[' + parseInt(count + k) + '][taxes]', '123');
      data.append(
        'job_shift[' + parseInt(count + k) + '][rate_type]',
        shiftRateIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][start_time]',
        staffStartTimeIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][end_time]',
        staffEndTimeIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][job_role_description]',
        shiftRoleDescriptionIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][start_date]',
        staffStartDateIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][end_date]',
        staffEndDateIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][address_data]',
        shiftAddressIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][latitude]',
        shiftLatIconArrFinal[k],
      );
      data.append(
        'job_shift[' + parseInt(count + k) + '][longitude]',
        shiftLongIconArrFinal[k],
      );
    }

    console.log({data});

    // if (
    //   jobName == '' ||
    //   jobName == undefined ||
    //   clientname == '' ||
    //   clientname == undefined ||
    //   jobdescription == '' ||
    //   jobdescription == undefined ||
    //   //ExpireDate == '' ||
    //   finialaddShifts < 1
    // ) {
    //   setLoading(true);
    //   alert('Kindly fill all job information fields');
    // }

    if (jobName == '' || jobName == undefined) {
      setLoading(true);
      alert('Please enter the job name');
    } else if (clientname == '' || clientname == undefined) {
      setLoading(true);
      alert('Please enter the client name');
    } else if (jobdescription == '' || jobdescription == undefined) {
      setLoading(true);
      alert('Please enter the job role description');
    } else if (finialaddShifts < 1) {
      setLoading(true);
      alert('Please enter the job shift');
    } else {
      try {
        let res = await Api.post('/create_job', data, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Create job API response', res);
        setLoading(true);
        dispatch({
          type: types.CREATE_JOB_ID,
          createJobID: res?.data?.job_id,
        });
        Alert.alert('', 'Job created successfully', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('QuoteClient', {jobID: res?.data?.job_id}),
          },
        ]);
      } catch (error) {
        alert('Something went wrong please try again later');
        setLoading(true);
        console.log({error});
      }
    }
  };

  return (
    <Container safeArea={true} fixedHeight={true}>
      <>
        <CreateJobHeader backButton={() => navigation.goBack()}>
          Create Job
        </CreateJobHeader>
        <View style={{marginBottom: 10}}>
          <Formik
            onSubmit={(values) => createJob(values)}
            initialValues={{star: true}}>
            {(props) => {
              return (
                <Form showsVerticalScrollIndicator={false}>
                  <Heading>Job Details</Heading>
                  <MyInput
                    label="Job Name"
                    name="jobname"
                    type="jobname"
                    placeholder="Enter job name"
                    placeholderTextColor={colors.darkWhiteLow}
                  />

                  <MyInput
                    label="Client Name"
                    name="clientname"
                    type="clientname"
                    placeholder="Enter client name"
                    placeholderTextColor={colors.darkWhiteLow}
                  />

                  <Text
                    style={{
                      marginTop: 20,
                      fontFamily: 'Europa',
                      fontSize: RFValue(18, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      lineHeight: 24,
                      letterSpacing: 0,
                      color: colors.darkGrey,
                    }}>
                    Upload client logo (if required)
                  </Text>

                  <Button
                    onPress={() => selectPhotoFromLibaray()}
                    textStyle={[styles.btnText, {color: colors.pureBlack}]}
                    style={styles.button}>
                    SELECT IMAGE
                  </Button>

                  {logoImage ? (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {logoImage?.uri ? (
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <Image
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 10,
                                marginBottom: heightPercentageToDP('2%'),
                                marginTop: 10,
                                marginRight: -10,
                              }}
                              source={{uri: logoImage?.uri}}
                            />
                            <View
                              style={{
                                backgroundColor: colors.darkBlue,
                                borderRadius: 20,
                                width: 20,
                                height: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 3,
                              }}>
                              <TouchableOpacity
                                onPress={() => setLogoImage('')}>
                                <IconCross
                                  name="cross"
                                  size={15}
                                  color={colors.pureWhite}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </>
                  ) : null}

                  <MyInput
                    label="Main Job Description"
                    name="jobdescription"
                    type="jobdescription"
                    placeholder="Add main job description"
                    placeholderTextColor={colors.darkWhiteLow}
                  />

                  {addShifts ? null : (
                    <Button
                      onPress={() => addShiftFunc()}
                      textStyle={[styles.btnText, {color: colors.pureWhite}]}
                      style={styles.buttonGetQuote}>
                      Add New Shift
                    </Button>
                  )}

                  {addShifts ? (
                    <>
                      <View>
                        <Heading>Shift(s)</Heading>

                        <View
                          style={{
                            marginTop: 20,
                            width: widthPercentageToDP(80),
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa',
                              fontSize: 15,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkGrey,
                              width: widthPercentageToDP(80),
                            }}>
                            Shift Title
                          </Text>

                          <TextInput
                            underlineColorAndroid="#D0D2D0"
                            onChangeText={(value) => setJobTitle(value)}
                            placeholder="Enter shift title"
                            placeholderTextColor={colors.darkWhiteLow}
                            style={{
                              flex: 1,
                              height: heightPercentageToDP('5.5%'),
                              fontFamily: 'Europa',
                              fontSize: Platform.OS === 'ios' ? 17 : 17,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              width: widthPercentageToDP(80),
                              borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                              borderBottomColor:
                                Platform.OS === 'ios' ? '#D0D2D0' : null,
                              color: colors.darkBlue,
                              marginTop: 10,
                            }}
                          />
                        </View>

                        <View>
                          <Text
                            style={{
                              fontFamily: 'Europa',
                              fontSize: 15,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              marginTop: Platform.OS === 'ios' ? 20 : 5,
                              color: colors.darkGrey,
                              width: widthPercentageToDP(80),
                              marginBottom: Platform.OS === 'ios' ? 5 : 15,
                            }}>
                            Shift Location
                          </Text>

                          <TouchableHighlight
                            underlayColor=""
                            style={{
                              width: widthPercentageToDP(80),
                              paddingBottom: 15,
                              borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                              borderColor:
                                Platform.OS === 'ios' ? '#e0e3eb' : '#e0e3eb',
                            }}
                            onPress={() => setVissibleAddress(true)}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: 15,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: jobAddress
                                  ? colors.darkBlue
                                  : colors.darkWhiteLow,
                                marginTop: 5,
                              }}>
                              {jobAddress ? jobAddress : 'Search location'}
                            </Text>
                          </TouchableHighlight>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: widthPercentageToDP(80),
                            marginTop: Platform.OS === 'ios' ? 0 : 20,
                          }}>
                          <View
                            style={{
                              width: widthPercentageToDP(40),
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: 15,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                marginTop: Platform.OS === 'ios' ? 20 : 5,
                                color: colors.darkGrey,
                              }}>
                              Start Date
                            </Text>

                            <TouchableOpacity
                              onPress={() => setshowStartDatePicker(true)}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  width: widthPercentageToDP(38),
                                }}>
                                <Dropdown
                                  value={startDate}
                                  placeholder="Start date"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  style={{
                                    flex: 1,
                                    height: 40,
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP(38),
                                  }}
                                  pickerStyle={{marginTop: 10, marginLeft: 15}}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(10),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              width: widthPercentageToDP(40),
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: 15,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                marginTop: Platform.OS === 'ios' ? 20 : 5,
                                color: colors.darkGrey,
                              }}>
                              End Date
                            </Text>

                            <TouchableOpacity
                              onPress={() => setshowEndDatePicker(true)}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  width: widthPercentageToDP(38),
                                  marginLeft: 5,
                                }}>
                                <Dropdown
                                  value={endDate}
                                  placeholder="End date"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  style={{
                                    height: 40,
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP(38),
                                  }}
                                  pickerStyle={{
                                    marginTop: 10,
                                    marginLeft: 15,
                                    color: colors.darkBlue,
                                  }}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(10),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View
                          style={{
                            marginTop: 20,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa',
                              fontSize: 15,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkGrey,
                              width: widthPercentageToDP(80),
                            }}>
                            Quantity Needed
                          </Text>

                          <TextInput
                            underlineColorAndroid="#D0D2D0"
                            onChangeText={(value) => setStaffShift(value)}
                            placeholderTextColor={colors.darkWhiteLow}
                            placeholder="Enter quantity needed"
                            keyboardType="number-pad"
                            style={{
                              flex: 1,
                              height: heightPercentageToDP('5.5%'),
                              fontFamily: 'Europa',
                              fontSize: Platform.OS === 'ios' ? 17 : 17,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              width: widthPercentageToDP(80),
                              borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                              borderBottomColor:
                                Platform.OS === 'ios' ? '#D0D2D0' : null,
                              color: colors.darkBlue,
                              marginTop: 10,
                            }}
                          />
                        </View>

                        <Text
                          style={{
                            fontFamily: 'Europa',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            marginTop: Platform.OS === 'ios' ? 20 : 5,
                            color: colors.darkGrey,
                            width: widthPercentageToDP(80),
                          }}>
                          Shift Role
                        </Text>

                        <DropDownPicker
                          searchable={true}
                          loading={loadingDropDown}
                          open={open}
                          value={value}
                          items={items}
                          setOpen={setOpen}
                          setValue={setValue}
                          showTickIcon={false}
                          dropDownDirection={'BOTTOM'}
                          zIndex={1000}
                          zIndexInverse={1000}
                          onChangeValue={(item) => {
                            setjobRole(item?.value);
                            setShiftRoleTitle(item?.label);
                          }}
                          activityIndicatorColor={colors.green}
                          searchPlaceholder="Search..."
                          placeholder="Select Shift Role"
                          placeholderStyle={{
                            color: colors.darkWhiteLow,
                          }}
                          style={{
                            width: widthPercentageToDP(80),
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ABB1BB',
                          }}
                          selectedItemLabelStyle={{
                            color: colors.green,
                          }}
                          searchTextInputProps={{
                            borderWidth: 0.5,
                            borderColor: 'rgb(193,193,193)',
                            underlineColorAndroid: 'transparent',
                            height: Platform.OS === 'ios' ? 30 : 30,
                          }}
                          scrollViewProps={true}
                          containerStyle={{
                            height: 40,
                            width: widthPercentageToDP(80),
                          }}
                          ArrowUpIconComponent={() => (
                            <IconArrow
                              name="chevron-up"
                              size={24}
                              color={colors.green}
                            />
                          )}
                          ArrowDownIconComponent={() => (
                            <IconArrow
                              name="chevron-down"
                              size={24}
                              color={colors.green}
                            />
                          )}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: widthPercentageToDP(80),
                            marginTop: Platform.OS === 'ios' ? 0 : 20,
                          }}>
                          <View
                            style={{
                              width: widthPercentageToDP(40),
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: 15,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                marginTop: Platform.OS === 'ios' ? 20 : 5,
                                color: colors.darkGrey,
                              }}>
                              Start Time
                            </Text>

                            <TouchableOpacity
                              onPress={() => setshowStartTimePicker(true)}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  width: widthPercentageToDP(38),
                                }}>
                                <Dropdown
                                  value={startTime}
                                  placeholder="Start time"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  style={{
                                    flex: 1,
                                    height: 40,
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP(38),
                                  }}
                                  pickerStyle={{marginTop: 10, marginLeft: 15}}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(10),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              width: widthPercentageToDP(40),
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa',
                                fontSize: 15,
                                fontWeight: 'normal',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                marginTop: Platform.OS === 'ios' ? 20 : 5,
                                color: colors.darkGrey,
                              }}>
                              End Time
                            </Text>

                            <TouchableOpacity
                              onPress={() => setshowEndTimePicker(true)}>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  width: widthPercentageToDP(38),
                                  marginLeft: 5,
                                }}>
                                <Dropdown
                                  value={endTime}
                                  placeholder="End time"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  style={{
                                    height: 40,
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP(38),
                                  }}
                                  pickerStyle={{
                                    marginTop: 10,
                                    marginLeft: 15,
                                    color: colors.darkBlue,
                                  }}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(10),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View
                          style={{
                            justifyContent: 'space-between',
                            marginTop: Platform.OS === 'ios' ? 0 : 10,
                            width: widthPercentageToDP(80),
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa',
                              fontSize: 15,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              marginTop: Platform.OS === 'ios' ? 20 : 5,
                              color: colors.darkGrey,
                              width: widthPercentageToDP(80),
                            }}>
                            Shift Fee
                          </Text>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              width: widthPercentageToDP(80),
                            }}>
                            <Dropdown
                              // data={jobFeeData}
                              data={jobFees}
                              placeholder="Select shift fee"
                              placeholderTextColor={colors.darkWhiteLow}
                              onChangeText={(item, value) => {
                                //setJobFee(item);
                                setJobFee(
                                  totalHours.split(' ')[0] *
                                    Number(item) *
                                    Number(staffShift),
                                );
                                setTotalFee(
                                  totalHours.split(' ')[0] *
                                    Number(item) *
                                    Number(staffShift),
                                );
                                setVissibleFirstShiftFee(
                                  item === 0 ? true : false,
                                );
                                setJobRate(jobFeeData[value]?.label);
                              }}
                              style={{
                                height: 40,
                                flex: 1,
                                backgroundColor: colors.pureWhite,
                                width: widthPercentageToDP(80),
                                marginTop: 20,
                              }}
                              pickerStyle={{marginTop: 10, marginLeft: 15}}
                            />
                            <FontAwesome5
                              style={styles.downIcon}
                              name="angle-down"
                              size={20}
                              color="#3EB561"
                            />
                          </View>
                        </View>

                        {vissibleFirstShiftFee ? (
                          <>
                            <View style={{}}>
                              <View style={{width: widthPercentageToDP(80)}}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    marginTop: Platform.OS === 'ios' ? 20 : 5,
                                    color: colors.darkGrey,
                                    width: widthPercentageToDP(80),
                                    marginBottom:
                                      Platform.OS === 'ios' ? 10 : 0,
                                  }}>
                                  Rate per hour
                                </Text>
                                <TextInput
                                  placeholder="£0.00"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  underlineColorAndroid="#D0D2D0"
                                  keyboardType="numeric"
                                  returnKeyType="done"
                                  underlineColorAndroid="transparent"
                                  onChangeText={(value) => {
                                    setJobFee(
                                      totalHours.split(' ')[0] *
                                        Number(value) *
                                        Number(staffShift),
                                    );
                                    setTotalFee(
                                      totalHours.split(' ')[0] *
                                        Number(value) *
                                        Number(staffShift),
                                    );
                                  }}
                                  style={{
                                    flex: 1,
                                    paddingBottom: 15,
                                    fontSize: Platform.OS === 'ios' ? 17 : 17,
                                    borderBottomWidth:
                                      Platform.OS === 'ios' ? 1 : 1,
                                    borderColor:
                                      Platform.OS === 'ios'
                                        ? 'rgb(193,193,193)'
                                        : 'rgb(193,193,193)',
                                    color: colors.darkBlue,
                                  }}
                                />
                              </View>
                            </View>
                          </>
                        ) : null}

                        <Text
                          style={{
                            marginTop: 20,
                            fontFamily: 'Europa',
                            fontSize: RFValue(18, 812),
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 24,
                            letterSpacing: 0,
                            color: '#3EB561',
                            width: widthPercentageToDP(80),
                          }}>
                          Total Time: {totalHours}
                        </Text>

                        {totalFee ? (
                          <Text
                            style={{
                              marginTop: 20,
                              fontFamily: 'Europa',
                              fontSize: RFValue(18, 812),
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              lineHeight: 24,
                              letterSpacing: 0,
                              color: '#3EB561',
                              width: widthPercentageToDP(80),
                            }}>
                            Total Fee Per Day: {'£' + jobFee}
                          </Text>
                        ) : null}

                        <View
                          style={{
                            marginTop: 30,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Europa',
                              fontSize: 15,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              color: colors.darkGrey,
                              width: widthPercentageToDP(80),
                            }}>
                            Shift Role Description
                          </Text>

                          <TextInput
                            underlineColorAndroid="#D0D2D0"
                            onChangeText={(value) => setJobDec(value)}
                            placeholderTextColor={colors.darkWhiteLow}
                            placeholder="Enter shift role description"
                            style={{
                              flex: 1,
                              height: heightPercentageToDP('6.5%'),
                              fontFamily: 'Europa',
                              fontSize: Platform.OS === 'ios' ? 17 : 17,
                              fontWeight: 'normal',
                              fontStyle: 'normal',
                              letterSpacing: 0,
                              width: widthPercentageToDP(80),
                              borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
                              borderBottomColor:
                                Platform.OS === 'ios' ? '#D0D2D0' : null,
                              color: colors.darkBlue,
                              marginTop: 10,
                            }}
                          />
                        </View>

                        <Button
                          disabled={
                            staffShift == '' ||
                            jobRole == '' ||
                            jobFee == '' ||
                            startTime == '' ||
                            endTime == '' ||
                            startDate == '' ||
                            endDate == '' ||
                            jobDec == ''
                              ? true
                              : false
                          }
                          onPress={() => AddMoreShifts(finialaddShifts + 1)}
                          textStyle={[
                            styles.btnText,
                            {color: colors.pureWhite},
                          ]}
                          style={{
                            width: widthPercentageToDP('84.6'),
                            borderRadius: widthPercentageToDP('12.8%') / 2,
                            marginTop: heightPercentageToDP('3%'),
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:
                              staffShift == '' ||
                              jobRole == '' ||
                              jobFee == '' ||
                              startTime == '' ||
                              endTime == '' ||
                              startDate == '' ||
                              endDate == '' ||
                              jobDec == ''
                                ? 'grey'
                                :
                              '#3EB561',
                          }}>
                          Add Shift
                        </Button>
                      </View>
                    </>
                  ) : null}

                  {/* Adding Shifts */}
                  {/* First Shifts */}
                  {firstShiftCount === 1 ? (
                    <View
                      style={{
                        width: widthPercentageToDP(80),
                        marginTop: 20,
                        borderWidth: 0.5,
                        borderColor: '#d5d7dc',
                        alignSelf: 'center',
                        borderRadius: 10,
                        paddingBottom: 20,
                        padding: 10,
                      }}>
                      <>
                        {firstShiftCount === 1 ? (
                          <>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Title:
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {jobRoleTitleArr[0]}
                              </Text>
                            </View>

                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 10,
                                marginLeft: 15,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Date:
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {startDateArr[0] + ' - ' + endDateArr[0]}
                              </Text>
                            </View>
                          </>
                        ) : null}

                        {firstShiftCount === 1 ? (
                          <>
                            <FlatList
                              data={test}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item, index}) => {
                                return (
                                  <TouchableOpacity
                                    style={{
                                      borderWidth: 1,
                                      width: '95%',
                                      borderRadius: 10,
                                      borderColor: '#d5d7dc',
                                      padding: 10,
                                      marginTop: 20,
                                      alignSelf: 'center',
                                    }}
                                    onPress={() => setVissibleFirstShift(true)}>
                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Role:
                                        </Text>
                                      </View>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                          }}>
                                          {shiftRoleTitle}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Quantity Needed:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                          }}>
                                          {staffShiftArr[0]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Fee:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                          }}>
                                          {'£' + jobFeeArr[0]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Time:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                          }}>
                                          {startTimeArr[0] +
                                            ' - ' +
                                            endTimeArr[0]}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}
                            />

                            <Modal
                              transparent
                              animationType="fade"
                              visible={vissibleFirstShift}>
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
                                        ? heightPercentageToDP(68)
                                        : heightPercentageToDP(88),
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP('85%'),
                                    borderWidth: 5,
                                    borderColor: '#24334c',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                  }}>
                                  <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    bounces={true}
                                    style={{
                                      flex: 1,
                                    }}>
                                    {Platform.OS === 'ios' ? (
                                      <TouchableWithoutFeedback
                                        onPress={() =>
                                          setVissibleFirstShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableWithoutFeedback>
                                    ) : (
                                      <TouchableOpacity1
                                        onPress={() =>
                                          setVissibleFirstShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableOpacity1>
                                    )}

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
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                        }}>
                                        Shift Details
                                      </Text>
                                    </View>

                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 17,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: '#24334c',
                                        marginTop:
                                          Platform.OS === 'ios' ? 10 : 10,
                                        marginLeft: '5%',
                                      }}>
                                      Shift Location
                                    </Text>
                                    <TextInput
                                      style={{
                                        width: '90%',
                                        paddingLeft:
                                          Platform.OS === 'ios' ? 0 : 0,
                                        marginTop:
                                          Platform.OS === 'ios' ? 5 : 0,
                                        paddingBottom:
                                          Platform.OS === 'ios' ? 5 : 5,
                                        alignSelf: 'center',
                                        borderBottomWidth:
                                          Platform.OS === 'ios' ? 1 : 1,
                                        borderBottomColor:
                                          Platform.OS === 'ios'
                                            ? '#24334c'
                                            : '#24334c',
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.darkBlue,
                                      }}
                                      multiline={true}
                                      underlineColorAndroid="transparent"
                                      editable={false}
                                      placeholder={jobAddressArr[0]}
                                      placeholderTextColor={colors.pureBlack}
                                    />

                                    <View
                                      style={{
                                        marginTop: 20,
                                        marginLeft: 10,
                                        marginRight: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Quantity Needed
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        multiline={true}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={staffShiftArr[0]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Role
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={shiftRoleTitleArr[0]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Fee
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobFeeArr[0]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Date
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startDateArr[0] +
                                          ' - ' +
                                          endDateArr[0]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Time
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startTimeArr[0] +
                                          ' - ' +
                                          endTimeArr[0]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Job Role Description
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobDecArr[0]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                    </View>
                                  </ScrollView>
                                </View>
                              </View>
                            </Modal>
                          </>
                        ) : null}

                        {firstShiftCount === 1 ? (
                          <FlatList
                            data={staffNeededIconArr1}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={{
                                    borderWidth: 1,
                                    width: '95%',
                                    borderRadius: 10,
                                    borderColor: '#d5d7dc',
                                    padding: 10,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                  }}
                                  onPress={() => _showModalShiftsFirst(index)}>
                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Role:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftRoleTitleIconArr1[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Quantity Needed:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffNeededIconArr1[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Fee:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftFeeIconArr1[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Time:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffStartTimeIconArr1[index] +
                                          ' - ' +
                                          staffEndTimeIconArr1[index]}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        ) : null}

                        {/* START Shitf Roles */}
                        {firstShiftCount === 1 && firstShiftRolesCount < 3 ? (
                          //&&checkFirst === true
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              marginTop: 10,
                              width: '90%',
                              alignContent: 'center',
                              alignSelf: 'center',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Add New Role
                              {/* {jobRoleTitleArr[0]} */}
                            </Text>

                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                flex: 1,
                                backgroundColor: checkShiftFirstRoles
                                  ? colors.red
                                  : colors.green,
                              }}
                              onPress={() => plusMoreFirstFunc()}>
                              {checkShiftFirstRoles ? (
                                <Icon
                                  name="cross"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              ) : (
                                <Icon
                                  name="plus"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        ) : null}

                        {checkShiftFirstRoles ? (
                          <>
                            {vissibleShiftFirstRoles ? (
                              <View
                                style={{
                                  backgroundColor: colors.pureWhite,
                                  borderWidth: 0.8,
                                  borderColor: '#d5d7dc',
                                  paddingRight: 20,
                                  paddingLeft: 20,
                                  paddingTop: 20,
                                  paddingBottom: 20,
                                  borderRadius: 10,
                                  marginTop: 10,
                                }}>
                                <View>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    Shift Role
                                  </Text>
                                </View>

                                <DropDownPicker
                                  searchable={true}
                                  loading={loadingDropDown}
                                  open={open}
                                  value={value}
                                  items={items}
                                  setOpen={setOpen}
                                  setValue={setValue}
                                  showTickIcon={false}
                                  dropDownDirection={'BOTTOM'}
                                  zIndex={1000}
                                  zIndexInverse={1000}
                                  onChangeValue={(item) => {
                                    setShiftRoleIcon(item?.value);
                                    setShiftRoleTitleIcon(item?.label);
                                  }}
                                  activityIndicatorColor={colors.green}
                                  searchPlaceholder="Search..."
                                  placeholder="Select Shift Role"
                                  placeholderStyle={{
                                    color: colors.darkWhiteLow,
                                  }}
                                  style={{
                                    width: widthPercentageToDP(66),
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ABB1BB',
                                  }}
                                  selectedItemLabelStyle={{
                                    color: colors.green,
                                  }}
                                  searchTextInputProps={{
                                    borderWidth: 0.5,
                                    borderColor: 'rgb(193,193,193)',
                                    underlineColorAndroid: 'transparent',
                                    height: Platform.OS === 'ios' ? 30 : 30,
                                  }}
                                  scrollViewProps={true}
                                  containerStyle={{
                                    height: 40,
                                    width: widthPercentageToDP(66),
                                  }}
                                  ArrowUpIconComponent={() => (
                                    <IconArrow
                                      name="chevron-up"
                                      size={24}
                                      color={colors.green}
                                    />
                                  )}
                                  ArrowDownIconComponent={() => (
                                    <IconArrow
                                      name="chevron-down"
                                      size={24}
                                      color={colors.green}
                                    />
                                  )}
                                />

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    marginTop: Platform.OS === 'ios' ? 0 : 20,
                                  }}>
                                  <View style={{}}>
                                    <Text
                                      style={{
                                        marginTop: 20,
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.darkGrey,
                                      }}>
                                      Start Time
                                    </Text>

                                    <TouchableOpacity
                                      onPress={() =>
                                        setShowStartTimePickerIcon(true)
                                      }>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                        }}>
                                        <Dropdown
                                          value={staffStartTimeIcon}
                                          style={{
                                            width: widthPercentageToDP(30),
                                            height: 30,
                                            backgroundColor: colors.pureWhite,
                                            color: colors.darkBlue,
                                          }}
                                          pickerStyle={{
                                            marginTop: 20,
                                            marginLeft: 10,
                                          }}
                                        />
                                        <FontAwesome5
                                          style={{
                                            zIndex: 5,
                                            position: 'absolute',
                                            right: widthConverter(2),
                                          }}
                                          name="angle-down"
                                          size={20}
                                          color="#3EB561"
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </View>

                                  <View style={{}}>
                                    <Text
                                      style={{
                                        marginTop: 20,
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.darkGrey,
                                      }}>
                                      End Time
                                    </Text>

                                    <TouchableOpacity
                                      onPress={() =>
                                        setShowEndTimePickerIcon(true)
                                      }>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          marginLeft: 5,
                                        }}>
                                        <Dropdown
                                          value={staffEndTimeIcon}
                                          style={{
                                            width: widthPercentageToDP(30),
                                            height: 30,
                                            backgroundColor: colors.pureWhite,
                                          }}
                                          pickerStyle={{
                                            marginTop: 20,
                                            marginLeft: 10,
                                          }}
                                        />
                                        <FontAwesome5
                                          style={{
                                            zIndex: 5,
                                            position: 'absolute',
                                            right: widthConverter(2),
                                          }}
                                          name="angle-down"
                                          size={20}
                                          color="#3EB561"
                                        />
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    marginTop: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    Quantity Needed
                                  </Text>

                                  <TextInput
                                    underlineColorAndroid="#D0D2D0"
                                    placeholder="Enter quantity needed"
                                    placeholderTextColor={colors.darkWhiteLow}
                                    onChangeText={(value) =>
                                      setStaffNeededIcon(value)
                                    }
                                    placeholderTextColor={colors.darkWhiteLow}
                                    keyboardType="number-pad"
                                    style={{
                                      flex: 1,
                                      height: heightPercentageToDP('5%'),
                                      fontFamily: 'Europa',
                                      fontSize: Platform.OS === 'ios' ? 17 : 17,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      width: '100%',
                                      borderBottomWidth:
                                        Platform.OS === 'ios' ? 1 : 0,
                                      borderBottomColor:
                                        Platform.OS === 'ios'
                                          ? '#D0D2D0'
                                          : null,
                                      color: colors.darkBlue,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    Shift Fee
                                  </Text>

                                  <Dropdown
                                    // data={jobFeeData}
                                    data={jobFees}
                                    onChangeText={(item, value) => {
                                      // setShiftFeeIcon(item);
                                      // setShiftRateIconArr(item);
                                      {
                                        setShiftFeeIcon(
                                          totalHours.split(' ')[0] *
                                            Number(item) *
                                            Number(staffNeededIcon),
                                        );
                                        setTotalFee(
                                          totalHours.split(' ')[0] *
                                            Number(item) *
                                            Number(staffNeededIcon),
                                        );
                                        setShiftRateIconArr(
                                          totalHours.split(' ')[0] *
                                            Number(item) *
                                            Number(staffNeededIcon),
                                        );
                                      }

                                      setVissibleFirstShiftFee(
                                        item === 0 ? true : false,
                                      );
                                    }}
                                    style={{
                                      width: widthPercentageToDP(65),
                                      height: 30,
                                      backgroundColor: colors.pureWhite,
                                    }}
                                    pickerStyle={{
                                      marginTop: 20,
                                      marginLeft: 10,
                                    }}
                                  />
                                  <FontAwesome5
                                    style={{
                                      zIndex: 5,
                                      position: 'absolute',
                                      right: widthConverter(2),
                                      top: heightConverter(25),
                                    }}
                                    name="angle-down"
                                    size={20}
                                    color="#3EB561"
                                  />
                                </View>

                                {/* fegrjebnjk */}
                                {/* {vissibleFirstShiftFee ? (
                                  <>
                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        marginTop:
                                          Platform.OS === 'ios' ? 20 : 5,
                                        color: colors.darkGrey,
                                      }}>
                                      Rate
                                    </Text>

                                    <View
                                      style={{
                                        flex: 1,
                                        width: '100%',
                                        flexDirection: 'row',
                                      }}>
                                      <Dropdown
                                        data={jobRateData}
                                        onChangeText={(item) => {
                                          setShiftRateIconArr(item);
                                        }}
                                        style={{
                                          height: 40,
                                          flex: 1,
                                          width: widthPercentageToDP(65),
                                          backgroundColor: colors.pureWhite,
                                        }}
                                        pickerStyle={{
                                          marginTop: 10,
                                          marginLeft: 15,
                                        }}
                                      />
                                      <View
                                        style={{
                                          paddingTop: 5,
                                          borderBottomWidth: 0.7,
                                          borderBottomColor: colors.darkGreyLow,
                                          marginBottom: 0.5,
                                        }}>
                                        <FontAwesome5
                                          name="angle-down"
                                          size={20}
                                          color={colors.green}
                                        />
                                      </View>
                                    </View>
                                  </>
                                ) : null} */}

                                {/* fenvgnjkv */}
                                {vissibleFirstShiftFee ? (
                                  <View
                                    style={{
                                      // marginTop: 20,
                                      // borderWidth: 0.5,
                                      // borderRadius: 10,
                                      // paddingLeft: 10,
                                      // paddingRight: 10,
                                      // paddingTop: 20,
                                      // paddingBottom: 20,
                                      width: '100%',
                                      borderColor: colors.darkGrey,
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        marginTop:
                                          Platform.OS === 'ios' ? 20 : 5,
                                        color: colors.darkGrey,
                                        width: '100%',
                                        marginBottom:
                                          Platform.OS === 'ios' ? 10 : 0,
                                      }}>
                                      Rate per hour
                                    </Text>
                                    <TextInput
                                      placeholder="£0.00"
                                      underlineColorAndroid="#D0D2D0"
                                      keyboardType="number-pad"
                                      underlineColorAndroid="transparent"
                                      onChangeText={(value) =>
                                        // setShiftFeeIcon(value)
                                        {
                                          setShiftFeeIcon(
                                            totalHours.split(' ')[0] *
                                              Number(value) *
                                              Number(staffNeededIcon),
                                          );
                                          setTotalFee(
                                            totalHours.split(' ')[0] *
                                              Number(value) *
                                              Number(staffNeededIcon),
                                          );
                                        }
                                      }
                                      style={{
                                        width: '100%',
                                        paddingBottom: 15,
                                        fontSize: 16,
                                        borderBottomWidth:
                                          Platform.OS === 'ios' ? 1 : 1,
                                        borderColor:
                                          Platform.OS === 'ios'
                                            ? 'rgb(193,193,193)'
                                            : 'rgb(193,193,193)',
                                        color: colors.darkBlue,
                                      }}
                                    />

                                    {/* <TouchableHighlight
                                      onPress={() =>
                                        setVissibleFirstShiftFee(false)
                                      }>
                                      <View
                                        style={{
                                          width: '60%',
                                          borderRadius: 80,
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                          alignContent: 'center',
                                          backgroundColor: '#24334c',
                                          paddingBottom: 10,
                                          alignItems: 'center',
                                          marginTop: 20,
                                        }}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa',
                                            fontSize: 22,
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: colors.pureWhite,
                                            marginTop:
                                              Platform.OS === 'ios' ? 10 : 10,
                                          }}>
                                          Save
                                        </Text>
                                      </View>
                                    </TouchableHighlight> */}
                                  </View>
                                ) : null}

                                <Text
                                  style={{
                                    marginTop: 10,
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.green,
                                    marginLeft: 5,
                                  }}>
                                  Total Time: {totalHours}
                                </Text>

                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: RFValue(18, 812),
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 24,
                                    letterSpacing: 0,
                                    color: '#3EB561',
                                  }}>
                                  Total Fee Per Day: {'£' + shiftFeeIcon}
                                </Text>

                                <TouchableHighlight
                                  onPress={() => saveDetailsFirstFunc()}
                                  underlayColor="">
                                  <View
                                    style={{
                                      width: '80%',
                                      borderRadius: 80,
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                      alignContent: 'center',
                                      backgroundColor: colors.green,
                                      paddingBottom: 10,
                                      alignItems: 'center',
                                      marginTop: 20,
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 22,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.pureWhite,
                                        marginTop:
                                          Platform.OS === 'ios' ? 10 : 10,
                                      }}>
                                      Save
                                    </Text>
                                  </View>
                                </TouchableHighlight>
                              </View>
                            ) : null}
                          </>
                        ) : null}
                      </>
                    </View>
                  ) : null}

                  {/* Second Shifts */}
                  {secondShiftCount === 1 ? (
                    <View
                      style={{
                        width: widthPercentageToDP(80),
                        marginTop: 20,
                        borderWidth: 0.5,
                        borderColor: '#d5d7dc',
                        alignSelf: 'center',
                        borderRadius: 10,
                        paddingBottom: 20,
                        padding: 10,
                      }}>
                      <>
                        {secondShiftCount === 1 ? (
                          <>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                marginLeft: 15,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Title:
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {jobRoleTitleArr[1]}
                              </Text>
                            </View>

                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 10,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Date:
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {startDateArr[1] + ' - ' + endDateArr[1]}
                              </Text>
                            </View>
                          </>
                        ) : null}

                        {secondShiftCount === 1 ? (
                          <>
                            <FlatList
                              data={test}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item, index}) => {
                                return (
                                  <TouchableOpacity
                                    style={{
                                      borderWidth: 1,
                                      width: '95%',
                                      borderRadius: 10,
                                      borderColor: '#d5d7dc',
                                      padding: 10,
                                      marginTop: 20,
                                      alignSelf: 'center',
                                    }}
                                    onPress={() =>
                                      setVissibleSecondShift(true)
                                    }>
                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Role:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {shiftRoleTitle}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Quantity Needed:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {staffShiftArr[1]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Fee:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {'£' + jobFeeArr[1]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Time:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {startTimeArr[1] +
                                            ' - ' +
                                            endTimeArr[1]}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}
                            />

                            <Modal
                              transparent
                              animationType="fade"
                              visible={vissibleSecondShift}>
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
                                        ? heightPercentageToDP(68)
                                        : heightPercentageToDP(88),
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP('85%'),
                                    borderWidth: 5,
                                    borderColor: '#24334c',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                  }}>
                                  <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    bounces={true}
                                    style={{
                                      flex: 1,
                                    }}>
                                    {Platform.OS === 'ios' ? (
                                      <TouchableWithoutFeedback
                                        onPress={() =>
                                          setVissibleSecondShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableWithoutFeedback>
                                    ) : (
                                      <TouchableOpacity1
                                        onPress={() =>
                                          setVissibleSecondShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableOpacity1>
                                    )}

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
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                        }}>
                                        Shift Details
                                      </Text>
                                    </View>

                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 17,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: '#24334c',
                                        marginTop:
                                          Platform.OS === 'ios' ? 10 : 10,
                                        marginLeft: '5%',
                                      }}>
                                      Shift Location
                                    </Text>
                                    <TextInput
                                      style={{
                                        width: '90%',
                                        paddingLeft:
                                          Platform.OS === 'ios' ? 0 : 0,
                                        marginTop:
                                          Platform.OS === 'ios' ? 5 : 0,
                                        paddingBottom:
                                          Platform.OS === 'ios' ? 5 : 5,
                                        alignSelf: 'center',
                                        borderBottomWidth:
                                          Platform.OS === 'ios' ? 1 : 1,
                                        borderBottomColor:
                                          Platform.OS === 'ios'
                                            ? '#24334c'
                                            : '#24334c',
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.darkBlue,
                                      }}
                                      multiline={true}
                                      underlineColorAndroid="transparent"
                                      editable={false}
                                      placeholder={jobAddressArr[1]}
                                      placeholderTextColor={colors.pureBlack}
                                    />

                                    <View
                                      style={{
                                        marginTop: 20,
                                        marginLeft: 10,
                                        marginRight: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Quantity Needed
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        multiline={true}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={staffShiftArr[1]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Role
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={shiftRoleTitleArr[1]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Fee
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobFeeArr[1]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Date
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startDateArr[1] +
                                          ' - ' +
                                          endDateArr[1]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Time
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startTimeArr[1] +
                                          ' - ' +
                                          endTimeArr[1]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Job Role Description
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobDecArr[1]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                    </View>
                                  </ScrollView>
                                </View>
                              </View>
                            </Modal>
                          </>
                        ) : null}

                        {secondShiftCount === 1 ? (
                          <FlatList
                            data={staffNeededIconArr2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={{
                                    borderWidth: 1,
                                    width: '95%',
                                    borderRadius: 10,
                                    borderColor: '#d5d7dc',
                                    padding: 10,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                  }}
                                  onPress={() => _showModalShiftsSecond(index)}>
                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Role:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftRoleTitleIconArr2[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Quantity Needed:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffNeededIconArr2[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Fee:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftFeeIconArr2[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Time:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffStartTimeIconArr2[index] +
                                          ' - ' +
                                          staffEndTimeIconArr2[index]}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        ) : null}
                        {secondShiftCount === 1 && secondShiftRolesCount < 3 ? (
                          //&&checkSecond === true
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              marginTop: 10,
                              width: '90%',
                              alignContent: 'center',
                              alignSelf: 'center',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Add New Role
                              {/* {jobRoleTitleArr[1]} */}
                            </Text>

                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                flex: 1,
                                backgroundColor: checkShiftSecondRoles
                                  ? colors.red
                                  : colors.green,
                              }}
                              onPress={() => plusMoreSecondFunc()}>
                              {checkShiftSecondRoles ? (
                                <Icon
                                  name="cross"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              ) : (
                                <Icon
                                  name="plus"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </>
                      {checkShiftSecondRoles ? (
                        <>
                          {vissibleShiftSecondRoles ? (
                            <View
                              style={{
                                backgroundColor: colors.pureWhite,
                                borderWidth: 0.8,
                                borderColor: '#d5d7dc',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 20,
                                paddingBottom: 20,
                                borderRadius: 10,
                                marginTop: 10,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: RFValue(18, 812),
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 24,
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Shift Role
                                </Text>

                                {/* <View
                                  style={{
                                    flexDirection: 'row',
                                  }}>
                                  <Dropdown
                                    data={jobRoleData}
                                    onChangeText={(item, value) => {
                                      setShiftRoleIcon(item);
                                      setShiftRoleTitleIcon(
                                        jobRoleData[value]?.label,
                                      );
                                    }}
                                    style={{
                                      width: widthPercentageToDP(65),
                                      height: 30,
                                      backgroundColor: colors.pureWhite,
                                    }}
                                    pickerStyle={{
                                      marginTop: 20,
                                      marginLeft: 15,
                                    }}
                                  />
                                  <View
                                    style={{
                                      paddingTop: 5,
                                      borderBottomWidth: 0.8,
                                      borderBottomColor: 'rgba(0, 0, 0, .25)',
                                      marginBottom: 0.5,
                                    }}>
                                    <FontAwesome5
                                      name="angle-down"
                                      size={20}
                                      color={colors.green}
                                    />
                                  </View>
                                </View> */}
                              </View>

                              <DropDownPicker
                                searchable={true}
                                loading={loadingDropDown}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                showTickIcon={false}
                                dropDownDirection={'BOTTOM'}
                                zIndex={1000}
                                zIndexInverse={1000}
                                onChangeValue={(item) => {
                                  setShiftRoleIcon(item?.value);
                                  setShiftRoleTitleIcon(item?.label);
                                }}
                                activityIndicatorColor={colors.green}
                                searchPlaceholder="Search..."
                                placeholder="Select Shift Role"
                                placeholderStyle={{
                                  color: colors.darkWhiteLow,
                                }}
                                style={{
                                  width: widthPercentageToDP(66),
                                  borderWidth: 0,
                                  borderBottomWidth: 1,
                                  borderBottomColor: '#ABB1BB',
                                }}
                                selectedItemLabelStyle={{
                                  color: colors.green,
                                }}
                                searchTextInputProps={{
                                  borderWidth: 0.5,
                                  borderColor: 'rgb(193,193,193)',
                                  underlineColorAndroid: 'transparent',
                                  height: Platform.OS === 'ios' ? 30 : 30,
                                }}
                                scrollViewProps={true}
                                containerStyle={{
                                  height: 40,
                                  width: widthPercentageToDP(66),
                                }}
                                ArrowUpIconComponent={() => (
                                  <IconArrow
                                    name="chevron-up"
                                    size={24}
                                    color={colors.green}
                                  />
                                )}
                                ArrowDownIconComponent={() => (
                                  <IconArrow
                                    name="chevron-down"
                                    size={24}
                                    color={colors.green}
                                  />
                                )}
                              />
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  marginTop: Platform.OS === 'ios' ? 0 : 20,
                                }}>
                                <View style={{}}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: RFValue(18, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      lineHeight: 24,
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    Start Time
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setShowStartTimePickerIcon(true)
                                    }>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                      }}>
                                      <Dropdown
                                        value={staffStartTimeIcon}
                                        style={{
                                          width: widthPercentageToDP(30),
                                          height: 30,
                                          backgroundColor: colors.pureWhite,
                                          color: colors.darkBlue,
                                        }}
                                        pickerStyle={{
                                          marginTop: 20,
                                          marginLeft: 15,
                                        }}
                                      />
                                      <FontAwesome5
                                        style={{
                                          zIndex: 5,
                                          position: 'absolute',
                                          right: widthConverter(2),
                                        }}
                                        name="angle-down"
                                        size={20}
                                        color="#3EB561"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>

                                <View style={{}}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: RFValue(18, 812),
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      lineHeight: 24,
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    End Time
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setShowEndTimePickerIcon(true)
                                    }>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginLeft: 5,
                                      }}>
                                      <Dropdown
                                        value={staffEndTimeIcon}
                                        style={{
                                          width: widthPercentageToDP(30),
                                          height: 30,
                                          backgroundColor: colors.pureWhite,
                                        }}
                                        pickerStyle={{
                                          marginTop: 20,
                                          marginLeft: 15,
                                        }}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View
                                style={{
                                  marginTop: 20,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Quantity Needed
                                </Text>

                                <TextInput
                                  underlineColorAndroid="#D0D2D0"
                                  placeholder="Enter quantity needed"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  onChangeText={(value) =>
                                    setStaffNeededIcon(value)
                                  }
                                  placeholderTextColor={colors.darkWhiteLow}
                                  keyboardType="number-pad"
                                  style={{
                                    flex: 1,
                                    height: heightPercentageToDP('5%'),
                                    fontFamily: 'Europa',
                                    fontSize: Platform.OS === 'ios' ? 17 : 17,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    width: '100%',
                                    borderBottomWidth:
                                      Platform.OS === 'ios' ? 1 : 0,
                                    borderBottomColor:
                                      Platform.OS === 'ios' ? '#D0D2D0' : null,
                                    color: colors.darkBlue,
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: RFValue(18, 812),
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 24,
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Shift Fee
                                </Text>

                                <Dropdown
                                  // data={jobFeeData}
                                  data={jobFees}
                                  onChangeText={(item, value) => {
                                    setShiftFeeIcon(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );
                                    setTotalFee(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );
                                    setShiftRateIconArr(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );

                                    //setShiftFeeIcon(item);
                                    setVissibleSecondShiftFee(
                                      item === 0 ? true : false,
                                    );
                                    // setShiftRateIconArr(
                                    //   jobFeeData[value]?.label,
                                    // );
                                  }}
                                  style={{
                                    width: widthPercentageToDP(65),
                                    height: 30,
                                    backgroundColor: colors.pureWhite,
                                  }}
                                  pickerStyle={{
                                    marginTop: 20,
                                    marginLeft: 15,
                                  }}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(25),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>

                              {/* fegrjebnjk */}
                              {/* {vissibleSecondShiftFee ? (
                                <>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      marginTop: Platform.OS === 'ios' ? 20 : 5,
                                      color: colors.darkGrey,
                                    }}>
                                    Rate
                                  </Text>

                                  <View
                                    style={{
                                      flex: 1,
                                      width: '100%',
                                      flexDirection: 'row',
                                    }}>
                                    <Dropdown
                                      data={jobRateData}
                                      onChangeText={(item) => {
                                        setShiftRateIconArr(item);
                                      }}
                                      style={{
                                        height: 40,
                                        flex: 1,
                                        width: widthPercentageToDP(65),
                                        backgroundColor: colors.pureWhite,
                                      }}
                                      pickerStyle={{
                                        marginTop: 10,
                                        marginLeft: 15,
                                      }}
                                    />
                                    <View
                                      style={{
                                        paddingTop: 5,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: colors.darkGreyLow,
                                        marginBottom: 0.5,
                                      }}>
                                      <FontAwesome5
                                        name="angle-down"
                                        size={20}
                                        color={colors.green}
                                      />
                                    </View>
                                  </View>
                                </>
                              ) : null} */}

                              {/* fenvgnjkv */}
                              {vissibleSecondShiftFee ? (
                                <View
                                  style={{
                                    // marginTop: 20,
                                    // borderWidth: 0.5,
                                    // borderRadius: 10,
                                    // paddingLeft: 10,
                                    // paddingRight: 10,
                                    // paddingTop: 20,
                                    // paddingBottom: 20,
                                    width: '100%',
                                    borderColor: colors.darkGrey,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      marginTop: Platform.OS === 'ios' ? 20 : 5,
                                      color: colors.darkGrey,
                                      width: '100%',
                                      marginBottom:
                                        Platform.OS === 'ios' ? 10 : 0,
                                    }}>
                                    Rate per hour
                                  </Text>
                                  <TextInput
                                    placeholder="£0.00"
                                    underlineColorAndroid="#D0D2D0"
                                    keyboardType="number-pad"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(value) =>
                                      // setShiftFeeIcon(value)
                                      {
                                        setShiftFeeIcon(
                                          totalHours.split(' ')[0] *
                                            Number(value) *
                                            Number(staffNeededIcon),
                                        );
                                        setTotalFee(
                                          totalHours.split(' ')[0] *
                                            Number(value) *
                                            Number(staffNeededIcon),
                                        );
                                      }
                                    }
                                    style={{
                                      width: '100%',
                                      paddingBottom: 15,
                                      fontSize: 16,
                                      borderBottomWidth:
                                        Platform.OS === 'ios' ? 1 : 1,
                                      borderColor:
                                        Platform.OS === 'ios'
                                          ? 'rgb(193,193,193)'
                                          : 'rgb(193,193,193)',
                                      color: colors.darkBlue,
                                    }}
                                  />
                                </View>
                              ) : null}

                              <Text
                                style={{
                                  marginTop: 10,
                                  fontFamily: 'Europa',
                                  fontSize: 15,
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: colors.green,
                                  marginLeft: 5,
                                }}>
                                Total Time: {totalHours}
                              </Text>

                              <Text
                                style={{
                                  marginTop: 20,
                                  fontFamily: 'Europa',
                                  fontSize: RFValue(18, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  lineHeight: 24,
                                  letterSpacing: 0,
                                  color: '#3EB561',
                                }}>
                                Total Fee Per Day: {'£' + shiftFeeIcon}
                              </Text>

                              <TouchableHighlight
                                onPress={() => saveDetailsSecondFunc()}
                                underlayColor="">
                                <View
                                  style={{
                                    width: '80%',
                                    borderRadius: 80,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    backgroundColor: colors.green,
                                    paddingBottom: 10,
                                    alignItems: 'center',
                                    marginTop: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 22,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.pureWhite,
                                      marginTop:
                                        Platform.OS === 'ios' ? 10 : 10,
                                    }}>
                                    Save
                                  </Text>
                                </View>
                              </TouchableHighlight>
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </View>
                  ) : null}

                  {/* Third Shifts */}
                  {thirdShiftCount === 1 ? (
                    <View
                      style={{
                        width: widthPercentageToDP(80),
                        marginTop: 20,
                        borderWidth: 0.5,
                        borderColor: '#d5d7dc',
                        alignSelf: 'center',
                        borderRadius: 10,
                        paddingBottom: 20,
                        padding: 10,
                      }}>
                      <>
                        {thirdShiftCount === 1 ? (
                          <>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Title:
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {jobRoleTitleArr[2]}
                              </Text>
                            </View>

                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 10,
                                marginLeft: 15,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Date:
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {startDateArr[2] + ' - ' + endDateArr[2]}
                              </Text>
                            </View>
                          </>
                        ) : null}
                        {thirdShiftCount === 1 ? (
                          <>
                            <FlatList
                              data={test}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item, index}) => {
                                return (
                                  <TouchableOpacity
                                    style={{
                                      borderWidth: 1,
                                      width: '95%',
                                      borderRadius: 10,
                                      borderColor: '#d5d7dc',
                                      padding: 10,
                                      marginTop: 20,
                                      alignSelf: 'center',
                                    }}
                                    onPress={() => setVissibleThirdShift(true)}>
                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Role:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {shiftRoleTitle}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Quantity Needed:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {staffShiftArr[2]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Fee:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 20,
                                          }}>
                                          {'£' + jobFeeArr[2]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Time:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {startTimeArr[2] +
                                            ' - ' +
                                            endTimeArr[2]}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}
                            />

                            <Modal
                              transparent
                              animationType="fade"
                              visible={vissibleThirdShift}>
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
                                        ? heightPercentageToDP(68)
                                        : heightPercentageToDP(88),
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP('85%'),
                                    borderWidth: 5,
                                    borderColor: '#24334c',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                  }}>
                                  <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    bounces={true}
                                    style={{
                                      flex: 1,
                                    }}>
                                    {Platform.OS === 'ios' ? (
                                      <TouchableWithoutFeedback
                                        onPress={() =>
                                          setVissibleThirdShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableWithoutFeedback>
                                    ) : (
                                      <TouchableOpacity1
                                        onPress={() =>
                                          setVissibleThirdShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableOpacity1>
                                    )}

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
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                        }}>
                                        Shift Details
                                      </Text>
                                    </View>

                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 17,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: '#24334c',
                                        marginTop:
                                          Platform.OS === 'ios' ? 10 : 10,
                                        marginLeft: '5%',
                                      }}>
                                      Shift Location
                                    </Text>
                                    <TextInput
                                      style={{
                                        width: '90%',
                                        paddingLeft:
                                          Platform.OS === 'ios' ? 0 : 0,
                                        marginTop:
                                          Platform.OS === 'ios' ? 5 : 0,
                                        paddingBottom:
                                          Platform.OS === 'ios' ? 5 : 5,
                                        alignSelf: 'center',
                                        borderBottomWidth:
                                          Platform.OS === 'ios' ? 1 : 1,
                                        borderBottomColor:
                                          Platform.OS === 'ios'
                                            ? '#24334c'
                                            : '#24334c',
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.darkBlue,
                                      }}
                                      multiline={true}
                                      underlineColorAndroid="transparent"
                                      editable={false}
                                      placeholder={jobAddressArr[2]}
                                      placeholderTextColor={colors.pureBlack}
                                    />

                                    <View
                                      style={{
                                        marginTop: 20,
                                        marginLeft: 10,
                                        marginRight: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Quantity Needed
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        multiline={true}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={staffShiftArr[2]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Role
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={shiftRoleTitleArr[2]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Fee
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobFeeArr[2]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Date
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startDateArr[2] +
                                          ' - ' +
                                          endDateArr[2]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Time
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startTimeArr[2] +
                                          ' - ' +
                                          endTimeArr[2]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Job Role Description
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobDecArr[2]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                    </View>
                                  </ScrollView>
                                </View>
                              </View>
                            </Modal>
                          </>
                        ) : null}

                        {thirdShiftCount === 1 ? (
                          <FlatList
                            data={staffNeededIconArr3}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={{
                                    borderWidth: 1,
                                    width: '95%',
                                    borderRadius: 10,
                                    borderColor: '#d5d7dc',
                                    padding: 10,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                  }}
                                  onPress={() => _showModalShiftsThird(index)}>
                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Role:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftRoleTitleIconArr3[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Quantity Needed:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffNeededIconArr3[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Fee:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftFeeIconArr3[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Time:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffStartTimeIconArr3[index] +
                                          ' - ' +
                                          staffEndTimeIconArr3[index]}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        ) : null}
                        {thirdShiftCount === 1 && thirdShiftRolesCount < 3 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              marginTop: 10,
                              width: '90%',
                              alignContent: 'center',
                              alignSelf: 'center',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Add New Role
                              {/* {jobRoleTitleArr[2]} */}
                            </Text>

                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                flex: 1,
                                backgroundColor: checkShiftThirdRoles
                                  ? colors.red
                                  : colors.green,
                              }}
                              onPress={() => plusMoreThirdFunc()}>
                              {checkShiftThirdRoles ? (
                                <Icon
                                  name="cross"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              ) : (
                                <Icon
                                  name="plus"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </>
                      {checkShiftThirdRoles ? (
                        <>
                          {vissibleShiftThirdRoles ? (
                            <View
                              style={{
                                backgroundColor: colors.pureWhite,
                                borderWidth: 0.8,
                                borderColor: '#d5d7dc',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 20,
                                paddingBottom: 20,
                                borderRadius: 10,
                                marginTop: 10,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Shift Role
                                </Text>
                              </View>

                              {/* <View
                                  style={{
                                    flexDirection: 'row',
                                  }}>
                                  <Dropdown
                                    data={jobRoleData}
                                    onChangeText={(item, value) => {
                                      setShiftRoleIcon(item);
                                      setShiftRoleTitleIcon(
                                        jobRoleData[value]?.label,
                                      );
                                    }}
                                    style={{
                                      width: widthPercentageToDP(65),
                                      height: 30,
                                      backgroundColor: colors.pureWhite,
                                    }}
                                    pickerStyle={{
                                      marginTop: 20,
                                      marginLeft: 15,
                                    }}
                                  />
                                  <View
                                    style={{
                                      paddingTop: 5,
                                      borderBottomWidth: 0.8,
                                      borderBottomColor: 'rgba(0, 0, 0, .25)',
                                      marginBottom: 0.5,
                                    }}>
                                    <FontAwesome5
                                      name="angle-down"
                                      size={20}
                                      color={colors.green}
                                    />
                                  </View>
                               
                                </View> */}

                              <DropDownPicker
                                searchable={true}
                                loading={loadingDropDown}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                showTickIcon={false}
                                dropDownDirection={'BOTTOM'}
                                zIndex={1000}
                                zIndexInverse={1000}
                                onChangeValue={(item) => {
                                  setShiftRoleIcon(item?.value);
                                  setShiftRoleTitleIcon(item?.label);
                                }}
                                activityIndicatorColor={colors.green}
                                searchPlaceholder="Search..."
                                placeholder="Select Shift Role"
                                placeholderStyle={{
                                  color: colors.darkWhiteLow,
                                }}
                                style={{
                                  width: widthPercentageToDP(66),
                                  borderWidth: 0,
                                  borderBottomWidth: 1,
                                  borderBottomColor: '#ABB1BB',
                                }}
                                selectedItemLabelStyle={{
                                  color: colors.green,
                                }}
                                searchTextInputProps={{
                                  borderWidth: 0.5,
                                  borderColor: 'rgb(193,193,193)',
                                  underlineColorAndroid: 'transparent',
                                  height: Platform.OS === 'ios' ? 30 : 30,
                                }}
                                scrollViewProps={true}
                                containerStyle={{
                                  height: 40,
                                  width: widthPercentageToDP(66),
                                }}
                                ArrowUpIconComponent={() => (
                                  <IconArrow
                                    name="chevron-up"
                                    size={24}
                                    color={colors.green}
                                  />
                                )}
                                ArrowDownIconComponent={() => (
                                  <IconArrow
                                    name="chevron-down"
                                    size={24}
                                    color={colors.green}
                                  />
                                )}
                              />

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  marginTop: Platform.OS === 'ios' ? 0 : 20,
                                }}>
                                <View style={{}}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    Start Time
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setShowStartTimePickerIcon(true)
                                    }>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                      }}>
                                      <Dropdown
                                        value={staffStartTimeIcon}
                                        style={{
                                          width: widthPercentageToDP(30),
                                          height: 30,
                                          backgroundColor: colors.pureWhite,
                                          color: colors.darkBlue,
                                        }}
                                        pickerStyle={{
                                          marginTop: 20,
                                          marginLeft: 15,
                                        }}
                                      />
                                      <FontAwesome5
                                        style={{
                                          zIndex: 5,
                                          position: 'absolute',
                                          right: widthConverter(2),
                                        }}
                                        name="angle-down"
                                        size={20}
                                        color="#3EB561"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>

                                <View style={{}}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    End Time
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setShowEndTimePickerIcon(true)
                                    }>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginLeft: 5,
                                      }}>
                                      <Dropdown
                                        value={staffEndTimeIcon}
                                        style={{
                                          width: widthPercentageToDP(30),
                                          height: 30,
                                          backgroundColor: colors.pureWhite,
                                        }}
                                        pickerStyle={{
                                          marginTop: 20,
                                          marginLeft: 15,
                                        }}
                                      />
                                      <FontAwesome5
                                        style={{
                                          zIndex: 5,
                                          position: 'absolute',
                                          right: widthConverter(2),
                                        }}
                                        name="angle-down"
                                        size={20}
                                        color="#3EB561"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View
                                style={{
                                  marginTop: 20,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Quantity Needed
                                </Text>

                                <TextInput
                                  underlineColorAndroid="#D0D2D0"
                                  placeholder="Enter quantity needed"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  onChangeText={(value) =>
                                    setStaffNeededIcon(value)
                                  }
                                  placeholderTextColor={colors.darkWhiteLow}
                                  keyboardType="number-pad"
                                  style={{
                                    flex: 1,
                                    height: heightPercentageToDP('5%'),
                                    fontFamily: 'Europa',
                                    fontSize: Platform.OS === 'ios' ? 17 : 17,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    width: '100%',
                                    borderBottomWidth:
                                      Platform.OS === 'ios' ? 1 : 0,
                                    borderBottomColor:
                                      Platform.OS === 'ios' ? '#D0D2D0' : null,
                                    color: colors.darkBlue,
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Shift Fee
                                </Text>

                                <Dropdown
                                  // data={jobFeeData}
                                  data={jobFees}
                                  onChangeText={(item, value) => {
                                    //setShiftFeeIcon(item);

                                    setShiftFeeIcon(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );
                                    setTotalFee(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );
                                    setShiftRateIconArr(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );

                                    setVissibleThirdShiftFee(
                                      item === 0 ? true : false,
                                    );
                                    // setShiftRateIconArr(
                                    //   jobFeeData[value]?.label,
                                    // );
                                  }}
                                  style={{
                                    width: widthPercentageToDP(65),
                                    height: 30,
                                    backgroundColor: colors.pureWhite,
                                  }}
                                  pickerStyle={{
                                    marginTop: 20,
                                    marginLeft: 10,
                                  }}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(25),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>

                              {/* fegrjebnjk */}
                              {/* {vissibleThirdShiftFee ? (
                                <>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      marginTop: Platform.OS === 'ios' ? 20 : 5,
                                      color: colors.darkGrey,
                                    }}>
                                    Rate
                                  </Text>

                                  <View
                                    style={{
                                      flex: 1,
                                      width: '100%',
                                      flexDirection: 'row',
                                    }}>
                                    <Dropdown
                                      data={jobRateData}
                                      onChangeText={(item) => {
                                        setShiftRateIconArr(item);
                                      }}
                                      style={{
                                        height: 40,
                                        flex: 1,
                                        width: widthPercentageToDP(65),
                                        backgroundColor: colors.pureWhite,
                                      }}
                                      pickerStyle={{
                                        marginTop: 10,
                                        marginLeft: 15,
                                      }}
                                    />
                                    <View
                                      style={{
                                        paddingTop: 5,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: colors.darkGreyLow,
                                        marginBottom: 0.5,
                                      }}>
                                      <FontAwesome5
                                        name="angle-down"
                                        size={20}
                                        color={colors.green}
                                      />
                                    </View>
                                  </View>
                                </>
                              ) : null} */}

                              {/* fenvgnjkv */}
                              {vissibleThirdShiftFee ? (
                                <View
                                  style={{
                                    // marginTop: 20,
                                    // borderWidth: 0.5,
                                    // borderRadius: 10,
                                    // paddingLeft: 10,
                                    // paddingRight: 10,
                                    // paddingTop: 20,
                                    // paddingBottom: 20,
                                    width: '100%',
                                    borderColor: colors.darkGrey,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      marginTop: Platform.OS === 'ios' ? 20 : 5,
                                      color: colors.darkGrey,
                                      width: '100%',
                                      marginBottom:
                                        Platform.OS === 'ios' ? 10 : 0,
                                    }}>
                                    Rate per hour
                                  </Text>
                                  <TextInput
                                    placeholder="£0.00"
                                    underlineColorAndroid="#D0D2D0"
                                    keyboardType="number-pad"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(value) =>
                                      // setShiftFeeIcon(value)
                                      {
                                        setShiftFeeIcon(
                                          totalHours.split(' ')[0] *
                                            Number(value) *
                                            Number(staffNeededIcon),
                                        );
                                        setTotalFee(
                                          totalHours.split(' ')[0] *
                                            Number(value) *
                                            Number(staffNeededIcon),
                                        );
                                      }
                                    }
                                    style={{
                                      width: '100%',
                                      paddingBottom: 15,
                                      fontSize: 16,
                                      borderBottomWidth:
                                        Platform.OS === 'ios' ? 1 : 1,
                                      borderColor:
                                        Platform.OS === 'ios'
                                          ? 'rgb(193,193,193)'
                                          : 'rgb(193,193,193)',
                                      color: colors.darkBlue,
                                    }}
                                  />
                                </View>
                              ) : null}

                              <Text
                                style={{
                                  marginTop: 10,
                                  fontFamily: 'Europa',
                                  fontSize: 15,
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: colors.green,
                                  marginLeft: 5,
                                }}>
                                Total Time: {totalHours}
                              </Text>

                              <Text
                                style={{
                                  marginTop: 20,
                                  fontFamily: 'Europa',
                                  fontSize: RFValue(18, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  lineHeight: 24,
                                  letterSpacing: 0,
                                  color: '#3EB561',
                                }}>
                                Total Fee Per Day: {'£' + shiftFeeIcon}
                              </Text>

                              <TouchableHighlight
                                onPress={() => saveDetailsThirdFunc()}
                                underlayColor="">
                                <View
                                  style={{
                                    width: '80%',
                                    borderRadius: 80,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    backgroundColor: colors.green,
                                    paddingBottom: 10,
                                    alignItems: 'center',
                                    marginTop: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 22,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.pureWhite,
                                      marginTop:
                                        Platform.OS === 'ios' ? 10 : 10,
                                    }}>
                                    Save
                                  </Text>
                                </View>
                              </TouchableHighlight>
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </View>
                  ) : null}

                  {/* Fourth Shifts */}
                  {fourthShiftCount === 1 ? (
                    <View
                      style={{
                        width: widthPercentageToDP(80),
                        marginTop: 20,
                        borderWidth: 0.5,
                        borderColor: '#d5d7dc',
                        alignSelf: 'center',
                        borderRadius: 10,
                        paddingBottom: 20,
                        padding: 10,
                      }}>
                      <>
                        {fourthShiftCount === 1 ? (
                          <>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Title:
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {jobRoleTitleArr[3]}
                              </Text>
                            </View>

                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                flexDirection: 'row',
                                marginTop: 10,
                                marginLeft: 15,
                              }}>
                              <Text
                                style={{
                                  fontFamily: 'Europa-Bold',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  color: '#24334c',
                                  textAlign: 'auto',
                                }}>
                                Shift Date:
                              </Text>

                              <Text
                                style={{
                                  fontFamily: 'Europa-Regular',
                                  fontSize: RFValue(14, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: '#24334c',
                                  textAlign: 'auto',
                                  paddingLeft: 10,
                                }}>
                                {startDateArr[3] + ' - ' + endDateArr[3]}
                              </Text>
                            </View>
                          </>
                        ) : null}

                        {fourthShiftCount === 1 ? (
                          <>
                            <FlatList
                              data={test}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item, index}) => {
                                return (
                                  <TouchableOpacity
                                    style={{
                                      borderWidth: 1,
                                      width: '95%',
                                      borderRadius: 10,
                                      borderColor: '#d5d7dc',
                                      padding: 10,
                                      marginTop: 20,
                                      alignSelf: 'center',
                                    }}
                                    onPress={() =>
                                      setVissibleFourthShift(true)
                                    }>
                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Role:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {shiftRoleTitle}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Quantity Needed:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {staffShiftArr[3]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Fee:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {'£' + jobFeeArr[3]}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        marginBottom: heightConverter(5),
                                        flexDirection: 'row',
                                        flex: 1,
                                      }}>
                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            fontFamily: 'Europa-Bold',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          Shift Time:
                                        </Text>
                                      </View>

                                      <View style={{flex: 0.5}}>
                                        <Text
                                          style={{
                                            marginLeft: '10%',
                                            fontFamily: 'Europa-Regular',
                                            fontSize: RFValue(14, 812),
                                            fontWeight: 'normal',
                                            fontStyle: 'normal',
                                            letterSpacing: 0,
                                            color: '#24334c',
                                            textAlign: 'auto',
                                            marginTop: 5,
                                            marginLeft: 10,
                                          }}>
                                          {startTimeArr[3] +
                                            ' - ' +
                                            endTimeArr[3]}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}
                            />

                            <Modal
                              transparent
                              animationType="fade"
                              visible={vissibleFourthShift}>
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
                                        ? heightPercentageToDP(68)
                                        : heightPercentageToDP(88),
                                    backgroundColor: colors.pureWhite,
                                    width: widthPercentageToDP('85%'),
                                    borderWidth: 5,
                                    borderColor: '#24334c',
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                  }}>
                                  <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    bounces={true}
                                    style={{
                                      flex: 1,
                                    }}>
                                    {Platform.OS === 'ios' ? (
                                      <TouchableWithoutFeedback
                                        onPress={() =>
                                          setVissibleFourthShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableWithoutFeedback>
                                    ) : (
                                      <TouchableOpacity1
                                        onPress={() =>
                                          setVissibleFourthShift(false)
                                        }
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
                                        <IconCross
                                          name="cross"
                                          size={20}
                                          color={colors.pureWhite}
                                        />
                                      </TouchableOpacity1>
                                    )}

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
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                        }}>
                                        Shift Details
                                      </Text>
                                    </View>

                                    <Text
                                      style={{
                                        fontFamily: 'Europa',
                                        fontSize: 17,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: '#24334c',
                                        marginTop:
                                          Platform.OS === 'ios' ? 10 : 10,
                                        marginLeft: '5%',
                                      }}>
                                      Shift Location
                                    </Text>
                                    <TextInput
                                      style={{
                                        width: '90%',
                                        paddingLeft:
                                          Platform.OS === 'ios' ? 0 : 0,
                                        marginTop:
                                          Platform.OS === 'ios' ? 5 : 0,
                                        paddingBottom:
                                          Platform.OS === 'ios' ? 5 : 5,
                                        alignSelf: 'center',
                                        borderBottomWidth:
                                          Platform.OS === 'ios' ? 1 : 1,
                                        borderBottomColor:
                                          Platform.OS === 'ios'
                                            ? '#24334c'
                                            : '#24334c',
                                        fontFamily: 'Europa',
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        letterSpacing: 0,
                                        color: colors.darkBlue,
                                      }}
                                      multiline={true}
                                      underlineColorAndroid="transparent"
                                      editable={false}
                                      placeholder={jobAddressArr[3]}
                                      placeholderTextColor={colors.pureBlack}
                                    />

                                    <View
                                      style={{
                                        marginTop: 20,
                                        marginLeft: 10,
                                        marginRight: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Quantity Needed
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        multiline={true}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={staffShiftArr[3]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Role
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={shiftRoleTitleArr[3]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Fee
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          alignSelf: 'center',
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobFeeArr[3]?.toString()}
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Date
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startDateArr[3] +
                                          ' - ' +
                                          endDateArr[3]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Shift Time
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={
                                          startTimeArr[3] +
                                          ' - ' +
                                          endTimeArr[3]
                                        }
                                        placeholderTextColor={colors.pureBlack}
                                      />

                                      <Text
                                        style={{
                                          fontFamily: 'Europa',
                                          fontSize: 17,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          marginTop:
                                            Platform.OS === 'ios' ? 10 : 10,
                                          marginLeft: '5%',
                                        }}>
                                        Job Role Description
                                      </Text>
                                      <TextInput
                                        style={{
                                          width: '90%',
                                          alignSelf: 'center',
                                          paddingLeft:
                                            Platform.OS === 'ios' ? 0 : 0,
                                          height:
                                            Platform.OS === 'ios'
                                              ? '6%'
                                              : '7.5%',
                                          marginTop:
                                            Platform.OS === 'ios' ? 5 : 0,
                                          paddingBottom:
                                            Platform.OS === 'ios' ? 5 : 5,
                                          borderBottomWidth:
                                            Platform.OS === 'ios' ? 1 : 1,
                                          borderBottomColor:
                                            Platform.OS === 'ios'
                                              ? '#24334c'
                                              : '#24334c',
                                          fontFamily: 'Europa',
                                          fontSize: 15,
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: colors.darkBlue,
                                        }}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        placeholder={jobDecArr[3]}
                                        placeholderTextColor={colors.pureBlack}
                                      />
                                    </View>
                                  </ScrollView>
                                </View>
                              </View>
                            </Modal>
                          </>
                        ) : null}

                        {fourthShiftCount === 1 ? (
                          <FlatList
                            data={staffNeededIconArr4}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <TouchableOpacity
                                  style={{
                                    borderWidth: 1,
                                    width: '95%',
                                    borderRadius: 10,
                                    borderColor: '#d5d7dc',
                                    padding: 10,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                  }}
                                  onPress={() => _showModalShiftsFourth(index)}>
                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Role:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftRoleTitleIconArr4[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Quantity Needed:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffNeededIconArr4[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Fee:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {shiftFeeIconArr4[index]}
                                      </Text>
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      marginBottom: heightConverter(5),
                                      flexDirection: 'row',
                                    }}>
                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          fontFamily: 'Europa-Bold',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        Shift Time:
                                      </Text>
                                    </View>

                                    <View style={{flex: 0.5}}>
                                      <Text
                                        style={{
                                          marginLeft: '10%',
                                          fontFamily: 'Europa-Regular',
                                          fontSize: RFValue(14, 812),
                                          fontWeight: 'normal',
                                          fontStyle: 'normal',
                                          letterSpacing: 0,
                                          color: '#24334c',
                                          textAlign: 'auto',
                                          marginTop: 5,
                                          marginLeft: 10,
                                        }}>
                                        {staffStartTimeIconArr4[index] +
                                          ' - ' +
                                          staffEndTimeIconArr4[index]}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        ) : null}
                        {fourthShiftCount === 1 && fourthShiftRolesCount < 3 ? (
                          //&&checkFourth === true
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              marginTop: 10,
                              width: '90%',
                              alignContent: 'center',
                              alignSelf: 'center',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Europa-Bold',
                                fontSize: RFValue(22, 812),
                                fontWeight: 'bold',
                                fontStyle: 'normal',
                                letterSpacing: 0,
                                color: colors.darkBlue,
                              }}>
                              Add New Role
                              {/* {jobRoleTitleArr[3]} */}
                            </Text>
                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                flex: 1,
                                backgroundColor: checkShiftFourthRoles
                                  ? colors.red
                                  : colors.green,
                              }}
                              onPress={() => plusMoreFourthFunc()}>
                              {checkShiftFourthRoles ? (
                                <Icon
                                  name="cross"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              ) : (
                                <Icon
                                  name="plus"
                                  size={25}
                                  color={colors.pureWhite}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </>

                      {checkShiftFourthRoles ? (
                        <>
                          {vissibleShiftFourthRoles ? (
                            <View
                              style={{
                                backgroundColor: colors.pureWhite,
                                borderWidth: 0.8,
                                borderColor: '#d5d7dc',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 20,
                                paddingBottom: 20,
                                borderRadius: 10,
                                marginTop: 10,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Shift Role
                                </Text>
                              </View>
                              {/*                                 
                                <View
                                  style={{
                                    flexDirection: 'row',
                                  }}>
                                  <Dropdown
                                    data={jobRoleData}
                                    onChangeText={(item, value) => {
                                      setShiftRoleIcon(item);
                                      setShiftRoleTitleIcon(
                                        jobRoleData[value]?.label,
                                      );
                                    }}
                                    style={{
                                      width: widthPercentageToDP(65),
                                      height: 30,
                                      backgroundColor: colors.pureWhite,
                                    }}
                                    pickerStyle={{
                                      marginTop: 20,
                                      marginLeft: 10,
                                    }}
                                  />
                                  <View
                                    style={{
                                      paddingTop: 5,
                                      borderBottomWidth: 0.8,
                                      borderBottomColor: 'rgba(0, 0, 0, .25)',
                                      marginBottom: 0.5,
                                    }}>
                                    <FontAwesome5
                                      name="angle-down"
                                      size={20}
                                      color={colors.green}
                                    />
                                  </View>
                                </View> */}

                              <DropDownPicker
                                searchable={true}
                                loading={loadingDropDown}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                showTickIcon={false}
                                dropDownDirection={'BOTTOM'}
                                zIndex={1000}
                                zIndexInverse={1000}
                                onChangeValue={(item) => {
                                  setShiftRoleIcon(item?.value);
                                  setShiftRoleTitleIcon(item?.label);
                                }}
                                activityIndicatorColor={colors.green}
                                searchPlaceholder="Search..."
                                placeholder="Select Shift Role"
                                placeholderStyle={{
                                  color: colors.darkWhiteLow,
                                }}
                                style={{
                                  width: widthPercentageToDP(66),
                                  borderWidth: 0,
                                  borderBottomWidth: 1,
                                  borderBottomColor: '#ABB1BB',
                                }}
                                selectedItemLabelStyle={{
                                  color: colors.green,
                                }}
                                searchTextInputProps={{
                                  borderWidth: 0.5,
                                  borderColor: 'rgb(193,193,193)',
                                  underlineColorAndroid: 'transparent',
                                  height: Platform.OS === 'ios' ? 30 : 30,
                                }}
                                scrollViewProps={true}
                                containerStyle={{
                                  height: 40,
                                  width: widthPercentageToDP(66),
                                }}
                                ArrowUpIconComponent={() => (
                                  <IconArrow
                                    name="chevron-up"
                                    size={24}
                                    color={colors.green}
                                  />
                                )}
                                ArrowDownIconComponent={() => (
                                  <IconArrow
                                    name="chevron-down"
                                    size={24}
                                    color={colors.green}
                                  />
                                )}
                              />

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                  marginTop: Platform.OS === 'ios' ? 0 : 20,
                                }}>
                                <View style={{}}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    Start Time
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setShowStartTimePickerIcon(true)
                                    }>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                      }}>
                                      <Dropdown
                                        value={staffStartTimeIcon}
                                        style={{
                                          width: widthPercentageToDP(30),
                                          height: 30,
                                          backgroundColor: colors.pureWhite,
                                          color: colors.darkBlue,
                                        }}
                                        pickerStyle={{
                                          marginTop: 20,
                                          marginLeft: 10,
                                        }}
                                      />
                                      <FontAwesome5
                                        style={{
                                          zIndex: 5,
                                          position: 'absolute',
                                          right: widthConverter(2),
                                        }}
                                        name="angle-down"
                                        size={20}
                                        color="#3EB561"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>

                                <View style={{}}>
                                  <Text
                                    style={{
                                      marginTop: 20,
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.darkGrey,
                                    }}>
                                    End Time
                                  </Text>

                                  <TouchableOpacity
                                    onPress={() =>
                                      setShowEndTimePickerIcon(true)
                                    }>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        marginLeft: 5,
                                      }}>
                                      <Dropdown
                                        value={staffEndTimeIcon}
                                        style={{
                                          width: widthPercentageToDP(30),
                                          height: 30,
                                          backgroundColor: colors.pureWhite,
                                        }}
                                        pickerStyle={{
                                          marginTop: 20,
                                          marginLeft: 10,
                                        }}
                                      />
                                      <FontAwesome5
                                        style={{
                                          zIndex: 5,
                                          position: 'absolute',
                                          right: widthConverter(2),
                                        }}
                                        name="angle-down"
                                        size={20}
                                        color="#3EB561"
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View
                                style={{
                                  marginTop: 20,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Quantity Needed
                                </Text>

                                <TextInput
                                  underlineColorAndroid="#D0D2D0"
                                  placeholder="Enter quantity needed"
                                  placeholderTextColor={colors.darkWhiteLow}
                                  onChangeText={(value) =>
                                    setStaffNeededIcon(value)
                                  }
                                  placeholderTextColor={colors.darkWhiteLow}
                                  keyboardType="number-pad"
                                  style={{
                                    flex: 1,
                                    height: heightPercentageToDP('5%'),
                                    fontFamily: 'Europa',
                                    fontSize: Platform.OS === 'ios' ? 17 : 17,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    width: '100%',
                                    borderBottomWidth:
                                      Platform.OS === 'ios' ? 1 : 0,
                                    borderBottomColor:
                                      Platform.OS === 'ios' ? '#D0D2D0' : null,
                                    color: colors.darkBlue,
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginTop: 20,
                                    fontFamily: 'Europa',
                                    fontSize: 15,
                                    fontWeight: 'normal',
                                    fontStyle: 'normal',
                                    letterSpacing: 0,
                                    color: colors.darkGrey,
                                  }}>
                                  Shift Fee
                                </Text>

                                <Dropdown
                                  // data={jobFeeData}
                                  data={jobFees}
                                  onChangeText={(item, value) => {
                                    setShiftFeeIcon(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );
                                    setTotalFee(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );
                                    setShiftRateIconArr(
                                      totalHours.split(' ')[0] *
                                        Number(item) *
                                        Number(staffNeededIcon),
                                    );

                                    //setShiftFeeIcon(item);
                                    setVissibleFourthShiftFee(
                                      item === 0 ? true : false,
                                    );
                                    // setShiftRateIconArr(
                                    //   jobFeeData[value]?.label,
                                    // );
                                  }}
                                  style={{
                                    width: widthPercentageToDP(65),
                                    height: 30,
                                    backgroundColor: colors.pureWhite,
                                  }}
                                  pickerStyle={{
                                    marginTop: 20,
                                    marginLeft: 10,
                                  }}
                                />
                                <FontAwesome5
                                  style={{
                                    zIndex: 5,
                                    position: 'absolute',
                                    right: widthConverter(2),
                                    top: heightConverter(25),
                                  }}
                                  name="angle-down"
                                  size={20}
                                  color="#3EB561"
                                />
                              </View>

                              {/* fegrjebnjk */}
                              {/* {vissibleThirdShiftFee ? (
                                <>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      marginTop: Platform.OS === 'ios' ? 20 : 5,
                                      color: colors.darkGrey,
                                    }}>
                                    Rate
                                  </Text>

                                  <View
                                    style={{
                                      flex: 1,
                                      width: '100%',
                                      flexDirection: 'row',
                                    }}>
                                    <Dropdown
                                      data={jobRateData}
                                      onChangeText={(item) => {
                                        setShiftRateIconArr(item);
                                      }}
                                      style={{
                                        height: 40,
                                        flex: 1,
                                        width: widthPercentageToDP(65),
                                        backgroundColor: colors.pureWhite,
                                      }}
                                      pickerStyle={{
                                        marginTop: 10,
                                        marginLeft: 15,
                                      }}
                                    />
                                    <View
                                      style={{
                                        paddingTop: 5,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: colors.darkGreyLow,
                                        marginBottom: 0.5,
                                      }}>
                                      <FontAwesome5
                                        name="angle-down"
                                        size={20}
                                        color={colors.green}
                                      />
                                    </View>
                                  </View>
                                </>
                              ) : null} */}

                              {/* fenvgnjkv */}
                              {vissibleFourthShiftFee ? (
                                <View
                                  style={{
                                    // marginTop: 20,
                                    // borderWidth: 0.5,
                                    // borderRadius: 10,
                                    // paddingLeft: 10,
                                    // paddingRight: 10,
                                    // paddingTop: 20,
                                    // paddingBottom: 20,
                                    width: '100%',
                                    borderColor: colors.darkGrey,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 15,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      marginTop: Platform.OS === 'ios' ? 20 : 5,
                                      color: colors.darkGrey,
                                      width: '100%',
                                      marginBottom:
                                        Platform.OS === 'ios' ? 10 : 0,
                                    }}>
                                    Rate per hour
                                  </Text>
                                  <TextInput
                                    placeholder="£0.00"
                                    underlineColorAndroid="#D0D2D0"
                                    keyboardType="number-pad"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(value) =>
                                      // setShiftFeeIcon(value)
                                      {
                                        setShiftFeeIcon(
                                          totalHours.split(' ')[0] *
                                            Number(value) *
                                            Number(staffNeededIcon),
                                        );
                                        setTotalFee(
                                          totalHours.split(' ')[0] *
                                            Number(value) *
                                            Number(staffNeededIcon),
                                        );
                                      }
                                    }
                                    style={{
                                      width: '100%',
                                      paddingBottom: 15,
                                      fontSize: 16,
                                      borderBottomWidth:
                                        Platform.OS === 'ios' ? 1 : 1,
                                      borderColor:
                                        Platform.OS === 'ios'
                                          ? 'rgb(193,193,193)'
                                          : 'rgb(193,193,193)',
                                      color: colors.darkBlue,
                                    }}
                                  />
                                </View>
                              ) : null}

                              <Text
                                style={{
                                  marginTop: 10,
                                  fontFamily: 'Europa',
                                  fontSize: 15,
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  letterSpacing: 0,
                                  color: colors.green,
                                  marginLeft: 5,
                                }}>
                                Total Time: {totalHours}
                              </Text>

                              <Text
                                style={{
                                  marginTop: 20,
                                  fontFamily: 'Europa',
                                  fontSize: RFValue(18, 812),
                                  fontWeight: 'normal',
                                  fontStyle: 'normal',
                                  lineHeight: 24,
                                  letterSpacing: 0,
                                  color: '#3EB561',
                                }}>
                                Total Fee Per Day: {'£' + shiftFeeIcon}
                              </Text>

                              <TouchableHighlight
                                onPress={() => saveDetailsFourthFunc()}
                                underlayColor="">
                                <View
                                  style={{
                                    width: '80%',
                                    borderRadius: 80,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    backgroundColor: colors.green,
                                    paddingBottom: 10,
                                    alignItems: 'center',
                                    marginTop: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'Europa',
                                      fontSize: 22,
                                      fontWeight: 'normal',
                                      fontStyle: 'normal',
                                      letterSpacing: 0,
                                      color: colors.pureWhite,
                                      marginTop:
                                        Platform.OS === 'ios' ? 10 : 10,
                                    }}>
                                    Save
                                  </Text>
                                </View>
                              </TouchableHighlight>
                            </View>
                          ) : null}
                        </>
                      ) : null}
                    </View>
                  ) : null}

                  <Text
                    style={{
                      marginTop: 20,
                      fontFamily: 'Europa',
                      fontSize: RFValue(18, 812),
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      lineHeight: 24,
                      letterSpacing: 0,
                      color: colors.darkGrey,
                    }}>
                    Additional Information?
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginTop: 20,
                        fontFamily: 'Europa',
                        fontSize: RFValue(18, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0,
                        color: isClientPublicPrivate
                          ? colors.darkBlue
                          : colors.darkGrey,
                      }}>
                      Client Public/Private
                    </Text>

                    <Switch
                      trackColor={{false: '#767577', true: '#767577'}}
                      thumbColor={
                        isClientPublicPrivate ? colors.green : '#f4f3f4'
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitchClient}
                      value={isClientPublicPrivate}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginTop: 20,
                        fontFamily: 'Europa',
                        fontSize: RFValue(18, 812),
                        fontWeight: 'normal',
                        fontStyle: 'normal',
                        lineHeight: 24,
                        letterSpacing: 0,
                        color: isJobPublicPrivate
                          ? colors.darkBlue
                          : colors.darkGrey,
                      }}>
                      Job Public/Private
                    </Text>

                    <Switch
                      trackColor={{false: '#767577', true: '#767577'}}
                      thumbColor={isJobPublicPrivate ? colors.green : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitchJob}
                      value={isJobPublicPrivate}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </View>

                  <Button
                    //onPress={() => selectPhotoFromCamera()}
                    textStyle={[styles.btnText, {color: colors.pureBlack}]}
                    style={{
                      width: widthPercentageToDP('84.6'),
                      borderRadius: widthPercentageToDP('12.8%') / 2,
                      marginTop: heightPercentageToDP('3%'),
                      alignSelf: 'flex-end',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.pureWhite,
                      borderWidth: 2,
                      borderColor: '#24334c',
                    }}>
                    UPLOAD ADDITIONAL INFO
                  </Button>

                  <Button
                    disabled={loading == false ? true : false}
                    onPress={props.handleSubmit}
                    textStyle={[styles.btnText, {color: colors.pureWhite}]}
                    style={{
                      width: widthPercentageToDP('84.6'),
                      borderRadius: widthPercentageToDP('12.8%') / 2,
                      marginTop: heightPercentageToDP('3%'),
                      marginBottom: heightPercentageToDP('12%'),
                      alignSelf: 'flex-end',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3EB561',
                    }}>
                    {loading == false ? (
                      <ActivityIndicator
                        size="large"
                        color={colors.darkBlueHigh}
                      />
                    ) : (
                      'GET ESTIMATE'
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>

          <DateTimePickerModal
            isVisible={showStartTimePickerIcon}
            date={new Date()}
            is24Hour={Platform.OS === 'android' ? true : false}
            locale="en_GB"
            mode="time"
            onConfirm={(time) => {
              StartTimeFuncIcon(time);
            }}
            onCancel={() => setShowStartTimePickerIcon(false)}
          />

          <DateTimePickerModal
            isVisible={showEndTimePickerIcon}
            date={new Date()}
            is24Hour={Platform.OS === 'android' ? true : false}
            locale="en_GB"
            mode="time"
            onConfirm={(time) => EndTimeFuncIcon(time)}
            onCancel={() => setShowEndTimePickerIcon(false)}
          />

          <DateTimePickerModal
            isVisible={showStartTimePicker}
            date={new Date()}
            is24Hour={Platform.OS === 'android' ? true : false}
            locale="en_GB"
            mode="time"
            onConfirm={(time) => {
              StartTimeFunc(time);
            }}
            onCancel={() => setshowStartTimePicker(false)}
          />

          <DateTimePickerModal
            isVisible={showEndTimePicker}
            date={new Date()}
            is24Hour={Platform.OS === 'android' ? true : false}
            locale="en_GB"
            mode="time"
            onConfirm={(time) => EndTimeFunc(time)}
            onCancel={() => setshowEndTimePicker(false)}
          />

          <DateTimePickerModal
            isVisible={showDatePicker}
            date={new Date()}
            minimumDate={new Date()}
            mode="date"
            onConfirm={
              (date) => dateFunc(date)
              // validDate: true,
            }
            onCancel={() => setshowEndTimePicker(false)}
          />

          <DateTimePickerModal
            isVisible={showStartDatePicker}
            date={new Date()}
            minimumDate={new Date()}
            mode="date"
            onConfirm={(date) =>
              StartDateFunc(moment(date).format('YYYY-MM-DD'))
            }
            onCancel={() => setshowStartDatePicker(false)}
          />

          <DateTimePickerModal
            isVisible={showEndDatePicker}
            date={new Date()}
            minimumDate={new Date()}
            mode="date"
            onConfirm={(date) => EndDateFunc(moment(date).format('YYYY-MM-DD'))}
            onCancel={() => setshowEndDatePicker(false)}
          />

          <DateTimePickerModal
            isVisible={showExpireDatePicker}
            date={new Date()}
            minimumDate={new Date()}
            mode="date"
            onConfirm={(date) =>
              ExpireDateFunc(moment(date).format('YYYY-MM-DD'))
            }
            onCancel={() => setshowExpireDatePicker(false)}
          />

          <Modal transparent animationType="fade" visible={vissibleAddress}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: '60%',
                  backgroundColor: colors.pureWhite,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 20,
                }}>
                {Platform.OS === 'ios' ? (
                  <TouchableWithoutFeedback
                    onPress={() => setVissibleAddress(false)}
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
                    <IconCross
                      name="cross"
                      size={20}
                      color={colors.pureWhite}
                    />
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableOpacity1
                    onPress={() => setVissibleAddress(false)}
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
                    <IconCross
                      name="cross"
                      size={20}
                      color={colors.pureWhite}
                    />
                  </TouchableOpacity1>
                )}

                <View
                  style={{
                    width: '80%',
                    borderRadius: 80,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#24334c',
                    paddingBottom: 10,
                    marginTop: 10,
                    alignItems: 'center',
                    marginBottom: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Europa',
                      fontSize: 22,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: colors.pureWhite,
                      marginTop: Platform.OS === 'ios' ? 10 : 10,
                    }}>
                    Job Location
                  </Text>
                </View>

                <GooglePlacesAutocomplete
                  placeholder={'Search Location'}
                  placeholderColor={colors.darkWhiteLow}
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  renderDescription={(rows) => rows.description}
                  GooglePlacesSearchQuery={{rankby: 'distance'}}
                  currentLocation={true}
                  currentLocationLabel="Current Location"
                  onPress={(data, details = true) => {
                    console.log({details});
                    console.log({data});
                    setCheck(false);
                    setJobAddress(details?.formatted_address);
                    setJobLat(details?.geometry?.location?.lat);
                    setJobLong(details?.geometry?.location?.lng);
                    setVissibleAddress(false);
                  }}
                  query={{
                    key: 'AIzaSyBNV92EMn5F4vAb76qz3V6Ufn3CQBi6bVM',
                    language: 'en',
                    //types: '(cities)'
                  }}
                  listUnderlayColor={colors.green}
                  styles={{
                    textInputContainer: {
                      borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
                      borderBottomColor:
                        Platform.OS === 'ios' ? '#24334c' : '#24334c',
                      width: '90%',
                      marginLeft: 20,
                      marginRight: 20,
                      zIndex: 1,
                      borderRadius: 20,
                    },
                    textInput: {
                      height: 38,
                      color: colors.darkBlue,
                      fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                      color: colors.darkBlue,
                      marginLeft: 40,
                      marginRight: 40,
                      height: 20,
                    },
                    container: {
                      height: '10%',
                      borderRadius: 20,
                    },
                  }}
                />
              </View>
            </View>
          </Modal>

          <Modal transparent animationType="fade" visible={false}>
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
                      ? heightPercentageToDP(68)
                      : heightPercentageToDP(88),
                  backgroundColor: colors.pureWhite,
                  width: widthPercentageToDP('85%'),
                  borderWidth: 5,
                  borderColor: '#24334c',
                  borderRadius: 20,
                  alignSelf: 'center',
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={true}
                  style={{
                    flex: 1,
                  }}>
                  {Platform.OS === 'ios' ? (
                    <TouchableWithoutFeedback
                      onPress={() => setVissibleShiftsFirst(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableOpacity1
                      onPress={() => setVissibleShiftsFirst(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableOpacity1>
                  )}

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
                      color: colors.darkBlue,
                    }}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    editable={false}
                    placeholder={
                      shiftAddressIconArrFinal[vissibleShiftsIndexFirst]
                    }
                    placeholderTextColor={colors.pureBlack}
                  />

                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
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
                      Quantity Needed
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
                        color: colors.darkBlue,
                      }}
                      multiline={true}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        staffNeededIconArrFinal[vissibleShiftsIndexFirst]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Shift Role
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      //  placeholder={shiftRoleIconArrFinal[vissibleShiftsIndexFirst]}
                      placeholderTextColor={colors.pureBlack}
                    />
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
                      Shift Fee
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={shiftFeeIconArrFinal[vissibleShiftsIndexFirst]}
                      placeholderTextColor={colors.pureBlack}
                    />

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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={
                      //   startTimeArr[0] +
                      //   ' - ' +
                      //   endTimeArr[0]
                      // }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Job Role Description
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        shiftRoleDescriptionIconArrFinal[
                          vissibleShiftsIndexFirst
                        ]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal transparent animationType="fade" visible={false}>
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
                      ? heightPercentageToDP(68)
                      : heightPercentageToDP(88),
                  backgroundColor: colors.pureWhite,
                  width: widthPercentageToDP('85%'),
                  borderWidth: 5,
                  borderColor: '#24334c',
                  borderRadius: 20,
                  alignSelf: 'center',
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={true}
                  style={{
                    flex: 1,
                  }}>
                  {Platform.OS === 'ios' ? (
                    <TouchableWithoutFeedback
                      onPress={() => setVissibleShiftsSecond(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableOpacity1
                      onPress={() => setVissibleShiftsSecond(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableOpacity1>
                  )}

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
                      color: colors.darkBlue,
                    }}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    editable={false}
                    placeholder={
                      shiftAddressIconArrFinal[vissibleShiftsIndexSecond]
                    }
                    placeholderTextColor={colors.pureBlack}
                  />

                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
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
                      Quantity Needed
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
                        color: colors.darkBlue,
                      }}
                      multiline={true}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        staffNeededIconArrFinal[vissibleShiftsIndexSecond]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Shift Role
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      //  placeholder={shiftRoleIconArrFinal[vissibleShiftsIndexSecond]}
                      placeholderTextColor={colors.pureBlack}
                    />
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
                      Shift Fee
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={shiftFeeIconArrFinal[vissibleShiftsIndexSecond]}
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Date
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
                        letterSpacing: 0,
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholderTextColor={colors.pureBlack}
                    />

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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={
                      //   startTimeArr[0] +
                      //   ' - ' +
                      //   endTimeArr[0]
                      // }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Job Role Description
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        shiftRoleDescriptionIconArrFinal[
                          vissibleShiftsIndexSecond
                        ]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal transparent animationType="fade" visible={false}>
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
                      ? heightPercentageToDP(68)
                      : heightPercentageToDP(88),
                  backgroundColor: colors.pureWhite,
                  width: widthPercentageToDP('85%'),
                  borderWidth: 5,
                  borderColor: '#24334c',
                  borderRadius: 20,
                  alignSelf: 'center',
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={true}
                  style={{
                    flex: 1,
                  }}>
                  {Platform.OS === 'ios' ? (
                    <TouchableWithoutFeedback
                      onPress={() => setVissibleShiftsThird(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableOpacity1
                      onPress={() => setVissibleShiftsThird(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableOpacity1>
                  )}

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
                      color: colors.darkBlue,
                    }}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    editable={false}
                    placeholder={
                      shiftAddressIconArrFinal[vissibleShiftsIndexThird]
                    }
                    placeholderTextColor={colors.pureBlack}
                  />

                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
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
                      Quantity Needed
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
                        color: colors.darkBlue,
                      }}
                      multiline={true}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        staffNeededIconArrFinal[vissibleShiftsIndexThird]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Shift Role
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      //  placeholder={shiftRoleIconArrFinal[vissibleShiftsIndexThird]}
                      placeholderTextColor={colors.pureBlack}
                    />
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
                      Shift Fee
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={shiftFeeIconArrFinal[vissibleShiftsIndexThird]}
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Date
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
                        letterSpacing: 0,
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={
                      //   start[0] +
                      //   ' - ' +
                      //   endDateArr[0]
                      // }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={
                      //   startTimeArr[0] +
                      //   ' - ' +
                      //   endTimeArr[0]
                      // }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Job Role Description
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        shiftRoleDescriptionIconArrFinal[
                          vissibleShiftsIndexThird
                        ]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal transparent animationType="fade" visible={false}>
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
                      ? heightPercentageToDP(68)
                      : heightPercentageToDP(88),
                  backgroundColor: colors.pureWhite,
                  width: widthPercentageToDP('85%'),
                  borderWidth: 5,
                  borderColor: '#24334c',
                  borderRadius: 20,
                  alignSelf: 'center',
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={true}
                  style={{
                    flex: 1,
                  }}>
                  {Platform.OS === 'ios' ? (
                    <TouchableWithoutFeedback
                      onPress={() => setVissibleShiftsFourth(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableOpacity1
                      onPress={() => setVissibleShiftsFourth(false)}
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
                      <IconCross
                        name="cross"
                        size={20}
                        color={colors.pureWhite}
                      />
                    </TouchableOpacity1>
                  )}

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
                      color: colors.darkBlue,
                    }}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    editable={false}
                    placeholder={
                      shiftAddressIconArrFinal[vissibleShiftsIndexFourth]
                    }
                    placeholderTextColor={colors.pureBlack}
                  />

                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
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
                      Quantity Needed
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
                        color: colors.darkBlue,
                      }}
                      multiline={true}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        staffNeededIconArrFinal[vissibleShiftsIndexFourth]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Shift Role
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      //  placeholder={shiftRoleIconArrFinal[vissibleShiftsIndexFourth]}
                      placeholderTextColor={colors.pureBlack}
                    />
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
                      Shift Fee
                    </Text>
                    <TextInput
                      style={{
                        width: '90%',
                        paddingLeft: Platform.OS === 'ios' ? 0 : 0,
                        height: Platform.OS === 'ios' ? '6%' : '7.5%',
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={shiftFeeIconArrFinal[vissibleShiftsIndexFourth]}
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Date
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
                        letterSpacing: 0,
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={
                      //   start[0] +
                      //   ' - ' +
                      //   endDateArr[0]
                      // }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      // placeholder={
                      //   startTimeArr[0] +
                      //   ' - ' +
                      //   endTimeArr[0]
                      // }
                      placeholderTextColor={colors.pureBlack}
                    />

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
                      Job Role Description
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
                        color: colors.darkBlue,
                      }}
                      underlineColorAndroid="transparent"
                      editable={false}
                      placeholder={
                        shiftRoleDescriptionIconArrFinal[
                          vissibleShiftsIndexFourth
                        ]
                      }
                      placeholderTextColor={colors.pureBlack}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </>
    </Container>
  );
}
