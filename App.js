import { useCallback, useEffect, useState } from "react";
import {
  Linking,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

const colors = {
  primary: "#212832",
  secondary: "#ffb200",
  light: "#c0c0c0",
  lightBG: "#2b323c",
  white: "#fff",
};

export default function App() {
  function openWhatsApp() {
    Linking.openURL("https://api.whatsapp.com/send?phone=2348068986203");
  }

  const [appIsReady, setAppIsReady] = useState(false);

  async function prepare() {
    try {
      await Asset.loadAsync(require("./assets/crypto_image.png"));
      await Font.loadAsync(MaterialCommunityIcons.font);
      await Font.loadAsync(MaterialIcons.font);
    } catch (e) {
      if (__DEV__) {
        console.warn(e);
      }
    } finally {
      setAppIsReady(true);
    }
  }
  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView>
        <StatusBar backgroundColor={"#2b323c"} />

        <View style={styles.logoSection}>
          <Image source={require("./assets/logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>SwapFlex</Text>
        </View>

        <View>
          <Image
            source={require("./assets/crypto_image.png")}
            style={styles.cryptoImage}
          />
        </View>

        <View style={styles.box}>
          <Text style={[styles.text, { color: "silver", textAlign: "center" }]}>
            We trade all kinds of assets
          </Text>

          <View style={styles.innerContainer}>
            <MaterialCommunityIcons name="bitcoin" size={55} color="#ffb200" />
            <MaterialCommunityIcons name="ethereum" size={55} color="#454976" />
            <MaterialCommunityIcons name="litecoin" size={55} color="#c0c0c0" />
          </View>

          <View style={styles.innerContainer}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={55}
              color="#008080"
            />
            <MaterialCommunityIcons
              name="cash-multiple"
              size={55}
              color="green"
            />
            <MaterialCommunityIcons
              name="shield-check"
              size={55}
              color="gold"
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.boxText}>Fast and Reliable</Text>
            <MaterialIcons name="verified" size={20} color="silver" />
          </View>
        </View>

        <TouchableOpacity onPress={openWhatsApp}>
          <View style={styles.button}>
            <Text style={styles.text}>Trade With Us</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color="#fff"
              size={20}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "center",
    backgroundColor: colors.lightBG,
    borderRadius: 15,
    gap: 8,
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    width: "93%",
  },
  boxText: {
    color: colors.light,
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.secondary,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    width: "93%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  cryptoImage: {
    width: "100%",
    height: 335,
    marginTop: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  logoSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: 10,
  },
  logoText: {
    color: colors.secondary,
    marginTop: 5,
    fontSize: 20,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  textWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
});
