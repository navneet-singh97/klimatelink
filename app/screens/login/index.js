import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import styles from './styles';
import {Header} from './../../components/header';
import {TextField} from './../../components/textInput';
import {Button} from './../../components/button';
import {Input} from 'react-native-elements';
import {color} from '../../theme';
import {Icon} from 'native-base';

import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AnimatedLoader from 'react-native-animated-loader';
import PhoneInput from 'react-native-phone-number-input';
import LinkedInLogin from '../linkedIn';

import {connect} from 'react-redux';
import {
  requestOtpWithPhoneno,
  logIn,
  showLoader,
  updateFcmToken,
} from '../../redux/actions/user';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  navigation: any;
  logIn: any;
  user: any;
}

interface loginInfo {
  email: any;
  password: any;
  emailError: any;
  passwordError: any;
  visible: any;
}

class Login extends Component<Props, loginInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      visible: this.props.user.loader,
      isSelected: true,
      phoneCode: '',
      phoneCodeFormat: '',
      callingCode: '+91',
      loginCallingCode: '+91',
      loginPhoneCode: '',
      loginPhoneCodeFormat: '',
      showPassword: true,
      showLoader: false,
    };
  }

  onLinkClick = async () => {
    console.log('heloo');

    await fetch(
      `https://www.tehclimatelink.com/login-success/auth/v2/authorization?response_type=code&client_id=8613e6z8ra2rpf&redirect_uri=www.climatelink.com/login-success&scope=r_liteprofile%20r_emailaddress%20w_remember_social`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onLeft() {
    this.props.navigation.goBack();
  }
  onForgotPassword() {
    this.props.navigation.push('ForgotPassword');
  }

  validateEmail = email => {
    var re = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  componentDidMount() {
    //console.log(this.props)
    // alert(windowWidth * 0.31666);
  }

  async onLogin() {
    if (this.state.loginPhoneCode == '') {
      this.setState({loginPhoneNoError: 'Please enter a phone number'});
    } else if (
      this.phoneInput.isValidNumber(this.state.loginPhoneCode) == false
    ) {
      this.setState({loginPhoneNoError: 'Phone number not valid'});
    } else if (this.state.password == '') {
      this.setState({
        passwordError: 'Please enter password',
      });
    } else {
      //await this.setState({showLoader: true});
      await showLoader(true);
      //alert(this.state.loginPhoneCode);
      this.setState({loginPhoneNoError: '', passwordError: ''});

      let callingCountryCode = this.phoneInput.getCallingCode();
      this.setState({loginCallingCode: '+' + callingCountryCode}, async () => {
        let loginInfo = {
          phoneNumberCode: this.state.loginCallingCode,
          phoneNumber: this.state.loginPhoneCode,
          password: this.state.password,
        };
        //alert(JSON.stringify(loginInfo));
        await this.props.logIn(loginInfo);
        if (this.props.user.login.message == 'POST Request successful.') {
          //await this.setState({showLoader: false});
          await showLoader(false);
          let resultUserID = this.props.user.login.result.uid;
          await this.props.navigation.push('Main', {
            navigateFrom: 'Login Screen',
            userId: resultUserID,
          });
        } else {
          //await this.setState({showLoader: false});
          await showLoader(false);
          let Error = this.props.user.login.responseException.exceptionMessage;
          Alert.alert(
            'ClimateLink',
            Error,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      });
    }
    // let loginInfo = {
    //   email: this.state.email.trim(),
    //   password: this.state.password,
    // };
    //this.props.navigation.push('Main');
    // await this.props.logIn(loginInfo);
    // if (this.props.user.loader === false) {
    //   if (this.props.user.login.statusCode == 200) {
    //     this.props.navigation.push("Main");
    //   } else {
    //     console.log("LOGIN_ERROR__something went wrong");
    //     Alert.alert(
    //       "Consent",
    //       "Email or Password is wrong",
    //       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //       { cancelable: false }
    //     );
    //   }
    // }
  }

  onCheckBox() {
    this.setState({isSelected: !this.state.isSelected});
  }

  onContinue() {
    if (this.state.phoneCode == '') {
      this.setState({phoneNoError: 'Please enter a phone number'});
    } else if (this.phoneInput.isValidNumber(this.state.phoneCode) == false) {
      this.setState({phoneNoError: 'Phone number not valid'});
    } else {
      //this.setState({showLoader: true});
      showLoader(true);
      this.setState({phoneNoError: ''});

      let callingCountryCode = this.phoneInput.getCallingCode();
      this.setState({callingCode: '+' + callingCountryCode}, async () => {
        console.log('callingCode_inloginscreen', this.state.phoneCodeFormat);

        let requiredData = {
          phoneNumberCode: this.state.callingCode,
          phoneNumber: this.state.phoneCode,
        };

        console.log(
          'requiredData_requestOtpWithPhoneno',
          this.state.phoneCodeFormat,
        );

        await this.props.requestOtpWithPhoneno(this.state.phoneCodeFormat);
        if (this.props.user !== undefined) {
          if (
            this.props.user.requestOtpWithPhoneno.message ==
            'POST Request successful.'
          ) {
            //this.setState({showLoader: false});
            showLoader(false);

            this.props.navigation.push('SignUpOtp', {
              phoneNumber: requiredData.phoneNumber,
              phoneNumberCode: requiredData.phoneNumberCode,
              otpReferenceId: this.props.user.requestOtpWithPhoneno.result
                .output,
            });
          } else {
            //this.setState({showLoader: false});
            showLoader(false);
            Alert.alert(
              'ClimateLink',
              'Something went wrong',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }
        }
        console.log(this.props.user.requestOtpWithPhoneno.message);
      });
    }
  }

  onLinkedIn() {}

  render() {
    //const { navigate } = this.props
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          source={require('../../Images/passwordreset.png')}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
            paddingTop: windowWidth * 0.069,
          }}>
          <Header
            onLeftPress={this.onLeft.bind(this)}
            transparent
            changeApperance>
            <Text style={styles.headerText}>Login Screen</Text>
          </Header>
          <KeyboardAwareScrollView
            ref="scrollView"
            extraScrollHeight={windowWidth * 0.31666}
            enableOnAndroid={true}
            //keyboardShouldPersistTaps="handled"
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}>
            <View style={{marginTop: windowWidth * 0.36}}>
              <Text style={styles.subHeader}>Log In</Text>
              {/* <Text style={styles.smallSubHeader}>
                Hello there, sign in to ClimateLink!
              </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: windowWidth * 0.06,
                  //marginHorizontal: 26,
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{flexDirection: 'row'}}
                  onPress={this.onCheckBox.bind(this)}>
                  <Text style={styles.checkBoxText}>
                    Do you want login with phone number?
                  </Text>
                  <View
                    style={[
                      styles.checkBoxView,
                      {
                        backgroundColor:
                          this.state.isSelected == false
                            ? 'transparent'
                            : 'white',
                      },
                    ]}>
                    <Icon
                      type="MaterialCommunityIcons"
                      name={
                        this.state.isSelected == false
                          ? 'checkbox-blank-outline'
                          : 'checkbox-marked'
                      }
                      style={[
                        styles.checkBox,
                        {
                          color:
                            this.state.isSelected == false
                              ? 'grey'
                              : color.appGreen,
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {!this.state.isSelected ? (
              <View
                ref="scrollView"
                extraScrollHeight={windowWidth * 0.31666}
                enableOnAndroid={true}
                //keyboardShouldPersistTaps="handled"
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={true}>
                <View style={{marginTop: windowWidth * 0.09}}>
                  <View style={styles.centerView}>
                    <Text style={styles.phoneInputLabel}> Phone Number</Text>
                    <PhoneInput
                      ref={r => (this.phoneInput = r)}
                      defaultValue={this.state.phoneCode}
                      defaultCode="GB"
                      layout="first"
                      onChangeText={text => {
                        this.setState({phoneCode: text});
                      }}
                      onChangeFormattedText={text => {
                        this.setState({phoneCodeFormat: text});
                      }}
                      containerStyle={{
                        height: windowWidth * 0.16,
                        width: windowWidth / 1.16,
                        alignSelf: 'center',
                        borderRadius: windowWidth * 0.036,
                      }}
                      textContainerStyle={{
                        height: windowWidth * 0.16,
                        borderRadius: windowWidth * 0.036,
                      }}
                      textInputStyle={{
                        alignSelf: 'center',
                        borderWidth: 0,
                        fontSize: windowWidth * 0.0406,
                        height: windowWidth * 0.176,
                      }}
                      codeTextStyle={{}}
                      withDarkTheme
                      withShadow
                      autoFocus={false}
                      getCountryCode={code => console.log(code)}
                    />
                    <Text style={styles.errorTextStyle}>
                      {this.state.phoneNoError}
                    </Text>

                    <TouchableOpacity
                      style={styles.continueBtn}
                      onPress={this.onContinue.bind(this)}>
                      <Text style={styles.continueBtnText}>CONTINUE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.linkedInBtn}>
                  <Icon
                    name="linkedin-square"
                    type="FontAwesome"
                    style={styles.linkedInBtnIcon}
                  />
                  {/* <Text onPress={()=>this.onLinkClick()}> LinkedIn </Text> */}
                  <LinkedInLogin {...this.props} />
                </View>
              </View>
            ) : (
              <View>
                <View style={{}}>
                  <View style={styles.centerView}>
                    <View style={{marginTop: windowWidth * 0.09}}>
                      <PhoneInput
                        ref={r => (this.phoneInput = r)}
                        defaultValue={this.state.loginPhoneCode}
                        defaultCode="GB"
                        layout="first"
                        onChangeText={text => {
                          this.setState({loginPhoneCode: text});
                        }}
                        onChangeFormattedText={text => {
                          this.setState({loginPhoneCodeFormat: text});
                        }}
                        containerStyle={{
                          height: windowWidth * 0.16,
                          width: windowWidth / 1.16,
                          alignSelf: 'center',
                          borderRadius: windowWidth * 0.036,
                        }}
                        textContainerStyle={{
                          height: windowWidth * 0.16,
                          borderRadius: windowWidth * 0.036,
                        }}
                        textInputStyle={{
                          alignSelf: 'center',
                          borderWidth: 0,
                          fontSize: windowWidth * 0.0406,
                          height: windowWidth * 0.176,
                        }}
                        codeTextStyle={{}}
                        withDarkTheme
                        withShadow
                        autoFocus={false}
                        getCountryCode={code => console.log(code)}
                      />
                      <Text style={styles.errorTextStyle}>
                        {this.state.loginPhoneNoError}
                      </Text>

                      <Input
                        label="Password"
                        //placeholder="Password"
                        labelStyle={styles.inputLabel}
                        containerStyle={{borderWidth: 0}}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        onChangeText={value => this.setState({password: value})}
                        secureTextEntry={this.state.showPassword}
                        rightIcon={
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                showPassword: !this.state.showPassword,
                              })
                            }>
                            <Icon
                              name={this.state.showPassword ? 'eye-off' : 'eye'}
                              type="Ionicons"
                              style={{
                                color: color.greyText,
                                marginRight: windowWidth * 0.0146,
                              }}
                            />
                          </TouchableOpacity>
                        }
                        onBlur={() => {
                          if (this.state.password == '') {
                            this.setState({
                              passwordError: 'Please enter password',
                            });
                          } else {
                            this.setState({
                              passwordError: '',
                            });
                          }
                        }}
                        errorStyle={styles.errorTextStyle}
                        errorMessage={this.state.passwordError}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={this.onForgotPassword.bind(this)}>
                      <Text style={styles.forgotPasswordButonText}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Button
                  style={styles.enableButton}
                  onPress={this.onLogin.bind(this)}>
                  <Text style={styles.buttonText}>LOGIN</Text>
                </Button>
              </View>
            )}
            <AnimatedLoader
              visible={this.props.user.showLoader}
              overlayColor="rgba(255,255,255,0.36)"
              source={require('./../animationLoaders/loader_4.json')}
              animationStyle={{
                width: windowWidth * 0.36,
                height: windowWidth * 0.36,
              }}
              speed={1}
            />
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {requestOtpWithPhoneno, logIn, showLoader},
)(Login);
