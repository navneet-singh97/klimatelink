import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { color } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBgColour,
    //justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  appName: { fontSize: 26, color: "black" },
  subContainer: {
    //width: windowWidth - 50,
    //minHeight: windowWidth,
    backgroundColor: color.primaryYellow,
    //marginTop: windowWidth * 0.2146,
    borderRadius: windowWidth * 0.06,
    padding: windowWidth * 0.0469,
  },
  topContainer: {
    flexDirection: "row",
    paddingLeft: windowWidth * 0.0316,
  },
  userInfoContainer: {
    flexDirection: "column",
    marginLeft: windowWidth * 0.031,
  },
  flatListContainer: {
    // paddingTop: windowWidth * 0.0296,
    alignItems: "center",
  },
  listView: {
    width: windowWidth / 2.64,
    height: windowWidth / 3.79,
    borderWidth: 0,
    backgroundColor: color.background,
    justifyContent: "space-around",
    margin: windowWidth * 0.016,
    borderRadius: windowWidth * 0.06,
    padding: windowWidth * 0.036,
  },
  listSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listCount: {
    color: color.primaryColor,
    fontSize: windowWidth * 0.0496,
    fontFamily: "CenturyGothic-Bold",
    alignSelf: "flex-end",
  },
  listTitle: {
    color: color.primary,
    fontSize: windowWidth * 0.0316,
    fontFamily: "CenturyGothic-Bold",
  },
  listImage: { width: windowWidth * 0.13, height: windowWidth * 0.13 },
  titleStyle: {
    color: color.primary,
    fontSize: windowWidth * 0.046,
    fontFamily: "CenturyGothic-Bold",
    // textShadowColor: "black",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 1,
  },
  nameStyle: {
    color: color.textColor,
    fontSize: windowWidth * 0.041,
    fontFamily: "CenturyGothic-Bold",
  },
  dateStyle: {
    color: color.textColor,
    fontSize: windowWidth * 0.031,
    fontFamily: "CenturyGothic",
  },
  welcomeText: {
    color: color.textColor,
    fontSize: windowWidth * 0.069,
    fontFamily: "CenturyGothic",
    marginVertical: windowWidth * 0.0314,
    marginLeft: windowWidth * 0.0316,
  },
  button: {
    width: windowWidth / 1.6,
    height: windowWidth * 0.156,
    borderRadius: windowWidth * 0.076,
    marginTop: windowWidth * 0.069,
    marginBottom: windowWidth * 0.136,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: windowWidth * 0.0416,
    alignSelf: "center",
    fontFamily: "CenturyGothic-Bold",
    marginVertical: windowWidth * 0.016,
  },
});
