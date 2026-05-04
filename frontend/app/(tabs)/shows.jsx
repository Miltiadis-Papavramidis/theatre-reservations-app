import { View, TextInput, ScrollView, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ShowCard from "../../components/ShowCard";

export default function Shows() {
  const [search, setSearch] = useState("");

  const shows = [
    {
      title: "Hamlet",
      theatre: "National Theatre",
      date: "15 May 2026",
      time: "20:00",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35",
    },

    {
      title: "Macbeth",
      theatre: "Royal Theatre",
      date: "18 May 2026",
      time: "21:00",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    },

    {
      title: "Phantom",
      theatre: "City Hall",
      date: "20 May 2026",
      time: "19:30",
      image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d",
    },
  ];

  const filteredShows =
    search.trim() === ""
      ? []
      : shows.filter(
          (show) =>
            show.title.toLowerCase().includes(search.toLowerCase()) ||
            show.theatre.toLowerCase().includes(search.toLowerCase()),
        );

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
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              borderRadius: 15,
              marginVertical: 15,
              height: 50,
              elevation: 3,
            }}
          >
            <Ionicons name="search" size={22} color="gray" />

            <TextInput
              placeholder="Search shows..."
              value={search}
              onChangeText={setSearch}
              style={{
                marginLeft: 10,
                flex: 1,
                fontSize: 16,
              }}
            />
          </View>

          {filteredShows.map((show) => (
            <ShowCard
              key={show.title}
              title={show.title}
              theatre={show.theatre}
              date={show.date}
              time={show.time}
              image={show.image}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
}
