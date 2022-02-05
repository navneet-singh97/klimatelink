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
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.046,
    marginLeft: windowWidth * 0.0169,
  },
  listTitle: {
    padding: windowWidth * 0.0369,
    paddingHorizontal: windowWidth * 0.06,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.6,
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
  notificationView: { flexDirection: "row", alignItems: "center" },
  titleView: {
    flex: 1,
    paddingLeft: 6,
  },
  notificationTitleText: {
    color: "black",
    fontSize: windowWidth * 0.046,
    fontFamily: "CenturyGothic",
    //marginTop: windowWidth * 0.016,
  },
  notificationText: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.036,
    fontFamily: "CenturyGothic",
    textAlign: "justify",
    marginTop: windowWidth * 0.0116,
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
  modalBox: {
    width: windowWidth - 40,
    backgroundColor: "white",
    padding: windowWidth * 0.0146,
    borderRadius: windowWidth * 0.0164,
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
    fontFamily: "CenturyGothic-Bold",
    color: color.primary,
    //alignSelf: "center",
    textAlign: "left",
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
    fontSize: windowWidth * 0.046,
    fontFamily: "CenturyGothic",
    color: color.textColor,
    //alignSelf: "center",
    alignSelf: "center",
  },
  modalShareBox: {
    width: windowWidth / 1.264,
    backgroundColor: "white",
    padding: windowWidth * 0.06,
    borderRadius: windowWidth * 0.0164,
    alignSelf: "center",
  },
  modalShareView: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: windowWidth * 0.0146,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalShareText: {
    fontSize: windowWidth * 0.0416,
    fontFamily: "CenturyGothic",
    color: "black",
    //alignSelf: "center",
    textAlign: "left",
    marginVertical: windowWidth * 0.036,
  },
  modalShareButtonText: {
    fontSize: windowWidth * 0.0436,
    fontFamily: "CenturyGothic",
    color: "black",
    //alignSelf: "center",
    alignSelf: "center",
  },
});
