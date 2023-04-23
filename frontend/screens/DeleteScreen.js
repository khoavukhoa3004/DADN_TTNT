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
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import { Line, LinearGradient } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const DeleteScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.backContainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('DeviceSettingScreen');
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
                    <Text style={styles.titleHeader}>Xóa Thiết Bị</Text>
                </View>
                <View style={styles.rightContainer}></View>
            </View>
            <View style={styles.bodyContainer}></View>
        </View>
    )
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
});

export default DeleteScreen;