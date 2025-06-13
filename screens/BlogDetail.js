import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import RenderHTML from "react-native-render-html";

const BlogDetail = ({ route }) => {
  const { image, title, summary, publishedAt, body } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>
        {new Date(publishedAt).toLocaleDateString("nl-BE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text style={styles.summary}>{summary}</Text>
      <RenderHTML
        contentWidth={300}
        source={{ html: body }}
        baseStyle={styles.body}
        tagsStyles={{
          p: { marginBottom: 16, color: "#333" },
          h1: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
          h2: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
          h3: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 40,
    paddingHorizontal: 0,
  },
  image: {
    width: "100%",
    height: 260,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#EDEDED",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
    color: "#222",
    paddingHorizontal: 16,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    fontStyle: "italic",
  },
  body: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 20,
    marginTop: 8,
    lineHeight: 24,
    textAlign: "left",
  },
});

export default BlogDetail;