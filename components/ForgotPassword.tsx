import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../db/firebase';
import BannerAdComponent from './BannerAdComponent';

export default function ForgotPasswordScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const theme = useTheme()

  const handleResetPassword = () => {
    auth.sendPasswordResetEmail(email).then(() => {
        alert('Se ha enviado un correo para recuperar tu contraseña');
    }).catch((error) => {
        alert(error.message);
    });
  };

  return (
    <>
        <SafeAreaView style={styles.container}>
            <Text style={{...styles.title, color:theme.colors.text}}>Recuperar Contraseña</Text>
            <Text style={styles.subtitle}>
                Ingresa tu correo electronico para recuperar tu contraseña
            </Text>
            <TextInput
                style={{...styles.input, borderColor:theme.colors.border, color:theme.colors.text}}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={theme.colors.text}
            />
            <TouchableOpacity style={{...styles.button, backgroundColor:theme.colors.primary}} onPress={handleResetPassword}>
                <Text style={{...styles.buttonText, color:theme.colors.card}}>Recuperar Contraseña</Text>
            </TouchableOpacity>
        </SafeAreaView>
        <BannerAdComponent />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    width:'80%',
    color: '#aaa',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '80%',
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
  },
});
