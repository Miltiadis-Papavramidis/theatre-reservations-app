import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import { useContext } from "react";
import { BookingsContext } from "../../context/BookingContext";

export default function Reservations() {
  const { bookings } = useContext(BookingsContext);

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
          {bookings.length === 0 ? (
            <Text>No reservations yet</Text>
          ) : (
            bookings.map((b, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 15,
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{b.title}</Text>
                  <Text>🎭 {b.theatre}</Text>
                  <Text>🎟 {b.showtime}</Text>
                  <Text>Seats: {b.seats.join(", ")}</Text>
                </View>

                <Image
                  source={{ uri: b.image }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 8,
                    marginLeft: 10,
                  }}
                />
              </View>
            ))
          )}
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
}
