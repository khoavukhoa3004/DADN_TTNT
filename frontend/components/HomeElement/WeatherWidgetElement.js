import { View, Text, StyleSheet,Button, Image, ScrollView, Switch, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/Feather'; 
import {withAuth } from '../../utils/auth';
import client from '../../API/client';
import React, { useState, useEffect } from 'react';
const WeatherWidgetComponent = ({
    deviceNameSystem,
    address,
}) => {
    const [temperature, setTemperature] = useState(0);
    const [light, setLight] = useState(0);
    // checkLoginStatus(navigation);
    const checkTemp = () => {
        console.log(temperature);
        if(temperature >= 34) {
            Alert.alert('Cảnh báo', `Nhiệt độ môi trường đang nóng! Hãy bật các thiết bị làm mát!`, [
                {text: 'OK', onPress: () => console.log('OK Pressed')}
            ]);
        }
    }

    
    const updateLight = async () => {
        try {
            const response = await withAuth((token) => client.get(`/sensor/get-current/nmdk-1-lightsensor-1`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }));  
            setLight(response.data.value);
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
    const updateTemp = async () => {
        try {
            const response = await withAuth((token) => client.get(`/sensor/get-current/${deviceNameSystem}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }));  
            setTemperature(response.data.value);
        } catch (error) {
            console.error(error);
        }      
    }
    useEffect(() => {


        const interval = setInterval(async () => {
            updateTemp();
            updateLight();
            // checkTemp();
        }, 1000); // Fetch the latest temperature every second
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        checkTemp();
    }, [temperature])

    return (
        <View style={styles.weatherWidget} onPress={updateTemp()}>
            <Image source={require('../../assets/images/home/weather_widget.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            <View style={styles.weatherInfor}>
                <View style={styles.locationInfor}>
                    <TouchableOpacity onPress={()=>{}}>
                    <Text style={styles.locationTitle}>Vị trí nhà bạn</Text>
                    <Text style={styles.location}>{address?.number}, {address?.street}</Text>
                    <Text style={styles.location}>{address?.city}</Text>
                    </TouchableOpacity>
                    
                
                </View>
                <View style={styles.weatherTemp}>
                    <View style= {styles.tempContainer}>
                        <Text style={styles.tempInfor}>{temperature}</Text>
                        <Text style={{color: 'white', fontSize: 24, fontFamily: 'Inter-Light',}}>o</Text>
                        <Text style={styles.tempInfor}>C</Text>
                    </View>
                    <Text style={styles.humidity}>light: {light} lux</Text>
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
        marginTop: 10,
        // backgroundColor: 'blue'
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
        flex: 5,
        paddingTop:5,
        // backgroundColor: 'blue',
        paddingRight: 15,
    },
    tempContainer: {
        flexDirection: 'row',
        paddingBottom: 0,
    },
    tempInfor: {
        fontSize: 40,
        color: 'white',
        fontFamily: 'Inter-Light',
    },
    humidity: {
        fontFamily: 'Inter-Bold',
        fontSize: 12,
        color: 'white',
        paddingLeft: 10,
    },

});