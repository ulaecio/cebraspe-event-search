import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Form from "./Form";
import Buton from "./Buton";

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#FFF'
          }
        }}
      >
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Buton" component={Buton}></Stack.Screen>
        <Stack.Screen name="Form" component={Form}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;