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
  emailFormatContainer: {
    flexDirection: "column",
    padding: windowWidth * 0.0416,
  },
  emailFormatTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emailLightText: {
    color: color.lightGrey,
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.0376,
  },
  emailDarkText: {
    color: color.blackText,
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.0376,
  },
  timeText: {
    color: color.lightGrey,
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0336,
  },
  mailContentContainer: { marginVertical: windowWidth * 0.036 },
  sscCreatedContainer: { padding: windowWidth * 0.06 },
  sscCreatedText: {
    color: color.blackText,
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.0436,
  },
  generateText: {
    color: color.blackText,
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0416,
    margin: windowWidth * 0.0316,
    marginLeft: windowWidth * 0.06,
  },
  mainContainer: { flex: 1, elevation: 3 },
  enableButton: {
    height: windowWidth * 0.16,
    borderRadius: windowWidth * 0.076,
    marginTop: windowWidth * 0.06,
    alignSelf: "center",
    backgroundColor: color.primary,
    borderWidth: 0,
  },
  button: {
    height: windowWidth * 0.16,
    borderRadius: windowWidth * 0.076,
    marginTop: windowWidth * 0.06,
    alignSelf: "center",
    backgroundColor: "transparent",
    borderColor: color.lightGrey,
    borderWidth: 1,
  },
  enableButtonText: {
    color: color.textColor,
    fontSize: windowWidth * 0.0419,
    alignSelf: "center",
    fontFamily: "CenturyGothic-Bold",
    paddingHorizontal: windowWidth * 0.196,
  },
  buttonText: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.0419,
    alignSelf: "center",
    fontFamily: "CenturyGothic-Bold",
    padding: windowWidth * 0.196,
  },
  vcContentContainer: { marginVertical: windowWidth * 0.036 },
  vcSubTitle: {
    color: color.blackText,
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0376,
    //marginBottom: windowWidth * 0.096,
    marginHorizontal: windowWidth * 0.06,
  },
  vcListText: {
    color: color.blackText,
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0416,
    marginLeft: windowWidth * 0.06,
  },
  switchContainer: {
    flexDirection: "row",
    margin: windowWidth * 0.06,
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#f15a24",
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.0301,
    marginLeft: windowWidth * 0.06,
  },
  notesContainer: {
    width: windowWidth,
    borderBottomColor: color.lightGrey,
    borderBottomWidth: 0,
    elevation: 0,
  },
  noteHeader: {
    color: color.blackText,
    fontFamily: "CenturyGothic-Bold",
    fontSize: windowWidth * 0.046,
    paddingVertical: windowWidth * 0.036,
    marginLeft: windowWidth * 0.06,
  },
  notesText: {
    fontFamily: "CenturyGothic",
    color: color.lightGrey,
    alignSelf: "flex-end",
    fontSize: windowWidth * 0.036,
    marginRight: windowWidth * 0.06,
  },
});
