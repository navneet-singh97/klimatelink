import * as React from "react";
import {
  View,
  TextInput,
  TextStyle,
  Dimensions,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";
import { color } from "../../theme";
import { CollapsibleViewProps } from "./collapsibleView.props";
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
export const CollapsibleView: React.FunctionComponent<CollapsibleViewProps> = (
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
    collapseActive,
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //backgroundColor: "pink",
        paddingHorizontal: windowWidth * 0.06,
        borderBottomWidth: 1,
        borderBottomColor: color.lightGrey,
        ...containerStyle,
      }}
    >
      <Text
        style={{
          color: collapseActive == false ? color.greyText : color.primary,
          fontFamily: "CenturyGothic-Bold",
          fontSize: windowWidth * 0.046,
          paddingVertical: windowWidth * 0.036,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Icon
          type={"Ionicons"}
          name={iconActive ? "ios-arrow-down" : "ios-arrow-up"}
          style={{
            fontSize: windowWidth * 0.0496,
            color: color.lightGrey,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
