import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { color } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
    //alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  mainLogo: {
    width: windowWidth * 0.36,
    height: windowWidth * 0.36,
    marginBottom: windowWidth * 0.06,
    alignSelf: "center",
  },
  appName: { fontSize: 26, color: "black" },
  titleText: {
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.051,
  },
  renderText: {
    textAlign: "center",
    fontSize: windowWidth * 0.026,
    alignSelf: "center",
    fontFamily: "CenturyGothic",
  },
  listTopView: {
    width: windowWidth,
    paddingVertical: windowWidth * 0.036,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.036,
    // backgroundColor: "pink",
  },
  listTitle: {
    color: color.primary,
    fontWeight: "normal",
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.0384,
  },
  cardView: {
    marginHorizontal: windowWidth * 0.036,
    borderRadius: windowWidth * 0.036,
    marginTop: -windowWidth * 0.01946,
  },
  innerCardView: {
    backgroundColor: "white",
    flexDirection: "column",
    padding: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.036,
    borderRadius: windowWidth * 0.036,
  },
  cardSubContainer: { flexDirection: "row", alignItems: "center" },
  titleView: {
    flex: 1,
    paddingLeft: windowWidth * 0.079,
  },
  leftContainImage: {
    height: windowWidth * 0.07146,
    width: windowWidth * 0.07146,
    alignSelf: "center",
  },
  titleStyle: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.0376,
    fontFamily: "CenturyGothic",
    //marginTop: windowWidth * 0.016,
  },
  textStyle: {
    color: "black",
    fontSize: windowWidth * 0.0416,
    fontFamily: "CenturyGothic",
    textAlign: "justify",
    // marginTop: windowWidth * 0.0116,
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
});
