import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {connect} from 'react-redux';

import {Header} from './../../components/header';
import {color} from '../../theme';
import styles from './styles';
import {Button} from './../../components/button';
import {onEditProfile} from './../../redux/actions/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const genderRadioButtons = [
  {id: 0, value: 'Male'},
  {id: 1, value: 'Female'},
];

class EditAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: 'Gender',
      phoneNumber: '',
      genderModal: false,
      countryCode: '',
      emailId: '',
      dob: '',
      isSelected: true,
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }
  onCheckBox(value) {
    this.setState({isSelected: !this.state.isSelected});
  }
  async onProceed() {
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.gender ||
      !this.state.dob ||
      !this.state.emailId
    ) {
      Alert.alert(
        'ClimateLink',
        'Please enter all the required fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (!this.validateEmail(this.state.emailId)) {
      Alert.alert(
        'ClimateLink',
        'Please enter a valid email',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (this.state.gender == 'Gender') {
      Alert.alert(
        'ClimateLink',
        'Please choose gender',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      const {result} = this.props.route.params.user;
      let editProfileInfo = {
        userID: result.uid,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dateOfBirth: this.state.dob,
        gender: this.state.selectedRadioButton,
        email: this.state.emailId.trim(),
        isSocialLogin: false,
        phoneNumber: this.state.phoneNumber,
        userName: this.state.firstName + ' ' + this.state.lastName,
      };
      console.log(editProfileInfo);
      await this.props.onEditProfile(editProfileInfo);
      console.log(this.props.user.editProfile);

      if (this.props.user.editProfile.message == 'PUT Request successful.') {
        console.log(this.props.user);
        Alert.alert(
          'ClimateLink',
          'Account details Updated Successfully',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'ClimateLink',
          'Something Went Wrong',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    }
  }
  componentDidMount() {
    const {result} = this.props.route.params.user;
    if (result) {
      console.log(result);
      this.setState({
        firstName: result.firstName,
        lastName: result.lastName,
        gender:
          result.gender == 0
            ? 'Male'
            : result.gender == null
            ? 'Gender'
            : 'Female',
        phoneNumber: result.phoneNumber,
        emailId: result.email,
        dob: result.dateOfBirth,
      });
    }
  }

  validateEmail = email => {
    var re = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {
    console.log(this.state);
    return (
      <View style={{flex: 1, backgroundColor: '#E8E8E8'}}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={{flex: 1, backgroundColor: '#E8E8E8'}}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text style={styles.headerText}>Edit Account Details</Text>
            </Header>
            <View style={{flex: 1, backgroundColor: '#fff', margin: 4}}>
              <View style={{marginTop: windowWidth * 0.0367}}>
                <View style={styles.textInputContainer}>
                  <Text style={styles.commonText}>First Name : </Text>
                  <TextInput
                    placeholder={'First Name'}
                    value={this.state.firstName}
                    style={styles.textInputAllignment}
                    onChangeText={text => this.setState({firstName: text})}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <Text style={styles.commonText}>Last Name : </Text>
                  <TextInput
                    placeholder={'Last Name'}
                    value={this.state.lastName}
                    style={styles.textInputAllignment}
                    onChangeText={text => this.setState({lastName: text})}
                  />
                </View>
                <TouchableOpacity
                  style={styles.textInputContainer}
                  onPress={() => {
                    this.setState({genderModal: true});
                  }}>
                  <Text style={styles.commonText}>Gender : </Text>
                  <Text
                    style={
                      this.state.gender != 'Gender'
                        ? styles.genderTextStyle
                        : styles.genderPlaceHolderStyle
                    }>
                    {this.state.gender}
                  </Text>
                </TouchableOpacity>
                <View style={styles.textInputContainer}>
                  <Text style={styles.commonText}>
                    Phone Number : {this.state.countryCode}{' '}
                    {this.state.phoneNumber}
                  </Text>
                </View>
                <View style={styles.textInputContainer}>
                  <Text style={styles.commonText}>Date of Birth : </Text>
                  <DatePicker
                    style={styles.datePicker}
                    allowFontScaling={false}
                    date={this.state.dob}
                    mode="date"
                    placeholder="Date of Birth"
                    format={'YYYY-MM-DD'}
                    //minDate={moment().format("DD-MM-YYYY")}
                    // maxDate={moment().format('YYYY-MM-DD')}
                    maxDate={moment().subtract(18, 'years')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={true}
                    onDateChange={date => {
                      console.log('DD-MM-YYYY:', date);
                      this.setState({dob: date, dobError: ''});
                    }}
                    onCloseModal={() => {
                      if (this.state.dob == '') {
                        this.setState({
                          dobError: 'Date of Birth field should not be empty',
                        });
                      }
                    }}
                    customStyles={{
                      dateText: {
                        color: 'black',
                        fontSize: windowWidth * 0.0436,
                        fontFamily: 'CenturyGothic',
                      },
                      placeholderText: {
                        color: color.lightGrey,
                        fontSize: windowWidth * 0.0436,
                        fontFamily: 'CenturyGothic-Bold',
                      },
                      dateInput: styles.datePickerInput,
                    }}
                    iconComponent={
                      <Icon
                        type="MaterialCommunityIcons"
                        name="calendar-range"
                        style={{
                          color: color.lightGrey,
                          fontSize: windowWidth * 0.0766,
                          marginLeft: 'auto',
                        }}
                      />
                    }></DatePicker>
                </View>

                <View style={styles.textInputContainer}>
                  <Text style={styles.commonText}>Email ID : </Text>
                  <TextInput
                    placeholder={'Email Id'}
                    value={this.state.emailId}
                    style={styles.textInputAllignment}
                    onChangeText={text => this.setState({emailId: text})}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 30,
                  marginHorizontal: 26,
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{flexDirection: 'row'}}
                  onPress={this.onCheckBox.bind(this)}>
                  <Icon
                    type="MaterialIcons"
                    name={
                      this.state.isSelected == false
                        ? 'check-box-outline-blank'
                        : 'check-box'
                    }
                    style={[
                      styles.checkBox,
                      {
                        color:
                          this.state.isSelected == false ? 'grey' : 'black',
                      },
                    ]}
                  />

                  <Text style={styles.checkBoxText}>
                    I Agree the Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                style={styles.enableButton}
                onPress={this.onProceed.bind(this)}>
                <Text style={styles.enableButtonText}>PROCEED</Text>
              </Button>
            </View>
            <Modal isVisible={this.state.genderModal}>
              <View style={styles.modalShareBox}>
                <Text
                  style={{
                    fontSize: windowWidth * 0.0516,
                    fontFamily: 'CenturyGothic',
                    color: color.primaryColor,
                    marginBottom: windowWidth * 0.0146,
                  }}>
                  Select Gender
                </Text>
                <View style={{}}>
                  {genderRadioButtons.map((res, i) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => {
                          this.setState({
                            selectedRadioButton: res.id,
                            gender: res.value,
                            genderModal: false,
                          });
                        }}>
                        <Text style={styles.modalShareText}>{res.value}</Text>

                        <Icon
                          type={'Ionicons'}
                          name={
                            this.state.selectedRadioButton == res.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          style={{
                            color: 'black',
                            fontSize: windowWidth * 0.06,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {onEditProfile},
)(EditAccountDetails);
