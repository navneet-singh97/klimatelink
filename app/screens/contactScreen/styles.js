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
  contactImg: { width: windowWidth, height: windowWidth / 1.6 },
  subContainer: { marginTop: windowWidth * 0.06 },
  topContainer: { paddingVertical: windowWidth * 0.036 },
  title: {
    color: color.blackText,
    fontFamily: "CenturyGothic-Bold",
    alignSelf: "center",
    fontSize: windowWidth * 0.046,
    marginBottom: windowWidth * 0.036,
  },
  subTitle: {
    color: color.blackText,
    fontFamily: "CenturyGothic",
    alignSelf: "center",
    fontSize: windowWidth * 0.036,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: windowWidth * 0.036,
    padding: windowWidth * 0.036,
    borderWidth: 1.6,
    borderColor: color.secondaryOrange,
    alignItems: "center",
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  typeText: {
    color: color.blackText,
    fontFamily: "CenturyGothic",
    alignSelf: "center",
    fontSize: windowWidth * 0.036,
  },
  valueText: {
    color: color.primaryColor,
    fontFamily: "CenturyGothic-Bold",
    alignSelf: "center",
    fontSize: windowWidth * 0.0416,
  },
  centerSubContainer: {},
  bottomContainer: { paddingVertical: windowWidth * 0.036 },
});
