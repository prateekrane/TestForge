// Navigation.js
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native'; // Import LottieView

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import MainScreen from '../Screens/Main';
import Response from '../Screens/Response';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    // Token exists, user is logged in
                    setIsLoggedIn(true);
                } else {
                    // No token found, user is not logged in
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false); // Finished checking
            }
        };

        checkLoginStatus();
    }, []);

    if (isLoading) {

        return (
            <View style={styles.loadingScreen}>
                <LottieView
                    source={require('../assets/load_2.json')} // Replace with your Lottie animation file
                    autoPlay
                    loop
                    style={styles.loadingAnimation}
                />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isLoggedIn ? "MainScreen" : "Home"} // Set initial route based on authentication
        >
            {/* Screens accessible when not logged in */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />

            {/* Screens accessible when logged in */}
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Response" component={Response} />
        </Stack.Navigator>
    );
}

export default Navigation;

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimation: {
        width: 200,
        height: 200,
    },
});
