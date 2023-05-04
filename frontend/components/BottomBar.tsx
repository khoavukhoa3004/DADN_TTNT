import * as React from 'react';
import {Dimensions, View, Text, StyleSheet,Button, Image, ScrollView, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const BottomBar = ({navigation}: {navigation: any}) => {

    return (
        <View style={styles.bottomContainer}>
        <View style={styles.leftBottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('DeviceSettingScreen')}>
            <Image
                style={styles.leftBottomContainer_Footer}
                source={require("../assets/images/Led_Fan/leftFooter.png")}
            />
            <Icon1
                // ios="ios-add"
                // android="android-add"
                name="add-circle-outline"
                size={30}
                color={"white"}
                style={styles.HomeIcon}
            ></Icon1>
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
                <Icon1
                // ios="ios-add"
                // android="android-add"
                name="person-outline"
                size={30}
                color={"white"}
                style={styles.personIcon}
                ></Icon1>
            </TouchableOpacity>
        </View>
    </View>
)};


export default BottomBar;

const styles = StyleSheet.create({
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