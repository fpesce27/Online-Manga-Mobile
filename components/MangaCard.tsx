import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Manga } from '../constants/interfaces'
import { useNavigation, useTheme } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from '../App';
import { auth, db } from '../db/firebase';

type props = NativeStackNavigationProp<Screens, 'SelectChapter'>

const MangaCard = ({manga, currentChapter} : {manga: Manga, currentChapter?:number}) => {
    const navigation = useNavigation<props>()
    const theme = useTheme()
    const handlePress = () => {
        if (currentChapter) {
          updateContinueReadingChapter()
            navigation.navigate('ReadChapter', {mal_id: manga.mal_id, chapter_number: currentChapter})
        } else {
            navigation.navigate('SelectChapter', {manga:manga})
        }
    }

  return (
    <View style={{display:'flex', flexDirection:'column'}}>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image 
          source={{uri: manga.images["jpg"].large_image_url}}
          style={{width: 100, height: 150, borderRadius: 10}}
        />
          <Text style={styles.name}>{manga.title.length > 12 ? manga.title.substring(0, 12) + '....' : manga?.title}</Text>
          <Text style={styles.score}>{manga.score}</Text>
      </TouchableOpacity>
      {currentChapter && <Text style={{fontSize: 12, marginLeft: 10, marginTop: 5, color:theme.colors.text}}>Capítulo {currentChapter}</Text>}
    </View>
  )
}

export default MangaCard

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      position: 'relative',
      overflow: 'hidden',
      height: 150,
      width: 100,
      marginLeft: 10,
    },
    name: {
        position: 'absolute',
        left: 0,
        fontSize: 12,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 10,
    },
    score: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 5,
        borderBottomLeftRadius: 10,
    }
})

const updateContinueReadingChapter = (manga_id: number, chapter_number: number) => {
  db.collection('users').doc(auth.currentUser?.uid).collection('continue_reading').where('manga.mal_id', '==', manga_id).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      db.collection('users').doc(auth.currentUser?.uid).collection('continue_reading').doc(doc.id).update({
        current_chapter: chapter_number + 1,
        last_read: new Date()
      })
    })
  })
}