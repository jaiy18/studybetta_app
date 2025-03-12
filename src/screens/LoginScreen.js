import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import theme from '../config/theme';
import { useAuth } from '../store/context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    setErrorMessage('');
    console.log('🟢 Attempting login...');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        console.log('✅ Login successful, navigating to MainMenu...');
        navigation.navigate('MainMenu');
      } else {
        console.error('❌ Login failed:', result.message);
        setErrorMessage(result.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to StudyBetta</Text>
      
      <View style={styles.form}>
        <InputField
          label="Email:"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <InputField
          label="Password:"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <Button title="Login" onPress={handleLogin} />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.linkContainer}
        >
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.xxlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  errorMessage: {
    color: theme.colors.error,
    marginTop: theme.spacing.m,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: theme.spacing.l,
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.medium,
  },
});

export default LoginScreen;