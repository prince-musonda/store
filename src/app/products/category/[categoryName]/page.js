import clsx from "clsx"; // for conditional styling
import Link from "next/link";
import "./styles.css";
import ProductCard from "@/app/Components/Product_card";

async function getProductsByCategory(categoryName) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    let res = await fetch(`${api_url}/products/category/${categoryName}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "sorry! something went wrong. Refresh the page or try later.",
    };
  }
}

export default async function ProductsPage({ params }) {
  const { categoryName } = params;
  const res = await getProductsByCategory(categoryName);
  if (res.success == false) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>{res.message}</p>
      </div>
    );
  }
  // if we couldn't find items of the specified category
  else if (res.data.number == 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-blue-500 text-2xl mb-2" style={{ fontWeight: "70" }}>
          Sorry! We couldn't find anything under {categoryName}'s category.
        </p>
        <p>We are probably out of stock or something like that.</p>
      </div>
    );
  } else {
    const { products } = res.data;
    return (
      <main>
        <h1
          className="text-blue-500 text-2xl mb-2"
          style={{ fontWeight: "70" }}
        >
          {categoryName}'s category
        </h1>
        <div className="flex flex-wrap gap-1">
          {products.map((product) => {
            return (
              <ProductCard
                productId={product._id}
                productName={product.productName}
                price={product.price}
                imagesUrl={product.imagesUrl}
              />
            );
          })}
        </div>
      </main>
    );
  }
}
