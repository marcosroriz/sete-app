/**
 * Estilo da tela de listagem de alunos.
 * Para tal, 
 */
import { StyleSheet } from "react-native";
import CommonStyle from "../../styles/CommonStyle";
import InputStyle from "../../styles/InputStyle";
import ListStyle from "../../styles/ListStyle";

const estilosBasicos = StyleSheet.flatten(StyleSheet.compose(CommonStyle, InputStyle))
const maisEstilosBasicos = StyleSheet.flatten(StyleSheet.compose(estilosBasicos, ListStyle));

const SpecificStyle = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#EFF2F7",
        fontSize: 30,
        // paddingBottom: 10,
    },
    scrollContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        fontSize: 30,
    },
    kbContainer: {
        width: "100%",
        height: "100%",
    },
    // Cabeçalho inferior
    subHeader: {
        backgroundColor: "white",
        height: 50,
    },
});
const styles = StyleSheet.flatten(StyleSheet.compose(maisEstilosBasicos, SpecificStyle));

export default styles;
