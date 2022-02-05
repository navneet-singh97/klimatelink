import * as React from "react";
import {
  View,
  TextInput,
  TextStyle,
  Dimensions,
  ViewStyle,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { color } from "../../theme";
import { DocsImagePickerProps } from "./docsImagePicker.props";
import { mergeAll, flatten } from "ramda";
import { Icon } from "native-base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
export const DocsImagePicker: React.FunctionComponent<DocsImagePickerProps> = (
  props
) => {
  const {
    label,
    preset = "default",
    style: styleOverride,
    children,
    onPress,
    text,
    iconActive,
    labelStyle,
    ...rest
  } = props;
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] };
  containerStyle = enhance(containerStyle, styleOverride);

  const content = children;
  let inputStyle: TextStyle = INPUT;
  console.log(iconActive);
  return (
    <View
      style={{
        width: windowWidth,
        flexDirection: "column",
        alignItems: "flex-start",
        padding: windowWidth * 0.06,
        ...containerStyle,
      }}
    >
      <Text
        style={{
          color: color.blackText,
          fontFamily: "CenturyGothic",
          fontSize: windowWidth * 0.0416,
          marginBottom: windowWidth * 0.016,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.9, flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.096,
              height: windowWidth * 0.096,
              backgroundColor: "#39b54a",
              alignSelf: "center",
              borderRadius: windowWidth * 0.016,
              justifyContent: "center",
              marginRight: windowWidth * 0.0316,
            }}
          >
            <Icon
              type="Feather"
              name="check"
              style={{
                fontSize: windowWidth * 0.06,
                alignSelf: "center",
                color: "white",
              }}
            />
          </TouchableOpacity>

          <Image
            source={require("./../../Images/photo_bg.png")}
            style={{
              width: windowWidth * 0.121,
              height: windowWidth * 0.121,
            }}
          />
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.096,
              height: windowWidth * 0.096,
              alignSelf: "center",
              borderWidth: 1.9,
              borderColor: color.lightGrey,
              borderRadius: windowWidth * 0.016,
              justifyContent: "center",
            }}
            onPress={onPress}
          >
            <Icon
              type="Feather"
              name="plus"
              style={{
                fontSize: windowWidth * 0.06,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
