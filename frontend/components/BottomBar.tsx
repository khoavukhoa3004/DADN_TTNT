import * as React from 'react';
import {Dimensions, View, Text, StyleSheet,Button, Image, ScrollView, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import FormData from 'form-data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const BottomBar = ({navigation}: {navigation: any}) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [recording, setRecording] = React.useState();
    const [sound, setSound] = React.useState();

    async function startRecording() {
      try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });


        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HighQuality
        );
        setRecording(recording);
        console.log('Recording started');
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }


    async function stopRecording() {
      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      console.log('Sound loaded');

      const formData = new FormData();
      formData.append('audio', {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        name: 'recording.m4a',
        type: 'audio/m4a',
      });

      try {
        const response = await fetch('http://192.168.1.6:9999/add', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Audio file uploaded successfully:', response);
      } catch (err) {
        console.error('Failed to upload audio file:', err);
      }
      }
      const onPressHandler = () => {
        setIsPressed(prevState => !prevState);
      }
    return (
        <View style={styles.bottomContainer}>
        <View style={styles.leftBottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('DeviceSettingScreen')}>
            <Image
                style={styles.leftBottomContainer_Footer}
                source={require("../assets/images/Led_Fan/leftFooter.png")}
            />
            <Icon1
                // ios="ios-add"
                // android="android-add"
                name="add-circle-outline"
                size={30}
                color={"white"}
                style={styles.HomeIcon}
            ></Icon1>
        </TouchableOpacity>
        </View>
        <View style={styles.middleBottomContainer}>
        <View style={[
            styles.circleContainer,
            isPressed && styles.circleContainerPressed
          ]}>
            <View style={styles.subCircleContainer}>
                <TouchableOpacity
                  onPress={recording ? stopRecording : startRecording}
                >
                    <Icon3
                    style={styles.microphoneIcon}
                    name="microphone"
                    size={30}
                    color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
        </View>
        <View style={styles.rightBottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                <Image
                    style={styles.rightBottomContainer_Footer}
                    source={require("../assets/images/Led_Fan/rightFooter.png")}
                ></Image>
                <Icon1
                // ios="ios-add"
                // android="android-add"
                name="person-outline"
                size={30}
                color={"white"}
                style={styles.personIcon}
                ></Icon1>
            </TouchableOpacity>
        </View>
    </View>
)};


export default BottomBar;

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1.4,
        flexDirection: "row",
        backgroundColor: "#EFF1F5",
      },
      middleBottomContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      circleContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        backgroundColor: "#FFFFFF",
      },
      circleContainerPressed: {
        backgroundColor: "green"
      },
      subCircleContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: "#D8D8D8",
      },
      microphoneIcon: {},
      rightBottomContainer_Footer: {
        justifyContent: "flex-start",
        width: "100%",
      },
      leftBottomContainer: {
        flex: 1,
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
      personIcon: {
        position: "absolute",

        bottom: 0.05 * ScreenHeight,
        right: 0.065 * ScreenWidth,
      },
});