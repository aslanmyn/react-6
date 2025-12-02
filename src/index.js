import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/globals.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthProvider } from "./auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>
);


if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(reg => {
                console.log("[SW] registered", reg.scope);
            })
            .catch(err => {
                console.error("[SW] registration failed", err);
            });
    });
}

