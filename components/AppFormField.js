import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

import Colors from "@/constants/Colors";

const AppFormField = ({ name, Value, ...otherProps }) => {
  const { touched, setFieldTouched, values, handleChange, errors } =
    useFormikContext();
  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        style={styles.textInput}
        value={Value ? Value : values[name]}
        onChangeText={handleChange(name)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={Colors.light}
        {...otherProps}
      />
      <Text style={styles.error}>{touched[name] && errors[name]}</Text>
    </>
  );
};

export default AppFormField;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 14,
    marginVertical: 2,
    opacity: 0.6,
  },
  textInput: {
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    height: 55,
    paddingHorizontal: 15,
    width: "100%",
  },
});
