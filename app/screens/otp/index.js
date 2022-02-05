import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  onOtp,
  forgotPwdOtp,
  getUserDetails,
  otpVerification,
  resendOtp,
} from '../../redux/actions/user';
import styles from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import {Header} from './../../components/header';
import {Icon, Item, Picker} from 'native-base';
import {PinInput, PinKeyboard} from 'react-native-awesome-pin';
import {color} from '../../theme';
import {Button} from './../../components/button';
import AnimatedLoader from 'react-native-animated-loader';
import CountDown from 'react-native-countdown-component';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let keyboard;
let pins;
let pinArray = [];

let backAsset = '⌫';

interface Props {
  onOtp: any;
  forgotPwdOtp: any;
  getUserDetails: any;
  navigation: any;
  route: any;
  userId: any;
  tokenCode: any;
  user: any;
  otp: any;
}

interface otpState {
  secureText: any;
  pinInputValue: any;
  enterdPin: any;
  showKeyBoard: any;
  otpError: any;
  otpSuccessScreen: any;
  userId: any;
  tokenCode: any;
  visible: any;
  firstName: any;
  lastName: any;
  gender: any;
}

class Otp extends Component<Props, otpState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      secureText: true,
      pinInputValue: '',
      enterdPin: 0,
      showKeyBoard: false,
      otpError: '',
      otpSuccessScreen: false,
      userId: '',
      tokenCode: '',
      visible: this.props.user.loader,
      firstName: '',
      lastName: '',
      gender: '',
      phoneCodeFormat: '',
      showResendOtp: false,
      showLoader: false,
    };
  }

  async componentDidMount() {
    this.setState({enterdPin: 0});
    this.setState({
      referenceId: this.props.route.params.referenceId,
      phoneCodeFormat: this.props.route.params.phoneCodeFormat,
      phoneNumber: this.props.route.params.phoneNumber,
    });

    console.log('phoneNumber_123', this.props.route.params.phoneNumber);

    // if (this.props.route.params.navigateFrom == 'signUp') {
    //   this.setState({otpSuccessScreen: true});
    // } else {
    //   this.setState({otpSuccessScreen: false});
    // }
    // console.log('this.props.route.params', this.props.route.params);
    // if (this.props.route.params !== 'undefined') {
    //   if (this.props.route.params.navigateFrom == 'signUp') {
    //     this.setState({
    //       userId: this.props.route.params.userId,
    //       tokenCode: this.props.route.params.tokenCode,
    //     });
    //     var UserId = this.props.route.params.userId;
    //     await this.props.getUserDetails(UserId);
    //     console.log('######getUserDetails', UserId);
    //     if (this.props.user.getUserInfo.statusCode == 200) {
    //       await this.setState({
    //         firstName: this.props.user.getUserInfo.result.firstName,
    //         lastName: this.props.user.getUserInfo.result.lastName,
    //         gender: this.props.user.getUserInfo.result.gender,
    //       });
    //     }
    //   }
    // }
  }

  onFinishTimer() {
    this.setState({showResendOtp: true});
  }

  onLeft() {
    this.props.navigation.goBack();
  }
  onProceed() {
    if (this.props.route.params !== 'undefined') {
      if (this.props.route.params.navigateFrom == 'forgotPassword') {
        this.props.navigation.push('ResetPassword', {
          phoneNumber: this.state.phoneNumber,
        });
      } else {
        this.props.navigation.push('Main');
      }
    }
  }
  async onSecure() {
    if (this.state.secureText === true) {
      await this.setState({secureText: false});
      console.log('if');
    } else {
      await this.setState({secureText: true});
      console.log('else');
    }
  }

  async keyDown(pin) {
    if (
      pin != backAsset &&
      pin != '⌫' &&
      pin !== 'Done' &&
      pinArray.length != 6
    ) {
      let array = pinArray.push(pin);
    } else if (pin == '⌫') {
      let removeValue = pinArray.pop();
      this.setState({enteredPin: removeValue});
    } else if (pin == 'Done') {
      this.setState({showKeyBoard: false});
      if (pinArray.length == 6) {
        let finalPin = pinArray.join('');
        this.onClickOtp(finalPin);

        // if (this.props.route.params !== 'undefined') {
        //   if (this.props.route.params.navigateFrom == 'forgotPassword') {
        //     //this.props.forgotPwdOtp(finalPin);
        //     this.setState({otpSuccessScreen: true});
        //   } else {
        //     this.onClickOtp(finalPin);
        //   }
        //}
      } else {
        this.setState({otpError: 'Please enter 6 digit OTP'});
      }
    }

    this.setState({enteredPin: pinArray.join('')});
    // console.log("result___123", this.state.enteredPin);
  }

  async onClickOtp(finalPin) {
    try {
      let otpValue = finalPin.trim();
      // let referenceId = this.props.referenceId;

      let otpData = {
        phoneNumberWithCode: this.state.phoneCodeFormat,
        otpValue: this.state.enteredPin,
      };

      this.setState({showLoader: true});
      // alert(JSON.stringify(otpData));

      await this.props.otpVerification(otpData);

      if (this.props.user.otpVerification.result == true) {
        await this.setState({showLoader: false, otpError: '', enteredPin: ''});
        await this.setState({otpSuccessScreen: true});
      } else {
        this.setState({
          showLoader: false,
          otpError: 'Please enter a valid OTP',
        });
      }
    } catch (err) {
      this.setState({showLoader: false});
      console.log('forgtpwd_otp', err);
    }
  }

  async onResendOtp() {
    let userOtpDetails = {
      phoneNumberWithCode: this.state.phoneCodeFormat + this.state.phoneNumber,
    };
    console.log('resend_111666666', userOtpDetails);
    await this.props.resendOtp(userOtpDetails);
    this.setState({showResendOtp: false});
  }

  onInput() {
    if (this.state.showKeyBoard == true) {
      this.setState({showKeyBoard: false});
    } else {
      this.setState({showKeyBoard: true});
    }
  }

  render() {
    //const { navigate } = this.props

    // console.log("pinInputValue", this.state.pinInputValue);
    // console.log("Array", pinArray);
    // console.log("pinInputValue", this.state.enteredPin);

    var martialStatus;
    var userName = this.state.firstName + ' ' + this.state.lastName;
    if (this.state.gender == 'Male') {
      martialStatus = 'Mr.';
    } else if (this.state.gender == 'Female') {
      martialStatus = 'Ms.';
    }

    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          {this.state.otpSuccessScreen == false ? (
            <View style={styles.container}>
              <Header onLeftPress={this.onLeft.bind(this)} transparent>
                Enter the OTP
              </Header>
              <View style={styles.subContainer}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.welcomeText}>
                  {martialStatus} {userName}
                </Text>

                <View style={styles.inputView}>
                  {this.state.secureText ? (
                    <View style={{height: windowWidth * 0.156}}>
                      <TextInput
                        placeholder={'123456'}
                        value={this.state.enteredPin}
                        style={styles.textInputStyle}
                        autoFocus={false}
                        keyboardType={'numeric'}
                        spellCheck={false}
                        showSoftInputOnFocus={false}
                        //autoCorrect={false}
                        letterSpacing={windowWidth * 0.079}
                        maxLength={6}
                        underlineColorAndroid="transparent"
                        onChangeText={value =>
                          this.setState({enteredPin: value})
                        }
                        onTouchStart={this.onInput.bind(this)}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity onPress={this.onInput.bind(this)}>
                      <PinInput
                        onRef={ref => (pins = ref)}
                        numberOfPins={6}
                        numberOfPinsActive={pinArray.length}
                        pinStyle={styles.pinStyle}
                        pinActiveStyle={styles.pinActiveStyle}
                        containerStyle={styles.pinContainer}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {this.state.otpError != '' ? (
                  <Text style={styles.errorTextStyle}>
                    {this.state.otpError}
                  </Text>
                ) : null}
                <TouchableOpacity onPress={this.onSecure.bind(this)}>
                  <Icon
                    type="Ionicons"
                    name={this.state.secureText ? 'eye' : 'eye-off'}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
                {this.state.showResendOtp ? (
                  <TouchableOpacity onPress={this.onResendOtp.bind(this)}>
                    <Text style={styles.resendOtp}>Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <CountDown
                    until={120}
                    size={windowWidth * 0.0416}
                    onFinish={this.onFinishTimer.bind(this)}
                    digitStyle={{backgroundColor: 'transparent'}}
                    digitTxtStyle={{
                      color: color.secondaryColor,
                      fontSize: windowWidth * 0.0516,
                    }}
                    timeToShow={['M', 'S']}
                    timeLabels={{m: 'M', s: 'S'}}
                    timeLabelStyle={{color: 'transparent'}}
                    showSeparator
                    separatorStyle={{
                      color: '#FFF',
                      marginTop: -windowWidth * 0.046,
                      fontSize: windowWidth * 0.0416,
                      marginHorizontal: -windowWidth * 0.06,
                    }}
                  />
                )}

                <Text style={styles.noteText}>
                  Please Enter 6 Digit OTP to Proceed Further
                </Text>
              </View>
              {this.state.showKeyBoard == true ? (
                <PinKeyboard
                  onRef={ref => (this.keyboard = ref)}
                  keyDown={this.keyDown.bind(this)}
                  keyboard={[
                    [1, 2, 3, backAsset],
                    [4, 5, 6, null],
                    [7, 8, 9, null],
                    [null, 0, null, 'Done'],
                  ]}
                />
              ) : null}
            </View>
          ) : (
            <View style={styles.container}>
              <Header transparent leftIconHide={true}></Header>
              <View style={styles.subContainer}>
                <View style={styles.userImageView}>
                  <Image
                    source={require('../../Images/userImage.jpg')}
                    style={styles.userImage}
                  />
                </View>
                <View>
                  {this.props.route.params !== 'undefined' &&
                  this.props.route.params.navigateFrom == 'forgotPassword' ? (
                    <View>
                      <Text style={styles.smallText}>
                        Please proceed to set a new password
                      </Text>
                    </View>
                  ) : this.props.route.params.navigateFrom == 'signUp' ? (
                    <View>
                      <Text style={styles.welcomeText}>Congratulations,</Text>
                      <Text style={styles.welcomeText}>
                        {martialStatus} {userName}
                      </Text>

                      <Text style={styles.smallText}>
                        Your Account was Created Succesfully!
                      </Text>
                    </View>
                  ) : null}
                </View>

                <Button
                  style={[styles.button, {marginTop: windowWidth * 0.109}]}
                  onPress={this.onProceed.bind(this)}>
                  <Text style={styles.buttonText}>PROCEED</Text>
                </Button>
              </View>
            </View>
          )}
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
        </SafeAreaView>
      </View>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
  }),
  {onOtp, forgotPwdOtp, getUserDetails, otpVerification, resendOtp},
)(Otp);
