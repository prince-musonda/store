import Image from "next/image";
import NavBar from "./Components/Navbar";
import ProductCard from "./Components/Product_card";

async function getProducts() {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${api_url}/products`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }

  const products = res.json();
  return products;
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
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
