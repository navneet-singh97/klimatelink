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

import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface Props {}

const formList = [
  {
    type: "checkbox",
  },
  {
    type: "input",
  },
  {
    type: "input",
  },
];

class HistoryCertificate extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  componentDidMount() {}

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header
          //notification
          //leftMenu
          onLeftPress={this.onLeft.bind(this)}
          //onRightPress={this.onNotification.bind(this)}
        >
          HISTORY
        </Header>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.titleText}>History</Text>
        </View>

        {/* <View>
          {formList.map((res, i) => {
            return res.type == "input" ? (
              <TextInput
                placeholder="Enter"
                style={{
                  width: 160,
                  height: 60,
                  borderWidth: 1,
                  alignSelf: "center",
                  marginVertical: 30,
                  padding: 10,
                }}
                onChangeText={(text) => {
                  this.setState({ changeText: text });
                }}
              />
            ) : (
              <Text
                style={{ alignSelf: "center", marginVertical: 30, padding: 10 }}
              >
                {res.type}
              </Text>
            );
          })}
        </View> */}
      </View>
    );
  }
}
export default HistoryCertificate;
