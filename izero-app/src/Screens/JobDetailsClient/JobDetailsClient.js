import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {
  Container,
  DetailsHeader,
  Heading,
  JobCard,
  ShiftCard,
  Button,
} from '../../Components';
import {Oval} from '../../Assets/Graphics';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Helpers/Responsive';
import styles from './Styles';
import Tabs from './Tabs/Tabs';
import colors from '../../Constants/colors';

import Api from '../../api/index';

import types from '../../Redux/types';

import {useDispatch, useSelector} from 'react-redux';

export default function JobDetailsClient({navigation, route}) {
  const [loading, setLoading] = useState(false);

  let data = route?.params;
  let shiftID = data?.shiftID;
  let jobID = data?.jobID;
  let status = data?.status;

  const jwt = useSelector((state) => state?.auth?.accessToken);

  const jobDetails = useSelector((state) => state?.app?.jobDetails);

  const dispatch = useDispatch();

  const [jobName, setJobName] = useState(jobDetails?.job?.title);
  const [jobAddress, setJobAddress] = useState(jobDetails?.job?.title);
  const [shiftFee, setShiftFee] = useState(jobDetails?.job_fee);

  console.log('jobDetails', jobDetails);

  useEffect(() => {
    console.log('JobDetailsClient');
    //getJobDetails();
  }, []);

  // const getJobDetails = async () => {
  //   setLoading(true);
  //   try {
  //     let res = await Api.get(`/jobshiftdetail?id=${shiftID}`, {
  //       headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
  //     });
  //     console.log('Job Details Header Employer side API res', res);

  //     setJobName(res?.data?.data?.job?.title);
  //     setShiftFee(res?.data?.data?.job_fee);
  //     setJobAddress(res?.data?.data?.job?.title);

  //     dispatch({
  //       type: types?.JOB_DETAILS,
  //       jobDetails: res?.data?.data,
  //     });

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log({error});
  //   }
  // };

  return (
    <Container>
      <DetailsHeader
        checkJobDetails={true}
        name={jobName}
        //address={jobAddress}
        fee={shiftFee}
        status={false}
        onBack={() => navigation?.goBack()}
      />
      <Tabs jobID={jobID} shiftID={shiftID} status={status} />
    </Container>
  );
}
