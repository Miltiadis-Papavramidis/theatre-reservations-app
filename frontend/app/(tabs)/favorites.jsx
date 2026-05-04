import { View, Text, ScrollView, ImageBackground } from "react-native";
import { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import ShowCard from "@/components/ShowCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

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
      {favorites.length > 0 ? (
        favorites.map((show, index) => (
          <ShowCard
            key={index}
            title={show.title}
            theatre={show.theatre}
            date={show.date}
            time={show.time}
            image={show.image}
          />
        ))
      ) : (
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            marginTop: 50,
          }}
        >
          No favorite shows yet
        </Text>
      )}
    </ScrollView>
    </ImageBackground>
    </ImageBackground>
  );
}
