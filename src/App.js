import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./assests/homepage/home.js"
import Explore from "./assests/explore/explore.js"
import Form from "./assests/form/form.js"
import Details from "./assests/details/details.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/form" element={<Form />} />
        <Route path="/explore/:Id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
