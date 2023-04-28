import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, Image, ScrollView, Switch, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather'; 
import BottomBar from '../components/BottomBar';
import DeviceComponent from '../components/HomeElement/DeviceElement';
import WeatherWidgetComponent from '../components/HomeElement/WeatherWidgetElement';
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;



const HomeScreen = ({navigation}: {navigation: any}) =>{
    const [isEnabled, setIsEnabled] = React.useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {/* Header */}
                <View style={styles.headerWrapper}>
                    <View style={styles.headerTitle}>
                        <Text style={{fontSize: 30, fontFamily: 'Inter-Bold', }}>Xin chào Natasha!</Text>
                        <Text style={{position: 'absolute', fontSize: 60, fontFamily: 'Inter-Bold', opacity: 0.1}}></Text>
                    </View>

                    <View style={styles.headerNotification}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('NotificationScreen');
                        }}>
                            <Icon1 name="notifications-outline" size={50} color="blue"/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Weather widget */}
                <WeatherWidgetComponent deviceNameSystem="nmdk-1-tempsensor-1"/>


                {/* Element Details */}
                <View style={styles.elementDetail}>
                    <View style={styles.roomDetail}>
                        <ScrollView horizontal={true}>
                            <View style={styles.roomCell}><Text>Phòng khách</Text></View>
                            <View style={styles.roomCell}><Text>Phòng ngủ</Text></View>
                            <View style={styles.roomCell}><Text>Nhà bếp</Text></View>
                            <View style={styles.roomCell}><Text>Nhà vệ sinh</Text></View>
                            <View style={styles.roomCell}><Text>Garage</Text></View>
                        </ScrollView>
                    </View>

                    {/* List Details */}
                    <ScrollView style={styles.listDetail}>
                        <View style={styles.listDetailRow}>
                                <DeviceComponent deviceNameSystem="nmdk-1-doorstatus-1" navigation={navigation} color="dark"/>
                                <DeviceComponent deviceNameSystem="nmdk-1-fanstatus-1" navigation={navigation} color="light"/>
                        </View>
                        <View style={styles.listDetailRow}>
                                <DeviceComponent deviceNameSystem="nmdk-1-ledstatus-1" navigation={navigation} color="light"/>
                        </View>
                    </ScrollView>
                </View>
                  
            </View>
            <BottomBar navigation={navigation}/>
        </View>
    );
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EFF1F5',
    },
    subContainer: {
        flex: 10.35,
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,

    },
    // header
    headerWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'center',
        alignItems:'center',
        // backgroundColor: 'blue',

    },
    headerTitle: {
        flex: 8,
        // backgroundColor: 'blue',
    },
    headerNotification: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Device details
    elementDetail: {
        flex:4 ,
        flexDirection: 'column',
        // paddingTop: 5,
        
    },
    roomDetail: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    roomCell: {
        marginLeft: 15,
        marginRight: 15,
    },
    listDetail: {
        // flexDirection: 'column',
      
    },
    listDetailRow: {
        flexDirection: 'row',
    },
    bottomContainer: {
        flex: 1.2,
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
        bottom: 0.06 * ScreenHeight,
        left: 0.065 * ScreenWidth,
      },
      circleContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 100 / 2,
        backgroundColor: "green",
      },
      microphoneIcon: {},
      rightBottomContainer_Footer: {
        justifyContent: "flex-start",
        width: "100%",
      },
      personIcon: {
        position: "absolute",
        bottom: 0.06 * ScreenHeight,
        right: 0.065 * ScreenWidth,
      },
});