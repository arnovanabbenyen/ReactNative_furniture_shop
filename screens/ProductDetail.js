import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import odeChairImage from "../Images/ode_chair.png";

const ProductDetail = ({navigation}) => {
    return (
        <View style={styles.container}>
        <Image source={odeChairImage} style={styles.image} />
        <Text style={styles.title}>Ode Chair</Text>
        <Text style={styles.description}>zwart, orion taupe12</Text>
        <Text style={styles.price}>Vanaf €399</Text>
        <Button title="Add to cart" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingTop: 40,
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 8,
        backgroundColor: "#EDEDED",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    price: {
        fontSize: 14,
        color:"#555",
        marginTop: 38,
    },
});

export default ProductDetail;