import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Roupa from "./screens/Roupas";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} /> */}
        <Stack.Screen name="Roupa" component={Roupa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
