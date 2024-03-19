// Importações necessárias
import { TouchableOpacity, View, Animated } from "react-native";
import { StyleSheet } from "react-native";
import { MenuBar } from "../../Components/MenuBar/MenuBar";
import { useColorScheme } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Text } from "native-base";
import {
  useFonts,
  Inter_900Black,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const Alerta = () => {
  // Variáveis de estado para as animações
  const [animationValue1] = useState(new Animated.Value(1));
  const [animationValue2] = useState(new Animated.Value(1));

  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.lightContainer;

  const handlePress = () => {
    alert("Estou em Pânico");
  };

  const pulsateAnimation1 = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue1, {
          toValue: 1.04,
          duration: 1000, // Ajuste o valor da duração para tornar a animação mais lenta
          useNativeDriver: true,
        }),
        Animated.timing(animationValue1, {
          toValue: 1,
          duration: 1000, // Ajuste o valor da duração para tornar a animação mais lenta
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const pulsateAnimation2 = () => {
    Animated.sequence([
      Animated.timing(animationValue2, {
        toValue: 1.1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      pulsateAnimation2();
    });
  };

  // Iniciar animações quando o componente é montado
  useEffect(() => {
    pulsateAnimation1();
    pulsateAnimation2();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          height: "100%",
          gap: 20,
        }}
      >
        <View style={{}}>
          <Text style={styles.titleDescript}>
            Precisa de ajuda de emergência?
          </Text>
          <Text style={styles.textDescript}>
            Basta clicar no botão para {"\n"} ativar o modo de alerta.
          </Text>
        </View>

        {/* Box com animação pulsante */}
        <Animated.View
          style={{
            transform: [{ scale: animationValue1 }],
          }}
        >
          <Box backgroundColor={"#F4D0D0"} rounded={200} padding={3}>
            {/*             <Animated.View style={{ transform: [{ scale: animationValue2 }] }}> */}
            <Box backgroundColor={"#EEAFB0"} rounded={200} padding={3}>
              <TouchableOpacity style={styles.btnPanico} onPress={handlePress}>
                <MaterialCommunityIcons name="alert" size={120} color="white" />
              </TouchableOpacity>
            </Box>
          </Box>
        </Animated.View>
        <MenuBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#EEF1F8",
  },

  titleDark: {
    color: "white",
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "#EEF1F8",
  },
  btnPanico: {
    padding: 15,
    backgroundColor: "#E14F50",
    borderRadius: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        width: 250,
        height: 250,
      },
      android: {
        width: 220,
        height: 220,
      },
    }),
  },

  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  titleDescript: {
    textAlign: "center",
    fontSize: 32,
    paddingTop: 50,
    marginBottom: 10,
    fontFamily: "Inter_900Black",
    lineHeight: 40,
    color: "#394491",
  },
  textDescript: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    color: "#80848e",
    fontWeight: "bold",
  },
});
