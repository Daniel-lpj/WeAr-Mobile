import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "./api";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const goToCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const handleLogin = async () => {
    const obj = {
      email: email,
      senha: senha,
    };

    try {
      const response = await api.post("/login", obj);

      if (response.status === 201) {
        Alert.alert("Login bem-sucedido!");
        navigation.navigate("Roupa");
      } else {
        Alert.alert("Falha no login. Verifique sua senha.");
      }
    } catch (error) {
      console.error("Erro ao fazer o login:", error);
      Alert.alert("Erro ao fazer o login. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
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
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToCadastro}>
          <Text style={styles.buttonText}>Cadasta-se</Text>
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
    marginBottom: 6,
  },
  buttonText: {
    color: "#f8fafc",
    fontWeight: "bold",
  },
});

export default Login;
