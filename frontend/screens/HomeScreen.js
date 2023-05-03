import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, Image, ScrollView,FlatList, Switch, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';
import DeviceComponent from '../components/HomeElement/DeviceElement';
import WeatherWidgetComponent from '../components/HomeElement/WeatherWidgetElement';
import { checkLoginStatus, withAuth } from '../utils/auth';
import client from '../API/client';
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;



const HomeScreen = ({navigation}) =>{
    
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const [homeIds, setHomeIds] = React.useState([]);
    const [selectedHome, setSelectedHome] = React.useState('');
    

    const [roomIds, setRoomIds] = useState([]);
    const checkExistStringInUseState = (stringToCheck, use_state) => {
        return use_state.includes(stringToCheck);
    };
    const isRoomExists = (roomIdToCheck) =>{ 
        if(roomIds.length == 0)
            return false;
        return roomIds.find(room => room._id === roomIdToCheck)
    }
    const isDeviceExists = (deviceIdToCheck) =>{
        if(deviceIds.length == 0)
            return false;
        return deviceIds.find(device => device._id === deviceIdToCheck)
    }
    const [selectedRoom, setSelectedRoom] = useState();
    const [deviceIds, setDeviceIds] = useState([]);
    
    function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
          chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
      }    

    useEffect(() => {
        async function getData() {
            try {
                const userStr = await AsyncStorage.getItem('user');
                if (userStr !== null) {
                    // chuyển đổi chuỗi JSON thành đối tượng JavaScript
                    const user = JSON.parse(userStr);
                    
                    setUserName(user.username);
                    setLastName(user.lName);
                    console.log('user set successfully');
                    return;
                    // sử dụng đối tượng user
                } else {
                    // xử lý trường hợp userStr là null
                    console.log('Không tìm thấy dữ liệu user');
                    
                }
            } catch (error) {
                console.log(error);
            }
        }
        checkLoginStatus();      
        getData();
    },[])
    useEffect(()=>{ 
        const getHomeId = async (username) => {
            setRoomIds([]);
            setDeviceIds([]);
            setSelectedRoom(null);
            console.log('successfdf', username)
            try {
                console.log(`/home/getHomes/${username}`)
                const response = await withAuth((token) => client.get(`/home/getHomes/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                  }));
                console.log(response.data.success)
                if (response.data.success === false) {
                    console.log('failed to get Home ID')
                    return;
                }
                if(response.data.success ==true){
                    const home = response.data.data;
                    console.log('home ids',typeof home);
                    console.log('home ids', home)
                    console.log('home ids length', home.length)
                    for(i = 0; i < home.length; i++) {
                        if(!checkExistStringInUseState(home[i], homeIds)){
                            console.log(`home[${i}]`, home[i]);
                            setHomeIds([...homeIds, home[i]]);
                        }
                    }
                    // setRoomIds([]);
                    console.log('homeIds[0]')
                    setSelectedHome(home[0]);
                    return;
                }
                console.log('failed to get home IDs', response.data.success, typeof response.data.success)
            } catch (error) {
                console.error(error);
                // alert(error.message);
            }       
            
        }
        if (userName) {
            getHomeId(userName);
        }
    },[userName])

    useEffect(() => {
        const getRooms = async () => {
            setDeviceIds([]);
            setSelectedRoom(null);
            console.log('getRooms: ', selectedHome);
            console.log(`/home/getRooms/${selectedHome}`)
            try {
                // const id = home_id?.home_id;
                
                const response = await withAuth((token) => client.get(`/home/getRoomsId&Name/${selectedHome}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }));
                console.log('getRooms', response.data.success)
                if (response.data.success == false) {
                    console.error('Failed to getRooms');
                }
                else if(response.data.success == true) {
                    
                    const room = response.data.data;
                    console.log('Typeof Room: ', typeof room);
                    console.log('room:', room); // Add this line
                    // setRoomIds(room);
                    console.log(room.length)
                    for(i = 0; i < room.length; i++) {
                        
                        if(!isRoomExists(room[i]._id)){
                            console.log(`room[${i}]: `, room[i]);
                            setRoomIds((preState) => [...preState, { key: room[i]._id, name: room[i].name, id: room[i].id}]);
                        }

                        
                    }
                    setSelectedRoom({key: room[0]._id, name: room[0].name, id: room[0].id});
                    // setDeviceIds([]);
                    console.log('succsfadfs')
                    return;
                }
                console.error('having trouble with haveRooms')
            } catch (error) {
                // alert(error.message);
                console.log('having some error on getRooms')
                console.error(error.message);
            }
        }
      
        if(selectedHome){
            getRooms();
        }

    },[homeIds, selectedHome])

    useEffect(() => {
        const getDevices = async () => {
            try {
                console.log('selectedRoom: ', selectedRoom.key)
                const response = await withAuth((token) => client.get(`/home/getDevicesId&Type/${selectedRoom.key}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }));
                if (response.data.success === false) {
                    throw new Error('Failed to post data to Adafruit');
                }
                else if(response.data.success === true){
                    const temp = response.data.data;
                    // setDeviceIds(temp);
                    for(i = 0; i < temp.length; i++) {
                        if(!isDeviceExists(temp[i])){
                            const key = temp[i]._id;
                            const typ = temp[i].type;
                            const name = temp[i].name;
                            console.log(`temp[${i}]`,key, typ, name);
                            if(key != 'lightsensor-1' && name != 'tempsensor-1' && name != 'lightsensor-1' && name){
                                console.log(`device[${i}]: `, temp[i]._id, temp[i].type, temp[i].name);
                                console.log(name);
                                setDeviceIds((preState) => [...preState, { key: key, name: name, id: typ}]);
                                // setDeviceIds((previousState) =>[...previousState, {key: key, name: name, id: type}]);
                                console.log('okesd')
                            }
                        }
                    }
                    console.log(roomIds);
                    console.log('roomIds length:', roomIds.length);
                    console.log('device successfully gotten!')
                    return;
                }
                console.error('getDevices have been an error ')
            } catch (error) {
                console.error('getDevice: ', error);
            }
        }
        if(selectedRoom) {
            getDevices();
        }
    }, [roomIds, selectedRoom])
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
        selectedRoomCell: {
            backgroundColor: '#f3e2f2',
            borderWidth: 3,
            borderColor: 'black',
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
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {/* Header */}
                <View style={styles.headerWrapper}>
                    <View style={styles.headerTitle}>
                        <Text style={{fontSize: 30, fontFamily: 'Inter-Bold', }}>Xin chào {lastName}!</Text>
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
                            {roomIds.map((item) => (
                                <TouchableOpacity style={[styles.roomCell]}
                                    key={item.key}
                                    onPress={() => {
                                        setDeviceIds([]);
                                        setSelectedRoom(item);
                                        console.log(item);
                                    }}
                                >
                                <Text>{item.name}</Text>
                                </TouchableOpacity>                               
                            ))}
                        </ScrollView>
                    </View>

                    {/* List Details */}
                    <ScrollView style={styles.listDetail}>
                        <React.Fragment>
                        {chunkArray(deviceIds, 2).map((item, index) => (
                            <View key={index} style={styles.listDetailRow}>
                                {item[0] && item[0].key && <DeviceComponent key={item[0].key} id={item[0].key} type={selectedRoom.id} deviceNameSystem={`${userName}-${selectedRoom.id}-${item[0].name}`} navigation={navigation} color={'dark'} />}
                                {item[1] && item[1].key && <DeviceComponent key={item[1].key} id={item[0].key} type={selectedRoom.id} deviceNameSystem={`${userName}-${selectedRoom.id}-${item[1].name}`} navigation={navigation} color={'light'}/>}
                            </View>
                        ))}
                        </React.Fragment>
                        {deviceIds.length === 0 && <Text style={{alignContent: 'center', alignItems: 'center', fontSize: 20, justifyContent: 'center'}}>Không có thiết bị nào được tìm thấy</Text>}
                    </ScrollView>

                </View>
            </View>
            <BottomBar navigation={navigation}/>
        </View>
    );
}

export default HomeScreen;
