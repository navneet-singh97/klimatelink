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

import {connect} from 'react-redux';
import {logIn} from '../../redux/actions/user';
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
      phoneNumber: '',
      emailError: '',
      passwordError: '',
      phoneNoError: '',
      visible: this.props.user.loader,
      value: '',
      formattedValue: '',
      valid: '',
      showMessage: '',
    };
    // const phoneInput = useRef < PhoneInput > null;
  }

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
    // alert(windowWidth * 0.31666);
  }

  async onContinue() {
    if (this.state.value == '') {
      this.setState({phoneNoError: 'Please enter a phone number'});
    } else if (this.phoneInput.isValidNumber(this.state.value) == false) {
      this.setState({phoneNoError: 'Phone number not valid'});
    } else {
      this.setState({phoneNoError: ''});
      this.props.navigation.push('SignUpOtp');
    }
    // alert(
    //   'value:' +
    //     this.state.value +
    //     ',' +
    //     'formattedValue:' +
    //     this.state.formattedValue +
    //     ',' +
    //     'valid:' +
    //     this.phoneInput.isValidNumber(this.state.value) +
    //     ',' +
    //     'showMessage:' +
    //     this.state.showMessage,
    // );
  }

  async onLinkedIn() {}

  async onLogin() {
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

  render() {
    //const { navigate } = this.props
    let isButtonEnable;
    if (this.state.email == '' || this.state.password == '') {
      isButtonEnable = false;
    } else {
      isButtonEnable = true;
    }
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          source={require('../../Images/signinscreen.png')}
          style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}>
          <Header
            onLeftPress={this.onLeft.bind(this)}
            transparent
            changeApperance>
            <Text style={styles.headerText}>Sign Up</Text>
          </Header>
          <KeyboardAwareScrollView
            ref="scrollView"
            extraScrollHeight={windowWidth * 0.31666}
            enableOnAndroid={true}
            //keyboardShouldPersistTaps="handled"
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}>
            <View style={{flex: 1}}>
              <View
                style={{flex: 0.35, marginBottom: windowWidth * 0.496}}></View>
              <View style={styles.centerView}>
                <Text style={styles.inputLabel}> Phone Number</Text>
                <PhoneInput
                  ref={r => (this.phoneInput = r)}
                  defaultValue={this.state.value}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={text => {
                    this.setState({value: text});
                  }}
                  onChangeFormattedText={text => {
                    this.setState({formattedValue: text});
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
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.linkedInBtn}
              onPress={this.onLinkedIn.bind(this)}>
              <Icon
                name="linkedin-square"
                type="FontAwesome"
                style={styles.linkedInBtnIcon}
              />
              <Text style={styles.linkedInBtnText}>SIGN UP WITH LINKEDIN</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
          {/* <AnimatedLoader
            visible={this.props.user.loader}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('./../animationLoaders/loader_3.json')}
            animationStyle={{width: 160, height: 160}}
            speed={1}
          /> */}
        </ImageBackground>
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {logIn},
)(Login);
