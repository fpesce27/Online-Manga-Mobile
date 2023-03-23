import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Searchbar from '../../components/Searchbar'
import { Manga } from '../../constants/interfaces'
import MangaCard from '../../components/MangaCard'
import BannerAdComponent from '../../components/BannerAdComponent'

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [mangas, setMangas] = React.useState<Manga[]>([])

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (searchQuery.length > 0) {
      timer = setTimeout(() => {
        (async () => {
          const response = await fetch(`https://manga-online-api.vercel.app/api/search/${searchQuery}`)
          const data = await response.json()
          setMangas(data.data)
        })()
      }, 1000);
    }

    if (searchQuery.length === 0) {
      return
    }

    return () => clearTimeout(timer);
  }, [searchQuery])

  return (
    <SafeAreaView style={{alignItems:'center', padding:10}}>
      <Searchbar value={searchQuery} onChangeText={setSearchQuery} placeholder='Buscar manga...'/>
      <BannerAdComponent />
      <FlatList
        data={mangas}
        renderItem={({item}) => <MangaCard manga={item}/>}
        keyExtractor={item => item.mal_id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        numColumns={3}
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
    paddingBottom:100
  }
})