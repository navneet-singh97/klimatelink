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
  statusTitle: {
    color: color.blackText,
    fontFamily: "CenturyGothic-Bold",
    textAlign: "justify",
    fontSize: windowWidth * 0.0416,
    marginLeft: windowWidth * 0.0316,
  },
  statusSubText: {
    color: color.greyText,
    fontFamily: "CenturyGothic",
    textAlign: "justify",
    fontSize: windowWidth * 0.0336,
  },
});
