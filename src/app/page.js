import Image from "next/image";
import NavBar from "./Components/Navbar";
import ProductCard from "./Components/Product_card";

async function getProducts() {
  const serverAddress = process.env.SERVER_ADDRESS;
  console.log(serverAddress);
  const res = await fetch(`${serverAddress}/products`, { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <div className="flex gap-2 flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productName={product.productName}
            price={product.price}
            id={product.id}
            imagesUrl={product.imagesUrl}
          />
        ))}
      </div>
    </main>
  );
}
