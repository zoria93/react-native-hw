import React, { useState } from "react";

import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";

export default function App() {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const onPressWithoutFeedback = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={onPressWithoutFeedback}
      >
        <ImageBackground
          source={require("./assets/images/bg-image.png")}
          style={styles.image}
          resizeMode="cover"
        >
          <RegistrationScreen
            isShownKeyboard={isShownKeyboard}
            setIsShownKeyboard={setIsShownKeyboard}
          />

          {/* <LoginScreen
            isShownKeyboard={isShownKeyboard}
            setIsShownKeyboard={setIsShownKeyboard}
          /> */}

          {/* <PostsScreen /> */}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  // homeIndicator: {
  //   width: 134,
  //   height: 5,
  //   borderRadius: 100,
  //   background: "black",
  //   marginBottom: 8,
  // },
});
