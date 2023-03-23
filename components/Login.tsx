import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../db/firebase';
import BannerAdComponent from './BannerAdComponent';
import { Snackbar } from 'react-native-paper';

export default function Login() {
    const navigation = useNavigation()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const theme = useTheme()
    const [visible, setVisible] = React.useState(false);

    const login = () => {
        if (email.length > 0 && password.length > 0) {
          auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            navigation.navigate<props>('Profile')
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
          });
        }
      }
    
      
  return (
    <>
      <View style={styles.container}>
        <Text style={{...styles.title, color:theme.colors.text}}>Iniciar Sesion</Text>
        <TextInput
          style={{...styles.input, borderColor:theme.colors.border, color:theme.colors.text}}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={theme.colors.text}
        />
        <TextInput
          style={{...styles.input, borderColor:theme.colors.border, color:theme.colors.text}}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.colors.text}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
          <Text style={{...styles.linkText, color:theme.colors.primary}}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{...styles.button, backgroundColor:theme.colors.primary}} onPress={login}>
          <Text style={{...styles.buttonText, color:theme.colors.card}}>Iniciar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{...styles.linkText, color:theme.colors.primary}}>¿No tienes cuenta? Registrate</Text>
        </TouchableOpacity>

      </View>
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
    marginBottom: 32,
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
    marginTop: 10,
  },
  forgotPassword: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
});
