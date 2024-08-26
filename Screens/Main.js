import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Width = Dimensions.get('window').width;

const data = [
    { label: 'GET', value: '1' },
    { label: 'POST', value: '2' },
    { label: 'PUT', value: '3' },
    { label: 'PATCH', value: '4' },
    { label: 'DELETE', value: '5' },
];

const MainScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [value, setValue] = useState(null);
    const [linkval, setLinkval] = useState('');
    const [dat, setDat] = useState('');
    const [auth, setAuth] = useState('');

    useEffect(() => {
        if (isFocused) {
            setValue(null);
            setLinkval('');
            setDat('');
            setAuth('');
        }
    }, [isFocused]);

    const handleLogout = async () => {
        try {
            // Remove the token from AsyncStorage
            await AsyncStorage.removeItem('token');

            // Navigate to the Login page
            navigation.navigate('Login');
        } catch (error) {
            // Handle errors if any
            Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
        }
    };

    const handlePress = () => {
        // Navigate to Response screen and pass parameters
        navigation.navigate("Response", {
            link: linkval,
            authorization: auth,
            data: dat,
            method: value
        });
    };

    return (
        <View style={styles.container}>
            <View style={{ width: "57%", alignItems: "flex-end", marginTop: Width / 9 }}>
                <TouchableOpacity
                    style={styles.btnback}
                    onPress={handleLogout}
                >
                    <View style={styles.upperbtnouter}>
                        <SimpleLineIcons name="logout" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.dropcontainer}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="HTTP Methods"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                            setValue(item.value);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color="#62ebd8"
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>
                <View style={styles.inputcontainer}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Enter API URL'
                        placeholderTextColor={"#999090"}
                        onChangeText={newText => setLinkval(newText)}
                        value={linkval}
                    />
                </View>
            </View>
            <View style={[styles.inputcontainer, { width: "95%" }]}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Authorization/Token'
                    placeholderTextColor={"#999090"}
                    onChangeText={newText => setAuth(newText)}
                    value={auth}
                />
            </View>
            <View style={styles.datacontainer}>
                <TextInput
                    style={[styles.datainput, { height: "100%" }]}
                    placeholder='Enter Data'
                    placeholderTextColor={"#999090"}
                    onChangeText={newText => setDat(newText)}
                    value={dat}
                    multiline={true} // Allows multiline input
                    textAlignVertical="top" // Ensures text starts from the top
                />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={styles.btncontainer} onPress={handlePress}>
                    <Text style={styles.btntxt}>GET RESPONSE</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5EFF8",
        padding: 16,
    },
    dropcontainer: {
        marginTop: Width / 15,
        width: Width / 3.5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 12,
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textinput: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputcontainer: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 5,
        marginHorizontal: Width / 80,
        marginTop: Width / 15,
        width: "65%",
        height: 50,
    },
    datacontainer: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 5,
        marginHorizontal: Width / 80,
        marginTop: Width / 12,
        width: "95%",
        height: "45%",
        justifyContent: "center",
        alignItems: "center",
    },
    datainput: {
        fontSize: 16,
        color: '#333',
    },
    btncontainer: {
        borderRadius: 100,
        paddingHorizontal: 20,
        marginVertical: Width / 60,
        alignItems: "center",
        width: "90%",
        height: "30%",
        justifyContent: "center",
        backgroundColor: "#C3E0EA",
    },
    btntxt: {
        fontSize: 20,
        color: "#45484A",
        fontWeight: "semibold",
    },
    btnback: {
        height: Width / 8,
        width: Width / 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Width / 3,
        backgroundColor: "#C3E0EA",

    },
});

export default MainScreen;
