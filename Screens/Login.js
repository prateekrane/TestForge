import { StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Zocial from '@expo/vector-icons/Zocial';
import { login } from '../Auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';




const Width = Dimensions.get('window').width;
const webClientId = '';
const androidClientId = ''


WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
    const config = {
        webClientId,
        androidClientId
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setError] = useState('');
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleLogin = async () => {
        setLoading(true);

        try {
            const token = await login(email, password);
            await AsyncStorage.setItem('token', token);
            await new Promise((resolve) => setTimeout(resolve, 600)); // Mock delay
            setEmail('');
            setPassword('');
            Alert.alert("Login Sucessful!")
            // Navigate to home screen or handle success
            navigation.navigate("MainScreen");
        } catch (error) {
            setEmail('');
            setPassword('');
            await AsyncStorage.removeItem('token');
            Alert.alert(
                'Authentication Failed!',
                'Could not log you in. Please check your credentials or try again later!'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleToken = async () => {
        if (response?.type === "success") {
            const { authentication } = response;
            const token = authentication?.accessToken;
            await AsyncStorage.setItem('token', token);
        }
    }

    useEffect(() => {
        handleToken();
    }, [response])

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        >
            <StatusBar
                backgroundColor="#E5EFF8" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.maincanvas}>
                    <TouchableOpacity style={styles.btnback} onPress={() => navigation.navigate('Home')}>
                        <View style={styles.upperbtnouter}>
                            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", height: "35%" }}>
                        <View style={styles.txtcontainer}>
                            <Text style={styles.txtheading}>Hey,</Text>
                            <Text style={styles.txtheading}>Welcome</Text>
                            <Text style={styles.txtheading}>Back</Text>
                        </View>
                        <View style={styles.txtcontainer}>
                            <LottieView
                                autoPlay
                                style={styles.animationstyle}
                                source={require('../assets/robot.json')}
                            />
                        </View>
                    </View>

                    <View style={styles.formcontainer}>
                        <View style={styles.inputcontainer}>
                            <Ionicons name="mail-outline" size={24} color="black" />
                            <TextInput
                                style={styles.textinput}
                                placeholder='Enter Your Email'
                                placeholderTextColor={"#999090"}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={styles.inputcontainer}>
                            <SimpleLineIcons name="lock" size={24} color="black" />
                            <TextInput
                                style={styles.textinput}
                                placeholder="*********"
                                placeholderTextColor="#999090"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <View style={{ width: "90%", marginTop: Width / 55, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 12, color: "#333333" }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleLogin} style={[styles.btncontainer, { backgroundColor: "#C3E0EA" }]}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: "600" }}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <Text>
                            or continue with
                        </Text>
                        <TouchableOpacity
                            onPress={() => promptAsync()}
                            style={[styles.btncontainer, {
                                borderWidth: 3,
                                borderColor: "#C3E0EA",
                            }]}>
                            <View style={{ flexDirection: "row" }}>
                                <Zocial name="google" size={24} color="black" />
                                <Text style={{ fontSize: 18, fontWeight: "600" }}> Google</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={{ fontWeight: "700" }}> SignUp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <LottieView
                            source={require('../assets/load.json')}
                            autoPlay
                            loop
                            style={styles.loadingAnimation}
                        />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5EFF8",
    },
    maincanvas: {
        marginTop: Width / 7,
    },
    btnback: {
        height: Width / 8,
        width: Width / 8,
        marginLeft: Width / 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Width / 3,
        backgroundColor: "#C3E0EA",
    },
    animationstyle: {
        width: Width / 2,
        height: Width / 2,
    },
    upperbtnouter: {},
    txtcontainer: {
        height: Width / 1.60,
        width: "50%",
        marginVertical: Width / 10,
        marginLeft: Width / 20,
    },
    txtheading: {
        color: "#353839",
        fontSize: 32,
    },
    formcontainer: {
        alignItems: "center",
        marginBottom: Width / 10,
    },
    inputcontainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#4a4a4a",
        borderRadius: 100,
        paddingHorizontal: 20,
        marginVertical: Width / 80,
        alignItems: "center",
        width: "90%",
        height: "12%",
    },
    btncontainer: {
        flexDirection: "row",
        borderRadius: 100,
        paddingHorizontal: 20,
        marginVertical: Width / 60,
        alignItems: "center",
        width: "90%",
        height: "11%",
        justifyContent: "center",
        alignItems: "center",
    },
    textinput: {
        flex: 1,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimation: {
        width: 100,
        height: 100,
    },
});
