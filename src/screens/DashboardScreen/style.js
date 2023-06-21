import { StyleSheet } from 'react-native';
import CommonStyle from "../../styles/CommonStyle";
import InputStyle from "../../styles/InputStyle";

const estilosBasicos = StyleSheet.flatten(StyleSheet.compose(CommonStyle, InputStyle))

const SpecificStyle = StyleSheet.create({
    dashBoardListItemContainer: {
        padding: 15,
    },
    container: {
        flex: 1,
        // justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFF2F7',
        fontSize: 30,
        paddingBottom: 30,
    },
    scrollContainer: {
        flex: 1,
        width: "100%",
    },
});

const styles = StyleSheet.flatten(StyleSheet.compose(estilosBasicos, SpecificStyle));
export default styles;
