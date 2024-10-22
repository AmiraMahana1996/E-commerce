import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/joy/Button";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import HomeCom from "./pages/home/Home";
import { cartReducer } from "./reducers/cartReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Language from "./langauge/Language";

import { Cart } from "./components/cart/Cart";
import CMSHome from "./cms/pages/home/Home";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
function App() {
  return (
    <Provider store={store}>
 
    <Router>
      <Routes>
    
        {/* Your routes will go here */}
        <Route path="/" element={<HomeCom />} />
        <Route path="/language" element={<Language />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cms/home" element={<CMSHome />} />
       
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
