import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from "react-native";
import SkeletonItem from "../../Components/Skeleton/Skeleton";
import { MenuBar } from "../../Components/MenuBar/MenuBar";
import api from "../../service/api";
import { Platform } from "react-native";

interface Data {
  id: number;
  name: string;
  code: string;
}

interface Evento {
  id: number;
  datetime: string;
  description: string;
  complement: string;
  detail: string;
}

export const Eventos = () => {
  const [data, setData] = useState<Data[]>([]);
  const [evento, setEvento] = useState<Evento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setVisibleModalIndex] = useState<number | null>(null);
  const [, setError] = useState("");

  useEffect(() => {
    // Busca os dados dos equipamentos
    api
      .get("Equipamento")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao carregar dados.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Busca os dados dos equipamentos
    api
      .get("Evento?id=39929&date_first=2024-01-01&date_last=2024-10-03")
      .then((response) => {
        setEvento(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao carregar dados.");
      });
  }, []);

  const renderItemEventos = ({
    item,
    index,
  }: {
    item: Evento;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => {
        setVisibleModalIndex(index);
      }}
    >
      <View style={styles.item}>
        <View
          style={{
            width: "100%",
          }}
        >
          <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
            {item.datetime}
          </Text>
          <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
            {item.complement}
          </Text>
          <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
            {item.id}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }: { item: Data; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        setVisibleModalIndex(index);
      }}
    >
      <View style={styles.item}>
        <View
          style={{
            width: "100%",
          }}
        >
          <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
            {item.name}
          </Text>
          <Text style={[styles.title, { fontFamily: "Inter_900Black" }]}>
            {item.id}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>{item.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SafeAreaView style={styles.safeAreaViewSkeletton}>
          {/* Use 5 itens para iOS */}
          {Platform.OS === "ios" &&
            [...Array(4)].map((_, index) => <SkeletonItem key={index} />)}
          {/* Use 3 itens para outras plataformas */}
          {Platform.OS !== "ios" &&
            [...Array(3)].map((_, index) => <SkeletonItem key={index} />)}
        </SafeAreaView>
        <MenuBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <SectionList
          sections={[{ title: "Dados", data: evento }]}
          renderItem={renderItemEventos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
    backgroundColor: "#EEF1F8",
  },

  safeAreaView: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    ...Platform.select({
      ios: {
        height: "80%",
        marginTop: 25,
      },
      android: {
        height: "82%",
      },
    }),
  },

  safeAreaViewSkeletton: {
    width: "100%",
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        paddingTop: 40,
        minHeight: "80%",
      },
    }),
  },

  item: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    marginVertical: 5,
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
    overflow: "hidden",
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flexDirection: "column",
    gap: 10,
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 5,
    borderRadius: 8,
  },
  modalHeader: {
    color: "red",
    fontWeight: "bold",
  },
  modalText: {
    color: "blue",
    fontWeight: "bold",
  },
});
