import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
  TextInput,
} from 'react-native';
import {viewPresets, textPresets, gradientPresets} from './textInput.presets';
import {TextFieldProps} from './textInput.props';
import {mergeAll, flatten} from 'ramda';
//import LinearGradient from "react-native-linear-gradient";
import {LinearGradient} from 'expo-linear-gradient';
import {color} from '../../theme';
import {Icon, Item} from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TextField: React.FunctionComponent<TextFieldProps> = props => {
  const INPUT = {
    fontFamily: 'CenturyGothic',
    color: 'black',
    minHeight: 44,
    fontSize: windowWidth * 0.0416,
    marginHorizontal: windowWidth * 0.06,
    borderBottomWidth: 1.946,
    borderColor: color.lineColor,
    padding: windowWidth * 0.0206,
    marginTop:
      props.errorMessage == '' ? windowWidth * 0.0416 : windowWidth * 0.0416,
  };
  const {
    preset = 'primary',
    style,
    inputStyle,
    placeholder,
    Ref,
    errorMessage,
    ...rest
  } = props;

  return (
    <View style={{flexDirection: 'column'}}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={color.lightGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={{
          ...INPUT,
          ...inputStyle,
        }}
        ref={Ref}
        allowFontScaling={false}
      />
      {errorMessage == '' ? null : (
        <Text
          style={{
            fontFamily: 'CenturyGothic',
            color: color.alertRed,
            fontSize: windowWidth * 0.036,
            marginLeft: windowWidth * 0.0769,
            // marginTop: 0.016,
          }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
