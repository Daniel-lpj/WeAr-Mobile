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
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");
  const [tamanho, setTamanho] = useState("");

  const deleteRoupa = async (roupa_id) => {
    try {
      const response = await api.delete(`/roupas/${roupa_id}`);

      if (response.status === 204) {
        const novaListaDeRoupas = [...roupa];
        novaListaDeRoupas.splice(roupa_id, 1);
        setRoupa(novaListaDeRoupas);
      } else {
        Alert.alert("Erro ao excluir roupa.");
      }
    } catch (error) {
      Alert.alert("Erro ao excluir roupa:", error);
      console.error("Erro ao buscar lista de roupas: ", error);
    }
  };

  const editRoupa = async (roupa_id) => {
    try {
      const obj = {
        tamanho: editedTamanho,
        cor: editedCor,
      };
      const response = await api.put(`/roupas/${roupa_id}`, obj);

      if (response.status === 200 || response.status === 201) {
        const novaListaDeRoupas = [...roupa];
        novaListaDeRoupas[roupa_id].tamanho = editedTamanho;
        novaListaDeRoupas[roupa_id].cor = editedCor;
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

  const saveRoupa = async () => {
    const obj = {
      nome: nome,
      codigo: codigo,
      preco: preco,
      cor: cor,
      tamanho: tamanho,
    };

    try {
      const response = await api.post("/roupa", obj);
      if (response.status === 200) {
        Alert.alert("Roupa salva com sucesso!");
      } else {
        Alert.alert("Falha para salvar.");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro ao salvar. Tente novamente mais tarde.");
    }
  };

  const getRoupas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/roupas");

      if (response?.status !== 200) {
        Alert.alert("Erro ao buscar lista de roupas");
      } else {
        setRoupa(response?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar lista de roupas: ", error);
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

            <TouchableOpacity onPress={saveRoupa} style={styles.icon}>
              <Icon name="save" size={20} color="white" />
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
