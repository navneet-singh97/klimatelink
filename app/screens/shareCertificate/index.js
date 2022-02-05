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
  ScrollView,
  Alert,
} from "react-native";
import { Icon, Title } from "native-base";
import { CardView } from "../../components/cardView";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { CollapsibleView } from "../../components/collapsibleView";
import Modal from "react-native-modal";
import styles from "./styles";
import { color } from "../../theme";
import { Divider } from "react-native-elements";
import _, { isEmpty } from "lodash";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Resumelist = [
  { id: 0, title: "Resume 001" },
  { id: 0, title: "Resume 002" },
];

const EmploymentVc = [
  {
    _id: 0,
    title: "Infoeaze Digital Services",
    data: [
      { Id: 0, type: "First Name : Sandeep" },
      { Id: 1, type: "Last Name : Krishnappa" },
      { Id: 2, type: "Desigination : Chief Product Officer" },
      { Id: 3, type: "Start Date : 05/05/2018" },
      { Id: 4, type: "End Date : 05/05/2019" },
      { Id: 5, type: "Employee ID : 854535598" },
      { Id: 6, type: "Salary : 50L" },
    ],
  },
  {
    _id: 1,
    title: "SmartTech Solutions",
    data: [
      { Id: 7, type: "First Name : Sandeep" },
      { Id: 8, type: "Last Name : Krishnappa" },
      { Id: 9, type: "Desigination : Head of Product Strategic" },
      { Id: 10, type: "Start Date : 05/05/2017" },
      { Id: 11, type: "End Date : 01/05/2018" },
      { Id: 12, type: "Employee ID : 854535591" },
      { Id: 13, type: "Salary : 40L" },
    ],
  },
  {
    _id: 2,
    title: "Uniflow Software",
    data: [
      { Id: 14, type: "First Name : Sandeep" },
      { Id: 15, type: "Last Name : Krishnappa" },
      { Id: 16, type: "Desigination : Senior Transformation Advisor" },
      { Id: 17, type: "Start Date : 05/04/2016" },
      { Id: 18, type: "End Date : 01/04/2017" },
      { Id: 19, type: "Employee ID : 8545366661" },
      { Id: 20, type: "Salary : 35L" },
    ],
  },
  {
    _id: 3,
    title: "Digi Technologies",
    data: [
      { Id: 21, type: "First Name : Sandeep" },
      { Id: 22, type: "Last Name : Krishnappa" },
      { Id: 23, type: "Desigination : Senior Advisor" },
      { Id: 24, type: "Start Date : 19/04/2015" },
      { Id: 25, type: "End Date : 01/04/2016" },
      { Id: 26, type: "Employee ID : 85499991" },
      { Id: 27, type: "Salary : 30L" },
    ],
  },
];

const NotificationEmploymentVc = [
  {
    //id: 0,
    title: "Infoeaze Digital Services",
    data: [
      { Id: 0, type: "First Name : Sandeep" },
      { Id: 1, type: "Last Name : Krishnappa" },
      { Id: 2, type: "Desigination : Chief Product Officer" },
      { Id: 3, type: "Start Date : 05/05/2018" },
      { Id: 4, type: "End Date : 05/05/2019" },
      { Id: 5, type: "Employee ID : 854535598" },
      { Id: 6, type: "Salary : 50L" },
    ],
  },
];

interface Props {
  navigation: any;
  route: any;
}
interface shareInfo {
  selectedCertificateType: any;
  selectedRowType: "";
  selectedReportRow: null;
  modalVisible: boolean;
  selectedShare: [];
  resumeCollapsible: boolean;
  employmentCollapsible: boolean;
  selectedResume: any;
  employmentMainList: any;
  employmentList: any;
  selectedItems: any;
  selectedItem: any;
  subListItemId: any;
  sharePreview: any;
}

class ShareCertificate extends Component<Props, shareInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCertificateType: [],
      selectedRowType: "",
      selectedReportRow: null,
      modalVisible: false,
      selectedShare: [],
      resumeCollapsible: false,
      employmentCollapsible: false,
      selectedResume: "",
      employmentMainList: [],
      employmentList: EmploymentVc,
      selectedItems: [],
      selectedItem: "",
      subListItemId: "",
      sharePreview: false,
      shareModalText: "",
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    console.log("klkk", this.props.route.params);
    if (this.props.route.params != undefined) {
      if (this.props.route.params.navigateFrom == "OrgsSelection") {
        this.setState({
          employmentList: this.props.route.params.selectedOrganisation,
          shareModalText: "Your preconsent is processed successfully",
        });
      } else if (this.props.route.params.navigateFrom == "CertificateScreen") {
        var certTitle = this.props.route.params.certTitle;
        // alert(JSON.stringify(certTitle));
        var ShareCertificateArray = [];

        this.state.employmentList.map(async (item, j) => {
          //alert(res.certificateTitle + "....." + item.title);
          if (certTitle == item.title) {
            ShareCertificateArray.push({
              title: item.title,
              data: item.data,
            });
            await this.setState({
              employmentList: ShareCertificateArray,
              shareModalText: "Your preconsent is processed successfully",
            });
          }
        });
      } else if (this.props.route.params.navigateFrom == "notificationScreen") {
        this.setState({
          employmentList: NotificationEmploymentVc,
          shareModalText: "Your sharing request is processed successfully",
        });
      } else {
        this.setState({
          employmentList: EmploymentVc,
        });
      }
    }
  }

  async onPreviewShare() {
    var filterEmploymentVc = [];
    var result;
    let arrayCompare;

    if (this.state.selectedItems.length == 0) {
      filterEmploymentVc = this.state.employmentMainList;
    } else {
      this.state.employmentMainList.map((res, i) => {
        this.state.selectedItems.map(async (res1, j) => {
          let result = _(res.data)
            .differenceBy(res1.values, "Id", "type")
            .map(_.partial(_.pick, _, "Id", "type"))
            .value();
          await filterEmploymentVc.push({ title: res.title, data: result });
        });
      });
    }

    console.log("filterEmploymentVc", filterEmploymentVc);
    if (filterEmploymentVc.length == 0) {
      Alert.alert(
        "Consent",
        "Please Select Employment Vc",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      await this.props.navigation.push("sharePreviewCertificate", {
        Resume: this.state.selectedResume,
        selectedEmploymentList: filterEmploymentVc,
      });
    }
  }
  onCancel() {}

  onSelectResume(item) {
    if (this.state.selectedResume == "") {
      this.setState({ selectedResume: item.title });
    } else {
      if (item.title == this.state.selectedResume) {
        this.setState({ selectedResume: "" });
      } else {
        this.setState({ selectedResume: item.title });
      }
    }
  }

  resumeRender({ item }) {
    var resumeActive;
    if (item.title != this.state.selectedResume) {
      resumeActive = true;
      var IconType = (
        <Icon
          type={"Ionicons"}
          name={"ios-square-outline"}
          style={{
            fontSize: windowWidth * 0.09,
            color: color.lightGrey,
            alignSelf: "center",
          }}
        />
      );
    } else {
      resumeActive = false;
      var IconType = (
        <Icon
          type={"Ionicons"}
          name={"ios-checkbox"}
          style={{
            fontSize: windowWidth * 0.076,
            color: "black",
            alignSelf: "center",
          }}
        />
      );
    }
    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: windowWidth * 0.06,
        }}
      >
        <Text
          style={{
            color: resumeActive == true ? "grey" : "black",
            fontFamily: "CenturyGothic",
            fontSize: windowWidth * 0.0416,
          }}
        >
          {item.title}
        </Text>
        <TouchableOpacity onPress={this.onSelectResume.bind(this, item)}>
          {IconType}
        </TouchableOpacity>
      </View>
    );
  }

  onEmployment(item, data) {
    let count = 0;
    if (this.state.employmentMainList.length == 0) {
      this.state.employmentMainList.push({ title: item, data: data });
    } else {
      this.state.employmentMainList.map((res, i) => {
        if (item == res.title) {
          this.state.employmentMainList.splice(i, 1);
          if (this.state.selectedItems.length != 0) {
            this.state.selectedItems.map((value, j) => {
              if (item == value.title) {
                this.state.selectedItems.splice(j, 1);
                this.setState({ selectedItems: this.state.selectedItems });
              }
            });
          }
          count++;
        }
      });
      if (count == 0) {
        this.state.employmentMainList.push({ title: item, data: data });
      }
    }
    this.setState({ employmentMainList: this.state.employmentMainList });

    console.log(
      "this.state.employmentMainList:",
      this.state.employmentMainList
    );
  }

  async onEye(value, title) {
    this.setState({
      subListItemId: value.Id,
      selectedItem: { value },
    });
    this.selectedItems_Method(title, value);
  }

  async selectedItems_Method(title, value) {
    let count = 0;
    let objCount = 0;
    var index = this.state.selectedItems.indexOf(value);
    if (this.state.selectedItems.length > 0) {
      this.state.selectedItems.map((item, Index) => {
        const arrayOfObject = this.state.selectedItems;
        const checkUsername = (obj) => obj.title === title;
        //console.log("arrayOfObject:" + (item.title + "====" + title));

        if (item.title == title) {
          item.values.map((res, Key) => {
            //alert('item.values:'+JSON.stringify(res))
            if (res.type === value.type) {
              //alert('if:'+res.eatItems+',,,'+value.eatItems)
              item.values.splice(Key, 1);
              // console.log(
              //   item.title + ".........." + JSON.stringify(item.values)
              // );
              if (item.values.length == 0) {
                this.state.selectedItems.splice(Index, 1);
              }
              count++;
              //alert(JSON.stringify(item.values))
            } else {
              //console.log("else:" + JSON.stringify(res));
              // this.state.selectedItems.splice(Index,1)
              //count++
            }
          });
        }
      });

      if (count === 0) {
        //alert(count)
        this.state.selectedItems.map((item, index) => {
          const arrayOfObject = this.state.selectedItems;
          const checkUsername = (obj) => obj.title === title;
          //console.log("checkUsername:" + (item.title + "====" + title));

          if (item.title == title) {
            item.values.push(value);
          } else if (arrayOfObject.some(checkUsername) == false) {
            var values = [];
            values.push(value);
            this.state.selectedItems.push({ title, values });
            this.setState({ selectedItems: this.state.selectedItems });
          } else {
            //alert(JSON.stringify(this.state.selectedItems));
          }
        });
      }
    } else {
      this.setState(
        {
          selectedItem: { value },
        },
        () => {
          var values = [];
          values.push(value);
          this.state.selectedItems.push({ title, values });
          this.setState({ selectedItems: this.state.selectedItems });
        }
      );
    }
    this.setState(
      {
        selectedItems: this.state.selectedItems,
      },
      () => {
        // console.log(
        //   "selectedItems:" + JSON.stringify(this.state.selectedItems)
        // );
      }
    );
  }

  employmentsSectionRender({ item, index, section: { title } }) {
    var count = 0;
    var showEye;
    var showSubList;

    this.state.employmentMainList.map((res, i) => {
      if (res.title == title) {
        showSubList = true;
        count = count + 1;
      }
      if (count === 0) {
        showSubList = false;
      }
    });
    //console.log("title", this.state.employmentMainList.includes(title));

    this.state.selectedItems.map((res, i) => {
      res.values.map((selectedItemid, index) => {
        if (selectedItemid.Id == item.Id) {
          showEye = true;
          count = count + 1;
        }
        if (count === 0) {
          showEye = false;
        }
      });
    });
    //console.log("title", this.state.employmentMainList.includes(title));

    return (
      <View>
        {showSubList == true ? (
          <View
            style={{
              width: windowWidth,
              height: windowWidth * 0.16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: windowWidth * 0.06,
            }}
          >
            <Text
              style={{
                color: showEye ? color.lightGrey : "black",
                fontFamily: "CenturyGothic",
                fontSize: windowWidth * 0.0416,
              }}
            >
              {item.type}
            </Text>
            <TouchableOpacity onPress={this.onEye.bind(this, item, title)}>
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
        ) : null}
      </View>
    );
  }

  employmentSectionHeader({ section: { title, data } }) {
    var showIcon;
    var count = 0;
    this.state.employmentMainList.map((res, i) => {
      if (res.title == title) {
        showIcon = true;
        count = count + 1;
      }
      if (count === 0) {
        showIcon = false;
      }
    });
    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: windowWidth * 0.06,
        }}
      >
        <Text
          style={{
            color: showIcon ? "black" : color.lightGrey,
            fontFamily: "CenturyGothic",
            fontSize: windowWidth * 0.0416,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={this.onEmployment.bind(this, title, data)}>
          <Icon
            type={"Ionicons"}
            name={showIcon ? "ios-checkbox" : "ios-square-outline"}
            style={{
              fontSize: showIcon ? windowWidth * 0.063 : windowWidth * 0.076,
              color: showIcon ? "black" : color.lightGrey,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
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
            <CollapsibleView
              label="Resume"
              iconActive={this.state.resumeCollapsible ? true : false}
              onPress={() => {
                // this.setState({
                //   resumeCollapsible: !this.state.resumeCollapsible,
                // });
              }}
              collapseActive={false}
            />
            {this.state.resumeCollapsible ? (
              <FlatList
                data={Resumelist}
                extraData={this.state}
                renderItem={this.resumeRender.bind(this)}
              />
            ) : null}
            <CollapsibleView
              label="Employment VC"
              iconActive={this.state.employmentCollapsible ? true : false}
              onPress={() => {
                this.setState({
                  employmentCollapsible: !this.state.employmentCollapsible,
                });
              }}
            />
            {this.state.employmentCollapsible ? (
              <SectionList
                extraData={this.state}
                sections={this.state.employmentList}
                keyExtractor={(item, index) => item + index}
                renderItem={this.employmentsSectionRender.bind(this)}
                renderSectionHeader={this.employmentSectionHeader.bind(this)}
              />
            ) : null}
            <CollapsibleView
              label="Education VC"
              onPress={() => {
                //this.props.navigation.push("EmploymentVc");
              }}
              collapseActive={false}
            />
            <View style={{ marginVertical: windowWidth * 0.09 }}>
              <Button
                buttonType="gradient"
                style={styles.button}
                onPress={this.onPreviewShare.bind(this)}
              >
                <Text style={styles.buttonText}>PREVIEW & SHARE</Text>
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
      </View>
    );
  }
}
export default ShareCertificate;
