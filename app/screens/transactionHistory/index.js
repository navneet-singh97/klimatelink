import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon } from "native-base";
import { CardView } from "../../components/cardView";
import { Header } from "../../components/header";
import { color } from "./../../theme";
import styles from "./styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TranscationList = [
  {
    id: 0,
    leftImage: require("./../../Images/coins.png"),
    title: "FastCompany",
    content: "+ ₹0.25",
    time: "5h ago",
    status: "Reward",
  },
  {
    id: 1,
    leftImage: require("./../../Images/file.png"),
    title: "Studio.Inc",
    content: "+ ₹3 Claim",
    time: "9h ago",
    status: "Issue",
  },
  {
    id: 2,
    leftImage: require("./../../Images/coins.png"),
    title: "FastCompany",
    content: "+ ₹0.25",
    time: "5h ago",
    status: "Reward",
  },
  {
    id: 3,
    leftImage: require("./../../Images/file.png"),
    title: "Studio.Inc",
    content: "+ ₹3 Claim",
    time: "9h ago",
    status: "Issue",
  },
  {
    id: 4,
    leftImage: require("./../../Images/coins.png"),
    title: "FastCompany",
    content: "+ ₹0.25",
    time: "5h ago",
    status: "Reward",
  },
  {
    id: 5,
    leftImage: require("./../../Images/file.png"),
    title: "Studio.Inc",
    content: "+ ₹3 Claim",
    time: "9h ago",
    status: "Issue",
  },
  {
    id: 6,
    leftImage: require("./../../Images/coins.png"),
    title: "FastCompany",
    content: "+ ₹0.25",
    time: "5h ago",
    status: "Reward",
  },
  {
    id: 7,
    leftImage: require("./../../Images/file.png"),
    title: "Studio.Inc",
    content: "+ ₹3 Claim",
    time: "9h ago",
    status: "Issue",
  },
  {
    id: 8,
    leftImage: require("./../../Images/coins.png"),
    title: "FastCompany",
    content: "+ ₹0.25",
    time: "5h ago",
    status: "Reward",
  },
  {
    id: 9,
    leftImage: require("./../../Images/file.png"),
    title: "Studio.Inc",
    content: "+ ₹3 Claim",
    time: "9h ago",
    status: "Issue",
  },
];

interface Props {}

class TransactionHistory extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  renderItem({ item, index }) {
    return (
      <View>
        <CardView style={styles.cardView}>
          <View style={styles.innerCardView}>
            <View style={styles.cardSubContainer}>
              <Image source={item.leftImage} style={styles.leftContainImage} />

              <View style={styles.titleView}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <Text style={styles.textStyle}>{item.content}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  padding: windowWidth * 0.036,
                  flexDirection: "column",
                  //backgroundColor: "pink",
                }}
              >
                <Text style={styles.titleStyle}>{item.time}</Text>
                <Text
                  style={[
                    styles.titleStyle,
                    {
                      fontWeight: "900",
                      fontFamily: "CenturyGothic-Bold",
                      color:
                        item.status == "Reward"
                          ? color.primaryColor
                          : color.primary,
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        </CardView>
      </View>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header onLeftPress={this.onLeft.bind(this)}>
          <Text>Transaction History</Text>
        </Header>
        <FlatList
          contentContainerStyle={{ paddingTop: windowWidth * 0.06 }}
          data={TranscationList}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
export default TransactionHistory;
