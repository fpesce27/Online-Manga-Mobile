import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ShowImages from '../components/ShowImages'
import { ActivityIndicator } from 'react-native-paper'

const ReadChapter = ({ route } : { route: any }) => {
    const {mal_id, chapter_number} = route.params
    const [images, setImages] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    useEffect(() => {
        (async () => {
            const response = await fetch(`https://manga-online-api.vercel.app/api/manga/chapters/${mal_id}/${chapter_number}`)
            await response.json().then((data) => {
                setImages(data)
                setLoading(false)
            })
        })()
    }, [])

    return (
        loading ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size='large' /></View> :
        <ShowImages images={images} id={mal_id} number={chapter_number}/>
    )
}

export default ReadChapter

const styles = StyleSheet.create({})