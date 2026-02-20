import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
};

function ProductList() {
  const { data, isLoading, hasError, error, retry } =
    useFetch<ProductsResponse>("https://dummyjson.com/products?limit=10");

  const [products, setProducts] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [titleError, setTitleError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSuccessMsg("Product deleted!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleUpdate = (id: number) => {
    const newName = prompt("Enter new title:");
    if (!newName) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: newName } : p))
    );
    setSuccessMsg("Product updated!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleAdd = () => {
    let valid = true;
    if (newTitle.trim().length < 2) {
      setTitleError("Title must be at least 2 characters");
      valid = false;
    } else setTitleError("");

    if (!newPrice || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
      setPriceError("Enter a valid price");
      valid = false;
    } else setPriceError("");

    if (!valid) return;

    const newProduct: Product = {
      id: Date.now(),
      title: newTitle,
      price: Number(newPrice),
      thumbnail: "https://via.placeholder.com/80",
    };
    setProducts((prev) => [newProduct, ...prev]);
    setNewTitle("");
    setNewPrice("");
    setSuccessMsg("Product added!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (hasError)
    return (
      <div>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );

  return (
    <div>
      <h1>Product List</h1>
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <h3>Add Product</h3>
        <input
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        {titleError && (
          <p style={{ color: "red", fontSize: "12px" }}>{titleError}</p>
        )}
        <input
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          style={{ marginLeft: "8px" }}
        />
        {priceError && (
          <p style={{ color: "red", fontSize: "12px" }}>{priceError}</p>
        )}
        <button
          onClick={handleAdd}
          disabled={newTitle.trim().length < 2 || !newPrice}
          style={{ marginLeft: "8px" }}
        >
          Add
        </button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "1rem" }}>
            <img src={product.thumbnail} alt={product.title} width={80} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleUpdate(product.id)}>Update</button>
            <button
              onClick={() => handleDelete(product.id)}
              style={{ marginLeft: "8px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;