import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// Import Middleware
import thunk from "redux-thunk";
import Routes from "./routes";

import reducers from "./reducers";
import "typeface-roboto";
import "./scss/_styles.scss";

// Import FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

// Import JS time ago
import JavascriptTimeAgo from "javascript-time-ago";

// The desired locales.
import en from "javascript-time-ago/locale/en";

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);
// FontAwesome add icon to library
library.add(faBars, faCaretLeft);

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
