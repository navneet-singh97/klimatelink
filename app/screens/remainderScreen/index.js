import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "native-base";
import { Header } from "../../components/header";
import { CardView } from "./../../components/cardView";
import _ from "lodash";
import { color } from "./../../theme";
import styles from "./styles";
import { Button } from "./../../components/button";
import Dash from "react-native-dash";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const DATA = [
  {
    title: "Recent",
    data: [
      {
        id: 0,
        color: color.primary,
        title: "PricewaterhouseCoopers",
        status: "Requested to share all your profile",
        time: "Today @11:30AM",
      },
    ],
  },
  {
    title: "Old Ones",
    data: [
      {
        id: 1,
        color: color.sliverColor,
        title: "HiBu",
        status: "Requested to share all your profile",
        time: "22/03/2019",
      },
    ],
  },
];
interface Props {}

class RemainderScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onLeft() {
    this.props.navigation.goBack();
  }
  onNotification() {
    this.props.navigation.push("Notifications");
  }
  componentDidMount() {}

  renderItem({ item, index }) {
    return (
      <TouchableOpacity>
        {item !== undefined ? (
          <CardView style={styles.cardView}>
            <View style={styles.innerCardView}>
              <View style={styles.notificationView}>
                <View
                  style={[styles.iconView, { backgroundColor: item.color }]}
                >
                  <Text style={styles.iconText}>logo</Text>
                </View>
                <View style={styles.titleView}>
                  <Text style={styles.listTitleText}>{item.title}</Text>
                  <Text style={styles.listStatusText}>{item.status}</Text>
                </View>
              </View>
              <View>
                {item.id != 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: windowWidth * 0.036,
                    }}
                  >
                    <Icon
                      type={"Ionicons"}
                      name={"ios-checkmark-circle-outline"}
                      style={{
                        fontSize: windowWidth * 0.066,
                        color: color.successGreen,
                      }}
                    />

                    <Dash style={{ width: windowWidth / 3.46, height: 1 }} />
                    <Icon
                      type={"Ionicons"}
                      name={"ios-checkmark-circle-outline"}
                      style={{
                        fontSize: windowWidth * 0.066,
                        color: color.successGreen,
                      }}
                    />
                    <Dash style={{ width: windowWidth / 3.46, height: 1 }} />
                    <Icon
                      type={"Ionicons"}
                      name={"ios-checkmark-circle-outline"}
                      style={{
                        fontSize: windowWidth * 0.066,
                        color: color.sliverColor,
                      }}
                    />
                  </View>
                ) : null}
              </View>
              {item.id != 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.statusText}>
                    Responded{"\n"}23/03/2019
                  </Text>
                  <Text style={styles.statusText}>
                    Requester Recieved{"\n"}
                    24/03/2019
                  </Text>
                  <Text style={styles.statusText}>
                    Acceptance{"\n"}
                    Pending
                  </Text>
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: windowWidth * 0.036,
                }}
              >
                <Text style={styles.listStatusTime}>{item.time}</Text>
                {item.id != 0 ? (
                  <TouchableOpacity
                    onPress={() => console.log("click")}
                    style={{
                      backgroundColor: color.primary,
                      borderRadius: windowWidth * 0.06,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: windowWidth * 0.0246,
                        color: color.textColor,
                        fontFamily: "CenturyGothic",
                        alignSelf: "center",
                        paddingHorizontal: windowWidth * 0.036,
                      }}
                    >
                      SEND REMINDER
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Icon
                    type={"SimpleLineIcons"}
                    name={"star"}
                    style={{
                      fontSize: windowWidth * 0.06,
                      color: color.sliverColor,
                    }}
                  />
                )}
              </View>
            </View>
          </CardView>
        ) : null}
      </TouchableOpacity>
    );
  }

  renderSectionHeader({ section }) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>{section.title}</Text>
      </View>
    );
  }
  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header
          notification
          onLeftPress={this.onLeft.bind(this)}
          onRightPress={this.onNotification.bind(this)}
        ></Header>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
        />
      </View>
    );
  }
}
export default RemainderScreen;
