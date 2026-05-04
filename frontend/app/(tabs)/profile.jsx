import { View, Text, ImageBackground } from "react-native";

export default function Profile() {
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
        <View style={{ padding: 20 }}>
          <Text>Profile</Text>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}
