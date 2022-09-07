import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/user";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { TagsProvider } from "./context/tags";
import { CollectionsProvider } from "./context/collections";
import {FieldsProvider} from "./context/field"

const domain = process.env.VITE_AUTH_DOMAIN;
const clientId = process.env.VITE_AUTH_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <UserProvider>
          <CollectionsProvider>
            <TagsProvider>
              <FieldsProvider>
              <App />

              </FieldsProvider>
            </TagsProvider>
          </CollectionsProvider>
        </UserProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
