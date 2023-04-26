import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, Image, ScrollView, Switch, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5   } from '@expo/vector-icons';
import client from '../../API/client';
import {checkLoginStatus, withAuth } from '../../utils/auth';
import {translateDevice, getVietNameseDevice} from '../../utils/translateDevice'
const DeviceComponent = ({
    deviceNameSystem,
    color,
    navigation,
}) =>{
    const [isEnabled, setIsEnabled] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const deviceName = translateDevice(deviceNameSystem);
    const toggleSwitch = async () => {
      try {
        setIsClicked(true);
        setIsEnabled(!isEnabled);
        const response = await Promise.race([
          withAuth((token) => client.post('/sensor/post-current', {
            feedName: deviceNameSystem,
            value: (isEnabled === false) ? 'ON': 'OFF',
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })),
          new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error('Timeout while waiting for response')), 3000); // Timeout sau 3 giây
          })
        ]);
      
        if (response.data.success === true) {
          setIsClicked(false);
          console.log('Điều khiển thiết bị thành công', (isEnabled === true) ? 'ON': 'OFF');
        } else {
          alert('Có lỗi xảy ra khi điều khiển thiết bị');
          setIsEnabled(!isEnabled); // Reset lại trạng thái isEnabled
          setIsClicked(false);
        }
      } catch (error) {
        alert(`Có lỗi xảy ra: ${error.message}`);
        setIsEnabled(!isEnabled); // Reset lại trạng thái isEnabled
        setIsClicked(false);
      };
    }

    useEffect(() => {

      // checkLoginStatus(navigation);
      const interval = setInterval(async () => {
        // console.log('yep');
        try {
          const response = await withAuth((token) => client.get(`/sensor/get-current/${deviceNameSystem}`,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }));
          
          if(response.data.value ==='ON' && !isClicked){
              setIsEnabled(true)
          }
          else if(response.data.value ==='OFF' && !isClicked){
              console.log('yep');
              setIsEnabled(false)
          }
          
        } catch (error) {
          console.error(error);
        }            
        

      }, 1000); // Fetch the latest temperature every second
      return () => clearInterval(interval);

    }, []);
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
          flex: 4,
          paddingBottom: 15,
          fontSize: 17,
      },
      toggleInBox: {
          flex: 1,
      },
  });
    return (
        <View style={styles.box}>
            <View style={styles.iconBox}>
              {(deviceName == 'Fan') && <FontAwesome5 name="fan" size={30} color={(color === 'light') ? 'black' : 'white'} style={{}}/>}
              {(deviceName == 'Led') && <FontAwesome5 name="lightbulb" size={30} color={(color === 'light') ? 'black' : 'white'} />}
              {(deviceName == 'Door') && (isEnabled) &&<FontAwesome5 name="door-open" size={30} color={(color === 'light') ? 'black' : 'white'} />}
              {(deviceName == 'Door') && (!isEnabled) &&<FontAwesome5 name="door-closed" size={30} color={(color === 'light') ? 'black' : 'white'} />}
            </View>
            {/* <Icon style={styles.iconBox} name={(isFan)? "fan" : "lightbulb-on-outline"}  size={50} color="white"/> */}

            <Text style={styles.titleBox}>{getVietNameseDevice(deviceNameSystem)}</Text>
            <View style={styles.stateBox}>
                <Text style={styles.stateTextBox}>Bật</Text>
                <Switch         
                    trackColor={{false: '#767577', true: '#FF8A00'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={styles.toggleInBox}
                />
            </View>
        </View>
    );

}

export default DeviceComponent;

