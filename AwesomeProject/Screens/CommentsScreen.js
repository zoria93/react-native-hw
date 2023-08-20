import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CommentsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>CommentsScreen</Text>
    </View>
  );
}
