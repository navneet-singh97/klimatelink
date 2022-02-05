import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {getData} from '../../redux/actions/initial';
import {color} from './../../theme';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Input, Button} from 'react-native-elements';
import {toUpper} from 'lodash';
import {Icon} from 'native-base';

import FirebaseSetUp from '../../initialSetUp';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayPinScreen: false,
      pinValue: '',
      errorMsg: '',
      correctPin: 'IN$15#',
      showEye: false,
    };
  }

  async componentDidMount() {
    //alert(windowWidth * 0.366);
    this.props.getData('splash_screen');

    setTimeout(() => {
      this.props.navigation.navigate('OnBoarding');
    }, 3000);
    // this.requestCameraPermission();
    this.requestCameraAndAudioPermission();
  }

  requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  onSubmit() {
    var correctPinValue = this.state.correctPin.toLowerCase();
    var enterPinValue = this.state.pinValue.toLowerCase();

    if (correctPinValue == enterPinValue) {
      //alert(this.state.pinValue);
      this.setState({overlayPinScreen: false}, () => {
        //setTimeout(() => {
        this.props.navigation.navigate('OnBoarding');
        // console.log('this.props.initial:', this.props.initial);
        //}, 3000);
      });
    } else if (this.state.pinValue == '' || this.state.pinValue == null) {
      this.setState({errorMsg: '*** PLEASE ENTER THE PIN ***'});
    } else {
      this.setState({errorMsg: '*** ENTER VALID PIN***'});
    }
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={{flex: 1}}>
        <FirebaseSetUp />
        {this.state.overlayPinScreen == true ? (
          <View style={styles.pinMainView}>
            <StatusBar
              backgroundColor={color.primary}
              barStyle="dark-content"
            />
            <View
              style={{flexDirection: 'row', marginTop: windowWidth * 0.3966}}>
              <Input
                placeholder="Enter Pin"
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.errorMsg}
                containerStyle={styles.inputContainer}
                inputStyle={styles.pinInput}
                inputContainerStyle={{}}
                value={this.state.pinValue}
                onChangeText={value => this.setState({pinValue: value})}
                secureTextEntry={this.state.showEye}
                onTouchStart={() => {
                  this.setState({errorMsg: ''});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({showEye: !this.state.showEye});
                }}>
                <Icon
                  name={this.state.showEye ? 'eye-off' : 'eye'}
                  type="Feather"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={this.onSubmit.bind(this)}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <Image
              source={require('../../Images/climatelink.png')}
              style={styles.splashImg}
            />
            <Text style={styles.appTitleName}>ClimateLink</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: windowWidth * 0.036,
              }}>
              <View style={styles.line} />
              <Text style={styles.subTitleName}>Connect. Interact. Act.</Text>
              <View style={styles.line} />
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default connect(
  state => ({
    initial: state,
  }),
  {getData},
)(Splash);
