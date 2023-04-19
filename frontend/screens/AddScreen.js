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

const AddScreen = ({navigation}) => {
    return(
        <View style={styles.container}></View>
    )
};

const styles = StyleSheet.create({
    container: {},
});

export default AddScreen;