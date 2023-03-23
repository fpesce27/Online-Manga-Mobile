import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Chapter } from '../constants/interfaces'
import { useTheme } from '@react-navigation/native';

const ChaptersPagination = ({pagination, setChapters}: { pagination: any[], setChapters: React.Dispatch<React.SetStateAction<Chapter[]>> }) => {

  const theme = useTheme();

    const ChapterPagination = ({ chapters }: { chapters: Chapter[] }) => {
        return (
          <TouchableOpacity
            style={{...styles.chaptersPagination, backgroundColor:theme.colors.primary}}
            onPress={() => setChapters(chapters)}
          >
            <Text>
              {chapters[chapters.length - 1].number + " - " + chapters[0].number}
            </Text>
          </TouchableOpacity>
        );
    };

  return (
    <FlatList
            data={pagination}
            renderItem={({ item }) => <ChapterPagination chapters={item} />}
            keyExtractor={(item) => item[0].number.toString()}
            contentContainerStyle={{gap:10}}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
  )
}

export default ChaptersPagination

const styles = StyleSheet.create({
    chaptersPagination: {
        width: 100,
        height: 40,
        borderRadius: 100,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
      }
})