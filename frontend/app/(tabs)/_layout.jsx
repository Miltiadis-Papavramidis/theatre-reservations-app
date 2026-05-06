import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        headerBackground: () => (
          <LinearGradient
            colors={["#ed650b", "#f1aa87"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),

        headerTintColor: "#fff",

        headerTitleAlign: "center",

        tabBarStyle: {
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: insets.bottom,
          paddingTop: 8,
          height: 70 + insets.bottom,
          borderTopWidth: 0,
          backgroundColor: "#111827",
        },

        tabBarActiveTintColor: "#f9e97d",

        tabBarInactiveTintColor: "#ffffff",

        tabBarBackground: () => (
          <LinearGradient
            colors={["#ed650b", "#f1aa87"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, rotation: 45 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="homePage"
        options={{
          title: "Home",
          headerTitle: "InStage.com",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shows"
        options={{
          title: "Shows",
          tabBarIcon: ({ color }) => (
            <Ionicons name="film" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reservations"
        options={{
          title: "Reservations",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "InStage.com",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
