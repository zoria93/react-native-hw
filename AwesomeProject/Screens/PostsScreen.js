import { useState } from "react";
import { View } from "react-native";
import UserInfo from "../components/UserInfo";
import { postsScreenArr } from "../data/posts";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";

export default function PostsScreen() {
  const [posts, setPosts] = useState(postsScreenArr);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<UserInfo />}
        data={posts}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
});
