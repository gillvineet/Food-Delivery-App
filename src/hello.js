import React, { Children, Suspense,lazy } from "react";
import ReactDOM  from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter,RouterProvider ,Outlet} from "react-router-dom";
import About from "./components/About";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import store, { persistor } from './utils/appStore';
import { PersistGate } from 'redux-persist/integration/react';
const initialOptions = {
  "client-id": "AdcOyDq24szLAb0OkAJnyc6GRy2YYAUR5BkGoZWMzCdiOa5RQ0BIE0SPZ6oFyhCePA-tdgC-4joEySGQ",
  currency: "USD",
  intent: "capture",
};

//lazy laoding 
const Grocery=lazy(()=>import("./components/Grocery"));
const AppLayout = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
        </PersistGate>
      </Provider>
    </PayPalScriptProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading wait</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurants/:resID", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
    ],
    errorElement: <Error />,
  },
]);
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)