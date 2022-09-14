import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./utilities/authProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
