import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import SearchResults from "./SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
