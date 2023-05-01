import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, Button } from 'react-native'
import { Formik } from 'formik';
import { Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as Yup from 'yup';
import { StackActions } from '@react-navigation/native';
import Input from '../components/FormElement/Input';

import client from '../API/client';
import { Value } from 'react-native-reanimated';

export default function RegisterScreen({navigation}) {
    
    const [signupError, setSignupError] = useState(null);

    const [showPicker, setShowPicker] = useState(false);

    const handlePickerVisibility = () => {
      setShowPicker(!showPicker);
    };

    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(1990);

    const validationSchema = Yup.object().shape({
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
            .required('Last name is required!'),
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
            .required('Confirm password is required!'),
        // dateOfBirth: Yup.date()
        //     .max(new Date(), 'Date of birth cannot be in the future!')
        //     .min(new Date('1900-01-01'), 'Date of birth cannot be before 1900')
        //     .required('Date of birth is required!'),
        phoneNumber: Yup.string()
            .min(8, 'Invalid phone number!')
            .max(15, 'maximum phone digits is 15!')
            .matches(/^[0-9]*$/, 'Invalid phone number!')
    });
    const handleSignUp = async (values, formikActions) => {
        try{
            const res = await client.post('/user/create-user', {
                ...values,
            });
    
            if (res.data.success) {
                alert('Đăng ký thành công')
                navigation.reset({
                    index: 0, 
                    routes: [{name: 'LoginScreen'}]
                })
            }
            formikActions.resetForm();
            formikActions.setSubmitting(false);   
        } catch(error){
            setSignupError(error);
            setSignupError('Error signing up. Please try again!');
            formikActions.setSubmitting(false);
        }
        

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
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

                <Formik
                    initialValues={{
                        fName: '',
                        lName: '',
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                        dateOfBirth: new Date(),
                        phoneNumber: '',

                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSignUp}
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
                            setFieldValue,
                        }) => (
                                    <View style={styles.container}>
                                    

                                        <Input
                                            value={values.fName}
                                            iconName={"pushpin"}
                                            error={(touched.fName && errors.fName) ? errors.fName : ''}
                                            setValue={handleChange('fName')}
                                            onBlur={handleBlur('fName')}
                                            // autoCapitalize='sentences'
                                            label={'First Name'}
                                            placeholder='David'
                                        />
                                        <Input
                                            value={values.lName}
                                            iconName={"pushpin"}
                                            error={(touched.lName && errors.lName)? errors.lName : ''}
                                            setValue={handleChange('lName')}
                                            // onBlur={handleBlur('lName')}
                                            // autoCapitalize='sentences'
                                            label={'Last Name'}
                                            placeholder='Backham'
                                        />
                                        <Input
                                            value={values.email}
                                            iconName="email"
                                            error={(touched.email && errors.email) ? (errors.email) : ''}
                                            setValue={handleChange('email')}
                                            // onBlur={handleBlur('email')}
                                            label={'Email'}
                                            // keyboardType="email-address"
                                            // autoCapitalize='none'
                                            placeholder='example@gmail.com'
                                        />
                                        <Input
                                            value={values.password}
                                            iconName={"password"}
                                            error={(touched.password && errors.password) ? errors.password: ''}
                                            setValue={handleChange('password')}
                                            // onBlur={handleBlur('password')}
                                            // autoCapitalize='none'
                                            label={'Password'}
                                            password={true}
                                            placeholder='*****'
                                        />
                                        <Input
                                            iconName={"password"}
                                            value={values.confirmPassword}
                                            error={(touched.confirmPassword && errors.confirmPassword) ? errors.confirmPassword:''}
                                            setValue={handleChange('confirmPassword')}
                                            // onBlur={handleBlur('confirmPassword')}
                                            // autoCapitalize='none'
                                            label='Confirm Password'
                                            password={true}
                                            placeholder="******"
                                        />
                                        <View style={styles.dateContainer}>
                                            <View>
                                                <Text style={{
                                                    fontFamily: 'Inter-Bold',
                                                    fontSize: 14,
                                                    paddingBottom: 10,
                                                }}>Your date of birth:</Text>
                                            </View>
                                            <View style={styles.dateSubContainer}>
                                                <Entypo 
                                                    name='calendar'
                                                    style={{paddingLeft: 10}}
                                                />
                                                <Text style={{padding: 10}}>{day}/{month}/{year}</Text>
                                                <Button title="select Date" onPress={handlePickerVisibility}/>
                                            </View>
                                            
                                        </View>
                                        {showPicker && (<DateTimePicker
                                            testID='dateTimePicker'
                                            value={values.dateOfBirth}
                                            mode= "date"
                                            display='default'
                                            // onChange={handleChange('dateOfBirth')}
                                            onChange={(event, selectedDate) => {
                                                handlePickerVisibility();
                                                setFieldValue('dateOfBirth', selectedDate || values.dateOfBirth);
                                                setDay(values.dateOfBirth.getDate());
                                                setMonth(values.dateOfBirth.getMonth());
                                                setYear(values.dateOfBirth.getFullYear());
                                            }}
                                            onBlur={handleBlur('dateOfBirth')}
                                        />)}
                                        {/* {errors.dateOfBirth && <Text>{errors.dateOfBirth}</Text>} */}
                                        
                                        <Input
                                            value={values.phoneNumber}
                                            iconName={"phone"}
                                            error={touched.phoneNumber && errors.phoneNumber}
                                            setValue={handleChange('phoneNumber')}
                                            // onBlur={handleBlur('phoneNumber')}
                                            label={'Your phone'}
                                            // autoCapitalize='none'
                                            placeholder='0123456789'
                                        />

                                        <View style={styles.formAction}>
                                            <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
                                                <View style={styles.btn}>
                                                    <Text style={styles.btnText}>Sign up</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            style={{marginTop: 'auto'}}
                                            onPress={()=> navigation.navigate('LoginScreen')}
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
                                
                        )
                    }
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 20,
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',

    },

    header: {
        marginTop: 60,
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
        // backgroundColor: 'yellow'
    },

    formFooter: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },

    btn: {
        backgroundColor: '#FF8A00',
        width: 220,
        borderRadius: 8,
        borderColor: '#075eec',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },

    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    dateContainer: {
        height: 80,
        marginLeft: 40,
        marginRight: 45,
        marginTop: 10,
        // marginBottom: 5,
    },
    dateSubContainer:{
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    }
});