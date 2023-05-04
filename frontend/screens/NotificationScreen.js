import React, { useState } from "react";
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

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const NotificationScreen = ({navigation}) => {
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
            <View style={styles.bodyContainer}>
                <View style={styles.elementContainer}>
                    <View style={styles.iconElement}>
                        <FontAwesome5 name="fan" size={50} color={'black'} />
                    </View>
                    <View style={styles.contentElement}>
                        <Text>Thiết bị: Quạt</Text>
                        <Text>state: 'ON', value: '', state: ''</Text>
                        <Text>Action: </Text>
                        <Text>Time: </Text>
                    </View>
                </View>
            </View>
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
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
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
        flex: 9,
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