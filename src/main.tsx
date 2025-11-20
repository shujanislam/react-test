import "./index.css";   // <-- REQUIRED

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { KeyboardShortcut } from '../utils/keyboardShortcut.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KeyboardShortcut />
      <App />
  </React.StrictMode>
);
