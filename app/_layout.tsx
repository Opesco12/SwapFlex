import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import FlashMessage from "react-native-flash-message";

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
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="login" /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <FlashMessage position={"top"} />
    </>
  );
}
