import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FormHeader from '../components/FormHeader';
import FormInput from '../components/FormInput';

export default function RegisterScreen({navigation}: {navigation: any}) {
    return (
        <>
            <FormHeader title="Sign up" url='../assets/images/Logo/logo.png' subTitle="Sign up to get started" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

