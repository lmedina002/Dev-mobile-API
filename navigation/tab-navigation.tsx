import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SongsStackScreen } from "./app-stacks";

// Define main tab navigator
export const TabNavigator = () => {
  return (
    <NavigationContainer theme={{...DefaultTheme, colors: {...DefaultTheme.colors, background: '#b7b473'}}}>
      <SongsStackScreen/>
    </NavigationContainer>
  );
};
