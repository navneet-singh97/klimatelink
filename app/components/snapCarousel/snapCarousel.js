import React, { Component } from "react";
//import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
  TextInput,
} from "react-native";
import {
  viewPresets,
  textPresets,
  gradientPresets,
} from "./snapCarousel.presets";
import { SnapCarouselProps } from "./snapCarousel.props";
import { mergeAll, flatten } from "ramda";
import { color } from "../../theme";
import Carousel, { Pagination } from "react-native-snap-carousel";

import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from "native-base";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//export class BottomTabFooter extends Component<BottomFooterProps> {
export const SnapCarousel: React.FunctionComponent<SnapCarouselProps> = (
  props
) => {
  const {
    preset = "primary",
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    tabsList,
    selectedTab,
    Ref,
    ...rest
  } = props;
  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride])
  );
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride])
  );

  const content = children || <Text text={text} style={textStyle} />;
  const carouselItems = [
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 2",
      text: "Text 2",
    },
    {
      title: "Item 3",
      text: "Text 3",
    },
    {
      title: "Item 4",
      text: "Text 4",
    },
  ];

  return (
    <View>
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={0}
        containerStyle={{ backgroundColor: "white" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "black",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("this.refs___", Ref);
            //this.refs.props.ref.snapToNext();
          }}
          style={{
            padding: windowWidth * 0.046,
            backgroundColor: "pink",
          }}
        ></TouchableOpacity>
        <Carousel
          {...rest}
          layout={"default"}
          ref={Ref}
          //ref={(ref) => (this.carousel = ref)}
          data={carouselItems}
          sliderWidth={windowWidth / 2}
          itemWidth={windowWidth * 0.26}
          renderItem={(item, index) => (
            <View style={{}}>
              <View
                style={{
                  backgroundColor: "#ef7b5a",
                  borderRadius: (windowWidth * 0.196) / 2,
                  height: windowWidth * 0.196,
                  width: windowWidth * 0.196,
                }}
              ></View>
              <Text>{item.item.text}</Text>
            </View>
          )}
          // onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
        <View
          style={{
            padding: windowWidth * 0.046,
            backgroundColor: "pink",
          }}
        ></View>
      </View>
    </View>
  );
};
