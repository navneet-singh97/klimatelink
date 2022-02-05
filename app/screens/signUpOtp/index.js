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
import {resendOtp, verifyOtp, loginWithPhoneNo} from '../../redux/actions/user';
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

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
      pinInputValue: '',
      enterdPin: 0,
      showKeyBoard: false,
      otpError: '',
      otpSuccessScreen: true,
      userId: '',
      tokenCode: '',
      //visible: this.props.user.loader,
      firstName: '',
      lastName: '',
      gender: '',
      otpReferenceId: '',
      phoneNumber: '',
      phoneNumberCode: '',
      showResendOtp: false,
      counter: 0,
      random: Math.random(),
      showLoader: false,
    };
  }

  async componentDidMount() {
    if (this.props.route.params !== 'undefined') {
      console.log(
        'this.props.route.params',
        this.props.route.params.otpReferenceId,
      );
      this.setState({
        phoneNumber: this.props.route.params.phoneNumber,
        phoneNumberCode: this.props.route.params.phoneNumberCode,
        otpReferenceId: this.props.route.params.otpReferenceId,
      });
    }
    this.setState({enterdPin: ''});
  }

  async onResendOtp() {
    let userOtpDetails = {
      phoneNumberWithCode: this.state.phoneNumberCode + this.state.phoneNumber,
    };
    await this.props.resendOtp(userOtpDetails);
    this.setState({showResendOtp: false});
  }

  onLeft() {
    this.props.navigation.goBack();
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
        //this.setState({enteredPin: ''});
        //this.props.navigation.push('SignUp');

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
    await this.setState({showLoader: true});

    let otpValue = finalPin;
    console.log('typeof(finalPin)', otpValue);
    let otpData = {
      phoneNumberWithCode: this.state.phoneNumberCode + this.state.phoneNumber,
      otpValue: otpValue,
    };
    console.log('otpData_123_signup_otp', otpData);

    try {
      await this.props.verifyOtp(otpData);
      if (this.props.user.verifyOtp.result == true) {
        await this.setState({showLoader: false});

        await this.setState({otpError: ''});
        let loginData = {
          phoneNumberCode: this.state.phoneNumberCode,
          phoneNumber: this.state.phoneNumber,
        };
        await this.props.loginWithPhoneNo(loginData);
        if (
          this.props.user.loginWithPhoneNum.message ==
          'POST Request successful.'
        ) {
          console.log(
            'this.props.user.isUserRegistered_123',
            this.props.user.loginWithPhoneNum.result.isGoalnInterestMapped,
          );
          await this.setState({enteredPin: ''}, async () => {
            if (
              this.props.user.loginWithPhoneNum.result.isGoalnInterestMapped ==
              true
            ) {
              await this.props.navigation.push('Main', {
                navigateFrom: 'LoginOtp Screen',
                userId: this.props.user.loginWithPhoneNum.result.uid,
              });
            } else {
              await this.props.navigation.push('RegisterSuccessfull', {
                userId: this.props.user.loginWithPhoneNum.result.uid,
              });
            }
          });
        } else {
          console.log(
            'loginWithPhoneNum_123',
            this.props.user.loginWithPhoneNum.message,
          );
        }
      } else {
        await this.setState({showLoader: false});
        this.setState({otpError: 'Please enter a valid OTP'});
      }
    } catch (err) {
      await this.setState({showLoader: false});

      console.log('veriyotp_login', err);
    }
  }

  async onClickOtp1(finalPin) {
    // let userId = this.state.userId;
    // let otp = finalPin.trim();
    // let tokenCode = this.state.tokenCode;
    // console.log(typeof userId + '...' + typeof otp + '....' + typeof tokenCode);
    // await this.props.onOtp(userId, otp, tokenCode);
    // //this.props.navigation.navigate("AccountCreated");
    // console.log('userId_otp', userId);
    // console.log('tokenCode_otp' + JSON.stringify(tokenCode));
    // if (this.props.user.loader === false) {
    //   console.log('######this.props.user.otp', this.props.user.otp);
    //   if (this.props.user.otp.statusCode == 200) {
    //     await this.props.getUserDetails(this.state.userId);
    //     await this.setState({otpSuccessScreen: true});
    //   } else {
    //     console.log('###OTP_WRONG###');
    //     Alert.alert(
    //       'Consent',
    //       'something is went wrong',
    //       [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //       {cancelable: false},
    //     );
    //   }
    // }
    //await this.setState({otpSuccessScreen: true});
  }

  onInput() {
    if (this.state.showKeyBoard == true) {
      this.setState({showKeyBoard: false});
    } else {
      this.setState({showKeyBoard: true});
    }
  }

  onFinishTimer() {
    this.setState({showResendOtp: true});
  }

  render() {
    //const { navigate } = this.props

    // console.log("pinInputValue", this.state.pinInputValue);
    // console.log("Array", pinArray);
    // console.log("pinInputValue", this.state.enteredPin);

    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)} transparent>
              Enter the OTP
            </Header>
            <View style={styles.subContainer}>
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
                      onChangeText={value => this.setState({enteredPin: value})}
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
                <Text style={styles.errorTextStyle}>{this.state.otpError}</Text>
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
    initial: state.initial,
    user: state.user,
  }),
  {resendOtp, verifyOtp, loginWithPhoneNo},
)(Otp);
