import * as React from "react";
import { View, TextInput, TextStyle, ViewStyle, Text } from "react-native";
import { color } from "../../theme";

import { TextFieldProps } from "./floatTextInput.props";
import { mergeAll, flatten } from "ramda";

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: 4,
};

// the base styling for the TextInput
const INPUT: TextStyle = {
  //fontFamily: "CentruryGothic",
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: "white",
};

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

/**
 * A component which has a label and an input together.
 */
export const FloatTextInput: React.FunctionComponent<TextFieldProps> = (
  props
) => {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props;
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] };
  containerStyle = enhance(containerStyle, styleOverride);

  let inputStyle: TextStyle = INPUT;
  inputStyle = enhance(inputStyle, inputStyleOverride);
  const actualPlaceholder = placeholderTx ? placeholder : placeholder;

  return (
    <View style={containerStyle}>
      <Text preset="fieldLabel" tx={labelTx} text={label} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={color.lightGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyle}
        ref={forwardedRef}
        allowFontScaling={false}
      />
    </View>
  );
};
