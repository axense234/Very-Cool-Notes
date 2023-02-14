// React
import React from "react";
// Root
import { createRoot } from "react-dom/client";
// Redux
import { Provider } from "react-redux";
import store from "./redux/api/store";
// Components
import Main from "./Main";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
);
