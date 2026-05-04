import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import api from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
  try {
    await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    Alert.alert("Success", "Account created!");
    router.replace("/login");

  } catch (err) {
    console.log(err.response?.data || err.message);
    Alert.alert("Error", "Registration failed");
  }
};

  return (
    <View style={{ padding: 20 }}>
<TextInput
  placeholder="Name"
  value={name}
  onChangeText={setName}
  style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
/>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
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

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}