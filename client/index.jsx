import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import {hydrateRoot} from "react-dom/client";

hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
