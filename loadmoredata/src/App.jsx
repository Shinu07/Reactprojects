import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${count * 20}`
        );
        const result = await response.json();

        if (result && result.products && result.products.length) {
          setProducts((prevProducts) => [...prevProducts, ...result.products]);
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [count]);

  const loadMore = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {products && products.length ? (
          products.map((item) => (
            <div className="products" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))
        ) : null}
      </div>
      <div className="button-container">
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more products"}
        </button>
      </div>
    </>
  );
}

export default App;