import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductsResponse = {
  products: Product[];
};

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setError("Please enter at least 2 characters");
      setResults([]);
      return;
    }

    setError("");
    fetch(`https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fdummyjson.com%2Fproducts%2Fsearch%3Fq%3D%24&data=05%7C02%7Cst10089304%40myemeris.edu.za%7C2397b8d9e2b04041e9c608de7518a923%7Ce10c8f44f469448fbc0dd781288ff01b%7C0%7C0%7C639076945987468376%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=qWgSSfdP2yXT9CGbRczdkZ3ujDFkH0q0DLM1oqLnTGk%3D&reserved=0{value}&limit=5`)
      .then((res) => res.json())
      .then((data: ProductsResponse) => setResults(data.products));
  };

  const handleSearch = () => {
    if (query.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }
    navigate(`/search?q=${query}`);
    setResults([]);
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={handleSearch}
        disabled={query.trim().length < 2}
        style={{ padding: "8px", marginLeft: "8px" }}
      >
        Search
      </button>
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      {results.length > 0 && (
        <ul style={{
          position: "absolute", background: "white", border: "1px solid #ccc",
          listStyle: "none", padding: "0", margin: "0", width: "250px", zIndex: 10
        }}>
          {results.map((product) => (
            <li key={product.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
              <Link to={`/products/${product.id}`} onClick={() => setResults([])}>
                {product.title} — ${product.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSearch;