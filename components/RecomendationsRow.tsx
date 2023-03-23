import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import MangaCard from './MangaCard'

const RecomendationsRow = ({recomendations, title} : {recomendations : any, title: string}) => {
  return (
    <View style={styles.rowContainer}>
        <Text style={{paddingLeft:10}}>{title}</Text>
        <FlatList
            data={recomendations}
            renderItem={({item}) => <MangaCard manga={item} />}
            keyExtractor={item => item.mal_id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        />
    </View>
  )
}

export default RecomendationsRow

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    rowContainer: {
        padding: 10,
    }
})