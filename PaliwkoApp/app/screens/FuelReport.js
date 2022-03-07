import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

function FuelReport({ navigation }) {
  const [fuelPerKm, onChangeFuel] = React.useState(null);
  const [distance, onChangeDistance] = React.useState(null);
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
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDistance}
          value={distance}
          keyboardType="decimal-pad"
          placeholder="Dystans"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeFuel}
          value={fuelPerKm}
          keyboardType="decimal-pad"
          placeholder="Spalanie"
        />
        <TouchableOpacity
          onPress={() => {
            if (fuelPerKm == null || distance == null) {
              Alert.alert("Pola nie mogą być puste");
            } else {
              var usedFuel =
                (parseFloat(fuelPerKm.replace(",", ".")) *
                  parseFloat(distance.replace(",", "."))) /
                100.0;
              var newFuel = usedFuel + parseFloat(value.replace(",", "."));
              writeItemToStorage(newFuel.toFixed(1));
              console.log(usedFuel);
              console.log(value);
            }
            navigation.goBack();
          }}
        >
          <Image style={styles.icon} source={require("../assets/plus.png")} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    marginBottom: 20,
    width: 200,
    height: 45,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 18,
    marginLeft: 18,
    marginTop: 15,
    marginBottom: 70,
  },
  container: {
    flex: 1,
    backgroundColor: "#13918B",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default FuelReport;
