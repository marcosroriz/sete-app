import { StyleSheet } from "react-native";
import CommonStyle from "../../styles/CommonStyle";
import InputStyle from "../../styles/InputStyle";
import MapStyle from "../../styles/MapStyle";

const estilosBasicos = StyleSheet.flatten(StyleSheet.compose(CommonStyle, InputStyle))
const maisEstilosBasicos = StyleSheet.flatten(StyleSheet.compose(estilosBasicos, MapStyle));

const SpecificStyle = StyleSheet.create({
    clusterWrapper: {
        padding: 10,
        backgroundColor: "#fee6ce",
        borderRadius: 50,
        borderColor: "orange",
        borderWidth: 2,
        borderStyle: "solid",
        alignItems: "center",
        width: 40,
        height: 40,
    },
    dialogContainer: {
        paddingVertical: 20,
        paddingHorizontal: 0,
    },
    moreInfoWrapper: {
        position: "absolute",
        bottom: -320,
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
    pickerWrapper: {
        width: "80%",
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "white",
        borderColor: "#bbb",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 5,
    },
});

const styles = StyleSheet.flatten(StyleSheet.compose(maisEstilosBasicos, SpecificStyle));

export default styles;
