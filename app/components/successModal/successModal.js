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
import { SuccessModalProps } from "./successModal.props";
import { mergeAll, flatten } from "ramda";
import { Icon } from "native-base";
import { Button } from "./../button";
import Modal from "react-native-modal";

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

const modalBox: ViewStyle = {
  width: windowWidth / 1.264,
  backgroundColor: "white",
  padding: windowWidth * 0.06,
  borderRadius: windowWidth * 0.0164,
  alignSelf: "center",
};
const modalView: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "white",
  padding: windowWidth * 0.0146,
  justifyContent: "space-between",
  alignItems: "center",
};
const modalSuccessIcon: TextStyle = {
  color: "#39b54a",
  fontSize: windowWidth * 0.116,
  alignSelf: "center",
  marginBottom: windowWidth * 0.016,
};
const modalSuccessText: TextStyle = {
  fontSize: windowWidth * 0.06,
  fontFamily: "CenturyGothic",
  color: "#39b54a",
  textAlign: "center",
  marginBottom: windowWidth * 0.06,
};
const modalCenterText: TextStyle = {
  fontSize: windowWidth * 0.0416,
  fontFamily: "CenturyGothic",
  color: "black",
  textAlign: "center",
  marginHorizontal: windowWidth * 0.0416,
};

const button: ViewStyle = {
  width: windowWidth / 1.9,
  height: windowWidth * 0.156,
  borderRadius: windowWidth * 0.076,
  marginTop: windowWidth * 0.06,
  alignSelf: "center",
};
const buttonText: TextStyle = {
  color: "white",
  fontSize: windowWidth * 0.0419,
  alignSelf: "center",
  fontFamily: "CenturyGothic-Bold",
};

export const SuccessModal: React.FunctionComponent<SuccessModalProps> = (
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
    isVisible,
    centerText,
    labelStyle,
    ...rest
  } = props;
  let containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset] };
  containerStyle = enhance(containerStyle, styleOverride);

  const content = children;
  let inputStyle: TextStyle = INPUT;
  console.log(iconActive);
  return (
    <Modal isVisible={isVisible}>
      <View style={modalBox}>
        <View style={{}}>
          <Icon
            type={"SimpleLineIcons"}
            name={"check"}
            style={modalSuccessIcon}
          />
          <Text style={modalSuccessText}>Successful</Text>
        </View>
        <Text style={modalCenterText}>{centerText}</Text>
        <Button buttonType="gradient" style={button} onPress={onPress}>
          <Text style={buttonText}>DONE</Text>
        </Button>
      </View>
    </Modal>
  );
};
