import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      await SecureStore.setItemAsync("token", res.data.token);

      Alert.alert("Success", "Logged in!");
      router.push("/theatres");
    } catch {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

