// App navigation: routes based on whether a token exists.
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import ConnectionScreen from "../screens/ConnectionScreen";
import DashboardScreen from "../screens/DashboardScreen";

export type RootStackParamList = {
  Login: undefined;
  Connection: undefined;
  Dashboard: undefined;
};

var Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(): React.JSX.Element {
  var auth = useContext(AuthContext);

  // Optional: show a splash/loading screen while checking AsyncStorage token
  if (auth.isLoading) {
    return <></>;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.token ? (
        <>
          <Stack.Screen name="Connection" component={ConnectionScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}