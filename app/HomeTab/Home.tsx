import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme, adaptNavigationTheme, MD2DarkTheme } from 'react-native-paper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screens } from '../../App';
import MangaRow from '../../components/MangaRow';
import { Manga, MangaRow as MR } from '../../constants/interfaces';
import { db, auth } from '../../db/firebase';
import { StatusBar } from 'expo-status-bar';
import BannerAdComponent from '../../components/BannerAdComponent';

const Home = () => {
  const [mangas, setMangas] = React.useState<MR>({} as MR)
  const [continueReading, setContinueReading] = React.useState<Manga[]>([])
  const [loading, setLoading] = React.useState(true)
  const theme = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<Screens>>()

  useEffect(() => {
    (async () => {
      const response = await fetch('https://manga-online-api.vercel.app/api/recommendations')
      const data = await response.json()
      setMangas(data)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        getContinueReading()
      }
      else {
        setContinueReading([])
      }
    })
  }, [auth.currentUser])


  const getContinueReading = async () => {
    db.collection('users').doc(auth.currentUser?.uid).collection('continue_reading').orderBy('last_read', 'desc').limit(5).onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => doc.data() as Manga)
      setContinueReading(data)
    })
  }

  return (
    !loading &&
    <ScrollView contentContainerStyle={{padding:20, gap:20}}>
      <StatusBar style="auto" />
      {continueReading.length > 0 && (
        <>
          <Text style={{fontSize:20, fontWeight:'bold', color:theme.colors.text}}>Continuar Leyendo</Text>
          <MangaRow mangas={continueReading} continueReading/>

          <BannerAdComponent />
        </>
      )}
      <Text style={{fontSize:20, fontWeight:'bold', color:theme.colors.text}}>Mejores Valorados</Text>
      <MangaRow mangas={mangas.highestRated?.data}/>

      <BannerAdComponent />

      <Text style={{fontSize:20, fontWeight:'bold', color:theme.colors.text}}>Mas Populares</Text>
      <MangaRow mangas={mangas.mostPopular?.data}/>
      
      <BannerAdComponent />

    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})