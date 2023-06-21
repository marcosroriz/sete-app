import { StyleSheet } from "react-native";

export default StyleSheet.create({
    inputContainer: {
        width: "100%",
        height: "100%",
        marginBottom: 100,
        alignItems: "center",
    },
    inputInsideContainer: {
        width: "80%",
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: "white",
        borderColor: "#bbb",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 5,
    },
    btnSubmit: {
        marginTop: 40,
        // width: "80%",
        minWidth: "80%",
        alignContent: "space-between",
        padding: 10,
        fontSize: 30,
    },
    txtInput: {
        marginTop: 20,
        width: "80%",
        fontSize: 16,
        backgroundColor: "white",
    },
    rawTxtInput: {
        width: "80%",
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    labelPicker: {
        marginTop: 20,
        fontWeight: "bold",
    },
    pickerContainer: {
        width: "100%",
        height: 40,
        marginTop: 20,
        marginBottom: 20,
    },

    // Floating Buttons
    fabEstilo: {
        backgroundColor: "gray",
        position: "absolute",
        margin: 16,
        left: 0,
        bottom: 160,
        width: 135,
    },

    fabCancel: {
        backgroundColor: "red",
        position: "absolute",
        margin: 16,
        left: 0,
        bottom: 80,
    },
    fabSave: {
        backgroundColor: "#2D882D",
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 80,
    },
});