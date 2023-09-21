import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const dadosDaRoupa = [
  {
    tamanho: "M",
    cor: "Preta",
    imagemUrl:
      "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/zhudrauta38-2%3A10?alt=media&token=59e33f30-f34c-4d9a-941f-75fbee401a9a",
  },
  {
    tamanho: "G",
    cor: "Preta",
    imagemUrl:
      "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/zhudrauta38-2%3A10?alt=media&token=59e33f30-f34c-4d9a-941f-75fbee401a9a",
  },
];

const Roupa = ({ navigation }) => {
  const [roupa, setRoupa] = useState(dadosDaRoupa);
  const [loading, setLoading] = useState(true);

  const deleteRoupa = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/roupas/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        const novaListaDeRoupas = [...roupa];
        novaListaDeRoupas.splice(id, 1);
        setRoupa(novaListaDeRoupas);
      } else {
        Alert.alert("Erro ao excluir roupa.");
      }
    } catch (error) {
      Alert.alert("Erro ao excluir roupa:", error);
      console.error("Erro ao buscar lista de roupas: ", error);
    }
  };

  useEffect(() => {
    const fetchRoupas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/roupas`);
        if (!response.ok) {
          Alert.alert("Erro ao buscar lista de roupas");
        }
        const data = await response.json();
        setRoupa(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar lista de roupas: " + error);
        setLoading(false);
      }
    };
    fetchRoupas();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : roupa.length > 0 ? (
        roupa.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: item.imagemUrl }}
              style={styles.imagem}
              resizeMode="cover"
            />
            <Text style={styles.texto}>Tamanho: {item.tamanho}</Text>
            <Text style={styles.texto}>Cor: {item.cor}</Text>
            <TouchableOpacity
              onPress={() => deleteRoupa(index)}
              style={styles.botaoExcluir}
            >
              <Icon name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Nenhum item encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#718096",
    margin: 8,
    borderRadius: 8,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  texto: {
    fontSize: 18,
    marginBottom: 4,
    color: "white",
  },
  botaoExcluir: {
    backgroundColor: "#718096",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default Roupa;
