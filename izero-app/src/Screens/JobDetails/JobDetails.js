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
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api/index';

export default function JobDetails({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const jwt = useSelector((state) => state?.auth?.accessToken);
  const [jobName, setJobName] = useState('');
  const [jobAddress, setJobAddress] = useState('');
  const [jobFee, setJobFee] = useState('');
  const [jobUsers, setJobUsers] = useState([]);
  const [avatar, setAvatar] = useState('');

  let data = route?.params;
  let jobID = data?.jobID;
  let statusJob = data?.statusJob;

  useEffect(() => {
    getJobDetails();
    console.log('JobDetailsTalent');
  }, []);

  const getJobDetails = async () => {
    setLoading(false);
    try {
      let res = await Api.get(`/job_detail?job_id=${jobID}`, {
        headers: {Authorization: `Bearer ${jwt}`, Accept: 'application/json'},
      });
      console.log('Job Details API For Staff Side res', res);
      setLoading(true);
      setJobName(res?.data?.data?.title);
      setJobAddress(res?.data?.data?.location);
      setJobUsers(res?.data?.data?.job_users);
      setAvatar(res?.data?.data?.logo);
      let jobFee = [];
      let TotalJobFee = 0;

      for (var v = 0; v < res?.data?.data?.shifts?.length; v++) {
        jobFee[v] = parseFloat(res?.data?.data?.shifts[v]?.total_pay);
        TotalJobFee = TotalJobFee + parseFloat(jobFee[v]);
      }
      setJobFee(TotalJobFee);
    } catch (error) {
      setLoading(true);
      console.log({error});
    }
  };

  return (
    <Container>
        <DetailsHeader
          checkJobDetails={true}
          name={jobName}
          address={jobAddress}
          fee={jobFee}
          avatar={avatar}
          onBack={() => navigation.goBack()}
        />
      <Tabs jobID={jobID} statusJob={statusJob}/>
      {/* </ScrollView> */}
      {/* <Heading containerStyle={styles.conSTyle} style={styles.textStyle}>
        Please confirm the shift you would like to apply for{' '}
      </Heading>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <ShiftCard />
        <ShiftCard />
      </ScrollView>
      <View style={styles.sticky}>
        <Button style={styles.Button}>APPLY FOR SHIFT(S)</Button>
      </View> */}
    </Container>
  );
}
