import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function NoteInput({
    note,
    setNote,
    addNote,
    editingId,
    theme,
    searchQuery,
    setSearchQuery,
}) {
    return (
        <View>

            {/* 🔍 SEARCH SECTION */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={[
                        styles.searchInput,
                        {
                            backgroundColor: theme.card,
                            color: theme.text,
                            borderColor: theme.text + "20",
                        },
                    ]}
                    placeholder="Search notes..."
                    placeholderTextColor={theme.placeholder}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setSearchQuery("")}
                    >
                        <Text style={{ fontSize: 16 }}>❌</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* ✏️ ADD / UPDATE SECTION */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: theme.input,
                            color: theme.text,
                        },
                    ]}
                    placeholder="Write a note..."
                    placeholderTextColor={theme.placeholder}
                    value={note}
                    onChangeText={setNote}
                />

                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: theme.button }]}
                    onPress={addNote}
                >
                    <Text style={styles.addButtonText}>
                        {editingId ? "Update" : "Add"}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        position: "relative",
        marginBottom: 15,
    },

    searchInput: {
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        fontSize: 16,
    },

    clearButton: {
        position: "absolute",
        right: 12,
        top: 14,
    },

    inputContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },

    input: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
    },

    addButton: {
        marginLeft: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        borderRadius: 12,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
