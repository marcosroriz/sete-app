/**
 * App.js
 *
 * É o ponto principal da aplicação móvel.
 * Aqui, realiza-se as configurações iniciais da base de dados e a estrutura de naveção com dois ramos.
 * É feito uma verificação se o usuário está conectado:
 * --> Caso positivo: navega o mesmo para a tela de Dashboard.
 * --> Caso negativo: redireciona o mesmo para a tela de login.
 *
 * Por fim, encapsulamos a App em uma base de redux para podermos compartilhar o estado ao longo do App.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// IMPORTS ////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Imports básicos
import React, { createContext, useState, useEffect, useContext } from "react";
import Constants from "expo-constants";

// Redux
import { Provider as StoreProvider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/Store";
import { useSelector, useDispatch } from "react-redux";

// Navegação (stack)
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// Axios (configura cliente HTTP)
import axios from "axios";

// Tema
import { DefaultTheme, MD2Colors, Provider as PaperProvider } from "react-native-paper";

// Telas
import AlunosGeoreferenciarScreen from "./src/screens/AlunosGeoreferenciarScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ListarAlunosScreen from "./src/screens/ListarAlunosScreen";
import Login from "./src/screens/Login";
import VisaoGeralScreen from "./src/screens/VisaoGeralScreen";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// CONFIGS ////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coloca a URL padrão do sistema SETE
axios.defaults.baseURL = Constants.expoConfig.extra.SETE_REST_API;

// Tema do app
const tema = {
    ...DefaultTheme,
    roundness: 0,
    // version: 2,
    colors: {
        ...DefaultTheme.colors,
        // primary: "#068cc9",
        primary: MD2Colors.orange600,
    },
};

// Componente/Hook App
const App = () => {
    const { estaAutenticado } = useSelector((state) => state.usuario);
    return (
        <PaperProvider theme={tema}>
            <NavigationContainer>
                {estaAutenticado ? (
                    <Stack.Navigator
                        initialRouteName="DashboardScreen"
                        screenOptions={{
                            headerMode: "screen",
                            headerTintColor: "black",
                            headerStyle: { backgroundColor: "#FF8D00" },
                            headerTitleStyle: { fontWeight: "bold" },
                        }}
                    >
                        <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ title: "SETE" }} />
                        <Stack.Screen name="ListarAlunosScreen" component={ListarAlunosScreen} options={{ title: "Lista de Alunos" }} />
                        <Stack.Screen
                            name="AlunosGeoreferenciarScreen"
                            component={AlunosGeoreferenciarScreen}
                            options={{
                                // headerShown: false,
                                title: "Georeferenciar Aluno",
                            }}
                        />
                        <Stack.Screen 
                            name="VisaoGeralScreen"
                            component={VisaoGeralScreen}
                            options = {{
                                title: "Visão Geral"
                            }} 
                        />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animationTypeForReplace: "pop" }} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </PaperProvider>
    );
};

// Encapsulamento da App com a persistência (store)
const AppWithStore = () => {
    return (
        <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </StoreProvider>
    );
};

export default AppWithStore;
