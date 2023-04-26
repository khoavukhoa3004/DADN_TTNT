import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Input from '../components/FormElement/Input';

export default function TestScreen({navigation}){
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
        <View style={styles.signInContainer}>
            <View>
                <Text></Text>
            </View>
            <Input label="Email" iconName={"email"} placeholder="example@gmail.com" />
            <Input  label="Password" 
                    iconName={"password"} 
                    password={true} 
                    placeholder="Your password" 
                    moreInfo={"Forgot password?"}
                    handleLinking={() => { navigation.navigate('ResetPasswordScreen')}}
            /> 

            <TouchableOpacity style={styles.signInButton}>
                <Text style={styles.buttonTitle}>Login</Text>
            </TouchableOpacity>
            <View style={styles.haveAccountContainer}>
                <Text style={styles.haveAccount}>Don't have an account?{' '}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('RegisterScreen')}}>
                    <Text style={styles.newAccount}>Create new account</Text>
                </TouchableOpacity>
            </View>

        </View>

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
        height: 300,
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
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // added
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

