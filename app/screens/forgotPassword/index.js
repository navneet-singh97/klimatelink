import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {Header} from '../../components/header';
import {TextField} from '../../components/textInput';
import {Button} from '../../components/button';
import {Input} from 'react-native-elements';
import {color} from '../../theme';
import {connect} from 'react-redux';
import {sendOtp, forgotPassword} from '../../redux/actions/user';
import PhoneInput from 'react-native-phone-number-input';

import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AnimatedLoader from 'react-native-animated-loader';
import {Alert} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  navigation: any;
  forgotPassword: any;
}

interface forgotPwdInfo {
  email: any;
  modalVisible: any;
  emailError: any;
}

class ForgotPassword extends Component<Props, forgotPwdInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      modalVisible: false,
      emailError: '',
      phoneCode: '',
      phoneCodeFormat: '',
      callingCode: '+91',
      phoneNoError: '',
      referenceId: '',
      showLoader: false,
    };
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async onEnter() {
    if (this.state.phoneCode == '') {
      this.setState({phoneNoError: 'Please enter a phone number'});
    } else if (this.phoneInput.isValidNumber(this.state.phoneCode) == false) {
      this.setState({phoneNoError: 'Phone number not valid'});
    } else {
      let callingCountryCode = this.phoneInput.getCallingCode();
      this.setState({callingCode: '+' + callingCountryCode}, async () => {
        //alert(this.state.phoneCodeFormat);
        await this.setState({showLoader: true});
        await this.props.sendOtp(this.state.phoneCodeFormat);
        if (this.props.user.sendOtp.message == 'POST Request successful.') {
          this.setState({
            showLoader: false,
            modalVisible: true,
            referenceId: this.props.user.sendOtp.result.output,
            phoneCodeFormat: this.state.phoneCodeFormat,
            phoneNumber: this.state.phoneCode,
          });
        } else {
          await this.setState({showLoader: false});
          Alert.alert(
            'ClimateLink',
            'Something went wrong',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      });
    }
  }

  async onCloseModal() {
    await this.setState({modalVisible: false}, async () => {
      await this.props.navigation.push('Otp', {
        navigateFrom: 'forgotPassword',
        referenceId: this.state.referenceId,
        phoneNumber: this.state.phoneNumber,
        phoneCodeFormat: this.state.phoneCodeFormat,
      });
    });
  }

  validateEmail = email => {
    var re = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
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
            <Text style={styles.headerText}>Forgot Password</Text>
          </Header>
          <KeyboardAwareScrollView
            extraScrollHeight={windowWidth * 0.1666}
            enableOnAndroid={true}
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.subContainer}>
                <Text style={styles.contentText}>
                  Please fill in exactly the information provided. we will send
                  an otp to your registered phone number to regain your password
                </Text>
                <View style={{marginTop: windowWidth * 0.09}}>
                  <PhoneInput
                    ref={r => (this.phoneInput = r)}
                    defaultValue={this.state.phoneCode}
                    defaultCode="IN"
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
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={this.onEnter.bind(this)}
              style={[
                styles.buttonView,
                {
                  borderWidth: this.state.phoneCodeFormat == '' ? 0 : 3.36,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      this.state.phoneCodeFormat == '' ? '#003237' : '#003237',
                  },
                ]}>
                ENTER
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.resetPwdModal}>
                <Text style={styles.subHeader}>OTP SENT</Text>
                <Text style={styles.centerContent}>
                  An OTP has been sent to your registered phone number..
                </Text>
                <TouchableHighlight
                  underlayColor="#fff"
                  onPress={this.onCloseModal.bind(this)}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableHighlight>
              </View>
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
        </ImageBackground>
      </View>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
  }),
  {sendOtp, forgotPassword},
)(ForgotPassword);
