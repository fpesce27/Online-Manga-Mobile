import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ icon, onPress, css } : {icon: any, onPress: any, css : any}) => {
    return (
      <TouchableOpacity style={{...styles.button, ...css}} onPress={onPress}>
        <Ionicons name={icon} size={24} color={css?.color}/>
      </TouchableOpacity>
    );
  };

export default IconButton

const styles = StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });