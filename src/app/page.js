import Image from "next/image";
import NavBar from "./Components/Navbar";
import { test_products } from "./utils/test_Products";
import ProductCard from "./Components/Product_card";

export default function Home() {
  return (
    <main>
      <div className="flex gap-2 flex-wrap justify-center">
        {test_products.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.name}
            price={product.price}
            id={product.id}
            imagesUrl={product.imagesUrl}
          />
        ))}
      </div>
    </main>
  );
}
