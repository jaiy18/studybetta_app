import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './store/context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import theme from './config/theme';

// We'll use this component to determine which navigator to render
const RootNavigator = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    // You could add a loading screen here
    return null;
  }
  
  return user ? <AppNavigator /> : <AuthNavigator />;
};

const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;