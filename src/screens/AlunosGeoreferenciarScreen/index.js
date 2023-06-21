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
import MapView, { Marker, UrlTile, PROVIDER_GOOGLE } from "react-native-maps";
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

const AlunosGeoreferenciarScreen = (props) => {
    // Estado de Posição GPS
    const [regiao, setRegiao] = useState({});
    const [coordenadaGPS, setCoordenadaGPS] = useState({});
    const [posicaoAluno, setPosicaoAluno] = useState({});

    // Ref mapa
    const mapRef = useRef(null);

    // Estado Usuário
    const { usuario, estaAutenticado, estaConectado } = useSelector((state) => state.usuario);
    console.log("USUARIO", usuario);

    // Dispatcher para realizar requesição para buscar dados na API
    const dispatch = useDispatch();
    const { baseDados, iniciouOperacao, terminouOperacao, dadoRetorno, dadoErro } = useSelector((state) => state.api);

    // Posição da Cidade
    let posCidade = {
        latitude: Number(usuario.data.latitude),
        longitude: Number(usuario.data.longitude),
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
    };

    // Obtém posição do Usuário
    let dadoAluno = props.route.params.dadoAlvo;
    useEffect(() => {
        if (dadoAluno.loc_latitude != null && dadoAluno.loc_latitude != "" && dadoAluno.loc_longitude != null && dadoAluno.loc_longitude != "") {
            setPosicaoAluno({
                latitude: Number(dadoAluno.loc_latitude),
                longitude: Number(dadoAluno.loc_longitude),
            });
        }
    }, []);

    /**
     * Rotina para lidar com GPS desativado
     */
    const alertaGPSDesativado = (err = "É necessário habilitar o GPS para utilizar essa ferramenta") => {
        return Alert.alert("GPS Desativado", err, [
            {
                text: "Voltar",
                onPress: () => props.navigation.goBack(),
            },
        ]);
    };

    /**
     * Rotina para pedir o GPS do usuário, será chamada quando o mapa terminar de carregar
     */
    const pegaPosicaoGPS = () => {
        Location.requestForegroundPermissionsAsync()
            .then(({ granted }) => {
                // Caso ele não dê, voltamos pra tela anterior
                if (!granted) {
                    alertaGPSDesativado();
                }

                // Pegamos posição atual
                Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }).then((localizacao) => {
                    console.log("TOU PEGANDO POSIÇÃO")
                    let coordenadas = {
                        latitude: localizacao.coords.latitude,
                        longitude: localizacao.coords.longitude,
                    };

                    // Seta posicao inicial do GPS
                    setRegiao({
                        ...coordenadas,
                        ...{
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421,
                        },
                    });

                    // Seta coordenada
                    setCoordenadaGPS(coordenadas);

                    if (mapRef) {
                        console.log("TOU SETANDO NO MAPA?")
                        let pos = posicaoAluno ? [posicaoAluno] : [];
                        pos.push(coordenadas);
                        mapRef.current.fitToCoordinates(pos, {
                            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                            animated: true,
                        });
                        console.log("SETANDO NO MAPA FIM")
                    }
                });
            })
            .catch((err) => {
                alertaGPSDesativado(err);
            });
    };

    let renderMapa = (nomeAluno) => {
        return (
            <View style={styles.mapContainer}>
                <Card>
                    <Card.Title title={nomeAluno} titleVariant="titleMedium" />
                </Card>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    onMapReady={() => {
                        pegaPosicaoGPS();
                    }}
                    mapPadding={{ top: 0, right: 20, bottom: 250, left: 0 }}
                    // minZoomLevel={8} // default => 0
                    // maxZoomLevel={18} // default => 20
                    style={styles.mapElement}
                    initialRegion={posCidade}
                    mapType="hybrid"
                    onPress={(geoEvent) => {
                        setPosicaoAluno(geoEvent.nativeEvent.coordinate);
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled
                    showsCompass={true}
                    showsScale
                >
                    {/* 
                        // <UrlTile
                        /**
                         * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
                         * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
                         */
                        // urlTemplate={"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                        /**
                         * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
                         * MKTileOverlay. iOS only.
                         */
                        // maximumZ={19}
                        /**
                         * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
                         * to be used. Its default value is false.
                         */
                        // flipY={false}>
                        // </UrlTile> 
                    }
                    {posicaoAluno ? (
                        <Marker coordinate={posicaoAluno} draggable onDragEnd={(geoEvent) => setPosicaoAluno(geoEvent.nativeEvent.coordinate)}>
                            <Image source={iconeAluno} style={{ width: 64, height: 64 }} resizeMode="contain" />
                        </Marker>
                    ) : null}
                </MapView>
            </View>
        );
    };

    let renderBotoes = () => {
        return (
            <>
                <FAB
                    icon="map"
                    small
                    label="Mapa"
                    color="white"
                    style={styles.fabEstilo}
                    onPress={() => {
                        console.log("cancelar");
                    }}
                />
                <FAB
                    icon="cancel"
                    small
                    label="Cancelar"
                    color="white"
                    style={styles.fabCancel}
                    onPress={() => {
                        console.log("cancelar");
                    }}
                />

                <FAB
                    icon="content-save"
                    small
                    label="Salvar"
                    color="white"
                    style={styles.fabSave}
                    onPress={() => {
                        console.log("salvar");
                    }}
                />
            </>
        );
    };

    return (
        <PaperProvider>
            {/* <Appbar.Header style={styles.headerBar}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()} />
                <Appbar.Content title="SETE" subtitle={"Georeferenciar Aluno"} />
            </Appbar.Header> */}
            <View>
                <View style={styles.container}>
                    {renderMapa(dadoAluno.nome)}
                    {renderBotoes()}
                </View>
            </View>
        </PaperProvider>
    );
};

export default withTheme(AlunosGeoreferenciarScreen);
