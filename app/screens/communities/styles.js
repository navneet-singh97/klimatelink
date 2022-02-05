import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { color } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBgColour,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  appName: { fontSize: 26, color: "black" },
  flatListContainer: {
    paddingTop: windowWidth * 0.0296,
    alignItems: "center",
  },
  listImageView: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    borderWidth: 0,
    justifyContent: "space-around",
    margin: windowWidth * 0.0096,
    borderRadius: windowWidth * 0.0196,
  },
  listImageStyle: {
    flexDirection: "row",
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    borderRadius: windowWidth * 0.0196,
    alignItems: "flex-end",
    padding: windowWidth * 0.0246,
  },
  listTitleStyle: {
    color: color.textColor,
    fontSize: windowWidth * 0.046,
    fontFamily: "CenturyGothic-Bold",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  searchBarContainer: {
    backgroundColor: color.primaryBgColour,
    width: windowWidth / 1.06,
    borderBottomWidth: 0,
  },
  filterList: {
    width: windowWidth - 40,
    backgroundColor: "white",
    padding: windowWidth * 0.0316,
    alignSelf: "center",
    marginTop: -windowWidth * 0.016,
  },
  filterListText: {
    fontFamily: "CenturyGothic",
    marginLeft: windowWidth * 0.066,
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
    fontSize: windowWidth * 0.049,
    alignSelf: "center",
    fontFamily: "CenturyGothic-Bold",
  },
});
