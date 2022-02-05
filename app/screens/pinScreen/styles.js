import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  appName: { fontSize: 26, color: "black" },
  subContainer: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    paddingTop: windowWidth * 0.06,
    // justifyContent: "center",
  },
  welcomeText: {
    color: color.text,
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.066,
    alignSelf: "center",
  },
});
