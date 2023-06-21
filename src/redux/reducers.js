import { combineReducers } from 'redux';
import usuario from "./usuarioSlice";
import api from "./apiSlice";

export default combineReducers({
    usuario,
    api
})

