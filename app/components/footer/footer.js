import React, {Component} from 'react';
//import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
  TextInput,
} from 'react-native';
import {viewPresets, textPresets, gradientPresets} from './footer.presets';
import {BottomFooterProps} from './footer.props';
import {mergeAll, flatten} from 'ramda';
import {color} from '../../theme';
import CurveView from './curveView';
import {Container, Content, Footer, FooterTab, Button, Icon} from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//export class BottomTabFooter extends Component<BottomFooterProps> {
export const BottomTabFooter: React.FunctionComponent<BottomFooterProps> = props => {
  const {
    preset = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    tabsList,
    selectedTab,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  );

  const content = children || <Text text={text} style={textStyle} />;

  const tabsFunc = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          borderWidth: 0,
          justifyContent: 'space-around',
          paddingTop: windowWidth * 0.036,
          minHeight: windowWidth * 0.136,
        }}>
        {tabsList.map((res, i) => {
          const SCANView = {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              i === selectedTab ? color.secondaryColor : color.appGreen,
            //backgroundColor: i === selectedTab ? "transparent" : "transparent",
            width: windowWidth * 0.146,
            height: windowWidth * 0.146,
            borderRadius: (windowWidth * 0.146) / 2,
            marginTop: -windowWidth * 0.0769,
            paddingBottom: windowWidth * 0.03,
            marginRight: windowHeight * 0.0016,
          };
          const bottomView = {backgroundColor: 'transparent'};

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.onPress(res)}
              style={res.name == 'PROFILE' ? SCANView : bottomView}
              // {...rest}
            >
              <Image
                source={i === selectedTab ? res.activeImg : res.inActiveImg}
                style={{
                  height: windowWidth * 0.069,
                  width: windowWidth * 0.069,
                  marginTop: res.name == 'PROFILE' ? windowWidth * 0.02646 : 0,
                }}
              />
              {/* <Text
                style={{
                  fontSize: windowWidth * 0.026,
                  color: i === selectedTab ? "#ef7b5a" : color.lightGrey,
                }}
              >
                {res.name}
              </Text> */}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{}}>
      <CurveView
        curveBgColor={color.appGreen}
        curveCircleBgColour={'grey'}></CurveView>
      <View
        style={{
          //elevation: 1,
          position: 'absolute',
          minHeight:
            Platform.OS === 'ios' ? windowWidth * 0.16 : windowWidth * 0.136,
          width: windowWidth,
          bottom: 0,
          backgroundColor: 'transaprent',
          //top: windowWidth * 0.016,
        }}>
        {tabsFunc()}
      </View>
    </View>
  );
};
