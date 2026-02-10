import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function NoteItem({ item, deleteNote, startEditing, theme , searchQuery}) {

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
    const highlightText = (text, query) => {
        if (!query) return <Text style={[styles.noteText, { color: theme.text }]}>{text}</Text>;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
       
        return (
            <Text style={[styles.noteText, { color: theme.text }]}>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <Text key={index} style={{ backgroundColor: "yellow", color: "#000" }}>
                            {part}
                        </Text>
                    ) : (
                        part
                    )
                )}
            </Text>
        );
    };
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <View style={[styles.noteCard, { backgroundColor: theme.card }]}>

            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => startEditing(item)}
            >
                <View>
                    {highlightText(item.text, searchQuery)}

                    <Text
                        style={{
                            fontSize: 12,
                            color: theme.placeholder,
                            marginTop: 5,
                        }}
                    >
                        {formatDate(item.createdAt)}
                    </Text>
                </View>
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
