import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { color } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBgColour,
    //justifyContent: "center",
    //alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  appName: { fontSize: 26, color: "black" },
  title: {
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.046,
    marginLeft: windowWidth * 0.0169,
  },
  titleText: {
    color: color.primary,
    fontFamily: "CenturyGothic-Bold",
    alignSelf: "center",
    fontSize: windowWidth * 0.069,
    textShadowColor: color.primaryColor,
    textShadowOffset: { width: 1, height: 1.6 },
    textShadowRadius: 1,
    marginBottom: windowWidth * 0.16,
  },
  sectionHeader: {
    margin: windowWidth * 0.0369,
    marginBottom: windowWidth * 0.0196,
  },
  cardView: {
    marginHorizontal: windowWidth * 0.036,
    borderRadius: windowWidth * 0.036,
  },
  innerCardView: {
    backgroundColor: "white",
    flexDirection: "column",
    padding: windowWidth * 0.036,
    borderRadius: windowWidth * 0.036,
  },
  notificationView: { flexDirection: "row" },
  listTitleText: {
    color: color.blackText,
    fontSize: windowWidth * 0.0406,
    fontFamily: "CenturyGothic",
    //marginTop: windowWidth * 0.016,
  },
  listStatusText: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.036,
    fontFamily: "CenturyGothic",
    textAlign: "justify",
    marginTop: windowWidth * 0.016,
  },
  listStatusTime: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.0316,
    fontFamily: "CenturyGothic",
    textAlign: "justify",
    marginTop: windowWidth * 0.016,
  },
  statusText: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.0316,
    fontFamily: "CenturyGothic",
    textAlign: "center",
    marginTop: windowWidth * 0.016,
  },
  iconView: {
    width: windowWidth * 0.096,
    height: windowWidth * 0.096,
    borderRadius: (windowWidth * 0.196) / 2,
    //borderWidth: 0.6,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "white",
    fontSize: windowWidth * 0.036,
    fontFamily: "CenturyGothic",
    alignSelf: "center",
  },
  appIcon: {
    width: windowWidth * 0.126,
    height: windowWidth * 0.126,
    alignSelf: "center",
  },
  titleView: {
    flex: 1,
    paddingLeft: 6,
  },
});
