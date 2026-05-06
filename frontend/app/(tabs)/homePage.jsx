import {
  View,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import api from "../../services/api";

import ShowCard from "@/components/ShowCard";

export default function HomePage() {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    const fetchShows = async () => {
      const res = await api.get("/api/shows");
      console.log("DATA:", res.data); // 👈 IMPORTANT
      setShows(res.data);
    };

    fetchShows();
  }, []);

  const fillAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(fillAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(fillAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedWidth = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  const textColor = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ed650b", "#ffffff"],
  });

  console.log(shows);

  const [pressed, setPressed] = useState(false);
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
        imageStyle={{
          opacity: 0.5,
        }}
      >
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.heading}>
            Book your ticket of your favorite show 🎟
          </Text>

          <Pressable
            router="/shows"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.button}
            onPress={() => router.push("/shows")}
          >
            <Animated.View
              style={[
                styles.fill,
                {
                  width: animatedWidth,
                  opacity: fillAnim,
                },
              ]}
            />

            <Animated.Text
              style={[
                styles.text,
                {
                  color: textColor,
                },
              ]}
            >
              Book Now
            </Animated.Text>
          </Pressable>

          <Text style={styles.h1}>Suggested Shows 🎭</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20,
            }}
          >
            {shows.map((shows) => (
              <ShowCard
                key={shows.show_id}
                showId={shows.show_id}
                title={shows.title}
                theatre={shows.theatre_name}
                date={shows.showtimes?.[0]?.date}
                time={shows.showtimes?.[0].time}
                location={shows.location}
                image={shows.image}
                duration={shows.duration}
                price={shows.showtimes?.[0]?.price}
              />
            ))}
          </ScrollView>

          <Text style={styles.h2}>Popular Shows 🎭</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 20,
            }}
          >
            {shows.map((shows) => (
              <ShowCard
                key={shows.show_id}
                showId={shows.show_id}
                title={shows.title}
                theatre={shows.theatre_name}
                date={shows.showtimes?.[0]?.date}
                time={shows.showtimes?.[0].time}
                location={shows.location}
                image={shows.image}
                duration={shows.duration}
                price={shows.showtimes?.[0]?.price}
              />
            ))}
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  h1: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#000",
    alignSelf: "start",
  },

  h2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#000",
    alignSelf: "start",
  },

  shadowWrapper: {
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.12)",
    padding: 2,
  },

  button: {
    width: 120,
    height: 45,
    borderWidth: 1,
    borderColor: "#ed650b",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    position: "relative",
    alignSelf: "center",
  },

  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#ed650b",
    zIndex: 1,
  },

  text: {
    fontWeight: "bold",
    fontSize: 15,
    zIndex: 2,
  },
});
