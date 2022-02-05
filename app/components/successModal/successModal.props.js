import { ViewProps, TextStyle, ViewStyle } from "react-native";

export interface SuccessModalProps extends ViewProps {
  label?: any;

  style?: ViewStyle | ViewStyle[];

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle | TextStyle[];

  containerStyle?: ViewStyle | ViewStyle[];
  /**
   * Various look & feels.
   */
  preset?: "default";
  text?: any;
  onPress?: any;
  iconActive?: any;
  labelStyle?: TextStyle | TextStyle[];
  isVisible: any;
  centerText: any;
}
