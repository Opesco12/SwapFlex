import { router } from "expo-router";
import { TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

const AppBackHeader = () => {
  return (
    <TouchableWithoutFeedback onPress={() => router.back()}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={40}
        color={Colors.light}
      />
    </TouchableWithoutFeedback>
  );
};

export default AppBackHeader;
