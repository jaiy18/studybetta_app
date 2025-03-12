import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from '../screens/MainMenuScreen'; // You'll need to create this
// Import other screens as you create them

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      {/* Add other screens here as you create them */}
    </Stack.Navigator>
  );
};

export default AppNavigator;