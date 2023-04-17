import React from 'react';
import { Linking } from 'react-native';
import { View, StyleSheet, Image, Text } from 'react-native';

const FormHeader = (
    {url, title,subTitle}:{url: string, title: string, subTitle: string}
) => {
    console.log(url);
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.imageHeading}
                    source={{uri: url}}
                    alt="Logo"
                />
                <Text style={styles.titleHeading}>{title}</Text>
                <Text style={styles.subTitleHeading}>{subTitle}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageHeading: {
        width: 100,
        height: 100,
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    titleHeading: {
        fontFamily: 'Inter-Bold',
        fontSize: 24, 
        paddingTop: 5,
    },
    subTitleHeading: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#555555',
        padding: 5,
    },
});

export default FormHeader;