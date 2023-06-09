import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({navigation}: {navigation: any}) =>{
    return (
        <View style = {styles.container}>
            <Text
                onPress={() => alert('Home')}
                style={{fontSize: 16, fontWeight: 'bold'}}
            >Details Screen</Text>
        </View>
    );
}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',	
        justifyContent: 'center',
    }
});