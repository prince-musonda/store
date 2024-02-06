import AddToCartButton from "@/app/Components/AddToCartButton";
import BuyNowButton from "@/app/Components/BuyNowButton";
import Carousel from "@/app/Components/Carousel";

async function getProductInfoById(productId) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${api_url}/products/id/${productId}`);
    return res.json();
  } catch (e) {
    throw e;
  }
}

export default async function ProductInfoPage({ params }) {
  const productId = params.productId;
  const product = await getProductInfoById(productId);
  const {
    productName,
    price,
    imagesUrl,
    quantity: availableQuantity,
    description: productDescription,
  } = product;
  return (
    <main className="md:max-w-[80vw] md:m-auto">
      <h1 className="text-2xl md:mb-5">{productName}</h1>
      <div className="bg-white min-h-[300px]">
        {/* image Carousel */}
        <div className="bg-white rounded max-w-lg m-auto">
          <Carousel>
            {imagesUrl.map((image) => (
              <img src={image} alt={productName} />
            ))}
          </Carousel>
        </div>
      </div>

      {/* price, and action buttons */}
      <div className="flex justify-evenly mt-5 mb-5 sm:wrap">
        <h2>
          <span className="text-2xl font-bold">K{price}</span> per Qty
        </h2>
        {/* check if the product is still in stock before
        showing the BuyNow button and AddToCartButton
        */}
        {availableQuantity == 0 ? (
          <p className="text-red-700">
            We are out of stock. Item No longer Available
          </p>
        ) : (
          <>
            <BuyNowButton productId={productId} />
            <AddToCartButton productId={productId} productName={productName} />
          </>
        )}
      </div>
      {/* product descriptions*/}
      <p>{productDescription}</p>
    </main>
  );
}
