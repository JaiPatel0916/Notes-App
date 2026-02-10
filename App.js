import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteInput from "./components/NoteInput";
import NoteItem from "./components/NoteItem";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // 🎨 Theme Object
  const theme = {
    background: isDark ? "#0f172a" : "#f1f5f9",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#0f172a",
    input: isDark ? "#1e293b" : "#ffffff",
    placeholder: isDark ? "#94a3b8" : "#64748b",
    button: "#3b82f6",
  };

  // 🔹 Load Notes On App Start
  useEffect(() => {
    loadNotes();
  }, []);

  // 🔹 Save Notes Whenever They Change
  useEffect(() => {
    saveNotes();
  }, [notes]);

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem("NOTES", JSON.stringify(notes));
    } catch (error) {
      console.log("Error saving notes:", error);
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("NOTES");
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.log("Error loading notes:", error);
    }
  };

  const addOrUpdateNote = () => {
    if (note.trim() === "") return;

    if (editingId) {
      // UPDATE
      const updatedNotes = notes.map((item) =>
        item.id === editingId ? { ...item, text: note } : item
      );
      setNotes(updatedNotes);
      setEditingId(null);
    } else {
      // ADD
      setNotes([...notes, { id: Date.now().toString(), text: note }]);
    }

    setNote("");
    Keyboard.dismiss();
  };

  const startEditing = (item) => {
    setNote(item.text);
    setEditingId(item.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* 🔥 Header Section */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          📝 Jai's Notes
        </Text>

        <TouchableOpacity onPress={() => setIsDark(!isDark)}>
          <Text style={{ fontSize: 20 }}>
            {isDark ? "☀️" : "🌙"}
          </Text>
        </TouchableOpacity>
      </View>

      <NoteInput
        note={note}
        setNote={setNote}
        addNote={addOrUpdateNote}
        editingId={editingId}
        theme={theme}
      />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            item={item}
            deleteNote={deleteNote}
            startEditing={startEditing}
            theme={theme}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
