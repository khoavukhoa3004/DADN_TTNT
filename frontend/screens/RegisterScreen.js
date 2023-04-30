import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Formik } from 'formik';
import {isValidEmail, isValidObjField, updateError} from '../utils/methods'
import * as Yup from 'yup';
import { StackActions } from '@react-navigation/native';
import Input from '../components/FormElement/Input';

import client from '../API/client';

const validationSchema = Yup.object({
    fName: Yup.string()
        .trim()
        .min(2, 'Invalid first name!')
        .notOneOf(['admin', 'root'], 'Invalid first name!')
        .matches(/^[a-zA-Z ]*$/, 'First name must not have number or special characters')
        .required('First name is required!'),
    lName: Yup.string()
        .trim()
        .min(2, 'Invalid last name!')
        .notOneOf(['admin', 'root'], 'Invalid first name!')
        .matches(/^[a-zA-Z ]*$/, 'Last name must not have number or special characters')
        .require('Last name is required!'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required!'),
    username: Yup.string()
        .trim()
        .min(4, 'The characters must be greater than 4')
        .matches(/^[a-zA-Z0-9]*$/, 'Username must not have special characters')
        .required('Username is required!'),
    password: Yup.string()
        .trim()
        .min(4, 'Password must be longer than 4 characters!')
        .required('Password is required!'),
    confirmPassword: Yup.string()
        .trim()
        .min(4, 'Password must be longer than 4 characters!')
        .oneOf([Yup.ref('password'), null], 'Passwords does not match!')
        .require('Confirm password is required!'),
    dateOfBirth: Yup.date()
        .max(newDate(), 'Date of birth cannot be in the future!')
        .min(newDate('1900-01-01'), 'Date of birth cannot be before 1900')
        .required('Date of birth is required!'),
    phoneNumber: Yup.string()
        .min(8, 'Invalid phone number!')
        .max(15, 'maximum phone digits is 15!')
        .matches(/^[0-9]*$/, 'Invalid phone number!')
});

export default function RegisterScreen(navigation) {
    const {userInfo, setUserInfo} = useState({
        fName: '',
        lName: '',
        email: '', 
        username: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: Date,
        phoneNumber: '',
    });

    const {
        fName, 
        lName, 
        email, 
        username, 
        password, 
        confirmPassword, 
        dateOfBirth, 
        phoneNumber
    } = userInfo;
    const [error, setError] = useState('');
    const handleChangeText = (value, fieldName) => {
        setUserInfo({...userInfo, [fieldName]: value});
    };
    
    const SignUp = async (values, formikActions) => {
        const res = await client.post('/user/create-user', {
            ...values,
        });

        if (res.data.success) {
            const signInRes = await client.post('/user/sign-in',{
                email: values.email,
                password: values.password
            });
            if(signInRes.data.success) {
                navigation.dispatch(
                    StackAction.replace('ImageUpload', {
                        token: signInRes.data.token,
                    })
                )
            }
        }
        formikActions.resetForm();
        formikActions.setSubmitting(false);   
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>First Name</Text>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputControl}
                        placeholder='Nguyen'
                        placeholderTextColor="#6b7280"
                        value={form.firstName}
                        onChangeText={firstName => setForm({...form, firstName})}
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Last Name</Text>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputControl}
                        placeholder='Minh'
                        placeholderTextColor="#6b7280"
                        value={form.lastName}
                        onChangeText={lastName => setForm({...form, lastName})}
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Phone Number</Text>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputControl}
                        placeholder='091864XXXX'
                        placeholderTextColor="#6b7280"
                        value={form.phoneNumber}
                        onChangeText={phoneNumber => setForm({...form, phoneNumber})}
                    />
                </View>

                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Email address</Text>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="email-address"
                        style={styles.inputControl}
                        placeholder='john@example.com'
                        placeholderTextColor="#6b7280"
                        value={form.email}
                        onChangeText={email => setForm({...form, email})}
                    />
                </View>
                
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Password</Text>

                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder='********'
                        value={form.password}
                        onChangeText={password => setForm({...form, password})}
                    />
                </View>
                
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>

                    <TextInput
                        secureTextEntry
                        style={styles.inputControl}
                        placeholder='********'
                        value={form.confirmPassword}
                        onChangeText={confirmPassword => setForm({...form, confirmPassword})}
                    />
                </View>
                
                <View style={styles.formAction}>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Sign up</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{marginTop: 'auto'}}
                    onPress={() => navigation.navigate("LoginScreen")}
                >
                    <Text style={styles.formFooter}>
                        Have an account!{' '}
                        <Text
                            style={{textDecorationLine: 'underline'}}
                        >
                            Sign in
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <Formik
            initialValues={userInfo}
            validationSchema={validationSchema}
            onSubmit={SignUp}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => {
                    const {         
                        fName, 
                        lName, 
                        email, 
                        username, 
                        password, 
                        confirmPassword, 
                        dateOfBirth, 
                        phoneNumber} = values;
                        return(
                            <>
                                <View style={styles.header}>
                                    <Image
                                        source={require('../assets/images/Logo/logo.png')}
                                        style={styles.headerImg}
                                        alt="Logo"
                                    />

                                    <Text style={styles.title}>Sign up to Smart Home</Text>

                                    <Text style={styles.subtitle}>
                                        Get access to your portfolio and more
                                    </Text>
                                </View>
                            </>
                        );
                }
            }
        </Formik>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },

    header: {
        marginVertical: 36,
    },

    headerImg: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 36,
    },

    title: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1e1e1e',
        marginBottom: 6,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },

    input: {
        marginBottom: 16,
    },

    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },

    inputControl: {
        height: 44,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222'
    },

    form: {
        marginBottom: 24,
        flex: 1,
    },

    formAction: {
        marginVertical: 24,
    },

    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },

    btn: {
        backgroundColor: '#075eec',
        borderRadius: 8,
        borderColor: '#075eec',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingvertical:10,
        paddingHorizontal: 20,
    },

    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    }
});