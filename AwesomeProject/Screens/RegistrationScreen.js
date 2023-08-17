import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  Alert,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
} from "react-native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import SvgComponent from "../components/SvgComponent";

export default function RegistrationScreen({
  isShownKeyboard,
  setIsShownKeyboard,
}) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const loginHandler = (text) => setLogin(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
    setIsHiddenPassword(true);
  };

  const onRegister = () => {
    if (!login || !email || !password) {
      Alert.alert("Fill in all the fields!");
      return;
    }

    Alert.alert(
      "Register form data: ",
      `login: ${login}, email: ${email}, password: ${password}`
    );
    console.log(
      "Register form data: ",
      `login: ${login}, email: ${email}, password: ${password}`
    );
    setIsShownKeyboard(false);
    Keyboard.dismiss();
    reset();
  };

  const onPressWithoutFeedback = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const togglePassword = () => {
    setIsHiddenPassword((prev) => !prev);
  };

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={onPressWithoutFeedback}>
        <View
          style={{
            ...styles.form,
            marginBottom: isShownKeyboard ? -162 : 0,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.avatarWrapper}>
              <SvgComponent />
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              placeholderTextColor={"#BDBDBD"}
              name="login"
              value={login}
              onChangeText={loginHandler}
              onFocus={() => setIsShownKeyboard(true)}
            />
            <TextInput
              style={{ ...styles.input, marginTop: 16 }}
              placeholder="Адреса електронної пошти"
              placeholderTextColor={"#BDBDBD"}
              name="email"
              value={email}
              onChangeText={emailHandler}
              onFocus={() => setIsShownKeyboard(true)}
            />
            <View style={{ position: "relative", width: "100%" }}>
              <TextInput
                style={{
                  ...styles.input,
                  marginTop: 16,
                }}
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                name="password"
                value={password}
                onChangeText={passwordHandler}
                secureTextEntry={isHiddenPassword}
                onFocus={() => setIsShownKeyboard(true)}
              />
              <Pressable
                onPress={togglePassword}
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#1B4371",
                    fontSize: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                  {isHiddenPassword ? "Показати" : "Сховати"}
                </Text>
              </Pressable>
            </View>
            <Pressable
              title={"Register"}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#c75502" : "#FF6C00",
                },
                styles.btn,
              ]}
              onPress={onRegister}
            >
              <Text style={styles.btnTitle}>Зареєстуватися</Text>
            </Pressable>
            <Text style={styles.linkTitle}>Вже є акаунт? Увійти</Text>
          </KeyboardAvoidingView>
        </View>
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
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingBottom: 8,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    resizeMode: "cover",
    // marginTop: "-30%",
    marginTop: -110,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
  },

  title: {
    fontFamily: "Roboto_500Medium",
    color: "#212121",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    marginVertical: 33,
  },

  input: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,

    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
    backgroundColor: "#F6F6F6",

    height: 50,

    color: "#212121",
    padding: 16,
  },

  btn: {
    alignItems: "center",
    maxWidth: "100%",
    paddingVertical: 16,

    fontSize: 16,
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#ffffff",

    fontFamily: "Roboto_400Regular",
    fontSize: 16,

    fontWeight: 400,
    lineHeight: 19,
  },

  linkTitle: {
    textAlign: "center",
    color: "#1b4371",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 66,
  },
  // homeIndicator: {
  //   width: 134,
  //   height: 5,
  //   borderRadius: 100,
  //   background: "black",
  //   marginBottom: 8,
  // },
});
