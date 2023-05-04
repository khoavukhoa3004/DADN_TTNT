import React, { useEffect, useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import { Line, LinearGradient } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5   } from '@expo/vector-icons';
import client from "../API/client";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const NotificationScreen = ({navigation}) => {
    const [devices, setDevices] = useState([]);
    const isIdExist = (temp) => {
        if(devices.length == 0)
            return false;
        return devices.find(device => device._id === temp)
    }
    useEffect(() => {
        const getDeviceLog = async () => {
            try {
                const response = await client.get('/deviceLog/get10DeviceLogs')
                if(response.data.success) {
                    const res = response.data.data;
                    console.log(res.length)
                    for(i = 0; i < res.length; i++) {
                        if(!isIdExist(res[i]._id)){
                            console.log(`res[${i}]: `, res[i]);
                            const temp = res[i].action.split('{');
                            console.log(temp)
                            let name = temp[0];
                            let action = temp[1];
                            name = name.substring(0, name.indexOf(':'));
                            action = action.substring(0, action.indexOf('}'));
                            console.log('name: ', name);
                            console.log('action: ', action)
                            setDevices((preState) => [...preState, { key: res[i]._id, name: name, action: action, time: res[i].time}]);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        getDeviceLog();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.backContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('HomeScreen');
                        // navigation.pop(1);
                    }}>
                    <Icon
                        name="chevron-back-circle-outline"
                        size={32}
                        style={styles.chevronLeft}
                    ></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleHeader}>Thông báo</Text>
                </View>
                <View style={styles.rightContainer}></View>
            </View>

            <ScrollView style={styles.bodyContainer}>
                {devices.map((item)=> (
                    <View key={item.key} style={styles.elementContainer}>
                        <View style={styles.iconElement}>
                            {(item.name == 'fanstatus-1') && <FontAwesome5 name="fan" size={50} color={'black'} style={{}}/>}
                            {(item.name == 'ledstatus-1') && <FontAwesome5 name="lightbulb" size={30} color={'black'} />}
                            {(item.name == 'doorstatus-1')&&<FontAwesome5 name="door-open" size={30} color={'black'} />}

                        </View>
                        <View style={styles.contentElement}>
                            <Text>Thiết bị: {item.name}</Text>
                            <Text>Action: {item.action}</Text>
                            <Text>Time: {item.time}</Text>
                        </View>
                    </View>
                ))}
                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      },
    headContainer: {
        // flex: 1,
        height: 100,
        flexDirection: 'row',
        borderBottomWidth: 1,
        // backgroundColor: 'blue'
    },
    backContainer: {
        flex: 1,
        // backgroundColor: 'pink',
    },
    titleContainer: {
        flex: 3,
        // backgroundColor: 'orange',
    },
    rightContainer: {
        flex: 1,
    },
    titleHeader: {
        display: 'flex',
        textAlign: 'center',
        top: 0.05 * ScreenHeight,
        fontWeight: 500,
        fontSize: 0.055 * ScreenWidth,
    },
    chevronLeft: {
        position: "absolute",
        top: 0.045 * ScreenHeight,
        left: 0.025 * ScreenWidth,
    },

    bodyContainer: {
        // flex: 10,
        // flexDirection: 'column',
        // backgroundColor: 'green',
    },
    elementContainer: {
        height: 80,
        // backgroundColor: 'blue',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        // flex: 1,
    },
    iconElement: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentElement: {
        flex: 3,
        borderWidth: 1,
        paddingLeft: 5,
    }
});

export default NotificationScreen;