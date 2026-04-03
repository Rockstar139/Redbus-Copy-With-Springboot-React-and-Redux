import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import {redbusStore,persistor} from "./store/index.js";
import "./css/Global.css"
import Home from "./routes/Home.jsx";
import Help from "./routes/Help.jsx";
import Offers from "./routes/Offers.jsx";
import Search from "./routes/Search.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Account from "./routes/Account.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import CommonNotFound from "./components/CommonNotFound.jsx";
import BookTickets from "./components/BookTickets.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path:"/", element:<Home/>},
      {path:"/help", element:<Help/>},
      {path:"/offers", element:<Offers/>},
      {path:"/train", element:<Home/>},
      {path:"/search", element:<Search/>},
      {path:"/account", element:<Account/>},
      {path:"/login", element:<Login/>},
      {path:"/register", element:<Register/>},
      {path:"*", element:<CommonNotFound/>},
      {path:"/book-tickets/:transportId", element:<BookTickets/>}
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={redbusStore}>
      <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
