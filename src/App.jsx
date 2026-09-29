import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { UNSAFE_createMemoryHistory } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
