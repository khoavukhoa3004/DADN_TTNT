import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, Entypo, MaterialCommunityIcons, FontAwesome5   } from '@expo/vector-icons';

const Input = ({
    label,
    value,
    setValue,
    iconName,
    error,
    password,
    moreInfo,
    handleLinking,
    onFocus = () => {},
    ...props
 }) => {
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                {moreInfo && (
                    <TouchableOpacity  style={styles.moreInfo} onPress={handleLinking}>
                        <Text style={styles.moreInforText}>{moreInfo}</Text>
                    </TouchableOpacity>
                
                )}
            </View>
            {/* <Text style={styles.moreInfo}>{moreInfo}</Text> */}
            <View style={styles.inputContainer}>
                <View style= {styles.leftIcon}>
                    {(iconName ==='email') && (
                        <MaterialCommunityIcons 
                            name= {iconName}
                        />
                    )}
                    {(iconName === 'user' || iconName === 'phone') && (
                        <AntDesign
                        name={iconName}
                    />
                    )}
                    {(iconName === 'address') && (
                        <FontAwesome5 
                        name={'address-book'}
                    />
                    )}               
                    {(iconName === 'password') && (
                        <Entypo 
                        name={'key'}
                    />
                    )}    
                </View>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() =>setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={styles.Input}
                    {...props}
                />
                <View style={styles.rightIcon}>
                    {password &&(
                        <Entypo 
                            onPress= {() => setHidePassword(!hidePassword)}
                            name={hidePassword ? 'eye' : 'eye-with-line'}
                            
                        />
                    )}
                </View>


            </View>
            <View style={styles.errorContainer}>
                {error!='' && error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}
            </View>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center', 
        // alignItems: 'center',
        height: 80,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        marginBottom: 10,

    },
    header:{
        flexDirection: 'row',
        // backgroundColor: 'white',
    },
    label: {
        flex: 1,
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        color: '#222222',
        marginVertical: 5,
        alignContent: 'flex-start',
        paddingLeft: 5,
    },
    moreInfo: {
        flex: 1,
        alignContent: 'flex-end',
        textAlign: 'right',

    },
    moreInforText: {
        fontFamily: 'Inter-Regular',
        marginVertical: 5,
        fontSize: 12,
        color: '#FF8A00',
    },
    inputContainer: {
        // flex: 2,
        height: 50,
        width: 220,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    },

    leftIcon: {
        color: '#A9A9A9',
        // backgroundColor: 'blue',
        flex: 1,
        paddingRight: 5,
    },
    errorContainer: {
        // backgroundColor: 'red',
        // alignContent: 'flex-end',
    },
    errorText: {
        marginTop: 2,
        color: 'red',
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        textAlign: 'right',
    },

    Input: {
        flex: 8
    },
    rightIcon: {
        color: '#A9A9A9',
        // flex: 1, 
    },
});