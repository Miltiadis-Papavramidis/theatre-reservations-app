import { View, TextInput, ScrollView, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ShowCard from "../../components/ShowCard";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Shows() {
  const [search, setSearch] = useState("");

  const [shows, setShows] = useState([]);

  console.log("FIRST SHOW:", shows[0]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await api.get("/api/shows");
        console.log("RAW API RESPONSE:", JSON.stringify(res.data[0], null, 2));
        setShows(res.data);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchShows();
  }, []);

  console.log("SHOW:", shows);

  const filteredShows =
    search.trim() === ""
      ? shows
      : shows.filter(
          (show) =>
            (show.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
            (show.theatre_name?.toLowerCase() || "").includes(
              search.toLowerCase(),
            ),
        );
  console.log("ΤΥΠΟΣ ShowCard:", typeof ShowCard);
  console.log("ShowCard:", ShowCard);
  console.log("🏷️ ShowCard component:", ShowCard);
  console.log("🏷️ ShowCard name:", ShowCard.name);
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

          {filteredShows.map((item) => {
            console.log("PASSING ID:", item.show_id); // πρέπει να δείχνει 1,2

            return (
              <ShowCard
                key={item.show_id}
                show_id={item.show_id} // 🔥 ΑΥΤΟ ΕΙΝΑΙ ΤΟ ΚΡΙΣΙΜΟ
                title={item.title}
                theatre={item.theatre_name}
                date={item.showtimes?.[0]?.date}
                time={item.showtimes?.[0]?.time}
                image={item.image}
                location={item.location}
              />
            );
          })}
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
}
