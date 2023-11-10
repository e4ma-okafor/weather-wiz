import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { SearchedLocation } from "./components/SearchedLocation";
import SavedCity from "./pages/SavedCity";

function App () {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchedLocation />} />
      <Route path="/saved" element={<SavedCity />} />
    </Routes>
  )
}

export default App;