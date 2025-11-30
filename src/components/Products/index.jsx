import React from "react";
import Header from "../Header";
import PrimeDealsSection from "../PrimeDealsSection";
import AllProductsSection from "../AllProductsSection";

import "./index.css";

const Products = () => {
  return (
    <>
      <Header />
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </>
  );
};

export default Products;
