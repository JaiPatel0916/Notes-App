import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function NoteInput({ note, setNote, addNote, editingId, theme    }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
                placeholder="Write a note..."
                placeholderTextColor={theme.placeholder}
                value={note}
                onChangeText={setNote}
            />


            <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.button }]} onPress={addNote}>
                <Text style={styles.addButtonText}>
                    {editingId ? "Update" : "Add"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },

    input: {
        flex: 1,
        backgroundColor: "#1e293b",
        padding: 12,
        borderRadius: 10,
        color: "#fff",
    },

    addButton: {
        marginLeft: 10,
        backgroundColor: "#3b82f6",
        paddingHorizontal: 20,
        justifyContent: "center",
        borderRadius: 10,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
