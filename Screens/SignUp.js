import { StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Dimensions, Platform, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Zocial from '@expo/vector-icons/Zocial';
import LottieView from 'lottie-react-native';
import { createUser } from '../Auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
const Width = Dimensions.get('window').width;
const webClientId = '';
const androidClientId = ''

WebBrowser.maybeCompleteAuthSession();

const SignUp = ({ navigation }) => {
    const config = {
        webClientId,
        androidClientId
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    const [erro, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSignup = async () => {

        setLoading(true);
        // setError('');
        try {

            const token = await createUser(email, password);
            await AsyncStorage.setItem('token', token);
            // Simulate a signup process
            await new Promise((resolve) => setTimeout(resolve, 600)); // Mock signup delay
            setEmail('');
            setPassword('');
            setName('');
            Alert.alert("SignUp Sucessful!")
            // Navigate to home screen or handle success
            navigation.navigate("MainScreen");
            // Navigate to home screen or handle success
        } catch (error) {
            setEmail('');
            setPassword('');
            await AsyncStorage.removeItem('token');
            Alert.alert('Authentication Failed!', 'Could not create user, please check your input and try again later...');

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
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar
                backgroundColor="#E5EFF8"
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.maincanvas}>
                    <TouchableOpacity style={styles.btnback} onPress={() => navigation.navigate('Home')}>
                        <View style={styles.upperbtnouter}>
                            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", height: "25%" }}>
                        <View style={styles.txtcontainer}>
                            <Text style={styles.txtheading}>Let's get</Text>
                            <Text style={styles.txtheading}>started</Text>
                        </View>
                        <View style={styles.txtcontainer}>
                            <Image source={require('../assets/signup.png')} style={styles.animationstyle} />
                        </View>
                    </View>

                    <View style={styles.formcontainer}>
                        <View style={styles.inputcontainer}>
                            <SimpleLineIcons name="user" size={24} color="black" />
                            <TextInput
                                style={styles.textinput}
                                placeholder="Enter Your Name"
                                placeholderTextColor={"#999090"}
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                        </View>
                        <View style={styles.inputcontainer}>
                            <Ionicons name="mail-outline" size={24} color="black" />
                            <TextInput
                                style={styles.textinput}
                                placeholder="Enter Your Email"
                                placeholderTextColor={"#999090"}
                                keyboardType="email-address"
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

                        <TouchableOpacity onPress={handleSignup}
                            style={[styles.btncontainer, { backgroundColor: "#C3E0EA" }]}>
                            <View >
                                <Text style={{ fontSize: 18, fontWeight: "600" }}>SignUp</Text>
                            </View>
                        </TouchableOpacity>
                        <Text>or continue with</Text>
                        <TouchableOpacity onPress={() => promptAsync()}
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
                            <Text>Already have an account!</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontWeight: "700" }}> Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {loading && (
                        <View style={styles.loadingOverlay}>
                            <LottieView
                                source={require('../assets/load.json')}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUp;

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
        width: 100,
        height: 100,
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
        height: "10%",
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
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieAnimation: {
        width: 150,
        height: 150,
    },
});
