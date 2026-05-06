import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import api from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

export default function ShowDetails() {
  const params = useLocalSearchParams();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedShowtimePrice, setSelectedShowtimePrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Παραλαβή params από navigation
  const show_id = params.show_id;
  const title = params.title;
  const theatre = params.theatre;
  const image = params.image;
  const location = params.location;
  const duration = params.duration;
  const basePrice = parseFloat(params.price) || 0;

  console.log("ShowDetails - show_id:", show_id);

  // 🎭 GET SHOWTIMES
  useEffect(() => {
    if (!show_id || show_id === "undefined") return;

    const fetchShowtimes = async () => {
      try {
        const res = await api.get(`/api/showtimes/${show_id}`);
        setShowtimes(res.data);
      } catch (err) {
        console.log(err);
        Alert.alert("Error", "Failed to load showtimes");
      }
    };

    fetchShowtimes();
  }, [show_id]);

  // 💺 GET SEATS & update price when showtime changes
  useEffect(() => {
    if (!selectedTime) {
      setSeats([]);
      setSelectedSeats([]);
      setTotalPrice(0);
      setSelectedShowtimePrice(0);
      return;
    }

    setSeats([]);
    setSelectedSeats([]);
    setTotalPrice(0);

    // Find the selected showtime price
    const selectedShowtime = showtimes.find(
      (st) => st.showtime_id === selectedTime,
    );
    const price = selectedShowtime ? parseFloat(selectedShowtime.price) : 0;
    setSelectedShowtimePrice(price);

    const fetchSeats = async () => {
      try {
        const res = await api.get(`/api/seats/${selectedTime}`);
        setSeats(res.data);
      } catch (err) {
        console.log(err);
        Alert.alert("Error", "Failed to load seats");
      }
    };

    fetchSeats();
  }, [selectedTime, showtimes]);

  // 💰 Update total price when selected seats change
  useEffect(() => {
    setTotalPrice(selectedSeats.length * selectedShowtimePrice);
  }, [selectedSeats, selectedShowtimePrice]);

  // 🎟 SELECT SEAT
  const toggleSeat = (seat) => {
    if (seat.is_reserved) {
      Alert.alert("Already Reserved", "This seat is already taken.");
      return;
    }

    if (selectedSeats.includes(seat.seat_id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seat_id));
    } else {
      setSelectedSeats([...selectedSeats, seat.seat_id]);
    }
  };

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((item) => item.title === title);

  // 📌 BOOKING
  const handleBooking = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("token");

      await api.post(
        "/api/reservations",
        {
          showtime_id: selectedTime,
          seats: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert("Success", "Reservation completed!", [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)/reservations"),
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />

        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite({ title, theatre, image, location })}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color="red"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>📍 {theatre}</Text>
        {location && <Text style={styles.info}>📌 Location: {location}</Text>}

        {/* 🎭 SHOW DURATION & BASE PRICE */}
        {duration && (
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color="#ed650b" />
            <Text style={styles.infoText}>Duration: {duration} minutes</Text>
          </View>
        )}

        {basePrice > 0 && (
          <View style={styles.infoRow}>
            <Ionicons name="ticket-outline" size={18} color="#ed650b" />
            <Text style={styles.infoText}>
              Base Price: €{basePrice.toFixed(2)}
            </Text>
          </View>
        )}

        {/* 🎭 SHOWTIMES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Showtime:</Text>
          {showtimes.length === 0 && (
            <Text style={styles.noDataText}>No showtimes available</Text>
          )}
          {showtimes.map((item) => (
            <TouchableOpacity
              key={item.showtime_id}
              onPress={() => setSelectedTime(item.showtime_id)}
              style={[
                styles.showtimeButton,
                selectedTime === item.showtime_id && styles.selectedShowtime,
              ]}
            >
              <Text
                style={[
                  styles.showtimeText,
                  selectedTime === item.showtime_id &&
                    styles.selectedShowtimeText,
                ]}
              >
                🎟 {item.show_date?.split("T")[0]} - {item.show_time} (€
                {parseFloat(item.price).toFixed(2)})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 💺 SEATS */}
        {selectedTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Seats:</Text>
            <Text style={styles.subtitle}>
              Selected: {selectedSeats.length} seat(s)
            </Text>

            <View style={styles.seatsGrid}>
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat.seat_id);
                const isReserved = Boolean(seat.is_reserved);

                return (
                  <TouchableOpacity
                    key={seat.seat_id}
                    onPress={() => toggleSeat(seat)}
                    disabled={isReserved}
                    style={[
                      styles.seatButton,
                      isReserved && styles.reservedSeat,
                      isSelected && styles.selectedSeat,
                    ]}
                  >
                    <Text
                      style={[
                        styles.seatText,
                        (isReserved || isSelected) && styles.seatTextWhite,
                      ]}
                    >
                      {seat.seat_number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* 💰 TOTAL PRICE */}
        {selectedTime && selectedSeats.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: €{totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.totalBreakdown}>
              ({selectedSeats.length} × €{selectedShowtimePrice.toFixed(2)})
            </Text>
          </View>
        )}

        {/* 🎟 BOOK BUTTON */}
        <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  imageWrapper: { position: "relative" },
  image: { width: "100%", height: 250 },
  heartIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  content: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  info: { fontSize: 16, marginBottom: 5, color: "#555" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  infoText: { fontSize: 15, color: "#555" },
  section: { marginTop: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 12 },
  noDataText: { color: "#999", fontStyle: "italic", marginTop: 8 },
  showtimeButton: {
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedShowtime: {
    backgroundColor: "#ed650b",
    borderColor: "#ed650b",
  },
  showtimeText: { fontSize: 14, color: "#333" },
  selectedShowtimeText: { color: "#fff", fontWeight: "bold" },
  seatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  seatButton: {
    width: 55,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedSeat: {
    backgroundColor: "#ed650b",
    borderColor: "#ed650b",
  },
  reservedSeat: {
    backgroundColor: "#aaa",
    borderColor: "#888",
    opacity: 0.6,
  },
  seatText: { fontSize: 14, fontWeight: "500", color: "#333" },
  seatTextWhite: { color: "#fff" },
  totalContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalText: { fontSize: 22, fontWeight: "bold", color: "#ed650b" },
  totalBreakdown: { fontSize: 14, color: "#666", marginTop: 4 },
  bookBtn: {
    marginTop: 24,
    marginBottom: 40,
    backgroundColor: "#ed650b",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bookText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
