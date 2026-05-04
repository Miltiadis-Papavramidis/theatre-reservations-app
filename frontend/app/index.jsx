import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  if (token) {
    return <Redirect href="/homePage" />; //  αν logged in
  } else {
    return <Redirect href="/login" />; //  αν όχι
  }
}
