import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const MenuBar = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [currentPage, setCurrentPage] = useState("Alerta");

  useEffect(() => {
    if (isFocused) {
      setCurrentPage(route.name);
    }
  }, [isFocused, route]);

  const handleMenuPress = (screen: string) => {
    setCurrentPage(screen);
    navigation.navigate(screen as never);
  };

  return (
    <View style={styles.containerBar}>
      <TouchableOpacity
        style={[
          styles.menuButton,
          currentPage === "Alerta" && styles.selectedButton,
        ]}
        onPress={() => handleMenuPress("Alerta")}
      >
        <MaterialCommunityIcons
          name="alert"
          size={30}
          color={currentPage === "Alerta" ? "#394491" : "#80848e"}
        />
        {/*   <Text
          style={[
            styles.buttonTextBar,
            currentPage === "Alerta" && { color: "#394491" },
          ]}
        >
          Alerta
        </Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuButton,
          currentPage === "Eventos" && styles.selectedButton,
        ]}
        onPress={() => handleMenuPress("Eventos")}
      >
        <MaterialIcons
          name="event-note"
          size={30}
          color={currentPage === "Eventos" ? "#394491" : "#80848e"}
        />
        {/*   <Text
          style={[
            styles.buttonTextBar,
            currentPage === "Eventos" && { color: "#394491" },
          ]}
        >
          Eventos
        </Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuButton,
          currentPage === "Perfil" && styles.selectedButton,
        ]}
        onPress={() => handleMenuPress("Perfil")}
      >
        <AntDesign
          name="setting"
          size={30}
          color={currentPage === "Perfil" ? "#394491" : "#80848e"}
        />
        {/*   <Text
          style={[
            styles.buttonTextBar,
            currentPage === "Perfil" && { color: "#394491" },
          ]}
        >
          Perfil
        </Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBar: {
    /*     borderWidth: 2,
    borderColor: "#e1e0e0", */
    width: "60%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: 65,
    marginBottom: 35,
    ...Platform.select({
      ios: {
        shadowColor: "#0000001b",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 30,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  menuButton: {
    display: "flex",
    height: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  selectedButton: {
    borderWidth: 6,
    borderColor: "#ffffff",

    backgroundColor: "#3943914c",
  },
  buttonTextBar: {
    color: "#80848e",
    fontSize: 16,
    fontWeight: "400",
  },
});
