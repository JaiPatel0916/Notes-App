import React, { useState } from "react";
import { StyleSheet, Text, FlatList, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NoteInput from "./components/NoteInput";
import NoteItem from "./components/NoteItem";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (note.trim() === "") return;

    setNotes([...notes, { id: Date.now().toString(), text: note }]);
    setNote("");
    Keyboard.dismiss();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 Jai's Notes</Text>

      <NoteInput
        note={note}
        setNote={setNote}
        addNote={addNote}
      />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem item={item} deleteNote={deleteNote} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  
  },
});
