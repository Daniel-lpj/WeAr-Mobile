import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>WeAr-Mobile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  formContainer: {
    backgroundColor: "#94a3b8",
    padding: 16,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  text: {
    color: "#334155",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
