import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
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
import AnimatedLoader from 'react-native-animated-loader';

import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {resetPassword} from '../../redux/actions/user';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  navigation: any;
  resetPassword: any;
}

interface resetPwdInfo {
  newPassword: any;
  confirmPassword: any;
  newPasswordError: any;
  confirmPasswordError: any;
  newPwdShow: any;
  confirmPwdShow: any;
}

class ResetPassword extends Component<Props, resetPwdInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      newPasswordError: '',
      confirmPasswordError: '',
      newPwdShow: true,
      confirmPwdShow: true,
      phoneNumber: '',
      showLoader: false,
    };
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    // alert(windowWidth * 0.31666);
    this.setState({
      phoneNumber: this.props.route.params.phoneNumber,
    });
  }

  validatePassword = password => {
    var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
  };

  async onSubmit() {
    if (!this.validatePassword(this.state.newPassword)) {
      this.setState({
        newPasswordError:
          'Password must contain atleast one captial letter, atleast one digit and atleast one special character',
      });
    } else if (!this.validatePassword(this.state.confirmPassword)) {
      this.setState({
        confirmPasswordError:
          'Password must contain atleast one captial letter, atleast one digit and atleast one special character',
      });
    } else if (this.state.newPassword != this.state.confirmPassword) {
      this.setState({
        confirmPasswordError:
          'New Password and Confirm Password should be same',
      });
    } else {
      try {
        this.setState({showLoader: true});
        let resetPasswordInfo = {
          phoneNumber: this.state.phoneNumber,
          newPassword: this.state.newPassword,
          confirmPassword: this.state.confirmPassword,
        };
        await this.props.resetPassword(resetPasswordInfo);
        if (
          this.props.user.resetPassword.message == 'POST Request successful.'
        ) {
          this.setState({showLoader: false});

          Alert.alert(
            'ClimateLink',
            'Password reset successfully',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('Login', {
                    navigateFrom: 'Password Reset Screen',
                  });
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          this.setState({showLoader: false});

          Alert.alert(
            'ClimateLink',
            'Something went wrong',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      } catch (err) {
        console.log('reset_pwd_err', err);
      }
    }
  }
  render() {
    //const { navigate } = this.props
    let isButtonEnable;
    if (this.state.newPassword == '' || this.state.confirmPassword == '') {
      isButtonEnable = false;
    } else {
      isButtonEnable = true;
    }
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
            <Text style={styles.headerText}>Reset Password</Text>
          </Header>
          <KeyboardAwareScrollView
            ref="scrollView"
            extraScrollHeight={windowWidth * 0.31666}
            enableOnAndroid={true}
            //keyboardShouldPersistTaps="handled"
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={true}>
            <View style={{flex: 1}}>
              <View style={{flex: 0.35}}></View>
              <View style={styles.centerView}>
                {/* <Text style={styles.subHeader}>Login First</Text> */}
                <Text style={styles.smallSubHeader}>
                  Enter the new password
                </Text>
                <View style={{marginTop: windowWidth * 0.09}}>
                  <Input
                    label="Password"
                    //placeholder="Username or email"
                    labelStyle={styles.inputLabel}
                    containerStyle={{borderWidth: 0}}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    onChangeText={value => this.setState({newPassword: value})}
                    secureTextEntry={this.state.newPwdShow}
                    onBlur={() => {
                      if (
                        this.state.newPassword.length < 8 ||
                        this.state.newPassword.length > 10
                      ) {
                        this.setState({
                          newPasswordError:
                            'Password range should between 8 and 10',
                        });
                      } else {
                        this.setState({
                          newPasswordError: '',
                        });
                      }
                    }}
                    errorStyle={styles.errorTextStyle}
                    errorMessage={this.state.newPasswordError}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({newPwdShow: !this.state.newPwdShow});
                        }}>
                        <Icon
                          name={
                            !this.state.newPwdShow ? 'eye' : 'eye-with-line'
                          }
                          type={'Entypo'}
                          style={{
                            color: 'black',
                            fontSize: windowWidth * 0.0496,
                            marginRight: windowWidth * 0.0146,
                          }}
                        />
                      </TouchableOpacity>
                    }
                  />

                  <Input
                    label="Reenter Password"
                    //placeholder="Password"
                    labelStyle={styles.inputLabel}
                    containerStyle={{borderWidth: 0}}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    onChangeText={value =>
                      this.setState({confirmPassword: value})
                    }
                    secureTextEntry={this.state.confirmPwdShow}
                    onBlur={() => {
                      if (
                        this.state.confirmPassword.length < 8 ||
                        this.state.confirmPassword.length > 10
                      ) {
                        this.setState({
                          confirmPasswordError:
                            'Password range should between 8 and 10',
                        });
                      } else {
                        this.setState({
                          confirmPasswordError: '',
                        });
                      }
                    }}
                    errorStyle={styles.errorTextStyle}
                    errorMessage={this.state.confirmPasswordError}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            confirmPwdShow: !this.state.confirmPwdShow,
                          });
                        }}>
                        <Icon
                          name={
                            !this.state.confirmPwdShow ? 'eye' : 'eye-with-line'
                          }
                          type={'Entypo'}
                          style={{
                            color: 'black',
                            fontSize: windowWidth * 0.0496,
                            marginRight: windowWidth * 0.0146,
                          }}
                        />
                      </TouchableOpacity>
                    }
                  />
                </View>
              </View>
            </View>

            <Button
              style={isButtonEnable ? styles.enableButton : styles.button}
              onPress={isButtonEnable ? this.onSubmit.bind(this) : null}>
              <Text
                style={
                  isButtonEnable ? styles.enableButtonText : styles.buttonText
                }>
                SUBMIT
              </Text>
            </Button>
          </KeyboardAwareScrollView>
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
  {resetPassword},
)(ResetPassword);
