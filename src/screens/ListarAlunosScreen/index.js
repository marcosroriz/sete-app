/**
 * ListarAlunos.js
 *
 * Esta tela lista os alunos do sistema
 * Além disso, também possibilita que especifique a tela que deverá ser chamada quando o usuário clicar em uma entidade.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// IMPORTS ////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Imports básicos
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// API Redux
import { dbGET } from "../../redux/apiSlice";

// Widgets
import { View } from "react-native";
import { ActivityIndicator, Appbar, Badge, Card, MD2Colors, List, Text, Provider as PaperProvider, Searchbar } from "react-native-paper";
import { AlphabetList } from "react-native-section-alphabet-list";
import { withTheme } from "react-native-paper";

// Style
import styles from "./style";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// COMPONENTES ////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ListarAlunosScreen
const ListarAlunosScreen = (props) => {
    // Listas que serão mostradas
    // Lista original armazena todos os estudantes
    // Lista filtrada incluí apeans os alunos da busca
    const [listaOriginal, setListaOriginal] = useState([]);
    const [listaFiltrada, setListaFiltrada] = useState([]);

    // Variáveis de estado / API
    const { usuario, estaAutenticado, estaConectado } = useSelector((state) => state.usuario);
    const { baseDados, iniciouOperacao, terminouOperacao, dadoRetorno, dadoErro } = useSelector((state) => state.api);

    // Demais variáveis (subtitulo da tela, tela alvo, etc)
    const { subtitulo } = props.route.params;
    
    console.log("INICIO PARAMS");    
    console.log(props.route.params);
    console.log("FFIM PARAMS");

    // Dispatcher para realizar requesição para buscar dados na API
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: subtitulo,
        });
    });

    /**
     * Rotina de início da tela
     * -> Realiza a requisição para busca dos dados de alunos do município
     */
    useEffect(() => {
        dispatch(dbGET("alunos"));
        console.log("DISPAROU GET");
    }, []);

    /**
     * Salva a lista de alunos ao término da operação
     */
    useEffect(() => {
        if (terminouOperacao) {
            let lista = dadoRetorno.data.data.map((elem) => {
                return { ...elem, key: elem.id_aluno, value: elem.nome };
            });
            setListaOriginal(lista);
            setListaFiltrada(lista);
        }
    }, [terminouOperacao]);

    /**
     * Mostra um elemento da lista
     */
    renderItemDaLista = (item) => {
        return (
            <View style={styles.listItemContainer}>
                <List.Item
                    titleStyle={styles.listItemLabel}
                    title={item.nome}
                    onPress={() => {
                        console.log(item);
                        props.navigation.navigate("AlunosGeoreferenciarScreen", {
                            subtitulo: "Alunos",
                            dadoAlvo: item,
                        });
                    }}
                />
            </View>
        );
    };

    realizarBusca = (str) => {
        const normSTR = str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        let novaListaFiltrada = listaOriginal.filter((elemento) => elemento.value.toLowerCase().includes(normSTR));
        setListaFiltrada(novaListaFiltrada);
    };

    renderCabecalhoSecao = (secao) => {
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderLabel}>{secao.title}</Text>
            </View>
        );
    };

    renderCabecalho = (desc, numDesc) => {
        return (
            <Card>
                <Card.Title
                    title={desc}
                    titleVariant="titleMedium"
                    style={{
                        backgroundColor: "#BBBBBB",
                    }}
                    right={() => (
                        <Badge size={30} style={styles.numBadges}>
                            {numDesc}
                        </Badge>
                    )}
                />
            </Card>
        );
    };

    console.log("INICIOU OPERACAO", iniciouOperacao);
    console.log("TERMINOU OPERACAO", terminouOperacao);

    if (!terminouOperacao) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} color={MD2Colors.orange500} size={100} />
            </View>
        );
    } else {
        console.log("CACHE");
        // console.log(Object.keys(baseDados));
        // console.log(Object.keys(dadoRetorno.data.data));
        console.log(dadoRetorno.data.data["899"]);
        // console.log(baseDados["alunos/5201405"]["data"]["data"]);
        let tamLista = listaFiltrada.length;

        return (
            <PaperProvider>
                <Appbar.Header style={styles.headerBar}>
                    <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                    <Appbar.Content title="SETE" subtitle={subtitulo} />
                </Appbar.Header>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, backgroundColor: "#BBBBBB" }}>
                    <Searchbar elevation={4} placeholder="Buscar" onChangeText={(str) => realizarBusca(str)} />
                </View>

                {tamLista > 0 ? (
                    <View style={styles.screenContainer}>
                        <AlphabetList
                            data={listaFiltrada}
                            style={{ flex: 1 }}
                            indexLetterColor={"black"}
                            renderCustomItem={renderItemDaLista}
                            renderCustomSectionHeader={renderCabecalhoSecao}
                            renderCustomListHeader={renderCabecalho("Lista de Alunos", tamLista)}
                            getItemHeight={() => 60}
                            sectionHeaderHeight={45}
                            listHeaderHeight={80}
                            // removeClippedSubviews={true}
                        />
                    </View>
                ) : (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingTitle}>Nenhum resultado encontrado.</Text>
                    </View>
                )}
            </PaperProvider>
        );
    }
};

export default withTheme(ListarAlunosScreen);
