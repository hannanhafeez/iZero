import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Container, RatingButton} from '../../../Components';
import {widthConverter, heightConverter} from '../../../Helpers/Responsive';
import {RFValue} from 'react-native-responsive-fontsize';
import {ChatIcon} from '../../../Assets/Icons';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../Constants/colors';

export default function Description() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const navigation = useNavigation();
  const toggleModal = () => {
    //this.setState({ isModalVisible: !this.state.isModalVisible });

    setisModalVisible(!isModalVisible);
  };
  return (
    <Container>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {}}>
        <TouchableOpacity
          onPress={() => {
            // this.setState({isVisible: false});
            setisModalVisible(false);
          }}
          style={styles.reverseTouchable}
        />
        <View style={styles.ModalArea}>
          <Text
            style={[
              styles.textContent,
              {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
            ]}>
            Employert Review:
          </Text>
          <Text
            style={[
              styles.textContent,
              {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
            ]}>
            Craig Wilkinson
          </Text>
          <Text style={styles.textContent}>
            Craig Wilkinson relly impressed Craig Wilkinson relly impressed
            Craig Wilkinson relly impressed Craig Wilkinson relly impressed
            Craig Wilkinson relly impressed Craig Wilkinson relly impressed
            Craig Wilkinson relly impressed Craig Wilkinson relly impressed
          </Text>
          <View style={[styles.sticky]}>
            <RatingButton
              onPress={() =>
                //  navigation.navigate('SelectShifts')
                setisModalVisible(true)
              }
              style={{
                width: widthConverter(261),
                height: heightConverter(50),
                backgroundColor: colors.pureWhite,
                borderWidth: 1,
                borderColor: '#24334C',
              }}
              textStyle={{color: '#24334C'}}>
              View Rating
            </RatingButton>
            <View style={styles.iconCon}>
              <ChatIcon
                width={widthConverter(30)}
                height={heightConverter(28)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.row}>
        <View style={styles.tag}>
          <Text style={styles.text}>Wed 25 Jun</Text>
        </View>
        <View style={[styles.tag, styles.outlined]}>
          <Text style={[styles.text, {color: '#5b6679'}]}>10:00 - 17:30</Text>
        </View>
      </View>

      <View style={styles.second}>
        <View style={[styles.tag, {backgroundColor: '#3EB561'}]}>
          <Text style={[styles.text, {color: colors.pureWhite}]}>Completed</Text>
        </View>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          About Job
        </Text>
        <Text style={styles.textContent}>
          You will be directly responsible for driving brand awareness and
          delivering sales within Southampton by engaging with potential
          customers at local events and at their premises. We are looking for
          rock star sales people that have the potential and want the
          opportunity to earn money!
        </Text>
      </View>

      {/* <View style={[styles.second]}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          Job location
        </Text>
      </View>
      <Image
        source={require('../../../Assets/Demo/Maps.png')}
        style={styles.map}
      />

      <View style={styles.second}>
        <Text
          style={[
            styles.textContent,
            {fontFamily: 'Europa-Bold', marginBottom: heightConverter(5)},
          ]}>
          Job Responsibilities
        </Text>
        <Text style={styles.textContent}>• Brand Awareness</Text>
        <Text style={styles.textContent}>• Create excitement in the brand</Text>
        <Text style={styles.textContent}>
          • Participate in awareness and promotional
        </Text>
        <Text style={styles.textContent}>
          {'  '}campaigns, engaging with customers, attending
        </Text>
        <Text style={styles.textContent}>
          {'  '}events including community centres, shopping
        </Text>
        <Text style={styles.textContent}>{'  '}centres, outdoor events</Text>
        <Text style={styles.textContent}>• Customer Generation</Text>
        <Text style={styles.textContent}>
          • Follow up on leads generated at brand awareness events, drive sales
          whilst maintaining brand image
        </Text>
      </View> */}

      <View style={styles.sticky}>
        <RatingButton
          onPress={() =>
            //  navigation.navigate('SelectShifts')
            setisModalVisible(true)
          }
          style={{
            width: widthConverter(261),
            height: heightConverter(50),
            backgroundColor: colors.pureWhite,
            borderWidth: 1,
            borderColor: '#24334C',
          }}
          textStyle={{color: '#24334C'}}>
          View Rating
        </RatingButton>
        <View style={styles.iconCon}>
          <ChatIcon width={widthConverter(30)} height={heightConverter(28)} />
        </View>
      </View>
    </Container>
  );
}

// Create excitement in the brand
// Participate in awareness and promotional campaigns, engaging with customers, attending events including community centres, shopping centres, outdoor events
// Customer Generation
// Follow up on leads generated at brand awareness events, drive sales whilst maintaining brand image

const styles = StyleSheet.create({
  tag: {
    width: widthConverter(96),
    height: heightConverter(26),
    borderRadius: widthConverter(13),
    backgroundColor: 'rgba(62, 181, 97, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthConverter(12),
  },
  text: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(14, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#3eb561',
  },
  row: {
    flexDirection: 'row',
    width: widthConverter(331),
    alignSelf: 'center',
    marginTop: heightConverter(40),
    marginBottom: heightConverter(19),
  },
  outlined: {
    backgroundColor: colors.pureWhite,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGreyHigh,
  },
  second: {
    width: widthConverter(331),
    marginBottom: heightConverter(19),
    alignSelf: 'center',
  },
  textContent: {
    fontFamily: 'Europa-Regular',
    fontSize: RFValue(17, 812),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 25,
    letterSpacing: 0,
    color: '#24334c',
  },
  sticky: {
    height: heightConverter(105),
    width: widthConverter(375),
    paddingHorizontal: widthConverter(22),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.3,
    borderColor: colors.darkGreyHigh,
  },
  iconCon: {
    width: heightConverter(50),
    height: heightConverter(50),
    borderRadius: widthConverter(50) / 2,
    backgroundColor: '#24334c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: widthConverter(375),
    height: widthConverter(232),
    marginBottom: heightConverter(19),
  },
  reverseTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#37465C',
    opacity: 0.9,
    width: '100%',
    height: '55%',

    //position: "absolute",
    top: 0,
  },
  ModalArea: {
    backgroundColor: colors.pureWhite,
    padding: 10,
    width: '100%',
    height: '46%',

    bottom: 0,
  },
});
