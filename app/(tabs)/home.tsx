import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import RecomendationsRow from '../../components/RecomendationsRow';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {

  const [recomendations, setRecomendations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const recomendations = await fetch('https://manga-online-api.vercel.app/api/recommendations');
      const recomendationsJson = await recomendations.json();
      setRecomendations(recomendationsJson);
      setLoading(false);
    })();
  }, []);

  return (
    !loading && (
    <View style={styles.container}>
      <RecomendationsRow recomendations={recomendations.highestRated} title="Mejores Valorados"/>
      <RecomendationsRow recomendations={recomendations.mostPopular} title="Mas populares"/>
      <RecomendationsRow recomendations={recomendations.manhwa} title="Manhwas"/>
    </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
