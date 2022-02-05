import { ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";
import { ButtonPresetNames } from "./button.presets";

export interface ButtonProps extends TouchableOpacityProps {
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle | TextStyle[];

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames;
  children?: any;
  buttonType?: any;
  onPress: any;
}
