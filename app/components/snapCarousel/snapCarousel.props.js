import { TouchableOpacityProps, TextStyle, ViewStyle } from "react-native";

export interface SnapCarouselProps extends TouchableOpacityProps {
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  preset?: "default";
  Ref?: any;
  text?: any;
  tabsList?: any;
  onPress?: (newValue: any) => void;
  selectedTab?: any;
  onLeftPress?: any;
}
