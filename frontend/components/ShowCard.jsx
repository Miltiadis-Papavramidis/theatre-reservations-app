import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ShowCard(props) {
  console.log("ΟΛΑ ΤΑ PROPS:", Object.keys(props));
  console.log("ΤΟ PROP show_id:", props.show_id);
  console.log("ΤΟ PROP id:", props.id);
  console.log("ΤΟ PROP showId:", props.showId);

  const {
    showId,
    title,
    theatre,
    date,
    time,
    image,
    location,
    duration,
    price,
  } = props;

  console.log("SHOW_ID:", showId);
  const router = useRouter();

  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((item) => item.title === title);

  return (
    <TouchableOpacity
      onPress={() => {
        const idToSend = showId;
        console.log("CLICK - ID to send:", idToSend, typeof idToSend);

        if (!idToSend) {
          console.error("Δεν υπάρχει show_id!");
          return;
        }

        router.push({
          pathname: "ShowDetails",
          params: {
            show_id: String(showId),
            title: title || "",
            theatre: theatre || "",
            date: date || "",
            time: time || "",
            image: image || "",
            location: location || "",
            duration: duration || "",
            price: price || "",
          },
        });
      }}
    >
      <View style={styles.card}>
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
            size={24}
            color="red"
          />
        </TouchableOpacity>

        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.info}>📍 {theatre}</Text>
          <Text style={styles.info}>📅 {date}</Text>
          <Text style={styles.info}>🕒 {time}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    marginBottom: 3,
  },
  location: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginBottom: 3,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 5,
  },
});
