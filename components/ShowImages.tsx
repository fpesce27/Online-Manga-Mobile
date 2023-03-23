import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import IconButton from '../components/IconButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Screens } from '../App'
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8675591191850393/1962449168';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const RenderImage = ({image, cascade} : {image: string, cascade: boolean}) => {
    const [height, setHeight] = React.useState<number>(0)

    useEffect(() => {
        Image.getSize(image, (width, height) => {
            setHeight(height)
        })
    }, [])

    return (
        <View style={{...styles.container, height: cascade ? height : Dimensions.get('window').height}}>
            <Image  
                source={{uri: image}}
                style={styles.image}
            />
        </View>
    )
}

const ShowImages = ({images, id, number} : {images: string[], id:number, number:number}) => {

    const [cascade, setCascade] = React.useState<boolean>(false)
    const navigation = useNavigation<NativeStackNavigationProp<Screens>>()
    const [first, setFirst] = React.useState<boolean>(true)
    const [last, setLast] = React.useState<boolean>(false)


    const prevChapter = () => {
        try {
            interstitial.show().then(() => {
                navigation.replace("ReadChapter", {mal_id: id, chapter_number: number+1})
            })
        } catch (error) {
            navigation.replace("ReadChapter", {mal_id: id, chapter_number: number+1})
        }
    }

    const nextChapter = () => {
        try {
            interstitial.show().then(() => {
                navigation.replace("ReadChapter", {mal_id: id, chapter_number: number-1})
            })
        } catch (error) {
            navigation.replace("ReadChapter", {mal_id: id, chapter_number: number-1})
        }
    }

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
            const response = await fetch(`https://manga-online-api.vercel.app/api/manga/chapters/${id}`)
            await response.json().then((data) => {
                if(number === data[data.length - 1].number) {
                    setFirst(true)
                } else {
                    setFirst(false)
                }
                if(number === data[0].number) {
                    setLast(true)
                } else {
                    setLast(false)
                }
            })
            } catch (error) {
                console.log(error)
            }
        })()

        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        return <SafeAreaView style={{backgroundColor:"black", height:'100%'}}>
        <>

            <View style={{position:'relative', zIndex: 100}}>
                <IconButton icon={cascade ? "swap-vertical-sharp" : "swap-horizontal-sharp"} onPress={() => setCascade(!cascade)}
                css={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    color: 'gray',    
                }}/>
                <IconButton icon="arrow-back" onPress={() => navigation.goBack()}
                css={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'transparent',
                    color: 'gray',
                }}/>
            </View>

            <FlatList
                data={images}
                renderItem={({ item }) => <RenderImage image={item} cascade={cascade}/>}
                keyExtractor={(item) => item}
                horizontal={cascade ? false : true}
                pagingEnabled={cascade ? false : true}
                maximumZoomScale={500}
                style={{
                    transform: [{ scaleX: -1}],
                }}
                
            />

            
            {!first && <IconButton icon='play-skip-back-sharp' onPress={prevChapter} css={styles.prevButton}/>}
            {!last && <IconButton icon='play-skip-forward-sharp' onPress={nextChapter} css={styles.nextButton}/>}
        </>
    </SafeAreaView>;
    }

    return (
        <SafeAreaView style={{backgroundColor:"black", height:'100%'}}>
            <>

                <View style={{position:'relative', zIndex: 100}}>
                    <IconButton icon={cascade ? "swap-vertical-sharp" : "swap-horizontal-sharp"} onPress={() => setCascade(!cascade)}
                    css={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'transparent',
                        color: 'gray',    
                    }}/>
                    <IconButton icon="arrow-back" onPress={() => navigation.goBack()}
                    css={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: 'transparent',
                        color: 'gray',
                    }}/>
                </View>

                <FlatList
                    data={images}
                    renderItem={({ item }) => <RenderImage image={item} cascade={cascade}/>}
                    keyExtractor={(item) => item}
                    horizontal={cascade ? false : true}
                    pagingEnabled={cascade ? false : true}
                    maximumZoomScale={500}
                    style={{
                        transform: [{ scaleX: -1}],
                    }}
                    
                />

                
                {!first && <IconButton icon='play-skip-back-sharp' onPress={prevChapter} css={styles.prevButton}/>}
                {!last && <IconButton icon='play-skip-forward-sharp' onPress={nextChapter} css={styles.nextButton}/>}
            </>
        </SafeAreaView>
    )
}

export default ShowImages

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        transform: [{ scaleX: -1}],
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    prevButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
        color: 'gray',
    },
    nextButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        color: 'gray',
    }
})