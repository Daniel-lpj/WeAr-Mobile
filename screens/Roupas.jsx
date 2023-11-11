import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { api } from "./api";

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
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editedTamanho, setEditedTamanho] = useState("");
  const [editedCor, setEditedCor] = useState("");

  const deleteRoupa = async (id) => {
    try {
      const response = await api.delete(`/roupas/${id}`);

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

  const editRoupa = async (id) => {
    try {
      const obj = {
        tamanho: editedTamanho,
        cor: editedCor,
      };
      const response = await api.put(`/roupas/${id}`, obj);

      if (response.status === 200) {
        const novaListaDeRoupas = [...roupa];
        novaListaDeRoupas[id].tamanho = editedTamanho;
        novaListaDeRoupas[id].cor = editedCor;
        setRoupa(novaListaDeRoupas);
        setEditing(null);
      } else {
        Alert.alert("Erro ao editar roupa.");
      }
    } catch (error) {
      Alert.alert("Erro ao editar roupa:", error);
      console.error("Erro ao editar roupa: ", error);
    }
  };

  useEffect(() => {
    const getRoupas = async () => {
      try {
        setLoading(true);
        await api.get("/roupas").then((response) => {
          if (response?.status !== 200) {
            Alert.alert("Erro ao buscar lista de roupas");
          }
          setRoupa(response?.data);
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar lista de roupas: " + error);
        setLoading(false);
      }
    };
    getRoupas();
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
            {editing === index ? (
              <>
                <TextInput
                  placeholder="Tamanho"
                  value={editedTamanho}
                  onChangeText={setEditedTamanho}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Cor"
                  value={editedCor}
                  onChangeText={setEditedCor}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => editRoupa(index)}>
                  <Icon name="check" size={20} color="white" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.texto}>Tamanho: {item.tamanho}</Text>
                <Text style={styles.texto}>Cor: {item.cor}</Text>
                <TouchableOpacity
                  onPress={() => setEditing(index)}
                  style={styles.botaoEditar}
                >
                  <Icon
                    style={styles.icon}
                    name="edit"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </>
            )}
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
  input: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  botaoEditar: {
    backgroundColor: "#718096",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 5,
    right: 50,
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
  icon: {
    top: 1,
    left: 20,
  },
});

export default Roupa;
