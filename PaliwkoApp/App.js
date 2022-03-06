import "react-native-gesture-handler";
import React from "react";
import { View } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import FuelReport from "./app/screens/FuelReport";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Fuel tracker" component={WelcomeScreen} />
        <Stack.Screen name="Last trip" component={FuelReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
