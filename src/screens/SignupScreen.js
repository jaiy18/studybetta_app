import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import theme from '../config/theme';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Update the URL to your actual backend URL
      const response = await fetch('http://192.168.0.13:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        // Navigate to login screen after successful signup
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up for StudyBetta</Text>
      
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

        <InputField
          label="Confirm Password:"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry={true}
        />

        <Button title="Sign Up" onPress={handleSignup} />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
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
});

export default SignupScreen;