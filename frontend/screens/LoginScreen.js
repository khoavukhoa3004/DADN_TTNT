import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/FormElement/Input';
import  { checkLoginStatus } from '../utils/auth' 
import jwtDecode from 'jwt-decode';


// Google Signin api
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import client from '../API/client';

export default function LoginScreen({navigation}){
    const fetchApi = async () => {
        try {
            const res = await client.get('/');
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    const isTokenExpired = (token) => {
        const expirationTime = jwtDecode(token).exp;
        const currentTime = Date.now() / 1000;
        return expirationTime < currentTime;
    };

    useEffect(() => {
        fetchApi();
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token && !isTokenExpired(token)) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
                }
            } catch (error) {
                alert(error);
                console.log(error);
            }
        };
        checkToken();
    }, []);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    const submitForm = async () => {
        console.log(email);
        console.log(password);
        try {
            
            const res = await client.post('/user/sign-in', { 
                "email": email, 
                "password": password 
            });
            if(res.data.success){
                
                const { token, user } = res.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                navigation.reset({
                    index: 0, 
                    routes: [{name: 'HomeScreen'}]
                })
            }
            else {
                // console.log({success: res.data.success, message: res.data.message});
                console.log(res.data.success);
                console.log(res.data.message);
                if(res.data.message === "not found email"){
                    setEmailError(res.data.message);
                };
                if(res.data.message === "wrong password"){
                    setPasswordError(res.data.message);
                };
                alert(res.data.message);
            }
            
        } catch (error) {
            console.log(error.message)
            alert(error.message);
        }
    };


    return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/Logo/logo.png')}
                    style={styles.imageHeader}
                    alt="Logo"
                />

                <Text style={styles.title}>Sign in to Smart Home</Text>

                <Text style={styles.subTitle}>
                    Get access to your portfolio and more
                </Text>
            </View>
        <SafeAreaView style={styles.signInContainer}>
            <View>
                <Text></Text>
            </View>
            <Input  label="Email" 
                    value={email}
                    setValue={setEmail}
                    error={emailError}
                    iconName={"email"} 
                    placeholder="example@gmail.com" 
                    />
            <Input  label="Password" 
                    iconName={"password"} 
                    password={true} 
                    value={password}
                    setValue={setPassword}
                    placeholder="********" 
                    moreInfo={"Forgot password?"}
                    handleLinking={() => { () => navigation.navigate('ResetPasswordScreen')}}
                    error={passwordError}
            /> 

            <TouchableOpacity 
                style={styles.signInButton}
                onPress={submitForm}
            >
                <Text style={styles.buttonTitle}>Login</Text>
            </TouchableOpacity>

            <View style={styles.haveAccountContainer}>
                <Text style={styles.haveAccount}>Don't have an account?{' '}</Text>
                <TouchableOpacity onPress={()=> navigation.reset({
                    index: 0, 
                    routes: [{name: 'RegisterScreen'}]
                })}>
                    <Text style={styles.newAccount}>Create new account</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF1F5',
    },
    header: {

    },
    imageHeader: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1e1e1e',
        marginBottom: 6,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
        marginBottom: 20,
    },
    signInContainer: {
        width: 300,
        // height: 300,
        // borderWidth: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
    },
    signInButton: {
        // flex: 1,
        backgroundColor: '#FF8A00',
        justifyContent: 'center', 
        alignItems: 'center',
        width: 220,
        paddingBottom: 5,
        marginTop: 20,
        paddingTop: 5,
        borderRadius: 5,

    },
    buttonTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: 'white',
    },
    haveAccountContainer: {
        marginTop: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // added
        paddingBottom: 10,
    },
    haveAccount: {
        fontSize: 10,
        fontFamily: 'Inter-Regular',
    }, 
    newAccount: {
        fontSize: 10,
        fontFamily: 'Inter-Regular',
        color: '#007AFF',
    }

});

