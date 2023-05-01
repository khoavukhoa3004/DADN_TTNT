import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

import axios from 'axios';
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Color } from './GlobalStyles';
import 'react-native-gesture-handler';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import DetailScreen from './screens/DetailsScreen';
import FanScreen from './screens/FanScreen';
import FanSettingScreen from './screens/FanSettingScreen';
import LedScreen from './screens/LedScreen';
import LedSettingScreen from './screens/LedSettingScreen';
import DeviceScreen from './screens/DeviceScreen.js';
import AddScreen from './screens/AddScreen';
import DeviceSettingScreen from './screens/DeviceSettingScreen';
import NotificationScreen from './screens/NotificationScreen';
import DeleteScreen from './screens/DeleteScreen';

// import Icon from 'react-native-vector-icons/Ionicons';
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'config',
  config: {
    duration: 200,
    easing: Easing.linear,
  }
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const Stack = createNativeStackNavigator();



const checkFirstLaunch = async () => {
  const isFirstLaunch = await AsyncStorage.getItem('alreadyLaunched');
  if(isFirstLaunch == null) {
    AsyncStorage.setItem('alreadyLaunched', 'true');
    return true;
  }
  return false;
};

export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  const [fontsLoaded, error] = useFonts({
    'Inter-Bold': require("./assets/fonts/Inter-Bold.ttf"),
    'Inter-Thin': require("./assets/fonts/Inter-Thin.ttf"),
    'Inter-Light': require("./assets/fonts/Inter-Light.ttf"),
    'Inter-Regular': require("./assets/fonts/Inter-Regular.ttf"),
    'Inter-SemiBold': require("./assets/fonts/Inter-SemiBold.ttf")
  });

  React.useEffect(() => {
    checkFirstLaunch().then(result => setIsFirstLaunch(result));
  }, []);

  const fetchApi = async () => {
    try {
      const res = await axios.get('http://192.168.43.113:3000');
      console.log(res.data);
    } catch (error) {
      console.log(error.message)
    }

  }
  React.useEffect(() => {
    fetchApi();
  },[])

  if (!fontsLoaded && !error) {
    return null;
  }

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen}/>
          
          
          {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen}/> */}
          <Stack.Screen name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
          <Stack.Screen name="LedScreen" component={LedScreen} />
          <Stack.Screen name="FanScreen" component={FanScreen} />
          <Stack.Screen name="LedSettingScreen" component={LedSettingScreen} />
          <Stack.Screen name="FanSettingScreen" component={FanSettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }
          }
          // initialRouteName='HomeScreen'
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>

          {/* <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen}/> */}
          <Stack.Screen name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
          <Stack.Screen name="DeviceScreen" component={DeviceScreen}/>
          <Stack.Screen name="DetailsScreen" component={DetailsScreen}/> 
          <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
          <Stack.Screen name="LedScreen" component={LedScreen} />
          <Stack.Screen name="FanScreen" component={FanScreen} />
          <Stack.Screen name="LedSettingScreen" component={LedSettingScreen} />
          <Stack.Screen name="FanSettingScreen" component={FanSettingScreen} />
          <Stack.Screen name="DeviceSettingScreen" component={DeviceSettingScreen}/>
          <Stack.Screen name="AddScreen" component={AddScreen}/>
          <Stack.Screen name="DeleteScreen" component={DeleteScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

