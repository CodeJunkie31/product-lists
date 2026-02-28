import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import SearchResults from "./SearchResults";
import ProductSearch from "./ProductSearch";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "1rem" }}>
        <ProductSearch />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;