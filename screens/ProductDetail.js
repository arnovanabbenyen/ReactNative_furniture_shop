import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";


const ProductDetail = ({route}) => {
    const { title, description, price } = route.params;
    const [quantity, setQuantity] = React.useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Vanaf €{price}</Text>

        <View style={styles.quantitycontainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
            <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity onPress={increaseQuantity}>
            <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.price}>€{price * quantity}</Text>
        </View>
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
    quantitycontainer: {
        flexDirection: "row",
        marginTop: 16,
    },
});

export default ProductDetail;