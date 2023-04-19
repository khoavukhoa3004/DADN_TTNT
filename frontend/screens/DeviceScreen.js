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

const DeviceListScreen = () => {
    return(
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <View style={styles.backContainer}>
            <Icon
              name="chevron-back-circle-outline"
              size={32}
              style={styles.chevronLeft}
            ></Icon>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>Quản lý thiết bị</Text>
          </View>
          <View style={styles.settingContainer}>
            <Icon
              name="settings-outline"
              size={30}
              style={styles.settingIcon}
            ></Icon>
          </View>
        </View>
        <View style={styles.bodyContainer}></View>
      </View>
    );
  }

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
  settingContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  titleHeader: {
    display: 'flex',
    textAlign: 'center',
    top: 0.055 * ScreenHeight,
    fontWeight: 500,
    fontSize: 0.055 * ScreenWidth,
  },
  chevronLeft: {
    position: "absolute",
    top: 0.04 * ScreenHeight,
    left: 0.025 * ScreenWidth,
  },
  settingIcon: {
    position: "absolute",
    top: 0.04 * ScreenHeight,
    right: 0.025 * ScreenWidth,
  },
  

  bodyContainer: {
    flex: 9,
    backgroundColor: 'green',
  },

});

export default DeviceListScreen;