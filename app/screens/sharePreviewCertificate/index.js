import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  SectionList,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Icon, Title, Card } from "native-base";
import { CardView } from "../../components/cardView";
import { TextField } from "./../../components/textInput";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { SuccessModal } from "../../components/successModal";
import Modal from "react-native-modal";
import styles from "./styles";
import { color } from "../../theme";
import { Divider, Input } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import { Colors } from "react-native/Libraries/NewAppScreen";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RadioButtons = [
  { id: 0, value: "Default" },
  { id: 1, value: "User Specific" },
];

interface Props {}
interface shareInfo {
  fromEmail: any;
  toEmail: any;
  subjectLine: any;
  notes: any;
  isResumeSelected: any;
  daysLimit: any;
  sharingLimit: any;
  selectedRadioButton: any;
  shareResume: any;
  employmentList: any;
  shareSuccessfulVisible: any;
}

class sharePreviewCertificate extends Component<Props, shareInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fromEmail: "",
      toEmail: "",
      subjectLine: "",
      notes: "",
      isResumeSelected: false,
      daysLimit: 0,
      sharingLimit: 0,
      selectedRadioButton: 0,
      shareResume: "Resume 001",
      shareSuccessfulVisible: false,
      employmentList: [
        {
          //id: 0,
          title: "SSC ICC Certificate",
          data: [
            { Id: 0, type: "Vivekananda School" },
            { Id: 1, type: "SSC Board, Andhra Pradesh" },
            { Id: 2, type: "2002" },
            { Id: 3, type: "ABC12345678" },
            { Id: 4, type: "Total 445" },
            { Id: 5, type: "First Class" },
            { Id: 6, type: "88% Scored" },
          ],
        },
      ],
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }
  onShare() {
    this.setState({ shareSuccessfulVisible: true });
  }

  componentDidMount() {
    console.log(" this.props.route.params.chatData", this.props.route.params);
    //this.setState({ employmentList: this.props.route.params.selectedEmploymentList });
    if (this.props.route.params != undefined) {
      this.setState({
        shareResume: this.props.route.params.Resume,
        employmentList: this.props.route.params.selectedEmploymentList,
      });
    }
  }

  onCancel() {}

  onCheckBox() {}
  onDoneSuccessModal() {
    this.setState({ shareSuccessfulVisible: false }, () => {
      this.props.navigation.push("Main");
    });
  }
  employmentRender() {
    var listTitle = [];
    var subListArray = [];
    this.state.employmentList.map((res) => {
      listTitle.push(
        <Text
          style={{
            fontFamily: "CenturyGothic",
            fontSize: windowWidth * 0.046,
            marginTop: windowWidth * 0.036,
            marginLeft: windowWidth * 0.016,
          }}
        >
          {res.title}
        </Text>
      );
      res.data.map((item, j) => {
        subListArray.push(
          <Text
            style={{
              fontFamily: "CenturyGothic",
              fontSize: windowWidth * 0.0416,
              marginLeft: windowWidth * 0.036,
              marginTop: windowWidth * 0.036,
            }}
          >
            {item.type}
          </Text>
        );
      });
    });
    return (
      <View>
        {listTitle}
        <View style={{}}></View>
        {subListArray}
      </View>
    );
  }

  employmentsSectionRender({ item, index, section: { title } }) {
    return (
      <View>
        <Text
          style={{
            fontFamily: "CenturyGothic",
            fontSize: windowWidth * 0.0416,
            marginLeft: windowWidth * 0.036,
            marginTop: windowWidth * 0.016,
          }}
        >
          {item.type}
        </Text>
      </View>
    );
  }

  employmentSectionHeader({ section: { title, data } }) {
    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          //paddingHorizontal: windowWidth * 0.06,
          //borderTopWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "CenturyGothic-Bold",
            fontSize: windowWidth * 0.046,
            marginTop: windowWidth * 0.036,
            marginLeft: windowWidth * 0.016,
          }}
        >
          {title}
        </Text>
      </View>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={{}}>
        <Header
          //notification
          //leftMenu
          onLeftPress={this.onLeft.bind(this)}
          //onRightPress={this.onNotification.bind(this)}
        >
          Share
        </Header>
        <View>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: windowWidth * 0.16,
            }}
          >
            <TextField
              placeholder={"From Email ID"}
              onChangeText={(value) => this.setState({ fromEmail: value })}
            />
            <TextField
              placeholder={"To Email ID"}
              onChangeText={(value) => this.setState({ toEmail: value })}
            />
            <TextField
              placeholder={"Subject Line"}
              onChangeText={(value) => this.setState({ subjectLine: value })}
            />
            <TextField
              placeholder={"Notes"}
              onChangeText={(value) => this.setState({ notes: value })}
              maxLength={30}
            />
            <Text
              style={{
                fontFamily: "CenturyGothic",
                color: color.lightGrey,
                alignSelf: "flex-end",
                fontSize: windowWidth * 0.036,
                marginRight: windowWidth * 0.06,
              }}
            >
              {this.state.notes.length} / 30
            </Text>
            <Divider
              style={{
                height: 1,
                marginTop: windowWidth * 0.06,
                elevation: 1.6,
              }}
            />
            {/* <View
              style={{
                marginHorizontal: windowWidth * 0.036,
                marginTop: windowWidth * 0.06,
              }}
            >
              <Text
                style={{
                  fontSize: windowWidth * 0.046,
                  color: color.primary,
                  fontFamily: "CenturyGothic",
                }}
              >
                Resume
              </Text>
              <Divider
                style={{
                  marginTop: windowWidth * 0.036,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.checkBoxText}>
                  {this.state.shareResume}
                </Text>
              </View>
            </View>
            <Divider
              style={{
                height: 1,
                marginTop: windowWidth * 0.06,
                elevation: 1.6,
              }}
            /> */}
            <View
              style={{
                marginHorizontal: windowWidth * 0.036,
                marginTop: windowWidth * 0.06,
              }}
            >
              <Text
                style={{
                  fontSize: windowWidth * 0.046,
                  color: color.primary,
                  fontFamily: "CenturyGothic",
                }}
              >
                Employment VC
              </Text>
              <Divider
                style={{
                  marginTop: windowWidth * 0.036,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <SectionList
                  extraData={this.state}
                  sections={this.state.employmentList}
                  keyExtractor={(item, index) => item + index}
                  renderItem={this.employmentsSectionRender.bind(this)}
                  renderSectionHeader={this.employmentSectionHeader.bind(this)}
                />
              </View>
            </View>
            <Divider
              style={{
                height: 1,
                marginTop: windowWidth * 0.06,
                elevation: 1.6,
              }}
            />
            <View
              style={{
                marginHorizontal: windowWidth * 0.036,
                marginTop: windowWidth * 0.06,
              }}
            >
              <Text
                style={{
                  fontSize: windowWidth * 0.046,
                  color: color.primary,
                  fontFamily: "CenturyGothic",
                }}
              >
                Permissions
              </Text>
              <Divider
                style={{
                  marginTop: windowWidth * 0.036,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.checkBoxText}>Days Limit</Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGrey,
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.daysLimit != 0) {
                          this.setState({
                            daysLimit: this.state.daysLimit - 1,
                          });
                        }
                      }}
                    >
                      <Icon
                        type={"Feather"}
                        name={"minus"}
                        style={{
                          fontSize: windowWidth * 0.046,
                          padding: windowWidth * 0.036,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: windowWidth * 0.046,
                        alignSelf: "center",
                      }}
                    >
                      {this.state.daysLimit}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ daysLimit: this.state.daysLimit + 1 });
                      }}
                    >
                      <Icon
                        type={"Feather"}
                        name={"plus"}
                        style={{
                          fontSize: windowWidth * 0.046,
                          padding: windowWidth * 0.036,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.checkBoxText}>Sharing Limit</Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: color.lightGrey,
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.sharingLimit != 0) {
                          this.setState({
                            sharingLimit: this.state.sharingLimit - 1,
                          });
                        }
                      }}
                    >
                      <Icon
                        type={"Feather"}
                        name={"minus"}
                        style={{
                          fontSize: windowWidth * 0.046,
                          padding: windowWidth * 0.036,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: windowWidth * 0.046,
                        alignSelf: "center",
                      }}
                    >
                      {this.state.sharingLimit}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          sharingLimit: this.state.sharingLimit + 1,
                        });
                      }}
                    >
                      <Icon
                        type={"Feather"}
                        name={"plus"}
                        style={{
                          fontSize: windowWidth * 0.046,
                          padding: windowWidth * 0.036,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <Divider
              style={{
                height: 1,
                marginTop: windowWidth * 0.06,
                elevation: 1.6,
              }}
            />
            <View style={{ marginVertical: windowWidth * 0.09 }}>
              <Button
                buttonType="gradient"
                style={styles.button}
                onPress={this.onShare.bind(this)}
              >
                <Text style={styles.buttonText}>SHARE</Text>
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
          </ScrollView>
        </View>
        <SuccessModal
          isVisible={this.state.shareSuccessfulVisible}
          centerText={"Your preconsent is processed successfully"}
          onPress={this.onDoneSuccessModal.bind(this)}
        />
      </View>
    );
  }
}
export default sharePreviewCertificate;
