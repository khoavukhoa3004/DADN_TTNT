import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, Image, ScrollView, Switch, TouchableOpacity, ActivityIndicator  } from 'react-native';

const DeviceContainer = () => {
    return (
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
    );
}

export default DeviceContainer;

const styles = StyleSheet.create({
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
});
