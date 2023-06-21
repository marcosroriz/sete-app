/**
 * LoginScreen.js
 *
 * Esta tela controla o login do usuário no sistema.
 * Atualmente, usamos uma API REST para verificar as credenciais do mesmo.
 * As credenciais também são criptografadas e salvas para serem usadas sem que o usuário tenha que digitar novamente.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// IMPORTS ////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Imports básicos
import React, { useState, useEffect, useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fazLoginUsuario } from "../../redux/usuarioSlice";

// Location (para pedir permissão)
import * as Location from "expo-location";

// Secure Store (para as credenciais) e md5 para autenticação na API
import * as SecureStore from "expo-secure-store";
import md5 from "md5";

// HTTP
import axios from "axios";

// Widgets
import { Alert, Image, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ActivityIndicator, Button, MD2Colors, TextInput } from "react-native-paper";
import { withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

// Style
import styles from "./style";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// COMPONENTES ////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LoginScreen
const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const refInputSenha = useRef(null);

    const { usuario, estaAutenticado, estaConectado } = useSelector((state) => state.usuario);

    console.log("VARS", "DADO USUARIO", "AUTENTICADO", "CONECTADO");
    console.log("VALUE", usuario, estaAutenticado, estaConectado);
    const dispatch = useDispatch();

    /**
     * Rotina de início da tela
     * -> Preenche os dados de login e senha
     * -> Pede permissão para usar localização
     */
    useEffect(() => {
        const pegarDadosLogin = async () => {
            let rawCredentials = await SecureStore.getItemAsync("credentials");
            if (rawCredentials) {
                const credentials = JSON.parse(rawCredentials);
                setEmail(credentials.email);
                setSenha(credentials.senha);
            }
        };
        pegarDadosLogin();
        console.log("USE EFFECT")
        // const pedePermissaoLocalizacao = async () => {
        //     await Location.requestForegroundPermissionsAsync();
        // }
    }, []);

    /**
     * Rotina para realizar o login.
     * Observe que caso o login seja feito, a variável usuario é modificada.
     * Isso gera um gatilho que modifica a aplicação (App.js) que está monitorando essa variável.
     * Por sua vez, isso realiza a navegação para o dashboard.
     */
    const apertouBotaoLogin = () => {
        setLoading(true);
        axios
            .post("/authenticator/sete", {
                usuario: email,
                senha: md5(senha),
            })
            .then(async (resposta) => {
                dispatch(
                    fazLoginUsuario({
                        usuario: resposta.data,
                    })
                );
                await SecureStore.setItemAsync("credentials", JSON.stringify({ email, senha }));
            })
            .catch((err) => {
                let erroMsg = "Erro ao tenta realizar o login";
                if (err?.response?.data?.messages) {
                    erroMsg = err?.response?.data?.messages;
                }
                Alert.alert("Erro!", erroMsg, [
                    {
                        text: "OK",
                        onPress: () => {
                            setLoading(false);
                        },
                    },
                ]);
            });
    };

    if (loading) {
        return (
            <View style={styles.loginContainer}>
                <ActivityIndicator animating={true} color={MD2Colors.orange500} size={100} />
            </View>
        );
    } else {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerLoginContainer}>
                        <Image source={require("../../../assets/banner-topo.png")} style={styles.logo} />

                        <TextInput
                            style={styles.txtInput}
                            autoCorrect={false}
                            left={<TextInput.Icon name={() => <Icon name={"envelope"} size={20} />} />}
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            returnKeyType="next"
                            mode="outlined"
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            onSubmitEditing={() => {
                                refInputSenha.current.focus();
                            }}
                        />

                        <TextInput
                            ref={refInputSenha}
                            secureTextEntry
                            style={styles.txtInput}
                            autoCorrect={false}
                            left={<TextInput.Icon name={() => <Icon name={"lock"} size={20} />} />}
                            label="Senha"
                            placeholder="Digite sua senha"
                            returnKeyType="done"
                            mode="outlined"
                            value={senha}
                            onChangeText={(senha) => setSenha(senha)}
                            onSubmitEditing={apertouBotaoLogin}
                        />

                        <Button style={styles.btnSubmit} mode="contained" onPress={apertouBotaoLogin}>
                            Entrar
                        </Button>

                        <View style={styles.rodapeContainer}>
                            <Image source={require("../../../assets/banner-rodape.png")} style={styles.logoRodape} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
};

// export default connect(null, mapDispatchProps)(withTheme(LoginScreen));
export default withTheme(LoginScreen);
