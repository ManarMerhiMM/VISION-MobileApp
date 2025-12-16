// Primary button styled for the VISION dark theme.
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton(props: Props): React.JSX.Element {
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !props.disabled && styles.pressed,
        props.disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

var styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accentBlueDark, // ✅ always blue
  },
  pressed: {
    opacity: 0.9, // small feedback only
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});