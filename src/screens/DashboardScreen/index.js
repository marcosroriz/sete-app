/**
 * DashboardScreen.js
 *
 * A tela principal da aplicação móvel.
 * Lista as telas existentes, além de informações básicas do município, como nome e estado.
 * Além disso, lista operações pendentes (realizadas offline) para que o usuário possa enviá-las quando tiver conexão.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// IMPORTS ////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Imports básicos
import React, { useState, useEffect, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fazLogoutUsuario } from "../../redux/usuarioSlice";
import { dbGET } from "../../redux/apiSlice";

// Widgets
import { Alert, Platform, ScrollView, View } from "react-native";
import {
    ActivityIndicator,
    Appbar,
    Button,
    Card,
    Colors,
    IconButton,
    FAB,
    List,
    Text,
    Dialog,
    Divider,
    Paragraph,
    Portal,
    Provider as PaperProvider,
} from "react-native-paper";
import { withTheme } from "react-native-paper";

// Style
import styles from "./style";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CONFIGURAÇÕES E VARIÁVEIS //////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Variável lógica que indica se estamos no IOS
const isIOS = Platform.OS === "ios";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// COMPONENTES ////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LoginScreen
const DashboardSdcreen = (props) => {
    const [iniciouEnvioPendencias, setIniciouEnvioPendencias] = useState(false);
    const { usuario, estaAutenticado, estaConectado } = useSelector((state) => state.usuario);
    const { baseDados } = useSelector((state) => state.api);

    console.log("CACHE");
    console.log(Object.keys(baseDados));
    const dispatch = useDispatch();

    return (
        <PaperProvider theme={props.theme}>
            <Appbar.Header style={styles.headerBar}>
                <Appbar.BackAction
                    onPress={() => {
                        dispatch(fazLogoutUsuario());
                    }}
                />
                <Appbar.Content title="SETE" />
            </Appbar.Header>
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <Card>
                        <Card.Title
                            title={"Olá " + usuario.data.cidade}
                            subtitle={usuario.data.estado}
                            titleVariant="titleMedium"
                            right={(props) => (
                                <IconButton
                                    {...props}
                                    icon="refresh"
                                    onPress={() => {
                                        dispatch(dbGET("alunos"));
                                    }}
                                />
                            )}
                        />
                    </Card>
                    <List.Section title="Funcionalidades" style={styles.dashBoardListItemContainer}>
                        {/* <List.Item
                            title="Visão Geral"
                            left={(props) => <List.Icon {...props} icon="clipboard-text" style={{ leftMargin: 10 }} />}
                            onPress={() => props.navigation.navigate("ListarAlunosScreen")}
                        /> */}
                        <List.Item
                            title="Georeferenciar Aluno"
                            left={() => <List.Icon icon="map-marker-plus" style={{ leftMargin: 10 }} />}
                            onPress={() =>
                                props.navigation.navigate("ListarAlunosScreen", {
                                    subtitulo: "Alunos",
                                    dadoAlvo: "alunos",
                                    descricaoTela: "Selecione um aluno",
                                    campoUsarComoID: "ID",
                                    campoUsarComoValor: "NOME",
                                    estaEditando: true,
                                    telaAlvo: "AlunosGeoreferenciarScreen",
                                })
                            }
                        />
                                                <List.Item
                            title="Georeferenciar Aluno"
                            left={() => <List.Icon icon="map-marker-plus" style={{ leftMargin: 10 }} />}
                            onPress={() =>
                                props.navigation.navigate("ListarAlunosScreen", {
                                    subtitulo: "Alunos",
                                    dadoAlvo: "alunos",
                                    descricaoTela: "Selecione um aluno",
                                    campoUsarComoID: "ID",
                                    campoUsarComoValor: "NOME",
                                    estaEditando: true,
                                    telaAlvo: "AlunosGeoreferenciarScreen",
                                })
                            }
                        />

                    </List.Section>
                </ScrollView>
            </View>
        </PaperProvider>
    );
};

// export default connect(null, mapDispatchProps)(withTheme(LoginScreen));
export default withTheme(DashboardSdcreen);
