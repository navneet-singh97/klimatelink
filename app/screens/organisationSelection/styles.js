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
  searchBarContainer: {
    backgroundColor: color.secondaryOrange,
    width: windowWidth / 1.06,
    height: windowWidth * 0.13,
    borderBottomWidth: 0,
    alignSelf: "center",
    borderRadius: windowWidth * 0.096,
    marginVertical: windowWidth * 0.06,
  },
  searchBarInputContainer: {
    height: windowWidth * 0.09,
    backgroundColor: color.secondaryOrange,
    borderRadius: windowWidth * 0.06,
  },
  searchBarInputStyle: {
    fontFamily: "CenturyGothic",
    color: color.textColor,
    fontSize: windowWidth * 0.046,
    alignSelf: "center",
  },
  searchBarIconStyle: {},
});
