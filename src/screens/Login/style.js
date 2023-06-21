import { StyleSheet, Dimensions } from "react-native";
import CommonStyle from "../../styles/CommonStyle";
import InputStyle from "../../styles/InputStyle";

const estilosBasicos = StyleSheet.flatten(StyleSheet.compose(CommonStyle, InputStyle))

const { width, height } = Dimensions.get("window");

const SpecificStyle = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EFF2F7",
        padding: 10,
        fontSize: 30,
    },
    innerLoginContainer: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    logo: {
        marginTop: height * 0.1,
        marginBottom: 50,
        width: width,
        height: 65,
        resizeMode: "contain",
    },
    rodapeContainer: {
        flex: 1,
        justifyContent: "flex-end",
        overflow: "hidden",
    },
    logoRodape: {
        width: width / 1.1,
        height: 65,
        marginBottom: 5,
        resizeMode: "contain",
    },
});

const styles = StyleSheet.flatten(StyleSheet.compose(estilosBasicos, SpecificStyle));
export default styles;
