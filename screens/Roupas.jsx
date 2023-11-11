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

const Roupa = ({ navigation }) => {
  const [roupa, setRoupa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editedTamanho, setEditedTamanho] = useState("");
  const [editedCor, setEditedCor] = useState("");

  const handleError = (error, message) => {
    console.error(`${message}:`, error);
    Alert.alert(message, error.message || "Erro desconhecido");
  };

  const deleteRoupa = async (roupa_id) => {
    try {
      const response = await api.delete(`/roupas/${roupa_id}`);
      const { status } = response;

      if (status === 204) {
        const novaListaDeRoupas = roupa.filter(
          (_, index) => index !== roupa_id
        );

        setRoupa(novaListaDeRoupas);
        getRoupas();
        Alert.alert("Roupa excluída com sucesso!");
      } else {
        throw new Error(`Erro ao excluir roupa. Status: ${status}`);
      }
    } catch (error) {
      handleError(error, "Erro ao excluir roupa");
    }
  };

  const editRoupa = async (roupa_id) => {
    try {
      const obj = {
        tamanho: editedTamanho,
        cor: editedCor,
      };

      const response = await api.put(`/roupas/${roupa_id}`, obj);
      const { status } = response;

      if (status === 200 || status === 201) {
        const novaListaDeRoupas = roupa.map((item, index) =>
          index === roupa_id
            ? { ...item, tamanho: editedTamanho, cor: editedCor }
            : item
        );

        setRoupa(novaListaDeRoupas);
        setEditing(null);
        getRoupas();
      } else {
        throw new Error(`Erro ao editar roupa. Status: ${status}`);
      }
    } catch (error) {
      handleError(error, "Erro ao editar roupa");
    }
  };

  const saveRoupa = async () => {
    const obj = {};

    try {
      const response = await api.post("/roupas", obj);
      const { status } = response;

      if (status === 201) {
        getRoupas();
        Alert.alert("Roupa adicionada com sucesso!");
      } else {
        throw new Error(`Falha ao adicionar roupa. Status: ${status}`);
      }
    } catch (error) {
      handleError(
        error,
        "Erro ao adicionar roupa. Tente novamente mais tarde."
      );
    }
  };

  const getRoupas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/roupas");
      const { status, data } = response;

      if (status === 200) {
        setRoupa(data);
      } else {
        throw new Error("Erro ao buscar lista de roupas");
      }
    } catch (error) {
      handleError(error, "Erro ao buscar lista de roupas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/zhudrauta38-2%3A10?alt=media&token=59e33f30-f34c-4d9a-941f-75fbee401a9a",
              }}
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
                <TouchableOpacity onPress={() => editRoupa(item.roupa_id)}>
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
              onPress={() => deleteRoupa(item.roupa_id)}
              style={styles.botaoExcluir}
            >
              <Icon name="trash" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={saveRoupa} style={styles.botaoSalvar}>
              <Icon name="plus" size={20} color="white" />
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
  botaoSalvar: {
    backgroundColor: "#718096",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 5,
    right: 5,
    left: 72,
  },
  icon: {
    top: 1,
    left: 20,
  },
});

export default Roupa;
