import "./App.css";

import React, { useEffect, useCallback, useState } from "react";

import useConfig from "./components/useConfig";
import { LocalShipping, Redeem } from "@mui/icons-material";
import { useDebounce } from "./hooks/debounce";

interface Product {
  id: number
  image: string
  title: string
  brandName: string
  price: string
  description: string
  isFreeShipping: boolean
  isFreeGift: boolean
}

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const [lastEvaluatedId, setLastEvaluatedId] = useState('');
  const [startId, setStartId] = useState('');

  const getProducts = useCallback(async (search: string, lastId: string) => {
    fetch(`http://localhost:3000/api?search=${search}&startKey=${lastId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors'
      })
      .then((response) => response.json())
      .then(({ products, limit, total, lastEvaluatedKey }) => {
        setNumberOfProducts((numberOfProducts) => numberOfProducts += limit);
        setProductTotal(total);
        setProducts((productsArr) => productsArr.concat(products));
        setLastEvaluatedId(lastEvaluatedKey.id);
      })
      .catch((error) => console.error(error));
  }, [setProducts, setNumberOfProducts, setProductTotal]);

  useEffect(() => {
    getProducts(debouncedSearchTerm, startId);
  }, [getProducts, debouncedSearchTerm]);

  const displayProduct = () => {
    console.log('Product');
  }

  const getMoreProducts = useCallback(() => {
    if (lastEvaluatedId !== startId) {
      setStartId(lastEvaluatedId);
    }
  }, [setStartId, lastEvaluatedId]);

  useEffect(() => {
    console.log('lastEvaluatedId, startId', lastEvaluatedId, startId);
    if (lastEvaluatedId === startId) {
      getProducts(debouncedSearchTerm, startId);
    }
  }, [lastEvaluatedId, startId])

  return (
    <div className="App">
      <div className="App-header">
        <input type="text" placeholder="Search" className="App-search-input" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      </div>
      <div className="App-content">
        <h1 className="results">Results</h1>
        <p>Showing {numberOfProducts} of {productTotal}</p>
      </div>
      <div className="App-products">
        {products && products.map((product: Product, index: number) => {
          return (
            <div className="product" key={`product-${product.id}`}>
              <div className="image-container">
                <img src={product.image} width="100" height="100"/>
              </div>
              <div className="product-summary">
                <h3 className="brand-name">{product.brandName}</h3>
                <p className="title">{product.title}</p>
                <div className="price-container">
                  <span className="price">{product.price}</span>
                  <span className="price-before">{product.price}</span>
                </div>
                <div className="freebie-container">
                  {product.isFreeShipping && (
                    <div><LocalShipping fontSize="inherit" /><span>&nbsp;Free Shipping</span></div>
                  )}
                  {product.isFreeGift && (
                    <div><Redeem fontSize="inherit" /><span>&nbsp;Free Gift</span></div>
                  )}
                </div>
                <button className="view-deal" onClick={(e) => displayProduct()}>VIEW DEAL</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="load-more">
        <span onClick={(e) => getMoreProducts()}>Show more</span>
      </div>
    </div>
  );
}
