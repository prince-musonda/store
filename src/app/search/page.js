"use client";

import ProductCard from "../Components/Product_card";
import "./styles.css";

import { useState } from "react";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <main>
      {/* search bar section */}
      {/* center the search input box using flexbox */}
      <div className="flex justify-center">
        <input className="search-bar" placeholder="What are you looking for?" />
        <button className="search-btn">search</button>
      </div>

      {/* search results section */}
      <section className="flex flex-wrap">
        {searchResults.map((item) => (
          <ProductCard
            key={item.id}
            productName={item.name}
            price={item}
            id={item.id}
          />
        ))}
      </section>
    </main>
  );
}
