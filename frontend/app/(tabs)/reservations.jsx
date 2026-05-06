import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("token");

      // Πάρε το user_id από το token ή χρησιμοποίησε 1 προσωρινά
      const userId = 1;

      const res = await api.get(`/api/reservations/user/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("Reservations with images:", res.data);
      setReservations(res.data);
    } catch (err) {
      console.log("Error fetching reservations:", err);
      Alert.alert("Error", "Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  // Φόρτωση όταν μπαίνει η οθόνη
  useFocusEffect(
    useCallback(() => {
      fetchReservations();
    }, []),
  );

  const handleCancel = async (reservationId) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              setCancellingId(reservationId);
              const token = await SecureStore.getItemAsync("token");

              await api.put(
                `/api/reservations/${reservationId}/cancel`,
                {},
                {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                },
              );

              Alert.alert("Success", "Reservation cancelled successfully");

              // Refresh the list
              fetchReservations();
            } catch (err) {
              console.log("Error cancelling:", err);
              Alert.alert(
                "Error",
                err.response?.data?.message || "Failed to cancel reservation",
              );
            } finally {
              setCancellingId(null);
            }
          },
        },
      ],
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("el-GR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("../../assets/images/theatreback.jpg")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#ed650b" />
        <Text style={{ marginTop: 10, color: "#fff" }}>
          Loading reservations...
        </Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/theatreback.jpg")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/images/content-backg.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.5 }}
      >
        <ScrollView
          style={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginBottom: 20,
              color: "#fff",
              textAlign: "center",
            }}
          >
            My Reservations 🎟
          </Text>

          {reservations.length === 0 ? (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 40,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Ionicons name="ticket-outline" size={60} color="#ccc" />
              <Text style={{ fontSize: 16, color: "#999", marginTop: 10 }}>
                No reservations yet
              </Text>
            </View>
          ) : (
            reservations.map((item) => (
              <View
                key={item.reservation_id}
                style={{
                  marginBottom: 15,
                  backgroundColor: "#fff",
                  padding: 15,
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {/* 🔥 ΕΔΩ ΒΑΖΟΥΜΕ ΤΗΝ ΚΑΝΟΝΙΚΗ ΕΙΚΟΝΑ 🔥 */}
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      marginRight: 12,
                      backgroundColor: "#f0f0f0",
                    }}
                    defaultSource={require("../../assets/images/theatreback.jpg")}
                    onError={() =>
                      console.log("Failed to load image:", item.image)
                    }
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: "#666", marginBottom: 2 }}
                    >
                      🎭 {item.theatre_name}
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: "#666", marginBottom: 2 }}
                    >
                      📅 {formatDate(item.show_date)} at{" "}
                      {formatTime(item.show_time)}
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: "#666", marginBottom: 2 }}
                    >
                      💺 Seats: {item.seats}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#ed650b",
                      }}
                    >
                      €{parseFloat(item.price).toFixed(2)} × {item.total_seats}{" "}
                      = €
                      {(parseFloat(item.price) * item.total_seats).toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: item.status === "booked" ? "#4CAF50" : "#999",
                        marginTop: 4,
                      }}
                    >
                      Status:{" "}
                      {item.status === "booked" ? "✓ Confirmed" : "Cancelled"}
                    </Text>
                  </View>
                </View>

                {item.status === "booked" && (
                  <TouchableOpacity
                    onPress={() => handleCancel(item.reservation_id)}
                    disabled={cancellingId === item.reservation_id}
                    style={{
                      marginTop: 12,
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      backgroundColor: "#ff4444",
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {cancellingId === item.reservation_id
                        ? "Cancelling..."
                        : "Cancel Reservation"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
}
