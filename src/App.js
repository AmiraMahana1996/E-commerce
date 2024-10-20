import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/joy/Button";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import HomeCom from "./pages/home/Home";
import { cartReducer } from "./reducers/cartReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Language from "./langauge/Language";
import TopMenu from "./components/header/TopMenu";
import { Cart } from "./components/cart/Cart";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
function App() {
  return (
    <Provider store={store}>
      <TopMenu />
    <Router>
      <Routes>
        {/* Your routes will go here */}
        <Route path="/" element={<HomeCom />} />
        <Route path="/language" element={<Language />} />
        <Route path="/cart" element={<Cart />} />
       

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
