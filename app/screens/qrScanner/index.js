import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Vibration,
  Animated,
  Easing,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {Button} from './../../components/button';
import {Divider} from 'react-native-elements';
import {color} from './../../theme';
import styles from './styles';

// import { Camera } from "expo-camera";
// import * as Permissions from "expo-permissions";
// import { BarCodeScanner } from "expo-barcode-scanner";

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
import {request, PERMISSIONS} from 'react-native-permissions';

import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {}

interface stateQrScanner {
  hasCameraPermission: any;
}

class QrScanner extends Component<Props, stateQrScanner> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      progress: new Animated.Value(0),
    };
  }

  async componentWillMount() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissions for access camera',
            message: 'Give permission to your device to access camera',
            buttonPositive: 'ok',
          },

          console.log('permission granted')
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({hasCameraPermission: true});
          console.log('permission granted');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }

  _handleBarCodeRead = ({type, data}) => {
    alert(`QR code type : ${type} and data : ${data} `);
    Vibration.vibrate(100);
    this.scanner.reactivate();
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.props.navigation.push("CredentialRequest");
    // }, 3000);
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: windowWidth * -0.096,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  }

  onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    console.error('onSuccess', e);
    //);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text style={styles.centerText}>
            Requesting for camera permission
          </Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={styles.centerText}>No access to camera</Text>
        ) : (
          <View style={styles.qrMainView}>
            <Text style={styles.qrTitle}>Place here to scan the QR code</Text>
            <View style={styles.squareView}>
              <QRCodeScanner
                ref={node => {
                  this.scanner = node;
                }}
                onRead={this._handleBarCodeRead}
                containerStyle={styles.qrcontainerStyle}
                cameraStyle={styles.cameraView}
                flashMode={RNCamera.Constants.FlashMode.torch}
                // topContent={
                //   <Text style={styles.centerText}>
                //     Go to{' '}
                //     <Text style={styles.textBold}>
                //       wikipedia.org/wiki/QR_code
                //     </Text>{' '}
                //     on your computer and scan the QR code.
                //   </Text>
                // }
                // bottomContent={
                //   <TouchableOpacity style={styles.buttonTouchable}>
                //     <Text style={styles.buttonText}>OK. Got it!</Text>
                //   </TouchableOpacity>
                // }
              />
              {/* <Camera
                ref={ref => {
                  this.camera = ref;
                }}
                onBarCodeScanned={this._handleBarCodeRead}
                // flashMode={Camera.Constants.FlashMode.torch}
                type={Camera.Constants.Type.back}
                style={styles.cameraView}></Camera> */}
              <Animatable.View
                style={styles.animationLine}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={this.makeSlideOutTranslation(
                  'translateY',
                  windowWidth * -0.7999,
                )}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default QrScanner;
