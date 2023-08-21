import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
// import CameraIcon from "../assets/images/camera_alt-black.svg";
import MapIcon from "../assets/images/map-pin.svg";
import DelIcon from "../assets/images/trash.svg";
import CameraComp from "./CameraComp";
import { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { GlobalContext } from "../components/GlobalStateProvider";

export default function CreatePostsScreen() {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation();
  const { setIsRefetchedPosts } = useContext(GlobalContext);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  // const handlePublish = () => {
  //   const newPost = {
  //     id: posts.length + 1, // или вы можете использовать другой метод генерации id
  //     img: require("../assets/images/your-image.jpg"), // путь к изображению
  //     title: title,
  //     location: location,
  //     comments: 0, // или начальное количество комментариев
  //     likes: 0, // или начальное количество лайков
  //   };

  //   addPost(newPost);
  //   // ... здесь также может быть логика для сброса формы
  // };

  const handlePublish = async () => {
    if (!photo || !title || !locationName) {
      alert("Всі поля мають бути заповнені!");
      return;
    }
    Keyboard.dismiss();
    const newPost = {
      id: Date.now().toString(),
      img: photo,
      title: title,
      location: locationName,
      comments: 0,
      likes: 0,
    };

    // Получение текущих данных из AsyncStorage
    const existingPosts = await AsyncStorage.getItem("posts");
    const parsedExistingPosts = existingPosts ? JSON.parse(existingPosts) : [];

    // Обновление данных и сохранение обратно в AsyncStorage
    const updatedPosts = [...parsedExistingPosts, newPost];
    await AsyncStorage.setItem("posts", JSON.stringify(updatedPosts));
    // await AsyncStorage.setItem("posts", JSON.stringify([]));
    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(coords);
      navigation.navigate("Публікації", { coords });
      // setErrorMsg("");
    } catch (error) {
      // setErrorMsg("Error getting location");
      console.log(error);
    }

    // Очистка формы
    setTitle("");
    setLocationName("");
    setPhoto("");

    setIsRefetchedPosts((prev) => !prev);
    console.log("publishing");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage has been cleared.");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  }

  // clearAsyncStorage();

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={keyboardHide}
        // style={styles.container}
      >
        <View
          style={styles.container}
          // ContainerStyle={styles.contentContainer}
        >
          <View style={styles.imgWrapper}>
            {/* <Pressable style={styles.btn}>
              <CameraIcon />
            </Pressable> */}
            {photo ? (
              <>
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: "100%",
                    height: 240,
                    overflow: "hidden",
                    borderRadius: 8,
                  }}
                />
                <Pressable
                  style={{
                    ...styles.btn,
                    backgroundColor: "rgba(255, 255, 255, 0.30)",
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    setPhoto("");
                  }}
                >
                  <FontAwesome name="camera" size={20} color={"#FFFFFF"} />
                </Pressable>
              </>
            ) : (
              <CameraComp photo={photo} setPhoto={setPhoto} />
            )}
          </View>

          {photo ? (
            <Text style={styles.imgText}>Редагувати фото</Text>
          ) : (
            <Text style={styles.imgText}>Завантажте фото</Text>
          )}
          {/* Тут буде умова */}

          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.formContainer}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.keyboard}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Назва..."
                  placeholderTextColor="#BDBDBD"
                  type={"text"}
                  name={"title"}
                  value={title}
                  onChangeText={setTitle}
                />
                <View style={styles.inputContainer}>
                  <MapIcon width={24} height={24} style={styles.mapIcon} />
                  <TextInput
                    style={{
                      ...styles.input,
                      marginTop: 16,
                      marginBottom: 32,
                      paddingLeft: 28,
                    }}
                    placeholder="Місцевість..."
                    placeholderTextColor="#BDBDBD"
                    type={"text"}
                    name={"photoLocation"}
                    value={locationName}
                    onChangeText={setLocationName}
                  />
                </View>
                <Pressable
                  title={"Publish"}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#f6f6f6e0" : "#F6F6F6",
                    },
                    styles.button,
                  ]}
                  onPress={handlePublish}
                >
                  <Text style={styles.buttonText}>Опублікувати</Text>
                </Pressable>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={{
              width: 70,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F6F6F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 120,
              marginBottom: 22,
            }}
            onPress={() => {}}
          >
            <DelIcon />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 22,
    backgroundColor: "#FFFFFF",

    // justifyContent: "center",
  },

  imgWrapper: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    // width: "100%",
    // height: 240,
    position: "relative",
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  //   btn: {
  //     width: 60,
  //     height: 60,
  //     backgroundColor: "#FFFFFF",

  //     color: "#BDBDBD",

  //     borderRadius: 30,
  //     padding: 18,
  //   },
  btn: {
    display: "flex",
    alignSelf: "center",
    position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: [{ translate: "-50%" }],

    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: 18,
    // backgroundColor: "#FFFFFF",

    // color: "#BDBDBD",

    borderRadius: 30,
  },
  imgText: {
    color: "#BDBDBD",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    marginBottom: 32,
  },
  formContainer: {
    // flex: 3,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    color: "#BDBDBD",

    fontSize: 16,
    borderRadius: 100,

    // marginTop: 32,
    // marginBottom: 120,
  },
  buttonText: {
    fontFamily: "Roboto_400Regular",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    width: "100%",
    height: 50,

    paddingTop: 16,
    paddingBottom: 16,
    // fontFamily: "Roboto_400Regular",
    // fontStyle: "normal",
    // fontSize: 16,
    // lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    fontStyle: "normal",

    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  mapIconContainerStyle: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: [{ translateY: -12 }],
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    position: "relative",

    flexDirection: "row",
    alignItems: "center",
  },
  mapIcon: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
  },
});
