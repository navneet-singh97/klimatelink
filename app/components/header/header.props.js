import { ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";
import { HeaderPresetNames } from "./header.presets";

export interface HeaderProps extends TouchableOpacityProps {
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
  preset?: HeaderPresetNames;
  children?: any;
  headerType?: any;
  onLeftPress?: any;
  onCenterPress?: any;
  onRightPress?: any;
  titleStyle?: any;
  leftIcon?: any;
  rightIcon?: any;
  transparent?: any;
  leftIconHide?: any;
  leftMenu?: any;
  changeApperance?: any;
  notification?: any;
}
