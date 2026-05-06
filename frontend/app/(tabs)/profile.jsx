import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingShows: 0,
  });

  useEffect(() => {
    fetchUserData();
    fetchUserStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userData = await SecureStore.getItemAsync("user");

      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Προσωρινά δεδομένα - αντικατέστησε με το πραγματικό API σου
        setUser({
          name: "John Doe",
          email: "john@example.com",
          memberSince: "2024",
        });
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userId = await SecureStore.getItemAsync("userId");

      const res = await api.get(`/api/reservations/user/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const bookings = res.data;
      const now = new Date();
      const upcoming = bookings.filter((b) => {
        const showDate = new Date(`$(b.show_date)T${b.show_time}`);
        return b.status === "booked" && showDate > now;
      });

      setStats({
        totalBookings: bookings.length,
        upcomingShows: upcoming.length,
      });
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            // Διαγραφή token και user data από SecureStore
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("user");

            // Ανακατεύθυνση στο login screen
            router.replace("/login");
          } catch (error) {
            console.log("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("../../assets/images/theatreback.jpg")}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/theatreback.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/images/content-backg.jpg")}
        resizeMode="cover"
        style={styles.overlay}
        imageStyle={{ opacity: 0.5 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={100} color="#ed650b" />
            </View>
            <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
            <Text style={styles.userEmail}>
              {user?.email || "guest@example.com"}
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="ticket" size={30} color="#ed650b" />
              <Text style={styles.statNumber}>{stats.totalBookings}</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={30} color="#ed650b" />
              <Text style={styles.statNumber}>{stats.upcomingShows}</Text>
              <Text style={styles.statLabel}>Upcoming Shows</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/reservations")}
            >
              <Ionicons name="list-outline" size={24} color="#ed650b" />
              <Text style={styles.menuText}>My Reservations</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/favorites")}
            >
              <Ionicons name="heart-outline" size={24} color="#ed650b" />
              <Text style={styles.menuText}>Favorites</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                Alert.alert("Coming Soon", "This feature is coming soon!")
              }
            >
              <Ionicons name="settings-outline" size={24} color="#ed650b" />
              <Text style={styles.menuText}>Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                Alert.alert("Contact", "Email us at support@theatreapp.com")
              }
            >
              <Ionicons name="mail-outline" size={24} color="#ed650b" />
              <Text style={styles.menuText}>Contact Support</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          {/* Version Info */}
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#000000",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "45%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ed650b",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  versionText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 12,
    marginTop: 20,
  },
});
