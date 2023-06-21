/**
 * AlunosGeoreferenciarScreen.js
 *
 * Esta tela possibilita que o usuário geoferencie a posição do aluno.
 * Para tal, é necessário que a localização (GPS) do dispositivo esteja habilitada.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// IMPORTS ////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Imports básicos
import React, { useState, useEffect, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { dbGET } from "../../redux/apiSlice";

// Widgets básicos
import { Alert, Image, Platform, View } from "react-native";
import {
    ActivityIndicator,
    Appbar,
    Button,
    Card,
    MD2Colors,
    Dialog,
    Divider,
    FAB,
    Paragraph,
    Portal,
    Provider as PaperProvider,
    Text,
} from "react-native-paper";
import { withTheme } from "react-native-paper";

// Style
import styles from "./style";

// Location
import * as Location from "expo-location";

// Mapa
const iconeAluno = require("../../../assets/aluno-marker.png");
const iconeEscola = require("../../../assets/escola-marker.png");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CONFIGURAÇÕES E VARIÁVEIS //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Variável lógica que indica se estamos no IOS
const isIOS = Platform.OS === "ios";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// COMPONENTES ////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VisaoGeralScreen = (props) => {
    return (
        <PaperProvider>
            {/* <Appbar.Header style={styles.headerBar}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                <Appbar.Content title="SETE" subtitle={"Georeferenciar Aluno"} />
            </Appbar.Header> */}
            <View>
                <View style={styles.container}>
                </View>
            </View>
        </PaperProvider>
    );
};

export default withTheme(VisaoGeralScreen);
