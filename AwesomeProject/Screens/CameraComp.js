import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraIcon from "../assets/images/camera_alt-black.svg";
import { FontAwesome } from "@expo/vector-icons";

export default function CameraComp({ photo, setPhoto }) {
  const [hasPermission, setHasPermission] = useState(null);
  // const [cameraRef, setCameraRef] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //   const [type, setType] = useState(CameraType.back);
  //   const [photo, setPhoto] = useState(""); перенесла в кріейт постс
  const [ratio, setRatio] = useState("4:3");
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  // useEffect(() => {
  //   console.log(type);
  // }, [type]);

  const getSupportedRatios = async () => {
    if (cameraRef) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      console.log(ratios); // you can use this to check which ratios are supported
      // for example, if '1:1' is supported, you can use it as the ratio
      if (ratios.includes("1:1")) {
        setRatio("1:1");
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    // return <Text>No access to camera</Text>;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //   if (!permission.granted) {
  //     // Camera permissions are not granted yet
  //     return (
  //       <View style={styles.container}>
  //         <Text style={{ textAlign: "center" }}>
  //           We need your permission to show the camera
  //         </Text>
  //         <Button onPress={requestPermission} title="grant permission" />
  //       </View>
  //     );
  //   }

  const onCameraReady = () => {
    setIsCameraReady(true);
    getSupportedRatios();
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };

        // const { uri } = await cameraRef.takePictureAsync();
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;
        setPhoto(source);

        // if (source) {
        //   await cameraRef.current.pausePreview();
        //   setIsPreview(true);
        // }
        // await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAssetAsync(source);
        console.log("Picture saved successfully.", source);
        // cancelPreview();
      } catch (error) {
        console.error("Error while taking or saving picture:", error);
      }
    }
  };

  const renderCaptureControl = () => (
    // <TouchableOpacity
    //   style={styles.button}
    //   activeOpacity={0.7}
    //   disabled={!isCameraReady}
    //   onPress={takePhoto}
    // >
    //   <View style={styles.takePhotoOut}>
    //     <View style={styles.takePhotoInner}></View>
    //   </View>
    // </TouchableOpacity>
    <Pressable
      style={{
        ...styles.btn,
        backgroundColor: isPreview ? "rgba(255, 255, 255, 0.30)" : "#FFFFFF",
        color: isPreview ? "#FFFFFF" : "#BDBDBD",
      }}
      disabled={!isCameraReady}
      activeOpacity={0.7}
      onPress={takePhoto}
    >
      {/* <CameraIcon */}
      {/* styles={{ color: isPreview ? "#FFFFFF" : "#BDBDBD" }} */}
      {/* /> */}
      <FontAwesome
        name="camera"
        size={20}
        color={isPreview ? "#FFFFFF" : "#BDBDBD"}
      />
    </Pressable>
  );

  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );

  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
      {/* <View style={styles.container}> */}
      <Camera
        style={styles.camera}
        ratio={ratio}
        type={type}
        autoFocus
        // ref={setCameraRef}
        ref={cameraRef}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}
      >
        <View style={styles.photoView}>
          {/* <TouchableOpacity
            style={styles.flipContainer}
            disabled={!isCameraReady}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Flip
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onPress={takePhoto}
              >
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner}></View>
                </View>
              </TouchableOpacity> */}
          {renderCaptureControl()}
        </View>
      </Camera>
      {/* <View style={styles.container}> */}
      {/* {isPreview && renderCancelPreviewButton()} */}
      {/* {!isPreview && renderCaptureControl()} */}
      {/* </View> */}
      {/* </View> */}

      {/* </SafeAreaView> */}
    </>
  );
}

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);
const styles = StyleSheet.create({
  container: { flex: 1, borderRadius: 8 },
  camera: {
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    // justifyContent: "flex-end", даёт то, что кнопка внизу, нам нужно посередине
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    //   justifyContent: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },

  flipContainer: {
    // flex: 0.1,
    // alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  //   takePhotoOut: {
  //     borderWidth: 2,
  //     borderColor: "white",
  //     height: 50,
  //     width: 50,
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderRadius: 50,
  //   },
  //   старая кнопка снепшота

  //   takePhotoInner: {
  //     borderWidth: 2,
  //     borderColor: "white",
  //     height: 40,
  //     width: 40,
  //     backgroundColor: "white",
  //     borderRadius: 50,
  //   },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 8,
    // borderRadius: 5,
    // height: captureSize,
    // width: captureSize,
    // borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
  btn: {
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
});
