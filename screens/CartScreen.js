import React, { useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";

const CartScreen = () => {
  const { cart = [], removeFromCart, clearCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Winkelwagen</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Je winkelwagen is leeg.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, idx) => item.id + "_" + idx}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.qty}>Aantal: {item.quantity}</Text>
                  <Text style={styles.price}>€{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeButtonText}>Verwijder</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearButtonText}>Winkelwagen legen</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  empty: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  qty: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 8,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartScreen;