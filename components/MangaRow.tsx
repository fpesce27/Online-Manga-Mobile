import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Manga } from '../constants/interfaces'
import MangaCard from './MangaCard'

const MangaRow = ({mangas, continueReading} : {mangas: Manga[], continueReading?: boolean}) => {

  return (
    <FlatList
        data={mangas}
        renderItem={({item}) => <MangaCard manga={continueReading ? item.manga : item} currentChapter={item.current_chapter}/>}
        keyExtractor={item => continueReading ? item.manga.mal_id.toString() : item.mal_id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
    />
  )
}

export default MangaRow

const styles = StyleSheet.create({})