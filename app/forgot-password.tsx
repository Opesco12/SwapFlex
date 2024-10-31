import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import Colors from "@/constants/Colors";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.icon}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color={Colors.light}
          size={40}
        />
      </TouchableWithoutFeedback>

      <Text style={styles.header}>Forgot Password</Text>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <>
            <Text style={styles.info}>
              We'll send you a password reset link to the provided email.
            </Text>
            <AppFormField
              name="email"
              keyboardType="email-address"
              placeholder="Email"
            />

            <AppButton
              text={"Confirm"}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    color: Colors.light,
    fontSize: 30,
    marginTop: 40,
    marginBottom: 40,
    textAlign: "center",
  },
  info: {
    color: Colors.light,
    fontSize: 14,
    marginBottom: 15,
    opacity: 0.9,
    textAlign: "center",
  },
});
