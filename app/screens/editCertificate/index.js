import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon } from "native-base";
import { Header } from "../../components/header";
import { CardView } from "./../../components/cardView";
import { Button } from "./../../components/button";
import { Divider } from "react-native-elements";
import { color } from "./../../theme";
import _ from "lodash";
import styles from "./styles";
import { connect } from "react-redux";
import { onEditCertificate } from "./../../redux/actions/certificates";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface Props {
  navigation: any;
  onEditCertificate: any;
}
interface stateEditControl {
  selectedList: any;
  isSavedControl: any;
  savedControlList: any;
}
const editControl = [
  { id: 0, title: "First Name : Sandeep" },
  { id: 1, title: "Last Name : Krishnappa" },
  { id: 2, title: "Desigination : Chief Product Officer" },
  { id: 3, title: "Start Date : 05/05/2018" },
  { id: 4, title: "End Date : 05/05/2019" },
  { id: 5, title: "Employee ID : 854535598" },
  { id: 6, title: "Salary : 50L" },
];
class EditCertificate extends Component<Props, stateEditControl> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedList: [],
      isSavedControl: false,
      savedControlList: [],
    };
  }
  onLeft() {
    if (this.state.isSavedControl == true) {
      this.setState({ isSavedControl: false });
    } else {
      this.props.navigation.goBack();
    }
  }

  onSaveControl() {
    let result = _(editControl)
      .differenceBy(this.state.selectedList, "id", "title")
      .map(_.partial(_.pick, _, "id", "title"))
      .value();

    this.setState({ savedControlList: result, isSavedControl: true });
    //console.log(" result_123:", JSON.stringify(this.state.savedControlList));
  }
  onCancel() {}

  onDone() {
    this.props.onEditCertificate(this.state.savedControlList);
  }

  onSelect(item) {
    let count = 0;
    if (this.state.selectedList.length == 0) {
      this.state.selectedList.push({ id: item.id, title: item.title });
    } else {
      this.state.selectedList.map((res, i) => {
        if (item.id == res.id) {
          this.state.selectedList.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedList.push({ id: item.id, title: item.title });
      }
    }
    this.setState({ selectedList: this.state.selectedList });
    // console.log(
    //   "this.state.selectedList",
    //   JSON.stringify(this.state.selectedList)
    // );
  }

  renderItem({ item }) {
    var count = 0;
    var showEye;

    this.state.selectedList.map((res, i) => {
      if (res.id == item.id) {
        showEye = true;
        count = count + 1;
      }
      if (count === 0) {
        showEye = false;
      }
    });
    return (
      <View style={styles.listContainer}>
        <View style={{}}>
          <Text style={showEye ? styles.listGreyText : styles.listText}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity onPress={this.onSelect.bind(this, item)}>
          <Icon
            type="Feather"
            name={showEye ? "eye-off" : "eye"}
            style={{
              fontSize: windowWidth * 0.0496,
              color: "black",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderSaveControl({ item }) {
    return (
      <View style={styles.listContainer}>
        <View style={{}}>
          <Text style={styles.listText}>{item.title}</Text>
        </View>
      </View>
    );
  }

  render() {
    //const { navigate } = this.props
    // /console.log("this.state.isSavedControl", this.state.savedControlList);
    return (
      <View style={{}}>
        <Header onLeftPress={this.onLeft.bind(this)}>
          {this.state.isSavedControl == false ? "EDIT CONTROL" : "View VC"}
        </Header>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: windowWidth * 0.16,
          }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 0.9 }}>
              <View style={{ padding: windowWidth * 0.06 }}>
                <Text style={styles.title}>Employment VC Certificate</Text>
              </View>
              <Divider />
              {this.state.isSavedControl == false ? (
                <FlatList
                  data={editControl}
                  extraData={this.state}
                  renderItem={this.renderItem.bind(this)}
                />
              ) : (
                <FlatList
                  data={this.state.savedControlList}
                  //extraData={this.state}
                  renderItem={this.renderSaveControl.bind(this)}
                />
              )}
            </View>
            <View style={{ flex: 0.1 }}>
              <View style={{ marginBottom: 10 }}>
                {this.state.isSavedControl == false ? (
                  <View>
                    <Button
                      buttonType="gradient"
                      style={styles.button}
                      onPress={this.onSaveControl.bind(this)}
                    >
                      <Text style={styles.buttonText}>SAVE CONTROL</Text>
                    </Button>
                    <Button
                      style={[
                        styles.button,
                        {
                          marginTop: windowWidth * 0.109,
                          backgroundColor: "white",
                          borderWidth: 1,
                        },
                      ]}
                      onPress={this.onCancel.bind(this)}
                    >
                      <Text style={[styles.buttonText, { color: "grey" }]}>
                        CANCEL
                      </Text>
                    </Button>
                  </View>
                ) : (
                  <Button
                    buttonType="gradient"
                    style={[styles.button, {}]}
                    onPress={this.onDone.bind(this)}
                  >
                    <Text style={styles.buttonText}>DONE</Text>
                  </Button>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default connect((state) => ({ user: state.user }), {
  onEditCertificate,
})(EditCertificate);
