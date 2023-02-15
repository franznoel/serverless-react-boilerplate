import "./App.css";

import React, { useEffect, useCallback, useState } from "react";

import useConfig from "./components/useConfig";
import { LocalShipping, Redeem } from "@mui/icons-material";
import { useDebounce } from "./hooks/debounce";
import { LinearProgress } from "@mui/material";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const [lastEvaluatedId, setLastEvaluatedId] = useState('');
  const [startId, setStartId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);

  const getProducts = useCallback(async (lastId: string) => {
    if (!lastId) {
      setIsLoading(true);
    }
    const apiUrl = config.app.URL;
    fetch(`${apiUrl}/products?startKey=${lastId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors'
      })
      .then((response) => response.json())
      .then(({ products, total, lastEvaluatedKey }) => {
        let existingProductsSize = 0;
        setProductTotal(total);
        setProducts((existingProducts: Product[]) => {
          const existingProductIds = existingProducts.map((existingProduct) => existingProduct.id);
          for (const product of products) {
            if (!existingProductIds.includes(product.id)) {
              existingProducts.push(product);
            }
          }
          existingProductsSize = existingProducts.length;
          return existingProducts;
        });
        setNumberOfProducts(existingProductsSize);
        setLastEvaluatedId(lastEvaluatedKey.id);
        setIsLoading(false);
        setIsLoadingMoreProducts(false);
      })
      .catch((error) => console.error(error));
  }, [setProducts, setNumberOfProducts, setProductTotal]);

  const searchProducts = useCallback(async (search: string) => {
      setIsLoading(true);
      const apiUrl = config.app.URL;
      fetch(`${apiUrl}/products/search?search=${search}`, {
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors'
        })
        .then((response) => response.json())
        .then(({ products, total }) => {
          setProductTotal(total);
          setProducts(products);
          setNumberOfProducts(products.length);
          setIsLoading(false);
          setLastEvaluatedId('');
        })
        .catch((error) => console.error(error));
  }, [setProducts, setNumberOfProducts, setProductTotal])

  useEffect(() => {
    if (debouncedSearchTerm === '') {
      getProducts(startId);
    }
  }, [getProducts, startId, debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      setProducts([]);
      searchProducts(searchTerm);
    }
  }, [debouncedSearchTerm])

  const displayProduct = () => {
    console.log('Product');
  }

  const getMoreProducts = useCallback(() => {
    if (lastEvaluatedId !== startId) {
      setStartId(lastEvaluatedId);
      setIsLoadingMoreProducts(true);
    }
  }, [setStartId, lastEvaluatedId]);

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
        {isLoading && (
          <div style={{ width: '100%' }}>
            <LinearProgress />
          </div>
        )}
        {!isLoading && products && products.map((product: Product, index: number) => (
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
        ))}
      </div>
      {debouncedSearchTerm === '' && numberOfProducts !== productTotal && (
        <div className="load-more">
          {isLoadingMoreProducts && (
              <div style={{ width: '100%' }}>
                <LinearProgress />
              </div>
          )}
          <span onClick={(e) => getMoreProducts()}>Show more</span>
        </div>
      )}
    </div>
  );
}
