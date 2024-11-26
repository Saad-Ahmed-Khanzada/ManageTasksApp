import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex justify-center items-center h-screen">
      <Text className="text-red-500">Saad</Text>
      <Link
            href="(tabs)"
            className="text-blue-500 font-semibold text-base  "
          >
            SKIP
          </Link>
    </View>
  );
}
