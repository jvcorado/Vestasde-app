import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alerta } from "../pages/Alerta/Alerta";
import { Login } from "../pages/Login/Login";
import { Eventos } from "../pages/Eventos/Eventos";
import Perfil from "../pages/Perfil/Perfi";
import { NativeBaseProvider, View } from "native-base";
import { PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <Stack.Navigator
          /* initialRouteName="Login" */
          screenOptions={{
            headerTintColor: "#394491",
            headerStyle: { backgroundColor: "#EEF1F8" },
          }}
        >
          {/*   <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerTitle: "" }}
          /> */}
          <Stack.Screen
            name="Alerta"
            component={Alerta}
            options={{
              headerLeft: () => null,
            }}
          />

          <Stack.Screen name="Eventos" component={Eventos} />
          <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </PaperProvider>
  );
};

export default Navigation;
