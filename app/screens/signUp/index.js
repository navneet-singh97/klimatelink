import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import {Header} from './../../components/header';
import {TextField} from './../../components/textInput';
import {Button} from './../../components/button';
import {color} from '../../theme';
import DatePicker from 'react-native-datepicker';
import {Icon} from 'native-base';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
// import PhoneInput from './../../components/phoneInput';
import AnimatedLoader from 'react-native-animated-loader';
import PhoneInput from 'react-native-phone-number-input';
import ImagePicker from 'react-native-image-crop-picker';
import SafeAreaView from 'react-native-safe-area-view';

import {connect} from 'react-redux';
import {uploadProfile, signUp} from '../../redux/actions/user';
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import database from '@react-native-firebase/database';
const genderRadioButtons = [
  {id: 0, value: 'Male'},
  {id: 1, value: 'Female'},
];

interface Props {
  navigation: any;
  signUp: any;
  user: any;
}

interface userInformation {
  firstName: any;
  lastName: any;
  gender: any;
  phoneNo: any;
  dob: any;
  emailId: any;
  password: any;
  isSelected: any;
  enableButton: any;
  firstNameError: any;
  lastNameError: any;
  userName: any;
  genderError: any;
  phoneNoError: any;
  dobError: any;
  emailIdError: any;
  passwordError: any;
  userNameError: any;
  userId: any;
  tokenCode: any;
  visible: any;
}

let ChoosePics = [
  {
    title: 'Take Photo',
    icon: 'camera',
  },
  {
    title: 'Choose from Gallery',
    icon: 'photo',
  },
];

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      gender: 'Gender',
      phoneNo: '',
      dob: '',
      emailId: '',
      password: '',
      isSelected: false,
      enableButton: false,
      firstNameError: '',
      lastNameError: '',
      userNameError: '',
      genderError: '',
      phoneNoError: '',
      dobError: '',
      emailIdError: '',
      passwordError: '',
      userId: '',
      tokenCode: '',
      visible: this.props.user.loader,
      openDropDownPicker: false,
      genderModal: false,
      phoneNo: '',
      formattedphoneNo: '',
      phoneNoValid: '',
      hidePassword: true,
      callingCode: '+91',
      profilePicModal: false,
      userProfilePic: '',
      profilePicBase64: '',
      profilePicError: '',
      showLoader: false,
    };
  }

  onLeft() {
    //alert("onLeft");
    this.props.navigation.goBack();
  }

  async onChoosePic(val) {
    if (val === 'Take Photo') {
      await this.setState({profilePicModal: false});
      setTimeout(async () => {
        await this.onSelectCamera();
      }, 1000);
    } else {
      await this.setState({profilePicModal: false});
      setTimeout(async () => {
        await this.onSelectGallery();
      }, 1000);
    }
  }

  async onSelectCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        console.log('onSelectCamera', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadProfile(this.state.profilePicBase64);
          await this.setState({
            userProfilePic: this.props.user.uploadProfile.result,
          });
        });
      })
      .catch(error => {
        console.log('onSelectCamera_error', error);
      });
  }

  async onSelectGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        console.log('onSelectGallery', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadProfile(this.state.profilePicBase64);
          await this.setState({
            userProfilePic: this.props.user.uploadProfile.result,
          });
        });
      })
      .catch(error => {
        console.log('onSelectGallery_error', error);
      });
  }

  validateEmail = email => {
    var re = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword = password => {
    var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
  };

  async onProceed() {
    //alert("onProceed");
    console.log(
      this.state.firstName +
        '....' +
        this.state.lastName +
        '....' +
        this.state.selectedRadioButton +
        '....' +
        this.state.phoneNo +
        '....' +
        this.state.dob +
        '....' +
        this.state.emailId +
        '....' +
        this.state.password +
        '....' +
        this.state.isSelected,
    );
    if (
      this.state.firstName == '' ||
      this.state.lastName == '' ||
      // this.state.userName == "" ||
      this.state.gender == '' ||
      this.state.phoneNo == '' ||
      this.state.dob == '' ||
      this.state.emailId == '' ||
      this.state.password == ''
    ) {
      Alert.alert(
        'ClimateLink',
        'Please enter all the required fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (!this.validateEmail(this.state.emailId)) {
      this.setState({emailIdError: 'Please enter a valid email'});
    }
    // else if (this.state.phoneNo.length == 0) {
    //   this.setState({ phoneNoError: "Please enter phone no" });
    // }
    // else if (this.state.phoneNo == '') {
    //   this.setState({phoneNoError: 'Please enter a phone number'});
    // }
    else if (this.phoneInput.isValidNumber(this.state.phoneNo) == false) {
      Alert.alert(
        'ClimateLink',
        'Phone number not valid',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (
      this.state.password.length < 8 ||
      this.state.password.length > 10
    ) {
      this.setState({
        passwordError: 'Password range should between 8 and 10',
      });
    } else if (!this.validatePassword(this.state.password)) {
      this.setState({
        passwordError:
          'Password must contain atleast one captial letter, atleast one digit and atleast one special character',
      });
    }
    //  else if (this.state.userProfilePic == '') {

    //   Alert.alert(
    //     'ClimateLink',
    //     'Please select your profile pic.',
    //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //     {cancelable: false},
    //   );
    // }
    else if (this.state.isSelected == false) {
      Alert.alert(
        'ClimateLink',
        'Please Select Terms & Conditions.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      try {
        let callingCountryCode = this.phoneInput.getCallingCode();
        this.setState({callingCode: '+' + callingCountryCode}, async () => {
          console.log('callingCountryCode', this.state.callingCode);
        });

        this.setState({showLoader: true, phoneNoError: ''});
        let userObj = {
          firstName: this.state.firstName.trim(),
          lastName: this.state.lastName.trim(),
          gender: this.state.selectedRadioButton,
          phoneNumber: this.state.phoneNo,
          phoneNumberCode: this.state.callingCode,
          dateOfBirth: this.state.dob,
          email: this.state.emailId.trim(),
          password: this.state.password,
          isAcceptedTc: this.state.isSelected,
          emailConfirmed: false,
          phoneNumberConfirmed: false,
          userName:
            this.state.firstName.trim() + ' ' + this.state.lastName.trim(),
          about: '',
          address: '',
          profilePicPath: this.state.userProfilePic,
        };

        await this.props.signUp(userObj);
        //if (this.props.user.loader === false) {
        console.log('this.props.user_signup', this.props.user);
        if (this.props.user.register.message == 'POST Request successful.') {
          var resultUserID = this.props.user.register.result.uid;
          this.setState({showLoader: false});

          await this.props.navigation.push('RegisterSuccessfull', {
            navigateFrom: 'SignUp Screen',
            userId: resultUserID,
          });
        } else {
          this.setState({showLoader: false});
          console.log('Some Error');
          let Error = this.props.user.register.responseException
            .exceptionMessage;
          Alert.alert(
            'ClimateLink',
            Error,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
        //}
      } catch (err) {
        this.setState({showLoader: false});
        console.log('registration_error', err);
      }
    }
  }

  setSelection(value: any) {
    //alert("setSelection", value);
  }

  onCheckBox(value) {
    this.setState({isSelected: value});
    if (this.state.isSelected == true) {
      this.setState({isSelected: false});
    } else {
      this.setState({isSelected: true});
    }
    //alert(value);
  }

  async getPhoneNo(val) {
    console.log('phoneonUpdate', val);
    await this.setState({phoneNo: val});
  }

  componentDidMount() {
    // var input =
    //   "66695483-bfd2-4fe4-8b52-c06b4d930569~CfDJ8Ab4bmd//AtNkOvGqs3v8RcZ8K+bX8CznjKowlphXTCCCSQcnR2uygZqwvMISf2Xfpsc5G5T2eA7PEu+yd6yobhymbwLAn3qemS/GJB2kzgXRCveUGtc6RPfQRV4WDK7TotgXoHDLrS8N+z7/hrr9Il655Gq/AmLaP7HyVujh5dzKrXF75LfvzOs1x/cGDcyr39l30Wsow+XWavbeZhuPDCJtgQNkUGimgbkfsp8k9yXlCZiChfsw8h46uj9Xiy6Yw==";
    // var fields = input.split("~");
    // var resultUserID = fields[0];
    // var resultTokenCode = fields[1];
    // console.log(
    //   "resultUserID" +
    //     resultUserID +
    //     "//////" +
    //     "resultTokenCode:" +
    //     resultTokenCode
    // );
  }

  async firebaseSignup() {
    auth()
      .createUserWithEmailAndPassword(this.state.emailId, this.state.password)
      .then(user => {
        if (auth().currentUser) {
          let userId = auth().currentUser.uid;
          if (userId) {
            database()
              .ref('users/' + userId)
              .set({
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                email: this.state.emailId,
                number: this.state.phoneNo,
                _id: userId,
                online: true,
              });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log('phone:::::::::::::', this.state.phoneNo);
    let isButtonEnable;
    if (
      this.state.userProfilePic == '' ||
      this.state.firstName == '' ||
      this.state.lastName == '' ||
      // this.state.userName == "" ||
      this.state.gender == '' ||
      this.state.phoneNo == '' ||
      this.state.dob == '' ||
      this.state.emailId == '' ||
      this.state.password == '' ||
      this.state.isSelected == false
    ) {
      isButtonEnable = false;
    } else {
      isButtonEnable = true;
    }
    //const { navigate } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text style={styles.headerText}>Create Account</Text>
            </Header>
            <KeyboardAwareScrollView
              ref="scrollView"
              extraScrollHeight={windowWidth * 0.31666}
              enableOnAndroid={true}
              //keyboardShouldPersistTaps="handled"
              resetScrollToCoords={{x: 0, y: 0}}
              scrollEnabled={true}>
              <View style={{marginTop: windowWidth * 0.06}}>
                {this.state.userProfilePic == '' ? (
                  <ImageBackground
                    resizeMode="cover"
                    source={require('../../Images/user_placeholder.png')}
                    imageStyle={styles.profilePic}
                    style={styles.profilePic}></ImageBackground>
                ) : (
                  <ImageBackground
                    resizeMode="cover"
                    source={{
                      uri: this.state.userProfilePic,
                    }}
                    imageStyle={styles.profilePic}
                    style={styles.profilePic}></ImageBackground>
                )}
                {this.state.userProfilePic != '' ? (
                  <Text
                    style={[
                      styles.errorTextStyle,
                      {alignSelf: 'center', marginTop: windowWidth * 0.06},
                    ]}>
                    {this.state.profilePicError}
                  </Text>
                ) : (
                  <View />
                )}
                <TouchableOpacity
                  style={styles.picButton}
                  onPress={() => {
                    this.setState({profilePicModal: true});
                  }}>
                  <Text style={styles.profilePicText}>Choose Profile Pic</Text>
                  {/* <Icon
                  type="Entypo"
                  name="camera"
                  style={{color: 'white', padding: 10}}
                /> */}
                </TouchableOpacity>
                <TextField
                  placeholder={'First Name'}
                  onChangeText={value => this.setState({firstName: value})}
                  value={this.state.firstName}
                  onBlur={() => {
                    if (this.state.firstName == '') {
                      this.setState({
                        firstNameError: 'First Name field should not be empty',
                      });
                    } else {
                      this.setState({
                        firstNameError: '',
                      });
                    }
                  }}
                  errorMessage={this.state.firstNameError}
                />
                <TextField
                  placeholder={'Last Name'}
                  onChangeText={value => this.setState({lastName: value})}
                  onBlur={() => {
                    if (this.state.lastName == '') {
                      this.setState({
                        lastNameError: 'Last Name field should not be empty',
                      });
                    } else {
                      this.setState({
                        lastNameError: '',
                      });
                    }
                  }}
                  errorMessage={this.state.lastNameError}
                />
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => {
                    this.setState({genderModal: true});
                  }}>
                  <Text
                    style={
                      this.state.gender != 'Gender'
                        ? styles.genderTextStyle
                        : styles.genderPlaceHolderStyle
                    }>
                    {this.state.gender}
                  </Text>
                </TouchableOpacity>
                {this.state.genderError != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {this.state.genderError}
                  </Text>
                ) : null}
                <PhoneInput
                  ref={r => (this.phoneInput = r)}
                  defaultValue={this.state.phoneNo}
                  defaultCode="GB"
                  layout="first"
                  onChangeText={text => {
                    this.setState({phoneNo: text});
                  }}
                  onChangeFormattedText={text => {
                    this.setState({formattedphoneNo: text});
                  }}
                  containerStyle={{
                    height: windowWidth * 0.16,
                    width: windowWidth / 1.136,
                    alignSelf: 'center',
                    marginTop: windowWidth * 0.0316,
                    borderBottomWidth: 1.946,
                    borderBottomColor: color.lineColor,
                    marginBottom: -windowWidth * 0.036,
                    backgroundColor: 'white',
                    elevation: 0,
                  }}
                  textContainerStyle={{
                    height: windowWidth * 0.16,
                    borderBottomWidth: 1.946,
                    borderBottomColor: color.lineColor,
                    backgroundColor: 'white',
                    elevation: 0,
                  }}
                  textInputStyle={{
                    alignSelf: 'center',
                    borderBottomWidth: 0.36,
                    borderBottomColor: color.lineColor,
                    fontSize: windowWidth * 0.0406,
                    height: windowWidth * 0.156,
                    backgroundColor: 'white',
                    elevation: 0,
                  }}
                  flagButtonStyle={{backgroundColor: 'transparent'}}
                  codeTextStyle={{}}
                  withDarkTheme
                  withShadow={false}
                  autoFocus={false}
                />
                {this.state.phoneNoError == '' ? (
                  <View style={{marginVertical: windowWidth * 0.0196}} />
                ) : null}
                <DatePicker
                  style={styles.datePicker}
                  allowFontScaling={false}
                  date={this.state.dob}
                  mode="date"
                  placeholder="Date of Birth"
                  format={'YYYY-MM-DD'}
                  //minDate={moment().format("DD-MM-YYYY")}
                  //maxDate={moment().format('YYYY-MM-DD')}
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
                      fontSize: windowWidth * 0.0416,
                      fontFamily: 'CenturyGothic',
                    },
                    placeholderText: {
                      color: color.lightGrey,
                      fontSize: windowWidth * 0.0416,
                      fontFamily: 'CenturyGothic',
                    },
                    dateInput: styles.datePickerInput,
                  }}
                  iconComponent={
                    <Icon
                      type="MaterialCommunityIcons"
                      name="calendar-range"
                      style={{
                        color: color.lightGrey,
                        marginRight: windowWidth * 0.0306,
                        marginTop: windowWidth * 0.0336,
                        fontSize: windowWidth * 0.0766,
                      }}
                    />
                  }></DatePicker>
                <View style={styles.datePickerLine} />
                {/* {this.state.dobError != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {this.state.dobError}
                  </Text>
                ) : null} */}
                <TextField
                  placeholder={'Email Id'}
                  keyboardType={'email-address'}
                  onChangeText={value => this.setState({emailId: value})}
                  onBlur={() => {
                    if (this.state.emailId == '') {
                      this.setState({
                        emailIdError: 'Email Id field should not be empty',
                      });
                    } else {
                      this.setState({
                        emailIdError: '',
                      });
                    }
                  }}
                  errorMessage={this.state.emailIdError}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 2.1,
                    borderColor: color.lineColor,
                    marginHorizontal: windowWidth * 0.06,
                  }}>
                  <TextField
                    placeholder={'Password'}
                    onChangeText={value => this.setState({password: value})}
                    onBlur={() => {
                      if (this.state.password == '') {
                        this.setState({
                          passwordError: 'Password field should not be empty',
                        });
                      } else {
                        this.setState({
                          passwordError: '',
                        });
                      }
                    }}
                    //errorMessage={this.state.passwordError}
                    secureTextEntry={this.state.hidePassword ? true : false}
                    inputStyle={{
                      width: windowWidth / 1.36,
                      borderBottomWidth: 0,
                      borderColor: color.lineColor,
                      marginLeft: 0,
                      marginBottom: -windowWidth * 0.036,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({hidePassword: !this.state.hidePassword});
                    }}>
                    <Icon
                      name={this.state.hidePassword ? 'eye-slash' : 'eye'}
                      type="FontAwesome"
                      style={{
                        fontSize: windowWidth * 0.0516,
                        alignSelf: 'center',
                        marginTop: windowWidth * 0.06,
                        color: color.lightGrey,
                        marginBottom: -windowWidth * 0.016,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {this.state.passwordError != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {this.state.passwordError}
                  </Text>
                ) : null}
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
                  onPress={
                    isButtonEnable
                      ? this.onProceed.bind(this)
                      : this.onProceed.bind(this)
                  }>
                  <Text style={styles.enableButtonText}>PROCEED</Text>
                </Button>
              </View>
            </KeyboardAwareScrollView>

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
            <Modal isVisible={this.state.profilePicModal}>
              <View style={styles.modalBox}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: windowWidth * 0.1346,
                    borderBottomWidth: 1,
                    flex: 0.45,
                  }}>
                  <Text style={styles.avatarTitle}>Select Avatar</Text>
                </View>
                <View
                  style={{
                    flex: 0.55,
                    marginHorizontal: windowWidth * 0.06,
                    marginBottom: windowWidth * 0.096,
                  }}>
                  {ChoosePics.map(res => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: windowWidth * 0.0516,
                        }}
                        onPress={this.onChoosePic.bind(this, res.title)}>
                        <Text style={styles.chooseOptionTitle}>
                          {res.title}
                        </Text>
                        <Icon
                          type="FontAwesome"
                          name={res.icon}
                          style={{color: 'black'}}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity
                  style={styles.avatarCancelBtn}
                  onPress={() => this.setState({profilePicModal: false})}>
                  <Text style={styles.avatarbuttonText}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <AnimatedLoader
              visible={this.state.showLoader}
              overlayColor="rgba(255,255,255,0.36)"
              source={require('./../animationLoaders/loader_4.json')}
              animationStyle={{
                width: windowWidth * 0.36,
                height: windowWidth * 0.36,
              }}
              speed={1}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
  // onScroll(yValue) {
  //   //console.log("scrollView", this.refs.scrollView.scrollToPosition(0, 600));
  //   this.refs.scrollView.scrollToPosition(0, yValue);
  // }
}
export default connect(state => ({user: state.user}), {uploadProfile, signUp})(
  SignUp,
);
