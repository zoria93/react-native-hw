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
import CameraIcon from "../assets/images/camera_alt-black.svg";
import MapIcon from "../assets/images/map-pin.svg";
import DelIcon from "../assets/images/trash.svg";

export default function CreatePostsScreen() {
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss()}
        // style={styles.container}
      >
        <View
          style={styles.container}
          // ContainerStyle={styles.contentContainer}
        >
          <View style={styles.imgWrapper}>
            <Pressable style={styles.btn}>
              <CameraIcon />
            </Pressable>
          </View>

          <Text style={styles.imgText}>Завантажте фото</Text>
          {/* Тут буде умова */}

          <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
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
                  onPress={() => {}}
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 240,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  btn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",

    color: "#BDBDBD",

    borderRadius: 30,
    padding: 18,
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
