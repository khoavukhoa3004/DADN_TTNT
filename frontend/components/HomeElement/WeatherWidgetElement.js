import { View, Text, StyleSheet,Button, Image, ScrollView, Switch, TouchableOpacity, Dimensions } from 'react-native';
import Icon2 from 'react-native-vector-icons/Feather'; 
import {withAuth } from '../../utils/auth';
import client from '../../API/client';
import React, { useState, useEffect } from 'react';
const WeatherWidgetComponent = ({
    deviceNameSystem,
}) => {
    const [temperature, setTemperature] = useState(0);
    // checkLoginStatus(navigation);
    const updateTemp = async () => {
        try {
            const response = await withAuth((token) => client.get(`/sensor/get-current/${deviceNameSystem}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }));
            // console.log(response.data.value);
            setTemperature(response.data.value);
            // if(response?.value ==='ON' && !isClicked){
            //     setIsEnabled(true)
            // }
            // else if(response?.value ==='OFF' && !isClicked){
            //     console.log('yep');
            //     setIsEnabled(false)
            // }
        } catch (error) {
            console.error(error);
        }      
    }
    useEffect(() => {


        const interval = setInterval(async () => {
            updateTemp();
        }, 3600); // Fetch the latest temperature every second
        return () => clearInterval(interval);
    }, []);
    return (
        <View style={styles.weatherWidget} onPress={updateTemp()}>
            <Image source={require('../../assets/images/home/weather_widget.png')}/>
            <View style={styles.weatherInfor}>
                <View style={styles.locationInfor}>
                    <Text style={styles.locationTitle}>Vị trí nhà bạn</Text>
                    <Text style={styles.location}>Thủ Đức, Tp.Hồ Chí Minh</Text>
                    <View style={styles.weatherStateContainer}>
                        <Icon2  name="cloud" size={30} color="white"/>
                        <Text style={styles.weatherState}>Partly Cloudy</Text>
                    </View>
                </View>
                <View style={styles.weatherTemp}>
                    <View style= {styles.tempContainer}>
                        <Text style={styles.tempInfor}>{temperature}</Text>
                        <Text style={{color: 'white', fontSize: 24, fontFamily: 'Inter-Light',}}>o</Text>
                        <Text style={styles.tempInfor}>C</Text>
                    </View>
                    <Text style={styles.humidity}>Độ ẩm: --%</Text>
                </View>
            </View>
        </View>
    );
}
export default WeatherWidgetComponent;

const styles = StyleSheet.create({
    // weather widget
    weatherWidget: {
        flex: 1,
        // backgroundColor: '#5ED9E1',
        marginTop: 20,
    },
    weatherInfor: {
        position: 'absolute',
        flexDirection: 'row',
    },
    locationInfor: {
        flex: 7,
        // position: 'absolute',
        // backgroundColor: '#5ED9E1',
        padding:15
    },
    locationTitle: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: 22,

    },
    location: {
        color: '#EBEBF5',
        fontFamily: 'Inter-Regular',
        fontSize: 13,
    },
    weatherStateContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    weatherState: {
        paddingLeft: 10,
        color: 'white',
        fontFamily: 'Inter-Regular',
    },
    weatherTemp: {
        // position: 'absolute',
        flex: 4,
        
        // backgroundColor: 'blue',
        paddingRight: 15,
    },
    tempContainer: {
        flexDirection: 'row',
        paddingBottom: 0,
    },
    tempInfor: {
        fontSize: 48,
        color: 'white',
        fontFamily: 'Inter-Light',
    },
    humidity: {
        fontFamily: 'Inter-Bold',
        color: 'white',
    },

});