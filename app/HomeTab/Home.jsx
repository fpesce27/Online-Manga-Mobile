import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Item" onPress={() => navigation.navigate('Item')} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})