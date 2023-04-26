import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, Image, ScrollView, Switch, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5   } from '@expo/vector-icons';
import client from '../../API/client';
import {checkLoginStatus, withAuth } from '../../utils/auth';
import {translateDevice, getVietNameseDevice} from '../../utils/translateDevice'
const DeviceComponent = ({
    deviceNameSystem,
    color,
    navigation,
}) =>{
    const [buttonState, setButtonState] = useState('OFF');
    const [tempButtonState, setTempButtonState] = useState('OFF');
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const deviceName = translateDevice(deviceNameSystem);
    const postData = async (newData) => {
      console.log(newData);
      try {
        const response = await withAuth((token) => client.post('/sensor/post-current', {
            feedName: deviceNameSystem,
            value: newData,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }));
        if (response.data.success === false) {
          throw new Error('Failed to post data to Adafruit');
        }
      } catch (error) {
        alert(`Có lỗi xảy ra: ${error.message}`);
        throw new Error('Error: ', error);

      } 
    }
    const toggleSwitch = async () => {
      const newData = buttonState === 'ON' ? 'OFF' : 'ON';
      setTempButtonState(newData);
      setIsWaitingForResponse(true);
      try{
        await postData(newData);

        setButtonState(newData);
        setIsWaitingForResponse(false);
      } catch (error) {
        console.error(error);
        setTimeout(() => {
          if(isWaitingForResponse) {
            setButtonState(tempButtonState);
            setIsWaitingForResponse(false);
          }
        }, 5000);
      }
    }

    useEffect(() => {
      getData();
    })

    const getData = async () => {
      try {
        const response = await withAuth((token) => client.get(`/sensor/get-current/${deviceNameSystem}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }));
        const data = await response.data.value;
        setButtonState(data);
        setTempButtonState(data);
      } catch (error) {
        console.error(error);
      }           
    };


    const styles = StyleSheet.create({
      box: {
          height: 150,
          width: 150,
          paddingTop: 15,
          paddingRight: 10,
          paddingLeft: 20,
          margin: 5,
          // flex: 1,
          flexDirection: 'column',
          borderRadius: 15,
          backgroundColor: (color === 'light') ? '#E4E3E3' : '#33394D',
          shadowColor: '#000',
          shadowOffset: { width: 5, height: 20 },
          shadowOpacity: 0.8,
          shadowRadius: 40,
          elevation: 3,
      },
      finalBox: {
          height: 170,
          paddingTop: 15,
          paddingRight: 10,
          paddingLeft: 20,
          margin: 5,
          flex: 1,
          flexDirection: 'column',
          borderRadius: 15,
      },
      iconBox: {
          flex: 1,
      },
      titleBox: {
          fontFamily: 'Inter-Bold',
          fontSize: 18,
          fontWeight: 'bold',
          color: (color === 'light') ? 'black' : 'white',
          flex: 1
      },
      stateBox: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flexDirection: 'row',
      },
      stateTextBox: {
          color: (color === 'light') ? 'black' : 'white',
          fontFamily: 'Inter-Bold',
          flex: 3,
          paddingBottom: 15,
          fontSize: 17,
      },
      toggleInBox: {
          flex: 1,
      },
      loadingToggleInBox: {
        flex: 1,
      }
  });
  const renderActivityIndicator = () => {
    return (
      <ActivityIndicator size="small" color="#f5dd4b" />
    );
  }
    return (
        <View style={styles.box}>
            <View style={styles.iconBox}>
              {(deviceName == 'Fan') && <FontAwesome5 name="fan" size={30} color={(color === 'light') ? 'black' : 'white'} style={{}}/>}
              {(deviceName == 'Led') && <FontAwesome5 name="lightbulb" size={30} color={(color === 'light') ? 'black' : 'white'} />}
              {(deviceName == 'Door') && (buttonState) &&<FontAwesome5 name="door-open" size={30} color={(color === 'light') ? 'black' : 'white'} />}
              {(deviceName == 'Door') && (!buttonState) &&<FontAwesome5 name="door-closed" size={30} color={(color === 'light') ? 'black' : 'white'} />}
            </View>
            {/* <Icon style={styles.iconBox} name={(isFan)? "fan" : "lightbulb-on-outline"}  size={50} color="white"/> */}

            <Text style={styles.titleBox}>{getVietNameseDevice(deviceNameSystem)}</Text>
            <View style={styles.stateBox}>
                <Text style={styles.stateTextBox}>Bật</Text>
                <Switch         
                    trackColor={{false: '#767577', true: '#FF8A00'}}
                    thumbColor={buttonState ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={buttonState === 'ON'}
                    disabled={isWaitingForResponse}
                    style={styles.toggleInBox}
                />
                <View styles={styles.loadingToggleInBox}>
                  {isWaitingForResponse && renderActivityIndicator()}
                </View>
            
            </View>
        </View>
    );

}

export default DeviceComponent;

