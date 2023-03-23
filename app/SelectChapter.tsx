import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Chapter as Capitulo, Manga } from "../constants/interfaces";
import Searchbar from "../components/Searchbar";
import IconButton from "../components/IconButton";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screens } from "../App";
import ChaptersPagination from "../components/ChaptersPagination";
import ChapterInfo from "../components/ChapterInfo";
import ChaptersList from "../components/ChaptersList";
import BannerAdComponent from "../components/BannerAdComponent";



const SelectChapter = ({ route }: { route: any }) => {
  const manga: Manga = route.params.manga;
  const [pagination, setPagination] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [chapters, setChapters] = React.useState<Capitulo[]>([]);
  const [reverse, setReverse] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const theme = useTheme()

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://manga-online-api.vercel.app/api/manga/chapters/" + manga.mal_id
      );
      await response.json().then((data) => {
        setPagination(chunkArray(data, 10));
        setChapters(chunkArray(data, 10)[0]);
        setLoading(false);
      });
    })();
  }, []);

  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 25, gap: 20 }}>
          
          <ChapterInfo 
            manga={manga} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            reverse={reverse} 
            setReverse={setReverse}
          />
          
          {loading ? ( <ActivityIndicator size="large" color={theme.colors.primary} /> ) : (
          pagination?.length > 0 ? (
            <>
              <ChaptersPagination pagination={pagination} setChapters={setChapters} />
              <ChaptersList capitulos={chapters} manga_id={manga.mal_id} searchQuery={searchQuery} reverse={reverse}/>
            </>
          ) : 
          (<Text style={{textAlign:'center', color:theme.colors.text}}>No hay capitulos disponibles</Text>))}

        </ScrollView>
    </SafeAreaView>
  );
};

export default SelectChapter;

function chunkArray(arr: string | any[], numChunks: number) {
  const chunkSize = Math.ceil(arr.length / numChunks);
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result.reverse();
}