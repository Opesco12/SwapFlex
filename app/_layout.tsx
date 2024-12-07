import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import FlashMessage from "react-native-flash-message";

import { NetworkProvider } from "@/context/NetworkContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    IBMRegular: require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    IBMMedium: require("../assets/fonts/IBMPlexSans-Medium.ttf"),
    IBMBold: require("../assets/fonts/IBMPlexSans-Bold.ttf"),
    IBMSemibold: require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NetworkProvider>
      <Stack screenOptions={{ headerShown: false, animation: "ios" }} />

      <FlashMessage position={"top"} />
      <StatusBar style="light" />
    </NetworkProvider>
  );
}
