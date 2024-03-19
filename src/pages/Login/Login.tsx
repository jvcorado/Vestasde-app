import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";

export const Login = () => {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handlePress = () => {
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    if (email === "admin" && password === "123456") {
      navigation.navigate("Alerta" as never);
      setEmail("");
      setPassword("");
      alert("Seja Bem Vindo!");
      return;
    }
    setEmail("");
    setPassword("");
    return alert("Email ou Senha inválido! Tente novamente.");
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.image}
      />
      <TextInput
        mode="outlined"
        label="Digite seu email"
        right={<TextInput.Affix />}
        placeholder="Email"
        /* style={[styles.input, themeInputStyle]} */
        style={{ width: "100%", height: 60 }}
        placeholderTextColor="#2e2e2e"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        /* 
        style={[styles.input, themeInputStyle]}*/
        placeholderTextColor="#2e2e2e"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        style={{ width: "100%", height: 60, borderRadius: 30 }}
        label="Digite sua senha"
        right={<TextInput.Affix />}
        placeholder="Senha"
      />
      <TouchableOpacity style={styles.customButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#EEF1F8",
  },
  darkContainer: {
    backgroundColor: "#000000",
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    alignItems: "center",
    paddingTop: 70,
    justifyContent: "flex-start",
    padding: 20,
  },
  image: {
    width: 200,
  },
  input: {
    padding: 10,
    width: "100%",
    height: 60,
    borderRadius: 10,
    fontSize: 20,
    borderStyle: "solid",
    borderWidth: 2,
  },

  lightInput: {
    backgroundColor: "#72727210",
    color: "#2e2e2e",
    borderColor: "#2e2e2e",
  },
  darkInput: {
    backgroundColor: "#ffffff",
    color: "#2e2e2e",
    borderColor: "#d0d0d0",
  },

  customButton: {
    backgroundColor: "#394491",
    padding: 15,
    borderRadius: 10,
    width: "100%", // Ocupa a largura total do container
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;
