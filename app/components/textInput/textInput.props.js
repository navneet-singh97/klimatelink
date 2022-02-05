import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface TextFieldProps extends TextInputProps {
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  preset?: "default";
  Ref?: any;
  errorMessage?: any;
}
