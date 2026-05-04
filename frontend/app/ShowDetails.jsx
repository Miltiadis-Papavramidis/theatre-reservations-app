import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../context/FavoritesContext";
import { useContext, useState } from "react";
import { BookingsContext } from "../context/BookingContext";

export default function ShowDetails() {
  const { title, theatre, date, time, image, location } =
    useLocalSearchParams();

  const [selectedTime, setSelectedTime] = useState(null);

  const initialSeats = [
    { id: "A1", taken: false },
    { id: "A2", taken: true },
    { id: "A3", taken: false },
    { id: "A4", taken: false },

    { id: "B1", taken: false },
    { id: "B2", taken: true },
    { id: "B3", taken: false },
    { id: "B4", taken: false },
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState(initialSeats);
  const toggleSeat = (seat) => {
    if (seat.taken) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const availableSeats = initialSeats.filter((s) => !s.taken).length;

  const tickets = selectedSeats.length;
  const { bookings } = useContext(BookingsContext);
  const { addBooking } = useContext(BookingsContext);
  const handleBooking = () => {
    if (!selectedTime) {
      alert("Select showtime!");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Select seats!");
      return;
    }

    const selectedShowtime = showtimes.find((s) => s.id === selectedTime);

    const booking = {
      title,
      theatre,
      showtime: selectedShowtime.label,
      seats: selectedSeats,
      image,
    };

    addBooking(booking); // 🔥 GLOBAL SAVE

    // reset
    setSelectedSeats([]);
    setSelectedTime(null);

    alert("Booking saved!");
  };

  const imagesMap = {
    Hamlet: "https://images.unsplash.com/photo-1503095396549-807759245b35",
    Macbeth: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    Phantom: "https://images.unsplash.com/photo-1507924538820-ede94a04019d",
  };

  const showtimes = [
    { id: 1, label: "15 May - 18:00" },
    { id: 2, label: "15 May - 21:00" },
    { id: 3, label: "16 May - 20:00" },
  ];
  const price = 12;
  const duration = "2h 30m";

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((item) => item.title === title);

  return (
    <ScrollView style={styles.container}>
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />

        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() =>
            toggleFavorite({
              title,
              theatre,
              date,
              time,
              image,
              location,
            })
          }
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color="red"
          />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.info}>📍 {theatre}</Text>
        <Text style={styles.info}>📅 {date}</Text>
        <Text style={styles.info}>🕒 {time}</Text>
        <Text>⏱ Duration: {duration}</Text>
        <Text>💰 Price: €{price}</Text>

        {location && <Text style={styles.info}>📌 {location}</Text>}

        {/* SHOWTIMES */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Select Showtime:</Text>

          {showtimes.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedTime(item.id)}
              style={{
                padding: 10,
                marginTop: 8,
                borderRadius: 8,
                backgroundColor: selectedTime === item.id ? "#ed650b" : "#eee",
              }}
            >
              <Text
                style={{
                  color: selectedTime === item.id ? "#fff" : "#000",
                }}
              >
                🎟 {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Select Seats:</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);

              return (
                <TouchableOpacity
                  key={seat.id}
                  onPress={() => toggleSeat(seat)}
                  style={{
                    width: 50,
                    height: 50,

                    borderRadius: 8,

                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: seat.taken
                      ? "#999" // taken
                      : isSelected
                        ? "#ed650b" // selected
                        : "#eee", // free
                  }}
                >
                  <Text style={{ color: "#000" }}>{seat.id}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text>Available seats: {availableSeats}</Text>
        <Text>Selected: {selectedSeats.join(", ") || "None"}</Text>
        <Text>Total: €{tickets * price}</Text>

        {/* TICKETS */}
        <Text style={styles.sectionTitle}>Tickets: {tickets}</Text>

        <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
          <Text style={styles.bookText}>Add Booking</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Your Bookings:</Text>

          {bookings.map((b, index) => (
            <Text key={index}>
              🎟 {b.showtime} → Seats: {b.seats.join(", ")}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 250,
  },

  heartIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 30,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  showtime: {
    fontSize: 15,
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  counterBtn: {
    backgroundColor: "#ed650b",
    padding: 10,
    borderRadius: 8,
  },

  counterText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  bookBtn: {
    marginTop: 30,
    backgroundColor: "#ed650b",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
