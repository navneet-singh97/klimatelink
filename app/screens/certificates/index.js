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
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "native-base";
import { CardView } from "../../components/cardView";
import Modal from "react-native-modal";
import styles from "./styles";
import { color } from "../../theme";
import OraganisationSelection from "../organisationSelection";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RadioButtons = [
  { id: 0, value: "Default" },
  { id: 1, value: "User Specific" },
];

const certificatesList = [
  {
    id: 0,
    title: "Employment Profile",
    data: [
      {
        _id: 0,
        certificateTitle: "Infoeaze Digital Services",
        certificateDescription: "Chief Product Officer",
      },
      {
        _id: 1,
        certificateTitle: "SmartTech Solutions",
        certificateDescription: "Head of Product Strategic",
      },
      {
        _id: 2,
        certificateTitle: "Uniflow Software",
        certificateDescription: "Senior Transformation Advisor",
      },
      {
        _id: 3,
        certificateTitle: "Digi Technologies",
        certificateDescription: "Senior Advisor",
      },
    ],
  },
  {
    id: 1,
    title: "Other Certifications",
    data: [
      {
        _id: 0,
        certificateTitle: "Award of Excellence",
        certificateDescription: "From the St. Anns School",
      },
      {
        _id: 1,
        certificateTitle: "Painting competition 2001",
        certificateDescription: "From the St. Anns School",
      },
    ],
  },
];

const Reports = [
  {
    name: "Share",
    image: require("./../../Images/certificateShare.png"),
  },
  {
    name: "Edit Control",
    image: require("./../../Images/certificateEdit.png"),
  },
  {
    name: "History",
    image: require("./../../Images/certificateHistory.png"),
  },
  {
    name: "Share All Employment Certificates",
    image: require("./../../Images/shareAll.png"),
  },
];

interface Props {
  navigation: any;
}

interface certificatesState {
  selectedRadioButton: any;
  selectedCertificateType: any;
  selectedRowType: any;
  selectedReportRow: any;
  modalVisible: any;
  sharePermissionsVisible: any;
  onProceed: any;
  certTitle: any;
}

class Certificates extends Component<Props, certificatesState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCertificateType: [],
      selectedRowType: "",
      selectedReportRow: null,
      modalVisible: false,
      sharePermissionsVisible: false,
      selectedRadioButton: 0,
      onProceed: false,
      certTitle: "",
    };
  }

  onToggleList(item) {
    let count = 0;
    if (this.state.selectedCertificateType.length == 0) {
      this.state.selectedCertificateType.push({
        id: item.id,
      });
    } else {
      this.state.selectedCertificateType.map((res, i) => {
        if (item.id == res.id) {
          this.state.selectedCertificateType.splice(i, 1);
          count++;
        }
      });
      if (count === 0) {
        this.state.selectedCertificateType.push({
          id: item.id,
        });
      }
    }
    this.setState({
      selectedCertificateType: this.state.selectedCertificateType,
      selectedRowType: "",
      selectedReportRow: null,
    });
    console.log(JSON.stringify(this.state.selectedCertificateType));
  }

  onReport(item, res) {
    console.log("selectedReportRow:", item.title);
    this.setState({
      modalVisible: true,
      selectedRowType: item.title,
      selectedReportRow: res._id,
      certTitle: res.certificateTitle,
    });
  }

  onSelectReport(value) {
    this.setState({ modalVisible: false }, () => {
      if (value == "Share") {
        this.setState({
          sharePermissionsVisible: true,
          selectedRadioButton: 1,
        });
        //this.props.navigation.push("ShareCertificate");
      } else if (value == "Edit Control") {
        this.props.navigation.push("EditCertificate");
      } else if (value == "History") {
        this.props.navigation.push("HistoryCertificate");
      } else if (value == "Share All Employment Certificates") {
        this.setState({
          sharePermissionsVisible: true,
          selectedRadioButton: 0,
        });
      }
    });
  }

  onProceed() {
    this.setState({ onProceed: true }, () => {
      if (this.state.selectedRadioButton == 0) {
        this.setState({ sharePermissionsVisible: false }, () => {
          this.props.navigation.push("OraganisationSelection");
        });
      } else {
        this.setState({ sharePermissionsVisible: false });
        this.props.navigation.push("ShareCertificate", {
          navigateFrom: "CertificateScreen",
          certTitle: this.state.certTitle,
        });
      }
    });
  }

  renderItem({ item }) {
    var count = 0;
    var showSublist;
    var ImageView;

    var showReport;

    this.state.selectedCertificateType.map((res, i) => {
      if (res.id == item.id) {
        showSublist = true;
        count = count + 1;
      }
      if (count === 0) {
        showSublist = false;
      }
    });

    if (showSublist == true) {
      ImageView = (
        <Icon
          type={"Ionicons"}
          name={"ios-arrow-down"}
          style={{
            fontSize: windowWidth * 0.046,
            color: color.lightGrey,
            alignSelf: "center",
          }}
        />
      );
    } else {
      ImageView = (
        <Icon
          type={"Ionicons"}
          name={"ios-arrow-up"}
          style={{
            fontSize: windowWidth * 0.046,
            color: color.lightGrey,
            alignSelf: "center",
          }}
        />
      );
    }
    return (
      <View style={{}}>
        <TouchableOpacity
          style={
            showSublist == true
              ? [styles.listTitle, { borderBottomWidth: 0 }]
              : styles.listTitle
          }
          onPress={this.onToggleList.bind(this, item)}
        >
          <Text style={styles.title}>{item.title}</Text>
          {ImageView}
        </TouchableOpacity>
        {showSublist == true
          ? item.data.map((res, i) => {
              if (
                this.state.selectedRowType === item.title &&
                this.state.selectedReportRow == res._id
              ) {
                showReport = true;
              } else {
                showReport = false;
              }
              return (
                <CardView style={styles.cardView}>
                  <View style={styles.innerCardView}>
                    <View style={styles.notificationView}>
                      <View
                        style={{
                          width: windowWidth * 0.113,
                          height: windowWidth * 0.113,
                          borderRadius: (windowWidth * 0.113) / 2,
                          borderWidth: 1.6,
                          borderColor: res.color,
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={
                            item.title == "Employment Profile"
                              ? require("../../Images/employmentSuitCase.png")
                              : require("../../Images/agreement.png")
                          }
                          style={{
                            width: windowWidth * 0.06,
                            height: windowWidth * 0.06,
                            alignSelf: "center",
                          }}
                        />
                      </View>
                      <View style={styles.titleView}>
                        <Text style={styles.notificationTitleText}>
                          {res.certificateTitle}
                        </Text>
                        <Text style={styles.notificationText}>
                          {res.certificateDescription}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          padding: windowWidth * 0.036,
                          //backgroundColor: "pink",
                        }}
                        onPress={this.onReport.bind(this, item, res)}
                      >
                        <Icon
                          type={"Feather"}
                          name={"more-vertical"}
                          style={{
                            fontSize: windowWidth * 0.046,
                            color: color.lightGrey,
                            alignSelf: "center",
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </CardView>
              );
            })
          : null}
      </View>
    );
  }

  renderSectionHeader({ section }) {
    return (
      <TouchableOpacity style={{}}>
        <Text style={styles.title}>{section.title}</Text>
        <Icon
          type={"Ionicons"}
          name={"ios-arrow-up"}
          style={{
            fontSize: windowWidth * 0.046,
            color: color.lightGrey,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FlatList
            style={{ flex: 1, marginTop: 10 }}
            data={certificatesList}
            extraData={this.state}
            renderItem={this.renderItem.bind(this)}
          />
          <Modal isVisible={this.state.modalVisible}>
            <View style={styles.modalBox}>
              {Reports.map((res, i) => {
                return (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={this.onSelectReport.bind(this, res.name)}
                      style={styles.modalView}
                    >
                      <Text style={styles.modalText}>{res.name}</Text>
                      <Image source={res.image} style={styles.modalImage} />
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
                activeOpacity={0.9}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={this.state.sharePermissionsVisible}>
            <View style={styles.modalShareBox}>
              <Text
                style={{
                  fontSize: windowWidth * 0.0516,
                  fontFamily: "CenturyGothic",
                  color: color.primaryColor,
                  marginBottom: windowWidth * 0.0146,
                }}
              >
                Share Permissions
              </Text>
              <View style={{}}>
                {RadioButtons.map((res, i) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onPress={() => {
                        this.setState({ selectedRadioButton: res.id });
                      }}
                    >
                      <Text style={styles.modalShareText}>{res.value}</Text>

                      <Icon
                        type={"Ionicons"}
                        name={
                          this.state.selectedRadioButton == res.id
                            ? "radio-button-on"
                            : "radio-button-off"
                        }
                        style={{
                          color: "black",
                          fontSize: windowWidth * 0.06,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: windowWidth * 0.06,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ sharePermissionsVisible: false });
                  }}
                  activeOpacity={0.9}
                  style={{ marginRight: windowWidth * 0.06 }}
                >
                  <Text style={styles.modalShareButtonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onProceed.bind(this)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.modalShareButtonText}>PROCEED</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
export default Certificates;
