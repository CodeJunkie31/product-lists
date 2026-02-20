import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

type ProductsResponse = {
  products: Product[];
};

function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${q}`)
      .then((res) => res.json())
      .then((data: ProductsResponse) => setProducts(data.products));
  }, [q]);

  return (
    <div>
      <h2>Showing results for: {q}</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
