import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Width = Dimensions.get('window').width;

const Response = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { link, authorization, data, method } = route.params || {};
    const [result, setResult] = useState({ data: '', status: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!link || !method) {
                setResult({ data: 'Missing parameters', status: '400' });
                setLoading(false);
                return;
            }

            try {
                let response;
                switch (method) {
                    case '1': // GET
                        response = await axios.get(link, {
                            headers: {
                                Authorization: authorization,
                            },
                        });
                        break;
                    case '2': // POST
                        response = await axios.post(link, data, {
                            headers: {
                                Authorization: authorization,
                            },
                        });
                        break;
                    case '3': // PUT
                        response = await axios.put(link, data, {
                            headers: {
                                Authorization: authorization,
                            },
                        });
                        break;
                    case '4': // PATCH
                        response = await axios.patch(link, data, {
                            headers: {
                                Authorization: authorization,
                            },
                        });
                        break;
                    case '5': // DELETE
                        response = await axios.delete(link, {
                            headers: {
                                Authorization: authorization,
                            },
                        });
                        break;
                    default:
                        response = { data: 'Invalid action', status: '400' };
                }
                setResult({ data: JSON.stringify(response.data), status: response.status });
            } catch (error) {
                const status = error.response ? error.response.status : 'Unknown error';
                setResult({ data: 'Failed to get Data', status });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [link, authorization, data, method]);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <LottieView
                        source={require('../assets/res.json')} // Path to your Lottie animation file
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    <Text style={styles.loadingText}>Gathering Info....</Text>
                </View>
            ) : (
                <><View style={styles.inputcontainer}>
                    <View style={{ justifyContent: "center" }}>
                        <Text>Status Code:</Text>
                    </View>
                    <View style={{ width: "75%", justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>
                            {result.status || 'N/A'}
                        </Text>
                    </View>
                </View><View style={styles.datacontainer}>
                        <ScrollView>
                            <Text>{result.data || 'No data available'}</Text>
                        </ScrollView>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={styles.btncontainer} onPress={() => navigation.navigate("MainScreen")}>
                            <Text style={styles.btntxt}>Re-Send Request</Text>
                        </TouchableOpacity>
                    </View></>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E5EFF8",
        padding: 16,
        flex: 1, // Ensure the container takes up the full screen
    },
    datacontainer: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 5,
        marginHorizontal: Width / 80,
        marginTop: Width / 7,
        width: "95%",
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
    },
    btncontainer: {
        borderRadius: 100,
        paddingHorizontal: 20,
        marginVertical: Width / 60,
        alignItems: "center",
        width: "90%",
        height: 50, // Adjusted height for better button appearance
        justifyContent: "center",
        backgroundColor: "#C3E0EA",
    },
    btntxt: {
        fontSize: 20,
        color: "#45484A",
        fontWeight: "600", // Changed to '600' for semibold text
    },
    inputcontainer: {
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 5,
        marginHorizontal: Width / 80,
        marginTop: Width / 7,
        width: "95%",
        height: 50,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    lottie: {
        width: 100,
        height: 100,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#848884',
    },
});

export default Response;
