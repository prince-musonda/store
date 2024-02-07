import Image from "next/image";
import Carousel from "./Components/Carousel";
import ProductCard from "./Components/Product_card";
import HeroSection from "./Components/HeroSection";

async function getProducts() {
  try {
    const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${api_url}/products`, { cache: "no-store" });
    const products = res.json();
    return products;
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="flex justify-center items-center flex-col">
      <HeroSection />
      <h3 className="w-full text-gray-700 text-xl">Most trending products</h3>
      <div className="flex gap-2 flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            productName={product.productName}
            price={product.price}
            productId={product._id}
            imagesUrl={product.imagesUrl}
          />
        ))}
      </div>
    </main>
  );
}
