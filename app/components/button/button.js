import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {viewPresets, textPresets, gradientPresets} from './button.presets';
import {ButtonProps} from './button.props';
import {mergeAll, flatten} from 'ramda';
import LinearGradient from 'react-native-linear-gradient';
//import { LinearGradient } from "expo-linear-gradient";
import {color} from '../../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Button(props: ButtonProps) {
  // grab the props

  const ButtonView = {
    width: windowWidth / 1.6,
    height: windowWidth * 0.156,
    borderRadius: windowWidth * 0.076,
    alignSelf: 'center',
    backgroundColor: color.secondaryColor,
    marginVertical: windowWidth * 0.076,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const Button = {
    color: 'white',
    fontSize: windowWidth * 0.049,
    alignSelf: 'center',
    fontFamily: 'CenturyGothic-Bold',
  };

  const {
    preset = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    buttonType,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([
      viewPresets[preset] || viewPresets.primary,
      styleOverride || Button,
    ]),
  );
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  );

  const content = children;
  const gradientButtonStyle = mergeAll(
    flatten([
      gradientPresets[preset] || gradientPresets.primary,
      styleOverride,
    ]),
  );

  return (
    <View>
      {buttonType == 'gradient' ? (
        <TouchableOpacity
          style={{...gradientButtonStyle, minHeight: windowWidth * 0.146}}
          {...rest}>
          <LinearGradient
            start={{x: 0.0, y: 0.6}}
            end={{x: 1.0, y: 0.0}}
            locations={[0, 0.5, 1]}
            colors={[color.secondaryColor, color.secondaryColor]}
            style={gradientButtonStyle}
            {...rest}>
            {props.children}
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[ButtonView, {...props.style}]} {...rest}>
          {props.children}
        </TouchableOpacity>
      )}
    </View>
  );
}
