import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function NoteItem({ item, deleteNote, startEditing, theme }) {

    const confirmDelete = () => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteNote(item.id) },
            ]
        );
    };

    return (
        <View style={[styles.noteCard, { backgroundColor: theme.card }]}>

            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => startEditing(item)}
            >
                <Text style={[styles.noteText, { color: theme.text }]}>{item.text}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmDelete}>
                <Text style={styles.deleteText}>🗑</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    noteCard: {
        backgroundColor: "#1e293b",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    noteText: {
        color: "#fff",
    },

    deleteText: {
        fontSize: 18,
        marginLeft: 10,
    },
});
