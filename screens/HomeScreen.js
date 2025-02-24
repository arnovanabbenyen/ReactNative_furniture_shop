import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard.js";

import odeChairImage from "../Images/ode_chair.png";
import houtenKastImage from "../Images/houten_kast.png";
import fauteuilsImage from "../Images/fauteuils.png";
import houtenTafelImage from "../Images/houten_tafel.png";

const HomeScreen = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
          <Text style={styles.heading}>Our Collection</Text>
          <ProductCard 
            image={odeChairImage}
            title="Ode Chair"
            description="zwart, orion taupe12"
            price= "399"
          />
           <TouchableOpacity onPress={() => navigation.navigate("Details")}>
                <Text style={styles.button}>Details</Text>
            </TouchableOpacity>
          <ProductCard
            image={houtenKastImage}
            title="Modular Cabinet MC-5L"
            description="Eiken hardwax olie naturel light 3041"
            price="1759"
          />
          <ProductCard 
            image={fauteuilsImage}
            title="Co lounge chair"
            description="Eiken gerookt gebeitst, orion turtle88"
            price="889"
            onPress={() => navigation.navigate("Details")}
          />
          <ProductCard 
            image={houtenTafelImage}
            title="Paste Eettafel"
            description="Eiken naturel lak, Eiken naturel lak"
            price="1909"
            onPress={() => navigation.navigate("Details")}
          />
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingTop: 40,
      },
      heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      },
      button: {
        fontSize: 16,
        color: "#007BFF",
        marginBottom: 16,
      },
    });

export default HomeScreen;