import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function NoteItem({ item, deleteNote }) {

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
        <View style={styles.noteCard}>
            <Text style={styles.noteText}>{item.text}</Text>

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
        flex: 1,
    },

    deleteText: {
        fontSize: 18,
        marginLeft: 10,
    },
});
