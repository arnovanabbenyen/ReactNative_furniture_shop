import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Linking } from "react-native";

const AboutHenk = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Image
      source={require("../assets/henk_logo.jpg")}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.title}>Over Henk</Text>
    <Text style={styles.text}>
      Welkom bij Henk! Wij zijn gepassioneerd over meubels en interieurdesign.{"\n\n"}
      Ons doel is om unieke, kwalitatieve producten aan te bieden die jouw huis bijzonder maken.{"\n\n"}
      Of je nu op zoek bent naar een stijlvolle tafel, een comfortabele fauteuil of inspiratie voor je interieur, bij Henk ben je aan het juiste adres.{"\n\n"}
      Neem gerust contact met ons op voor vragen of advies!
    </Text>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Onze Missie</Text>
      <Text style={styles.sectionText}>
        Henk streeft ernaar om duurzame, betaalbare en unieke meubels te leveren die passen bij elke woonstijl. We geloven in vakmanschap, service en een persoonlijke aanpak.
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.sectionText}>
        E-mail:{" "}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("mailto:info@henkmeubels.nl")}
        >
          info@henkmeubels.nl
        </Text>
        {"\n"}
        Telefoon: 06-12345678
        {"\n"}
        Adres: Henkstraat 1, 1234 AB Amsterdam
      </Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Volg ons</Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL("https://www.instagram.com/henkmeubels")}
      >
        Instagram
      </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL("https://www.facebook.com/henkmeubels")}
      >
        Facebook
      </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
    paddingBottom: 40,
  },
  logo: {
    width: 140,
    height: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#222",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    width: "100%",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
    marginTop: 4,
    marginBottom: 4,
  },
});

export default AboutHenk;