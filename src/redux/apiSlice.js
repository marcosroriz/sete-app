/**
 * api.js
 * Este arquivo inclui as ações que executam ações CRUD na base de dados.
 */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Constants from "expo-constants";

// Config
axios.interceptors.request.use((request) => {
    // debugger
    if (request.method === "get") {
        console.log("----------------");
        console.log(request);
        console.log(request.url)
        console.log("----------------");
    }
    return request;
});

// Estado da API
const initialState = {
    // Flags para indicar se operação iniciou, terminou, terminouViaInternet, terminouViaCache, teve Erro
    iniciouOperacao: false,
    terminouOperacao: false,
    terminouOperacaoNaInternet: false,
    terminouOperacaoNoCache: false,
    terminouOperacaoComErro: false,

    // dados da operação
    dadoRetorno: {},
    dadoErro: {},

    // banco de dados com as operações
    baseDados: {},

    // cache das operações não feitas
    filaOperacoesParaEnviar: [],
};

// set up axios - simple json-server prototype config here
const restAPI = axios.create({
    baseURL: Constants.expoConfig.extra.SETE_REST_API,
    headers: {
        Accept: "application/json",
    },
});

// restAPI.interceptors.request.use((request) => {
//     // debugger
//     if (request.method === "get") {
//         console.log(request.url);

//         console.log("QUAL KEY EXISTE???");
//         console.log(Object.keys(initialState["cache"]));

//         if (initialState["cache"][request.url]) {
//             // CACHE EXISTE
//             console.log("CACHE EXISTE");
//             request.adapter = () => {
//                 return Promise.resolve({
//                     data: initialState["cache"][request.url],
//                     status: request.status,
//                     statusText: request.statusText,
//                     headers: request.headers,
//                     config: request,
//                     request: request,
//                 });
//             };
//         } else {
//             console.log("NÃO EXISTE CACHE EXISTE");
//         }
//     }
//     return request;
// });

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        TESTE: (state, action) => {
            console.log("DENTRO DO TESTE");
            console.log(state);
            console.log(action);
        },
        iniciaOperacao: (state, action) => {
            state.iniciouOperacao = true;
            state.terminouOperacao = false;
            state.terminouOperacaoNaInternet = false;
            state.terminouOperacaoNoCache = false;
            state.terminouOperacaoComErro = false;

            state.dadoRetorno = {};
            state.erro = {};
        },
        terminaOperacaoInternet: (state, action) => {
            state.iniciouOperacao = false;
            state.terminouOperacao = true;
            state.terminouOperacaoNaInternet = true;
            state.terminouOperacaoNoCache = false;
            state.terminouOperacaoComErro = false;

            state.dadoRetorno = action.payload.data;
            state.baseDados[action.payload.path] = action.payload.data;
            state.erro = {};
        },
    },
});

export function dbGETRaiz(nomeColecao, path = "") {
    let caminho = nomeColecao + path;
    if (DEBUG) {
        console.debug("GET RAIZ REQUEST ", caminho);
    }

    return restAPI.get(caminho).then((res) => {
        if (DEBUG) {
            console.debug("GET RAIZ REPLY", caminho, res);
        }
        return Promise.resolve(res);
    });
}

export function dbGET(nomeColecao, path = "") {
    return (dispatch, getState) => {
        dispatch(iniciaOperacao());

        let { usuario, estaConectado } = getState()?.usuario;
        let { codigo_cidade } = usuario.data;
        let caminho = nomeColecao + "/" + codigo_cidade + path;

        // Vamos verificar se o dado existe na CACHE
        let { baseDados } = getState()?.api;

        if (baseDados[caminho]) {
            console.log("TEM NA BASE DE DADOS");
            console.log("TEM NA BASE", caminho);
            dispatch(
                terminaOperacaoInternet({
                    path: caminho,
                    data: baseDados[caminho],
                })
            );
        } else {
            console.log("TENTANDO PEGAR", caminho);
            axios
                .get(caminho)
                .then((resposta) => {
                    console.log(resposta)
                    dispatch(
                        terminaOperacaoInternet({
                            path: caminho,
                            data: resposta,
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
}
export function fetchItems() {
    return async (dispatch, getState) => {
        if (getState()?.usuario?.usuario) {
            axios.defaults.headers.common["Authorization"] = getState()?.usuario?.usuario?.access_token.access_token;
            console.log("REST API HEADERS");
            console.log(restAPI.headers);
            console.log("auth", getState()?.usuario?.usuario?.access_token.access_token);

            console.log("REST API HEADERS");
            try {
                let resposta = await restAPI.get("https://sete.transportesufg.eng.br/alunos/5201405");
                console.log(resposta);
                dispatch(writeToCache(resposta));
                console.log("==== DEU CERTO");
            } catch (err) {
                console.log("==== DEU ERRO");
                console.log(err?.response);
                console.log("==== DEU ERRO");
            }
        }
        console.log("FETCH");
        console.log("FETCH");

        console.log("FETCH");
        console.log("FETCH");
    };
}

export const { TESTE, iniciaOperacao, terminaOperacaoInternet } = apiSlice.actions;
export default apiSlice.reducer;
