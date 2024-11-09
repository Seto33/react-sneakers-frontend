import React from 'react';
import {Catalog, Slider} from '../components';
import { useState } from "react";
import { useProduct } from '../hooks/useProduct';

const Home = () => {
    const {products, isLoading} = useProduct();
    const [searchValue, setSearchValue] = useState("");
  return (
    <>
    <main>
    <Slider />
    <Catalog
    isLoading = {isLoading} 
    products = {products} 
    >

      <h2>{searchValue ? "Поиск по запросу: " + searchValue : 
      "Все кроссовки"}
      
      </h2>
    </Catalog>
    </main>
    </>
  )
}

export default Home;
