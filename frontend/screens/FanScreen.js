import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  PanResponder,
  TextInput,
} from "react-native";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import { Line, LinearGradient } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";
import client from '../API/client';
import { withAuth } from '../utils/auth';

// import {translateDevice, getVietNameseDevice} from '../../utils/translateDevice';


const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;


const FanScreen = ({ navigation, route }) => {

    const [fanHistories, setFanHistories] = useState([]);
    const [initialState, setInitialState] = useState("");
    const [initialValue, setInitialValue] = useState(0);
    const [value, setValue] = useState()

    const handleTextChange = (newValue) => {
      setValue(newValue);
    }

    const handleSave = async () => {
      try {
        
      } catch (error) {
        
      }
    }

    const getHistories = async () => {
      console.log('Hi!');
      try {
        const res = await client.get(`/device/getData/${route.params.deviceId}`)
        // console.log(res.data);
        // setFanHistories(res.data);
        setFanHistories(JSON.stringify(res.data));
        console.log("----------------------------------------------");
        // console.log(Histories);
      } 
      catch (error) {
        alert(`Có lỗi xảy ra: ${error.message}`);
        throw new Error('Error: ', error);
      }
    }

    const getStatus = async () => {
      try {
        // console.log(route.params.deviceNameSys);
        const response = await client.get(`/sensor/get-current-without-authenticated/${route.params.deviceNameSys}`,{
          headers: {
              'Content-Type': 'application/json',
          }
        }); 
        // console.log(response);
        setInitialState(response.data.value);
        // console.log(data);
        // setInitialState(data);
        console.log(initialState);
      } catch (error) {
        console.error(error);
      }
    }

    const getFanValue = async () => {
      try {
        const response = await client.get(`/sensor/get-current-without-authenticated/nmdk-1-fanvalue-1`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setInitialValue(response.data.value);
        console.log(initialValue);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      const interval = setInterval(async () => {
          // getStatus();
          getFanValue();
      }, 1000); // Fetch the latest temperature every second
      return () => clearInterval(interval);
    }, [])

    // useEffect(() => {
    //   if(initialState == 'OFF') console.log('TAT');
    //   else console.log('BAT');
    // }, [initialState])

  return (
    <View style={styles.Container}>
      <View style={styles.headContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.leftHeadContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              ios="ios-add"
              android="android-add"
              name="chevron-back-circle-outline"
              size={32}
              style={styles.chevronLeft}
            ></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.middleHeadContainer}>
          <Text style={styles.topTitle}>QUẠT</Text>
        </View>
        <View style={styles.rightHeadContainer}>
          {/* <Icon
            ios="ios-add"
            android="android-add"
            name="settings-outline"
            size={30}
            style={styles.settingIcon}
          ></Icon> */}
        </View>
      </View>

      <View style={styles.mainContainer}>
        {/* <View style={styles.leftMainLayout}>
          
        </View> */}
        <View style={styles.middleMainLayout}>
          <View style={styles.textInputBox}>
            
          </View>
          <View style={styles.currentStateBox}>
            <View style={styles.leftStateBox}>
              <Text style={styles.currentStateText}>Tình trạng hiện tại:</Text>
            </View>
            <View style={styles.rightStateBox}>
              <Text style={styles.currentStateText}>Quạt: {} {"\n"} Tốc độ quạt: {}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.rightMainLayout}>
            
        </View> */}
        {/* <View style={styles.leftMainLayout}>
          <Text style={styles.leftTextMainContainer}>Tắt</Text>
        </View>
        <View style={styles.middleMainLayout}>
          <Text style={styles.middleTextMainContainer}>Mạnh</Text>
          <View style={styles.firstMainBox}>
            <View style={styles.secondMainBox}>
              <View style={styles.thirdMainBox}>
                <View style={styles.fourthMainBox}></View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rightMainLayout}>
          <Text style={styles.rightTextMainContainer}>Rất{"\n"}Mạnh</Text>
        </View> */}
        {/* <View style={styles.firstLayout}>
          <View style={styles.secondLayout}>
            <View style={styles.thirdLayout}>
              <View style={styles.fourthLayout}>
                <View style={styles.fifthLayout}></View>
              </View>
            </View>
          </View>
        </View> */}
      </View>

      {/* <View style={styles.modeContainer}>
        <View style={styles.modeSubContainer}>
          <View style={styles.circleModeContainer}>
            <Image
              style={styles.functionIcon}
              source={require("../assets/images/Led_Fan/Mode_Icon.png")}
            />
          </View>
          <Text style={styles.functionTextContainer}>CHẾ ĐỘ</Text>
        </View>
        <View style={styles.modeSubContainer}>
          <View style={styles.circleModeContainer}>
            <Image
              style={styles.scheduleIcon}
              source={require("../assets/images/Led_Fan/Schedule_Icon.png")}
            />
          </View>
          <Text style={styles.scheduleTextContainer}>LỊCH TRÌNH</Text>
        </View>
        <View style={styles.modeSubContainer}>
          <View style={styles.circleModeContainer}>
            <Image
              style={styles.historyIcon}
              source={require("../assets/images/Led_Fan/History_Icon.png")}
            />
          </View>
          <Text style={styles.historyTextContainer}>LỊCH SỬ</Text>
        </View>
      </View> */}

      <View style={styles.modeContainer}>
        <View style={styles.modeSubContainer}>
          <TouchableOpacity onPress={() => {
            
          }}>
            <View style={styles.circleModeContainer}>
                <Image
                style={styles.functionIcon}
                source={require("../assets/images/Led_Fan/Mode_Icon.png")}
                />
            </View>
            <Text style={styles.functionTextContainer}>CHẾ ĐỘ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modeSubContainer}>
          <TouchableOpacity onPress={() => {

          }}>
            <View style={styles.circleModeContainer}>
                <Image
                style={styles.scheduleIcon}
                source={require("../assets/images/Led_Fan/Schedule_Icon.png")}
                />
            </View>
            <Text style={styles.scheduleTextContainer}>LỊCH TRÌNH</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modeSubContainer}>
          <TouchableOpacity onPress = {() => {
            // console.log(`deviceId: ${route.params.deviceId}`);
            getHistories();
          }}>
            <View style={styles.circleModeContainer}>
                <Image
                style={styles.historyIcon}
                source={require("../assets/images/Led_Fan/History_Icon.png")}
                />
            </View>
            <Text style={styles.historyTextContainer}>LỊCH SỬ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <View style={styles.historyBorder}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyHeaderText}>LỊCH SỬ</Text>
          </View>
          <View style={styles.historyList}>
            <ScrollView>
              <Text style={styles.historyText}>{fanHistories}</Text>
            </ScrollView>
          </View>
        </View>
      </View>

      {/* <View style={styles.infoContainer}>
        <View style={styles.insideTemperatureStyle}>
          <Text style={styles.insideTemperatureText}>
            Nhiệt độ{"\n"}trong nhà
          </Text>
          <Text style={styles.insideTemperatureNumber}>
            {receive_insideTemp}
          </Text>
        </View>
        <View style={styles.outsideTemperatureStyle}>
          <Text style={styles.outsideTemperatureText}>
            Nhiệt độ{"\n"}ngoài trời
          </Text>
          <Text style={styles.outsideTemperatureNumber}>
            {receive_outsideTemp}
          </Text>
        </View>
        <View style={styles.MoistureStyle}>
          <Text style={styles.MoistureText}>Độ ẩm{"\n"}</Text>
          <Text style={styles.MoistureNumber}>{receive_Moisture}</Text>
        </View>
      </View> */}

      {/* <View style={styles.deviceContainer}>
        <SelectDropdown
          data={LED_Devices}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Select FAN Devices"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdownButtonStyle}
          buttonTextStyle={styles.dropdownButtonTextStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Icon name={isOpened ? "chevron-up" : "chevron-down"} size={20} />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown4DropdownStyle}
          rowStyle={styles.dropdown4RowStyle}
          rowTextStyle={styles.dropdown4RowTextStyle}
        />
      </View> */}

      <View style={styles.bottomContainer}>
        <View style={styles.leftBottomContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.leftBottomContainer_Footer}
              source={require("../assets/images/Led_Fan/leftFooter.png")}
            />
            <Icon
              ios="ios-add"
              android="android-add"
              name="home-outline"
              size={30}
              color={"white"}
              style={styles.HomeIcon}
            ></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.middleBottomContainer}>
          <View style={styles.circleContainer}>
            <View style={styles.subCircleContainer}>
              <TouchableOpacity>
                <Icon3
                  style={styles.microphoneIcon}
                  name="microphone"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.rightBottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <Image
              style={styles.rightBottomContainer_Footer}
              source={require("../assets/images/Led_Fan/rightFooter.png")}
            ></Image>
            <Icon
              ios="ios-add"
              android="android-add"
              name="person-outline"
              size={30}
              color={"white"}
              style={styles.personIcon}
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FanScreen;
// HeadContainer: 1.2
// MainContainer: 5
// ModeContainer: 1.7
// InfoContainer: 1.75
// DeviceContainer: 1.2
// BottomContainer: 1.3
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
  },

  headContainer: {
    flex: 1.2,
    flexDirection: "row",
    backgroundColor: "#EFF1F5",
  },
  leftHeadContainer: {
    flex: 1,
  },
  middleHeadContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightHeadContainer: {
    flex: 1,
  },
  chevronLeft: {
    position: "absolute",
    top: 0.04 * ScreenHeight,
    left: 0.025 * ScreenWidth,
  },
  topTitle: {
    fontWeight: "bold",
    // fontSize: 20,
    fontSize: 0.0525 * ScreenWidth,
    // top: 10,
    top: 0.015 * ScreenHeight,
  },
  settingIcon: {
    position: "absolute",
    top: 0.04 * ScreenHeight,
    right: 0.025 * ScreenWidth,
  },

  mainContainer: {
    flex: 4.5,
    flexDirection: "row",
    backgroundColor: "#EFF1F5",
    justifyContent: "space-around",
  },
  leftMainLayout: {
    flex: 1,
    backgroundColor: 'blue',
  },
  middleMainLayout: {
    flex: 2.5,
    flexDirection: "column",
  },
  rightMainLayout: {
    flex: 1,
    backgroundColor: 'red',
  },
  textInputBox: {
    flex: 5,
  },
  currentStateBox: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  leftStateBox: {
    flex: 1,
    // borderColor: 'green',
    // borderWidth: 1,
  },
  rightStateBox: {
    flex: 1,
  },
  currentStateText: {
    textAlign: 'center',
    fontSize: 18,
  },

  leftTextMainContainer: {
    fontWeight: 600,
    fontSize: 0.04 * ScreenWidth,
    textAlign: "right",
    top: (5 / 24.3) * ScreenHeight,
    color: "green",
    // borderWidth: 1,
  },
  middleTextMainContainer: {
    flex: 0.5,
    fontWeight: 600,
    fontSize: 0.04 * ScreenWidth,
    textAlign: "center",
    color: "blue",
    // borderWidth: 1,
    // top: 0.01 * ScreenHeight,
  },
  rightTextMainContainer: {
    fontWeight: 600,
    fontSize: 0.04 * ScreenWidth,
    top: (5 / 24.3) * ScreenHeight,
    color: "red",
    // borderWidth: 1,
  },
  firstMainBox: {
    flex: 5.25,
    width: 0.6 * ScreenWidth,
    height: 0.6 * ScreenWidth,
    backgroundColor: "#DEE2E7",
    borderRadius: 0.3 * ScreenWidth,
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: "auto",
    marginRight: "auto",
  },
  secondMainBox: {
    width: 0.5 * ScreenWidth,
    height: 0.5 * ScreenWidth,
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    backgroundColor: "#3E455B",
    borderRadius: 0.25 * ScreenWidth,
  },
  thirdMainBox: {
    backgroundColor: "#DDE1E7",
    width: 0.4 * ScreenWidth,
    height: 0.4 * ScreenWidth,
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    borderRadius: 0.2 * ScreenWidth,
  },
  fourthMainBox: {
    backgroundColor: "red",
    width: 0.05 * ScreenWidth,
    height: 0.05 * ScreenWidth,
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    borderRadius: 0.05 * ScreenWidth,
    bottom: 0.09 * ScreenHeight,
    // left: 0.04 * ScreenWidth,
  },

  modeContainer: {
    flex: 1.7,
    flexDirection: "row",
    backgroundColor: "#EFF1F5",
    justifyContent: "space-around",
  },
  modeSubContainer: {
    width: 0.25 * ScreenWidth,
    backgroundColor: "#EFF1F5",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "green",
  },
  circleModeContainer: {
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: 50,
    height: 50,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#31374A",
  },
  functionIcon: {
    width: 25,
    height: 25,
  },
  scheduleIcon: {
    width: 30,
    height: 30,
  },
  historyIcon: {
    width: 35,
    height: 35,
  },
  functionTextContainer: {
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 5,
  },
  scheduleTextContainer: {
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 5,
  },
  historyTextContainer: {
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 5,
  },

  historyContainer: {
    flex: 2.95,
    backgroundColor: "#EFF1F5",
  },

  historyBorder: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'blue',
    width: ScreenWidth,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  historyHeader: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
  },

  historyHeaderText: {
    textAlign: 'center',
    top: 0.012 * ScreenHeight,
    fontSize: 20,
    fontWeight: 600,
  },

  historyList: {
    flex: 3,
    // backgroundColor: 'yellow',
  },

  historyText: {
    
  },

  // infoContainer: {
  //   flex: 1.75,
  //   flexDirection: "row",
  //   backgroundColor: "#EFF1F5",
  //   justifyContent: "space-around",
  // },
  // insideTemperatureStyle: {
  //   width: 0.25 * ScreenWidth,
  //   borderRadius: 12,
  //   backgroundColor: "rgba(168, 168, 168, 0.5)",
  // },
  // outsideTemperatureStyle: {
  //   width: 0.25 * ScreenWidth,
  //   borderRadius: 12,
  //   backgroundColor: "rgba(168, 168, 168, 0.5)",
  // },
  // MoistureStyle: {
  //   width: 0.25 * ScreenWidth,
  //   borderRadius: 12,
  //   backgroundColor: "rgba(168, 168, 168, 0.5)",
  // },
  // insideTemperatureText: {
  //   // fontSize: 16,
  //   fontSize: 0.045 * ScreenWidth,
  //   fontWeight: 500,
  //   top: 5,
  //   left: 5,
  // },
  // insideTemperatureNumber: {
  //   fontSize: 0.045 * ScreenWidth,
  //   fontWeight: 500,
  //   // top: 25,
  //   bottom: -25,
  //   left: 5,
  // },
  // outsideTemperatureText: {
  //   // fontSize: 16,
  //   fontSize: 0.045 * ScreenWidth,
  //   fontWeight: 500,
  //   top: 5,
  //   left: 5,
  // },
  // outsideTemperatureNumber: {
  //   fontSize: 0.045 * ScreenWidth,
  //   fontWeight: 500,
  //   // top: 25,
  //   bottom: -25,
  //   left: 5,
  // },
  // MoistureText: {
  //   // fontSize: 16,
  //   fontSize: 0.045 * ScreenWidth,
  //   fontWeight: 500,
  //   top: 5,
  //   left: 5,
  // },
  // MoistureNumber: {
  //   fontSize: 0.045 * ScreenWidth,
  //   fontWeight: 500,
  //   // top: 25,
  //   bottom: -25,
  //   left: 5,
  // },

  // deviceContainer: {
  //   flex: 1.2,
  //   backgroundColor: "#EFF1F5",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // dropdownButtonStyle: {
  //   width: "70%",
  //   height: 50,
  //   backgroundColor: "#DCDCDC",
  //   borderRadius: 50,
  //   borderWidth: 1,
  //   borderColor: "#FFFFFF",
  // },
  // dropdownButtonTextStyle: {
  //   fontWeight: 600,
  //   fontSize: 17,
  //   color: "rgba(60, 60, 67, 0.6)",
  //   textAlign: "left",
  // },
  // dropdown4DropdownStyle: {
  //   backgroundColor: "#EFEFEF",
  // },
  // dropdown4RowStyle: {
  //   backgroundColor: "#EFEFEF",
  //   borderBottomColor: "#C5C5C5",
  // },
  // dropdown4RowTextStyle: {
  //   textAlign: "left",
  //   color: "rgba(60, 60, 67, 0.6)",
  //   fontWeight: 600,
  //   fontSize: 17,
  // },

  bottomContainer: {
    flex: 1.4,
    flexDirection: "row",
    backgroundColor: "#EFF1F5",
  },
  leftBottomContainer: {
    flex: 1,
  },
  middleBottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightBottomContainer: {
    flex: 1,
  },
  leftBottomContainer_Footer: {
    justifyContent: "flex-start",
    width: "100%",
  },
  HomeIcon: {
    position: "absolute",
    bottom: 0.05 * ScreenHeight,
    left: 0.065 * ScreenWidth,
  },
  // circleContainer: {
  //   position: "absolute",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: 60,
  //   height: 60,
  //   borderRadius: 100 / 2,
  //   backgroundColor: "green",
  // },
  circleContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
    backgroundColor: "#FFFFFF",
  },
  subCircleContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: "#D8D8D8",
  },
  microphoneIcon: {},
  rightBottomContainer_Footer: {
    justifyContent: "flex-start",
    width: "100%",
  },
  personIcon: {
    position: "absolute",
    bottom: 0.05 * ScreenHeight,
    right: 0.065 * ScreenWidth,
  },
});
