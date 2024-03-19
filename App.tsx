import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Router/Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
