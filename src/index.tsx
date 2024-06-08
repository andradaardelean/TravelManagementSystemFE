import React from "react";
import {Auth0Provider} from '@auth0/auth0-react';
import ReactDOM from "react-dom/client";
import "./index.css";
import BaseRoutes from "./Router";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {QueryClient, QueryClientProvider} from "react-query";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

const redirect_uri = 'http://localhost:3000/overview';


root.render(
    <Auth0Provider
        domain={"travel-management-system.eu.auth0.com"}
        clientId={"FhWqgxuQ0JM5W6droExepdV2nhWgEfoS"}
        authorizationParams={{
            redirect_uri,
            audience: "https://travel-management-system.eu.auth0.com/api/v2/",
            connection: "Username-Password-Authentication",
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage" // <-- add this config
    >
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <BaseRoutes/>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </Auth0Provider>,
);
