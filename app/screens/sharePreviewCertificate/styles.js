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
  listTitle: {
    padding: windowWidth * 0.0369,
    // paddingHorizontal: windowWidth * 0.06,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0,
  },
  title: {
    fontFamily: "CenturyGothic-Bold",
    color: color.primary,
    fontSize: windowWidth * 0.046,
  },
  innerListView: {
    paddingHorizontal: windowWidth * 0.0369,
    paddingVertical: windowWidth * 0.016,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "CenturyGothic",
    color: "black",
    fontSize: windowWidth * 0.0416,
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
  checkBox: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    marginTop: windowWidth * 0.03,
  },
  checkBoxText: {
    fontSize: windowWidth * 0.0416,
    //marginLeft: windowWidth * 0.01,
    marginTop: windowWidth * 0.036,
    color: "black",
    fontFamily: "CenturyGothic",
  },
  modalBox: {
    width: windowWidth / 1.264,
    backgroundColor: "white",
    padding: windowWidth * 0.06,
    borderRadius: windowWidth * 0.0164,
    alignSelf: "center",
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: windowWidth * 0.0146,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalText: {
    fontSize: windowWidth * 0.0416,
    fontFamily: "CenturyGothic",
    color: "black",
    //alignSelf: "center",
    textAlign: "left",
    marginVertical: windowWidth * 0.036,
  },
  modalImage: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    alignSelf: "flex-end",
  },
  modalButton: {
    backgroundColor: color.primary,
    justifyContent: "center",
    paddingVertical: windowWidth * 0.036,
    borderRadius: windowWidth * 0.0164,
    marginTop: windowWidth * 0.01694,
  },
  modalButtonText: {
    fontSize: windowWidth * 0.0436,
    fontFamily: "CenturyGothic",
    color: "black",
    //alignSelf: "center",
    alignSelf: "center",
  },
});
