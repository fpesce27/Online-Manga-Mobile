import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Manga } from '../constants/interfaces'
import Searchbar from './Searchbar'
import IconButton from './IconButton'
import { useTheme } from '@react-navigation/native'
import BannerAdComponent from './BannerAdComponent'

const ChapterInfo = ({manga, searchQuery, setSearchQuery, reverse, setReverse} : {manga: Manga, searchQuery: string, setSearchQuery: any, reverse: boolean, setReverse: any}) => {
  const theme = useTheme()
  return (
    <>
        <View style={styles.topContainer}>
            <Image
              source={{ uri: manga.images["jpg"].large_image_url }}
              style={styles.image}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", maxWidth:100, maxHeight:100, overflow:'hidden', color:theme.colors.text }}>
              {manga.title}
            </Text>
            <Text style={{ fontSize: 40, fontWeight:'bold', color:theme.colors.text }}>{manga.score}</Text>
          </View>

          <View>
            <Text style={{color:theme.colors.text}}>
              {manga.synopsis.length > 400
                ? manga.synopsis.substring(0, 400) + "...."
                : manga.synopsis}
            </Text>
          </View>

          <BannerAdComponent />

          <View style={styles.controlsContainer}>
            <Searchbar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar capitulo..."
            />
            <IconButton icon={reverse ? "arrow-down" : "arrow-up"}
              onPress={() => setReverse(!reverse)} css={{
                color: theme.colors.text,
              }} />
          </View>
    </>
  )
}

export default ChapterInfo

const styles = StyleSheet.create({
    topContainer: {
        alignItems: "center",
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row",
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        resizeMode: "center",
      },
      controlsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 10,
      },
})