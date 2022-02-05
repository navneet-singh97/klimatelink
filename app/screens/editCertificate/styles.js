import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { color } from "../../theme";

export default StyleSheet.create({
  container: {
    // flex: 1,
    width: windowWidth,
    height: windowHeight,
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
  listContainer: {
    flexDirection: "row",
    padding: windowWidth * 0.06,
    justifyContent: "space-between",
  },
  listText: {
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0416,
    marginLeft: windowWidth * 0.0169,
  },
  listGreyText: {
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0416,
    marginLeft: windowWidth * 0.0169,
    color: color.lightGrey,
  },
  button: {
    width: windowWidth / 1.9,
    height: windowWidth * 0.156,
    borderRadius: windowWidth * 0.076,
    marginTop: windowWidth * 0.06,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: windowWidth * 0.0419,
    alignSelf: "center",
    fontFamily: "CenturyGothic-Bold",
  },
});
