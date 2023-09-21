import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const data = {
      nome: nome,
      email: email,
      senha: senha,
    };

    try {
      const response = await fetch("http://localhost:8080/api/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        Alert.alert("Cadastro bem-sucedido!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Falha no cadastro. Verifique seus dados.");
      }
    } catch (error) {
      console.error("Erro ao fazer o cadastro:", error);
      Alert.alert("Erro ao fazer o cadastro. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
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
  },
  headerText: {
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#94a3b8",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#f8fafc",
    fontWeight: "bold",
  },
});

export default Cadastro;
