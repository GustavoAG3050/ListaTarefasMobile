import { useState } from "react";
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState("");

  function salvarTarefa() {
    if (!novaTarefa.trim()) return;

    const dataHora = new Date().toLocaleString();

    const tarefa = {
      texto: novaTarefa,
      data: dataHora
    };

    setTarefas([...tarefas, tarefa]);
    setNovaTarefa("");
    setModalVisivel(false);
  }

  return (
    <View style={styles.container}>
      
      <Button title="Registrar Tarefa" onPress={() => setModalVisivel(true)} />

      <FlatList
        data={tarefas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tarefa}>
            <Text style={styles.texto}>{item.texto}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />

      <Modal visible={modalVisivel} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modal}>
            <Text>Digite a tarefa</Text>

            <TextInput
              style={styles.input}
              value={novaTarefa}
              onChangeText={setNovaTarefa}
              placeholder="Nova tarefa"
            />

            <Button title="Salvar" onPress={salvarTarefa} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20
  },

  tarefa: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8
  },

  texto: {
    fontSize: 16,
    fontWeight: "bold"
  },

  data: {
    marginTop: 5,
    color: "gray"
  },

  modalFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },

  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  }
});