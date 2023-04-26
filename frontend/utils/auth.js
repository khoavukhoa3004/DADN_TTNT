import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const checkLoginStatus = async (navigation) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        // Kiểm tra hạn token
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
            // Token còn hạn, chuyển đến trang home
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            });
        } else {
        // Token hết hạn, xóa token và hiển thị trang đăng nhập
        await AsyncStorage.removeItem('token');
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
    }
    } else {
        // Không có token, hiển thị trang đăng nhập
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
    }
};

export {checkLoginStatus};


export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.log(error);
    }
};

export const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token && !isTokenExpired(token)) {
        return token;
    }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(USER_KEY);
    if (user) {
        return JSON.parse(user);
    }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const isTokenExpired = (token) => {
    const expirationTime = jwtDecode(token).exp;
    const currentTime = Date.now() / 1000;
    return expirationTime < currentTime;
};

export const isAuthenticated = async () => {
    const token = await getToken();
    return token !== null;
};

export const withAuth = async (apiCall) => {
    const token = await getToken();
    if (token) {
        return apiCall(token);
    } else {
        throw new Error('Not authenticated');
    }
};