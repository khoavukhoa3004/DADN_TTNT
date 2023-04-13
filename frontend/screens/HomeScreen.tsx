import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Button, Image, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import BottomBar from '../components/BottomBar';
import { sendToAdafruitIO, getLatestButton1 } from '../API/api';

let State = false

const HomeScreen = ({navigation}: {navigation: any}) =>{
    const [isEnabled, setIsEnabled] = React.useState(false);

    
    const toggleSwitch = async () => {
        try {
            State=!State
          setIsEnabled((previousState: boolean) => !previousState);
          if (State) {
            const response = await sendToAdafruitIO('ON');
          }
          else{
            State =false
            const response = await sendToAdafruitIO('OFF');
          }

        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
        const interval = setInterval(async () => {
          try {
            const latestButton1 = await getLatestButton1();
            if(latestButton1==='ON'){
                State = !State
            }
            else{
                State=false
            }
            setIsEnabled(latestButton1);

          } catch (error) {
            console.error(error);
          }
        }, 1000); // Fetch the latest temperature every second
    
        return () => clearInterval(interval);
      }, []);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>

                {/* Header */}
                <View style={styles.headerWrapper}>
                    <View style={styles.headerTitle}>
                        <Text style={{fontSize: 30, fontFamily: 'Inter-Bold', }}>Xin chào Natasha!</Text>
                        <Text style={{position: 'absolute', fontSize: 60, fontFamily: 'Inter-Bold', opacity: 0.1}}>HOME</Text>
                    </View>
                    <View style={styles.headerNotification}>
                        <Icon1 name="notifications-outline" size={50} color="blue"/>
                    </View>
                </View>

                {/* Weather widget */}
                <View style={styles.weatherWidget}>
                    <Image source={require('../assets/images/home/weather_widget.png')}/>
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
                                <Text style={styles.tempInfor}>32</Text>
                                <Text style={{color: 'white', fontSize: 24, fontFamily: 'Inter-Light',}}>o</Text>
                                <Text style={styles.tempInfor}>C</Text>
                            </View>
                            <Text style={styles.humidity}>Độ ẩm: 69%</Text>
                        </View>
                    </View>
                </View>
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
                    <ScrollView style={styles.listDetail}>
                        <View style={styles.listDetailRow}>
                            <View style={styles.box}>
                                <Icon style={styles.iconBox} name="lightbulb-on-outline" size={50} color="white"/>
                                <Text style={styles.titleBox}>Đèn</Text>
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
                            <View style={styles.box}>
                                <Icon style={styles.iconBox} name="lightbulb-on-outline" size={50} color="white"/>
                                <Text style={styles.titleBox}> Đèn</Text>
                                <View style={styles.stateBox}>
                                    <Text style={styles.stateTextBox}> Bật</Text>
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
                        </View>
                        <View style={styles.listDetailRow}>
                            <View style={styles.box}>
                                <Icon style={styles.iconBox} name="lightbulb-on-outline" size={50} color="white"/>
                                <Text style={styles.titleBox}> Đèn</Text>
                                <View style={styles.stateBox}>
                                    <Text style={styles.stateTextBox}> Bật</Text>
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
                            <View style={styles.box}>
                                <Icon style={styles.iconBox} name="lightbulb-on-outline" size={50} color="white"/>
                                <Text style={styles.titleBox}> Đèn</Text>
                                <View style={styles.stateBox}>
                                    <Text style={styles.stateTextBox}> Bật</Text>
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
                        </View>
                        <View style={styles.listDetailRow}>
                            <View style={styles.box}>
                                <Icon style={styles.iconBox} name="lightbulb-on-outline" size={50} color="white"/>
                                <Text style={styles.titleBox}> Đèn</Text>
                                <View style={styles.stateBox}>
                                    <Text style={styles.stateTextBox}> Bật</Text>
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
                            <View style={styles.box}>
                                <Icon style={styles.iconBox} name="lightbulb-on-outline" size={50} color="white"/>
                                <Text style={styles.titleBox}> Đèn</Text>
                                <View style={styles.stateBox}>
                                    <Text style={styles.stateTextBox}> Bật</Text>
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
                        </View>
                    </ScrollView>
                </View>
                <View>
                </View>
            </View>
            {/* footer */}
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
        flex: 9,
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
    // Device details
    elementDetail: {
        flex:4 ,
        flexDirection: 'column',
        paddingTop: 15,
        
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
    box: {
        height: 170,
        paddingTop: 15,
        paddingRight: 10,
        paddingLeft: 20,
        margin: 5,
        flex: 1,
        flexDirection: 'column',
        borderRadius: 15,
        backgroundColor: '#33394D',
    },
    iconBox: {
        flex: 1,
    },
    titleBox: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        flex: 1
    },
    stateBox: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        
    },
    stateTextBox: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        flex: 1,
        paddingBottom: 15,
        fontSize: 17,
    },
    toggleInBox: {
        flex: 1,
    },


});