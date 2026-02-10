import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Keyboard,
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteInput from "./components/NoteInput";
import NoteItem from "./components/NoteItem";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);



  // 🎨 Theme Object
  const theme = {
    background: isDark ? "#0f172a" : "#f1f5f9",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#ffffff" : "#0f172a",
    input: isDark ? "#1e293b" : "#ffffff",
    placeholder: isDark ? "#94a3b8" : "#475569",
    button: "#3b82f6",
  };

  // 🔹 Load Notes & Theme On App Start
  useEffect(() => {
    loadNotes();
    loadTheme();
  }, []);

  // 🔹 Save Notes Whenever They Change
  useEffect(() => {
    saveNotes();
  }, [notes]);

  // 🔹 Save Theme Whenever It Changes
  useEffect(() => {
    saveTheme();
  }, [isDark]);

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

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem("THEME", JSON.stringify(isDark));
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("THEME");
      if (storedTheme !== null) {
        setIsDark(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  const toggleTheme = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDark(!isDark);
  };

  const addOrUpdateNote = () => {
    if (note.trim() === "") return;

    if (editingId) {
      const updatedNotes = notes.map((item) =>
        item.id === editingId ? { ...item, text: note } : item
      );
      setNotes(updatedNotes);
      setEditingId(null);
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now().toString(),
          text: note,
          createdAt: Date.now(),
        },
      ]);

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

  const filteredNotes = notes.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) =>
    sortNewestFirst
      ? b.createdAt - a.createdAt
      : a.createdAt - b.createdAt
  );


  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* 🔥 Header */}
      <View style={styles.header}>

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>
          📝 Jai's Notes
        </Text>

        {/* Right Side Controls */}
        <View style={styles.headerControls}>

          {/* Sort Toggle */}
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setSortNewestFirst(!sortNewestFirst);
            }}
            style={[
              styles.sortButton,
              { backgroundColor: theme.card }
            ]}
          >
            <Text style={{ color: theme.text, fontWeight: "600" }}>
              {sortNewestFirst ? "Newest ↓" : "Oldest ↑"}
              </Text>
          </TouchableOpacity>

          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.themeButton,
              { backgroundColor: theme.card }
            ]}
          >
            <Text style={{ fontSize: 16 }}>
              {isDark ? "☀️" : "🌙"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>



     <NoteInput
  note={note}
  setNote={setNote}
  addNote={addOrUpdateNote}
  editingId={editingId}
  theme={theme}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>


      <FlatList
        data={filteredNotes}

        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            item={item}
            deleteNote={deleteNote}
            startEditing={startEditing}
            theme={theme}
            searchQuery={searchQuery}
          />


          
        )}
      />
      {filteredNotes.length === 0 && (
        <Text style={{ color: theme.text, textAlign: "center", marginTop: 20 }}>
          No matching notes found
        </Text>
      )}

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerControls: {
    flexDirection: "row",
    alignItems: "center",
  },

  sortButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },

  themeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

});
