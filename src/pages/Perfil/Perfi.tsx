import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { MenuBar } from "../../Components/MenuBar/MenuBar";
import { Portal, Modal, Button } from "react-native-paper";

interface Data {
  id: number;
  titulo: string;
  capa: string;
  subtitulo: string;
  categoria: string;
}

const Perfil: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleModalIndex, setVisibleModalIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    axios
      .get("https://sujeitoprogramador.com/rn-api/?api=posts")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItem = ({ item, index }: any) => (
    <View style={styles.item} key={index}>
      <Image
        source={{ uri: item.capa }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          {item.categoria}
        </Text>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={{ fontSize: 16 }}>{item.subtitulo}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setVisibleModalIndex(index)}
        style={{ width: "100%" }}
      >
        <Button
          style={{
            marginTop: 10,
            backgroundColor: "#394491",
            width: "100%",
            height: 60,
            justifyContent: "center", // Centraliza o conteúdo verticalmente
            alignItems: "center", // Centraliza o conteúdo horizontalmente
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
            Detalhes
          </Text>
        </Button>
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visibleModalIndex === index}
          onDismiss={() => setVisibleModalIndex(null)}
          contentContainerStyle={styles.containerStyle}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "flex-start",
              justifyContent: "flex-start",

              padding: 5,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              06/02/2024 07:13:15
            </Text>
            <Text>{item.titulo}</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "flex-start",
              justifyContent: "flex-start",

              padding: 5,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Procedimentos
            </Text>
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              Hora: 06/02/2024 07:13:15
            </Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              Usuário: GUSTAVO PAZZOTTO
            </Text>
            <Text>Execução: ACIONAR POLICIA MILITAR EXECUTADO COM ÊXITO</Text>
            <Text>Status: EXECUTADO COM ÊXITO</Text>
            <Text>Descrição: APARENTEMENTE SEM ANORMALIDADES</Text>
          </View>

          <Button onPress={() => setVisibleModalIndex(null)}>Fechar</Button>
        </Modal>
      </Portal>
    </View>
  );

  const filterDataByCategory = (category: string | null) => {
    if (category === null) {
      return data;
    }
    return data.filter((item) => item.categoria === category);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ width: "100%", maxHeight: "85%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text
              style={[
                styles.categoryButton,
                selectedCategory === null && styles.selectedCategoryButton,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedCategory("Emagrecimento")}
          >
            <Text
              style={[
                styles.categoryButton,
                selectedCategory === "Emagrecimento" &&
                  styles.selectedCategoryButton,
              ]}
            >
              Emagrecimento
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory("Dicas")}>
            <Text
              style={[
                styles.categoryButton,
                selectedCategory === "Dicas" && styles.selectedCategoryButton,
              ]}
            >
              Dieta
            </Text>
          </TouchableOpacity>
        </View>
        <SectionList
          sections={[{ data: filterDataByCategory(selectedCategory) }]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>

      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#EEF1F8",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEF1F8",
    padding: 20,
    marginBottom: 5,
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
  categoryButton: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#80848e",
    borderRadius: 5,
    color: "#80848e",
  },
  selectedCategoryButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "#394491",
    color: "white",
    overflow: "hidden", // Adicione esta linha
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});

export default Perfil;
