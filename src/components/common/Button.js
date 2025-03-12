import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../../config/theme';

const Button = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: theme.spacing.m,
  },
  text: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
  },
});

export default Button;