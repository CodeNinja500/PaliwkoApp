import React, { useState, useEffect } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

function WelcomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [value, setValue] = useState("value");
  const { getItem, setItem } = useAsyncStorage("test");
  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };
  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
    setValue(newValue);
  };
  useEffect(() => {
    readItemFromStorage();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Image
        onLoadStart={() => readItemFromStorage()}
        style={styles.logo}
        source={require("../assets/gas-station.png")}
      />
      <Text style={styles.oilAmount}>{value}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.navigate("Last trip")}>
          <Image style={styles.icon} source={require("../assets/plus.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            writeItemToStorage("0.0");
          }}
        >
          <Image style={styles.icon} source={require("../assets/zero.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 130,
    marginLeft: 22,
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 18,
    marginLeft: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#13918B",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "#13918B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  oilAmount: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
});

export default WelcomeScreen;
