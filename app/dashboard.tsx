import { useEffect, useState } from "react";
import { Linking, Text, SafeAreaView, StyleSheet, View } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";
import { auth } from "../firebaseConfig.js";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { Redirect, router } from "expo-router";
import { showMessage } from "react-native-flash-message";

import Colors from "@/constants/Colors.js";
import BottomBox from "../components/BottomBox.js";
import SmallBox from "../components/SmallBox.js";
import Header from "../components/Header.js";
import Screen from "@/components/Screen";
import StyledText from "@/components/StyledText";
import { ArrowSwapHorizontal } from "iconsax-react-native";

export default function HomeScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [rates, setRates] = useState({});
  const [accounts, setAccounts] = useState([]);

  function openWhatsApp() {
    if (isConnected) {
      Linking.openURL("https://api.whatsapp.com/send?phone=2348068986203");
    } else {
      showMessage({
        message: "You are not connected to the internet",
        type: "warning",
      });
    }
  }

  const getVariables = () => {
    console.log("got here");
    //   axios
    //     .get("http://192.168.181.190:3001/api/variables")
    //     .then((response) => {
    //       console.log("Response received");
    //       setRates(response.data[0].rates);
    //       setAccounts([response.data[1].usd, response.data[2].eur]);
    //     })
    //     .catch((err) => {
    //       console.log("No response");
    //       console.log("The error is " + err);
    //     });
  };

  useEffect(() => {
    // if (!auth?.currentUser) {
    //   return <Redirect href={"/login"} />;
    // }
    // getVariables();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log(state);
      setIsConnected(state?.isInternetReachable);
      if (!state.isInternetReachable) {
        showMessage({
          message: "You are not connected to the internet",
          type: "warning",
        });
      } else {
        showMessage({
          message: "Back online",
          type: "success",
        });
        // getVariables();
      }
    });

    return () => unsubscribe();
  }, []);

  const navigate = (location, currency) => {
    if (isConnected !== null) {
      if (currency) {
        router.push({
          pathname: `/${location}`,
          params: { currency: currency },
        });
      } else {
        router.push(`/${location}`);
      }
    } else {
      showMessage({
        message: "You are not connected to the internet",
        type: "warning",
      });
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <Header />

          <View>
            <StyledText
              color={Colors.light}
              type="title"
              variant="medium"
              style={{ marginVertical: 20 }}
            >
              Services
            </StyledText>

            <View style={styles.services}>
              <View style={styles.smallContainer}>
                <SmallBox
                  text={"Crypto Exchange"}
                  onPress={openWhatsApp}
                >
                  <MaterialCommunityIcons
                    name="bitcoin"
                    size={20}
                    color="#ffb200"
                  />
                  <MaterialCommunityIcons
                    name="ethereum"
                    size={20}
                    color="#454976"
                  />
                  <MaterialCommunityIcons
                    name="litecoin"
                    size={20}
                    color="#c0c0c0"
                  />
                </SmallBox>

                <SmallBox
                  text={"Gift Card Exchange"}
                  onPress={openWhatsApp}
                >
                  <MaterialCommunityIcons
                    name="google-play"
                    size={20}
                    color={Colors.silver}
                  />
                  <Zocial
                    name="itunes"
                    size={20}
                    color={Colors.light}
                  />
                  <FontAwesome
                    name="apple"
                    size={20}
                    color={Colors.light}
                  />
                </SmallBox>
              </View>
              <View style={styles.smallContainer}>
                <SmallBox
                  onPress={() => navigate("payment-methods")}
                  text={"USD to NGN"}
                >
                  <MaterialCommunityIcons
                    name="currency-usd"
                    size={20}
                    color="#008080"
                  />
                  <ArrowSwapHorizontal
                    size={20}
                    color="#008080"
                  />
                  <MaterialCommunityIcons
                    name="currency-ngn"
                    size={20}
                    color="#008080"
                  />
                </SmallBox>

                <SmallBox
                  text={"Euro to NGN"}
                  onPress={() => navigate("bank-details", "EUR")}
                >
                  <MaterialCommunityIcons
                    name="currency-eur"
                    size={20}
                    color="#008080"
                  />
                  <ArrowSwapHorizontal
                    size={20}
                    color="#008080"
                  />
                  <MaterialCommunityIcons
                    name="currency-ngn"
                    size={20}
                    color="#008080"
                  />
                </SmallBox>
              </View>
            </View>
          </View>
        </View>

        <BottomBox />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  services: {
    gap: 20,
  },
  smallBox: {
    alignItems: "center",
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    height: 80,
    justifyContent: "center",
  },
  smallContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  smallText: {
    color: Colors.light,
    fontSize: 14,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
