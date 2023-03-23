import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Chapter, Manga } from "../constants/interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Screens } from "../App";
import { useNavigation, useTheme } from "@react-navigation/native";
import { auth, db } from "../db/firebase";

type props = NativeStackNavigationProp<Screens, "ReadChapter">;

const ChaptersList = ({ capitulos, manga_id, searchQuery, reverse }: { capitulos: Chapter[], manga_id : number, searchQuery: string, reverse:boolean }) => {
  const [last_chapter, setLastChapter] = React.useState<number>();
  const theme = useTheme();
  
  useEffect(() => {
    if (auth.currentUser){
      db.collection("users").doc(auth.currentUser.uid).collection("continue_reading").where("manga.mal_id", "==", manga_id).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setLastChapter(doc.data().current_chapter);
        });
      });
    }
  }, []);

  const Chapter = ({chapter}: {chapter: { title: string; number: number }}) => {
    const navigation = useNavigation<props>();
    const handlePress = () => {
      handleCurrentChapter(manga_id, chapter.number)
      navigation.navigate("ReadChapter", { mal_id: manga_id, chapter_number: chapter.number});
    };

    return (
      <TouchableOpacity style={{...styles.chapter, backgroundColor: last_chapter! > chapter.number ? "lightgreen" : theme.colors.primary}}
      onPress={handlePress}>
        {chapter.title.length > 0 && <Text>{chapter.title}</Text>}
        <Text style={{fontWeight: "bold"}}>
          {chapter.number}</Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    capitulos.reverse();
  }, [reverse]);

  return (
    <>
        {capitulos.filter((chapter) => chapter.number.toString().includes(searchQuery.toLowerCase())).map((chapter) => (
            <Chapter chapter={chapter} key={chapter.number} />
        ))}
    </>
  );
};

export default ChaptersList;

const styles = StyleSheet.create({
    chapter: {
        width: "100%",
        height: 40,
        borderRadius: 100,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 30,
      }
});

const handleCurrentChapter = async (manga_id: number, chapter_number: number) => {
  let found = false;
  if (auth.currentUser){
    const continue_reading = await db.collection("users").doc(auth.currentUser.uid).collection("continue_reading").get();
    continue_reading.forEach(async (doc) => {
        if (doc.data().manga.mal_id === manga_id){
          found = true;
          db.collection("users").doc(auth.currentUser?.uid).collection("continue_reading").doc(doc.id).update({
            current_chapter: chapter_number + 1,
            last_read: new Date()
          })
        }
      });
    };

    if (!found){
      const manga = await fetch('https://manga-online-api.vercel.app/api/manga/' + manga_id).then(res => res.json());
      db.collection("users").doc(auth.currentUser?.uid).collection("continue_reading").add({
        manga: manga.data,
        current_chapter: chapter_number + 1,
        last_read: new Date()
      })
    }
}