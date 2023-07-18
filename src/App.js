import './App.css'
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(0);
  const fetchproducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10 -10}`);
    const data = await res.json();
    // console.log(data)
    if (data && data.products) {
      setProducts(data.products);
      setTotalpage(data.total / 10)
    }
  };

  console.log(products);
  useEffect(() => {
    fetchproducts();
  }, [page]);

  const handleSelect = (selectedpage) => {
    if (selectedpage > 0 && selectedpage <= totalpage)
      setPage(selectedpage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "disablearrow"}
            onClick={() => handleSelect(page - 1)}
          >
            {" "}
            ⬅️
          </span>
          {[...Array(totalpage)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handleSelect(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalpage ? "" : "disablearrow"}
            onClick={() => handleSelect(page + 1)}
          >
            {" "}
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
