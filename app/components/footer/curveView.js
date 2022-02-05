import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {color} from '../../theme';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  curveBgColor: any;
  curveCircleBgColour: any;
}

class CurveView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={{backgroundColor: color.primaryBgColour}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: color.primaryBgColour,
          }}>
          <View
            style={{
              flex: 0.43,
              backgroundColor: this.props.curveBgColor,
              height:
                Platform.OS === 'ios'
                  ? windowWidth * 0.16
                  : windowWidth * 0.136,
              alignSelf: 'flex-start',
              borderTopRightRadius: windowWidth * 0.119,
              borderBottomRightRadius: 0,
              overflow: 'hidden',
            }}></View>
          <View style={{flex: 0.14}}></View>
          <View
            style={{
              flex: 0.43,
              backgroundColor: this.props.curveBgColor,
              height:
                Platform.OS === 'ios'
                  ? windowWidth * 0.16
                  : windowWidth * 0.136,
              alignSelf: 'flex-end',
              borderTopLeftRadius: windowWidth * 0.119,
              borderBottomLeftRadius: 0,
              overflow: 'hidden',
            }}></View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: windowWidth * 0.316,
              height:
                Platform.OS === 'ios'
                  ? windowWidth * 0.086
                  : windowWidth * 0.059,
              backgroundColor: this.props.curveBgColor,
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              borderWidth: 0,
              borderColor: 'red',
              //marginTop: -windowWidth * 0.31,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'column',
                width: windowWidth * 0.176,
                height: windowWidth * 0.176,
                position: 'absolute',
                backgroundColor: 'transparent',
                alignSelf: 'flex-start',
                borderTopLeftRadius: windowWidth * 0.176,
                borderTopRightRadius: windowWidth * 0.176,
                borderBottomLeftRadius: windowWidth * 0.196,
                borderBottomRightRadius: windowWidth * 0.196,
                borderWidth: 0,
                marginTop: -windowWidth * 0.13,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  flex: 0.5,
                  backgroundColor: 'transparent',
                  borderTopLeftRadius: windowWidth * 0.176,
                  borderTopRightRadius: windowWidth * 0.176,
                  overflow: 'hidden',
                }}></View>
              <View
                style={{
                  flex: 0.5,
                  backgroundColor: color.primaryBgColour,
                  borderBottomLeftRadius: windowWidth * 0.196,
                  borderBottomRightRadius: windowWidth * 0.196,
                  overflow: 'hidden',
                }}></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default CurveView;
