import * as React from "react";
import * as ReactDom from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App";
import "./index.css";

ReactDom.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
