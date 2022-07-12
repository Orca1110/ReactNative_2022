import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { LocationAccuracy } from "./node_modules/expo-location/build/Location.types";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
    const [city, setCity] = useState("Loading...");
    const [ok, setOk] = useState(true);

    const ask = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 3 });
        const location = await Location.reverseGeocodeAsync(
            { latitude, longitude },
            { useGoogleMaps: false }
        );
        setCity(location[0].city);
        console.log(city);
    };
    useEffect(() => {
        ask();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityname}>{city}</Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                contentContainerStyle={styles.weather}
            >
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>27</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "skyblue",
    },
    city: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
    },
    cityname: {
        color: "white",
        fontSize: 68,
        fontWeight: "500",
    },
    weather: {
        // backgroundColor: "teal",
    },
    day: {
        width: SCREEN_WIDTH,
        alignItems: "center",
    },
    temp: {
        color: "white",
        marginTop: 50,
        fontSize: 168,
    },
    description: {
        marginTop: -30,
        color: "white",
        fontSize: 60,
    },
});
