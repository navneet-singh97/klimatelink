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
  buttonView: {
    backgroundColor: "#ef7b5a",
    padding: windowWidth * 0.016,
    paddingHorizontal: windowWidth * 0.046,
    borderRadius: windowWidth * 0.06,
    marginTop: 10,
  },
  buttonTitle: {
    color: "white",
    fontFamily: "CenturyGothic",
    fontSize: windowWidth * 0.0416,
  },
  swiperCircle: {
    backgroundColor: "#ef7b5a",
    height: windowWidth * 0.126,
    width: windowWidth * 0.126,
    borderRadius: (windowWidth * 0.126) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  swiperPagination: {
    height: windowWidth * 0.03,
    width: windowWidth * 0.03,
    borderRadius: (windowWidth * 0.03) / 2,
    backgroundColor: color.transparent,
    borderWidth: 1.12,
    borderColor: color.lightGrey,
  },
  topContainer: {
    flex: 0.35,
    //flexDirection: "row",
    borderWidth: 0,
    // backgroundColor: "yellow",
  },
  walletImage: {
    flex: 1,
    resizeMode: "cover",
  },
  walletButtonText: {
    fontSize: windowWidth * 0.0296,
    color: "white",
    alignSelf: "center",
    fontFamily: "CenturyGothic",
  },
  centerContainer: {
    flex: 0.65,
    flexDirection: "column",
    borderWidth: 0,
    justifyContent: "flex-start",
  },
  topButtonContainer: {
    width: windowWidth * 0.24,
    height: windowWidth * 0.076,
    backgroundColor: "transparent",
    marginTop: windowWidth * 0.376,
    marginLeft: windowWidth * 0.041,
    borderWidth: 0,
    justifyContent: "center",
  },
  topRightContainer: {
    flex: 0.5,
    // backgroundColor: "blue",
    justifyContent: "center",
  },
  carouselMainView: {
    flexDirection: "row",
  },
  carouselButtonView: {
    paddingVertical: windowWidth * 0.046,
  },
  bottomView: {
    flex: 0.35,
    //backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  renderButton: {
    backgroundColor: "#ef7b5a",
    alignSelf: "center",
    borderRadius: (windowWidth * 0.16) / 2,
    height: windowWidth * 0.16,
    width: windowWidth * 0.16,
    alignItems: "center",
    justifyContent: "center",
  },
  renderText: {
    textAlign: "center",
    fontSize: windowWidth * 0.026,
    alignSelf: "center",
    fontFamily: "CenturyGothic",
  },
});
