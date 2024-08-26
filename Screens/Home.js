import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import React from 'react'
import { Dimensions } from 'react-native';


const Width = Dimensions.get('window').width;



const Home = ({ navigation }) => {

    return (

        <View style={styles.container} >
            <StatusBar
                backgroundColor="#E5EFF8" />
            <View style={styles.AniText}>
                <LottieView
                    autoPlay
                    style={styles.animationstyle}
                    source={require('../assets/Animation - 1722458063608.json')}
                />

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontSize: Width / 12, fontWeight: "700", color: "#45484A" }}>TestForge!</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.imageoutter}>
                    <Image source={require("./../assets/guy.png")} style={styles.image} />
                </View>
                <View style={styles.textoutter}>


                    <Text style={styles.txt}>"TestForge: Streamlining API testing for seamless integrations and superior performance!!"</Text>
                </View>
            </View>

            <View style={styles.btnouter}>

                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                        <View style={styles.btnstyle}>
                            <Text style={styles.btntxt}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginRight: Width / 30 }}>

                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                            <Text style={styles.btntxt}>Sign-up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5EFF8",

    },
    animationstyle: {
        width: Width / 3,
        height: Width / 3,
    },
    AniText: {
        flexDirection: "row",
        marginTop: Width / 5.5,
    },
    main: {
        flex: 1,
        alignItems: "center",
    },
    imageoutter: {
        height: Width / 2,
        width: Width / 2,
        marginVertical: Width / 40,
    },
    image: {
        height: Width / 2,
        width: Width / 2,
    },
    textoutter: {
        flex: 1,
        width: "80%",
        marginTop: Width / 8,
    },
    txt: {
        color: "#999090",
        fontSize: 18,
        justifyContent: "center",
    },
    btnouter: {
        flex: 1 / 2,
        marginBottom: Width / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        flexDirection: "row",
        borderWidth: 1,
        height: Width / 7,
        width: Width / 1.5,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: Width / 10,


    },
    btnstyle: {
        borderWidth: 1,
        height: Width / 7,
        width: Width / 2.55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Width / 10,
        backgroundColor: "#C3E0EA",

    },
    btntxt: {
        fontSize: 20,
        color: "#45484A",
        fontWeight: "semibold",
    }
})
