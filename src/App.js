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
import LanguageDetails from "./cms/components/languageDetails/LanguageDetails";
import Land from "./cms/components/land/Land";
import LessonDetails from "./cms/components/LessonDetails/LessonDetails";
import AllLessons from "./cms/components/AllLessons/AllLessons";
import Finance from "./cms/components/finance/Finance";
import Marketing from "./cms/components/marketing/Marketing";

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

          <Route
            path="/cms/langdetails/:id"
            element={
              <CMSHome>
                <LanguageDetails />
              </CMSHome>
            }
          />

          <Route
            path="/cms/land"
            element={
              <CMSHome>
                <Land />
              </CMSHome>
            }
          />

          <Route
            path="/cms/lessonDetails/:languageid/:levelid/:lessonid"
            element={
              <CMSHome>
                <LessonDetails />
              </CMSHome>
            }
          />

          <Route
            path="/cms/alllessons/:languageid/:levelid/"
            element={
              <CMSHome>
                <AllLessons />
              </CMSHome>
            }
          />

          <Route
            path="/cms/finance"
            element={
              <CMSHome>
                <Finance />
              </CMSHome>
            }
          />
          <Route
            path="/cms/marketing"
            element={
              <CMSHome>
                <Marketing />
              </CMSHome>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
