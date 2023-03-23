import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

const Searchbar = ({value, onChangeText, placeholder} : {value: string, onChangeText: any, placeholder: string}) => {
  const theme = useTheme()
  return (
    <View style={{...styles.searchBar, backgroundColor:theme.colors.primary}}>
        <Ionicons name="search-outline" size={24} color={theme.colors.text} />
        <TextInput
          style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
      </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({
    searchBar: {
      height: 50,
      marginVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
    },
    input: {
      flex: 1,
      fontSize: 18,
      color: '#333',
    },
  });