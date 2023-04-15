import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFILE_PICTURE ='https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'

const SECTIONS = [
    {
        header: 'Preferences',
        items: [
            {id: '0', 
            icon: 'gear', 
            label: 'Cài đặt thông báo', 
            type: 'link', 
            color: '#000'
            },

            {id: '1', 
            icon: 'globe', 
            label: 'Ngôn Ngữ/Language', 
            type: 'link', 
            color: '#000'
            },

            {id: '2', 
            icon: 'circle-info', 
            label: 'Thông tin hỗ trợ', 
            type: 'link', 
            color: '#000'
            },

            {id: '3', 
            icon: 'globe', 
            label: 'Giới thiệu', 
            type: 'link', 
            color: '#000'
            },

            {id: '4', 
            icon: 'globe', 
            label: 'Đăng xuất', 
            type: 'link', 
            color: '#000'
            },
        ],
    },
];


const SettingScreen = ({navigation}: {navigation: any}) =>{
    return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Quản lý thông tin</Text>
            <View style={styles.profile}>
                <TouchableOpacity
                    onPress={()=>{

                    }}
                >
                    <View style={styles.profileAvatarWrapper}>
                        <Image 
                            alt='Profile picture'
                            source={{uri: PROFILE_PICTURE}} 
                            style={styles.profileAvatar}
                        />

                        <View style={styles.profileAction}>
                            <Icon name="edit" size={15} color="#fff" />
                        </View>
                        
                    </View>
                </TouchableOpacity>
                <Text style={styles.profileName}>Minh</Text>
            </View>
            {SECTIONS.map(({header, items})=>(
                <View style={styles.section} key={header}>
                    <Text style={styles.sectionHeader}>{header}</Text>

                    {items.map(({id, label, type, icon, color})=>(
                        <TouchableOpacity
                            key={icon}
                            onPress={() => {
                                
                            }}>
                            <View style={styles.row}>
                                <View style={[styles.rowIcon, {
                                    backgroundColor: color
                                    }]}>
                                    <Icon name={icon} color='#fff' size={18}/>
                                </View>

                                <Text style={styles.rowLabel}>{label}</Text>

                                <View style={{ flex: 1}}/>
                                    {type === 'link' && (
                                        <Icon 
                                            name="chevron-right" 
                                            color="#0c0c0c" 
                                            size={22}
                                        />
                                    )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )) }
        </ScrollView>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    container: {
        paddingVertical: 24,
    },

    profile: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },

    profileName: {
        marginTop: 10,
        fontSize:19,
        fontWeight: '600',
        color: '#414d63',
        justifyContent: 'center',
    },

    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
    },

    profileAvatarWrapper: {
        position: 'relative',
    },

    profileAction: {
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
        position: 'absolute',
        right: -4,
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    section: {
        paddingHorizontal: 24,
    },

    sectionHeader: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
    },

    rowLabel: {
        fontSize: 17,
        color: '#0c0c0c',
    },

    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    }

})

export default SettingScreen;