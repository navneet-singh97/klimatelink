import * as React from "react";
import { View } from "react-native";
import { presets } from "./cardView.presets";
import { ViewProps } from "./cardView.props";
import { mergeAll, flatten } from "ramda";

export function CardView(props: ViewProps) {
  // grab the props
  const {
    preset = "default",
    txOptions,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;
  const content = text || children;
  const style = mergeAll(
    flatten([presets[preset] || presets.default, styleOverride])
  );
  return (
    <View>
      <View style={style} {...rest}>
        {content}
      </View>
    </View>
  );
}
