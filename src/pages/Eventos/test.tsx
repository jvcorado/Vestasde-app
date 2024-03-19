import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Portal, Modal, Button } from "react-native-paper";
import SkeletonItem from "../../Components/Skeleton/Skeleton";
import { MenuBar } from "../../Components/MenuBar/MenuBar";

interface Data {
  id: number;
  titulo: string;
  capa: string;
  subtitulo: string;
  categoria: string;
}

const Eventos: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleModalIndex, setVisibleModalIndex] = useState<number | null>(
    null
  );
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://sujeitoprogramador.com/rn-api/?api=posts")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Marca o carregamento como concluído quando os dados são recebidos
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity onPress={() => setVisibleModalIndex(index)}>
      <View style={styles.item} key={index}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
            {item.titulo}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>{item.subtitulo}</Text>
        </View>

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
    </TouchableOpacity>
  );

  const filterDataByCategory = (category: string | null) => {
    if (category === null) {
      return data;
    }
    return data.filter((item) => item.categoria === category);
  };

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (offsetRef || 0);

    if (dif < -10) {
      setIsMenuVisible(true); // Scrolling up
    } else if (dif > 10) {
      setIsMenuVisible(true); // Scrolling down
    }

    offsetRef = currentOffset;
  };

  let offsetRef = 1;

  // Se os dados ainda estiverem sendo carregados, exibe os itens de esqueleto
  if (loading) {
    return (
      <SafeAreaView>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ width: "100%", maxHeight: "82%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            marginBottom: 30,
            display: isMenuVisible ? "flex" : "none",
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
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
        />
      </SafeAreaView>

      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#EEF1F8",
  },
  item: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
  categoryButton: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 1,
    borderColor: "#80848e",
    borderRadius: 20,
    color: "#80848e",
  },
  selectedCategoryButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    backgroundColor: "#394491",
    color: "white",
    overflow: "hidden", // Adicione esta linha
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flexDirection: "column",
    gap: 10,
  },
});

export default Eventos;

<View style={styles.container}>
  {loading ? (
    <SafeAreaView style={{ width: "100%" }}>
      {/* Se ainda estiver carregando, exiba os itens de esqueleto */}
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
      <MenuBar></MenuBar>
    </SafeAreaView>
  ) : error ? (
    // Se ocorrer um erro, exiba a mensagem de erro
    <Text style={styles.error}>{error}</Text>
  ) : (
    // Se não houver erro e o carregamento for concluído, mapeie os dados e renderize-os
    <SafeAreaView>
      <FlatList
        data={dados}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
              name: {item.name}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24 }}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  )}
</View>;

import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonItem from "../../Components/Skeleton/Skeleton";
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { MenuBar } from "../../Components/MenuBar/MenuBar";
import api from "../../service/api";

interface Dados {
  id: number;
  name: string;
  code: string;
}

const Eventos: React.FC = () => {
  const [dados, setDados] = useState<Dados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    api
      .get("Equipamento")
      .then((response) => {
        console.log(response.data);
        setDados(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao carregar dados");
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <SafeAreaView style={{ width: "100%" }}>
          {/* Se ainda estiver carregando, exiba os itens de esqueleto */}
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
          <MenuBar></MenuBar>
        </SafeAreaView>
      ) : error ? (
        // Se ocorrer um erro, exiba a mensagem de erro
        <Text style={styles.error}>{error}</Text>
      ) : (
        // Se não houver erro e o carregamento for concluído, mapeie os dados e renderize-os
        <SafeAreaView>
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
                  name: {item.name}
                </Text>
                <Text style={{ fontSize: 16, lineHeight: 24 }}>
                  {item.name}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF1F8",
  },
  item: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default Eventos;

const [dados, setDados] = useState<Dados[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>("");

useEffect(() => {
  api
    .get("Equipamento")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError("Erro ao carregar dados.");
      setLoading(false);
    });
}, []);

useEffect(() => {
  api
    .get("Equipamento")
    .then((response) => {
      console.log(response.data);
      setDados(response.data);
      console.log(dados);

      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError("Erro ao carregar dados.");
      setLoading(false);
    });
}, []);
