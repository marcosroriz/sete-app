/**
 * usuarioSlice.js
 * Este arquivo inclui as ações que manipulam os dados de usuários na base de dados.
 */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const usuarioSlice = createSlice({
    name: "usuario",
    initialState: {
        usuario: {},
        estaAutenticado: false,
        estaConectado: true,
    },
    reducers: {
        fazLoginUsuario: (state, action) => {
            state.usuario = action.payload.usuario;
            state.estaAutenticado = true;
            axios.defaults.headers.common["Authorization"] = action.payload.usuario.access_token.access_token;
        },
        fazLogoutUsuario: (state, action) => {
            // state.usuario = {};
            state.estaAutenticado = false;
            axios.defaults.headers.common["Authorization"] = "";
        },
    },
});

export const { fazLoginUsuario, fazLogoutUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
