import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function NoteInput({ note, setNote, addNote }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Write a note..."
                placeholderTextColor="#94a3b8"
                value={note}
                onChangeText={setNote}
            />

            <TouchableOpacity style={styles.addButton} onPress={addNote}>
                <Text style={styles.addButtonText}>Add</Text>
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
