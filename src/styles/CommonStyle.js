import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    // Estilos para loading
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EFF2F7",
    },
    loadingTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    loadingIndicator: {
        margin: 20,
    },
    headerBar: {
        backgroundColor: "#FF8D00",
        height: 50,
    },
});
