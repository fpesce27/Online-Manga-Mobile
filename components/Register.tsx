import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../db/firebase';
import BannerAdComponent from './BannerAdComponent';

export default function Register() {
    const [user, setUser] = React.useState<string>("")
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirmPassword, setConfirmPassword] = React.useState<string>("")
    const navigation = useNavigation()
    const theme = useTheme()

    const register = () => {
        if (email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
          if (password === confirmPassword) {
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // Signed in 
              userCredential.user?.updateProfile({
                displayName: user
              }).then(() => {
                navigation.navigate<props>('Profile')
              })
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage)
              // ..
            });
          }
        }
      }


  return (
    <>
    <View style={styles.container}>
      <Text style={{...styles.title, color:theme.colors.text}}>Registrarse</Text>

      <TextInput
        style={{...styles.input, borderColor:theme.colors.border, color:theme.colors.text}}
        placeholder="Usuario"
        autoCapitalize="none"
        keyboardType="email-address"
        value={user}
        onChangeText={setUser}
        placeholderTextColor={theme.colors.text}
      />
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
      <TextInput
        style={{...styles.input, borderColor:theme.colors.border, color:theme.colors.text}}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor={theme.colors.text}
      />
      <TouchableOpacity style={{...styles.button, backgroundColor:theme.colors.primary}} onPress={register}>
        <Text style={{...styles.buttonText, color:theme.colors.card}}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{...styles.linkText, color:theme.colors.primary}}>¿Ya tienes cuenta? Inicia Sesion</Text>
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
