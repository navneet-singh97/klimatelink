import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../theme';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F0',
  },
  triangleView: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: 14,
    borderBottomColor: '#fff',
  },
  triangleViewHidden: {
    width: 16,
    height: 16,
    marginTop: 6,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    backgroundColor: '#003237',
    paddingTop: 22,
    marginBottom: 8,
    width: windowWidth,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  planView: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  freeTrialBtn: {
    backgroundColor: color.secondaryColor,
    borderRadius: 25,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 12,
  },
  title: {
    fontSize: windowWidth * 0.0696,
    color: color.secondaryColor,
    fontFamily: 'CenturyGothic',
  },
  currentPlan: {
    fontSize: windowWidth * 0.046,
    marginTop: 12,
    fontFamily: 'CenturyGothic',
  },
  access: {
    fontSize: windowWidth * 0.0416,
    fontFamily: 'CenturyGothic',
  },
  whiteText: {
    fontSize: windowWidth * 0.046,
    color: color.textColor,
    fontFamily: 'CenturyGothic',
  },
  greenText: {
    fontSize: windowWidth * 0.046,
    color: color.appGreen,
    fontFamily: 'CenturyGothic',
  },
  orangeText: {
    color: 'orange',
    fontFamily: 'CenturyGothic',
    color: color.secondaryColor,
    fontSize: windowWidth * 0.046,
  },
  border: {
    borderColor: '#D3D1D1',
    borderWidth: 0.5,
    marginTop: 20,
  },
  listHeader: {
    marginVertical: 12,
    color: color.secondaryColor,
    fontFamily: 'CenturyGothic-Bold',
    fontSize: windowWidth * 0.0476,
  },
  listContent: {
    fontSize: windowWidth * 0.0436,
    flex: 1,
    fontFamily: 'CenturyGothic',
  },
});
