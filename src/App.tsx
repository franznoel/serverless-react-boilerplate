import "./App.css";

import React, { useEffect, useState } from "react";

import useConfig from "./components/useConfig";
import { LocalShipping, Redeem } from "@mui/icons-material";

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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => fetch('http://localhost:3000/api', {
      headers: {
        "Content-Type": "application/json"
      },
      mode: 'cors'
    })
      .then((response) => response.json())
      .then(({ products }) => {
        setProducts(products);
      })
      .catch((error) => console.error(error));
    getProducts();
  }, [setProducts]);

  useEffect(() => {
    console.log('products', products);
  }, [products])

  const displayProduct = () => {
    console.log('Product')
  }

  return (
    <div className="App">
      <div className="App-header">
        <input type="text" placeholder="Search" className="App-search-input" />
      </div>
      <div className="App-content">
        <h1 className="results">Results</h1>
        <p>Showing 12 of 100</p>
      </div>
      <div className="App-products">
        {products && products.map((product: Product) => {
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
        <span>Show more</span>
      </div>
    </div>
  );
}
