import Link from "next/link";
import Image from "next/image";
import BuyNowButton from "../BuyNowButton";
import AddToCartButton from "../AddToCartButton";
// to use ProductCard componet, just provide the following props:
// 1) id
// 2) imagesUrl
// 3) productName
// 4) price
export default function ProductCard({
  productId,
  productName,
  price,
  imagesUrl,
}) {
  return (
    <div className="rounded-md flex bg-white p-4 flex-col justify-between items-center shadow-xl sm:min-w-full grow">
      <Link
        href={`/products/productId/${productId}`}
        className="flex flex-col justify-evenly grow"
      >
        <Image src={imagesUrl[0]} width={300} height={300} alt={productName} />
        <p className="font-bold text-gray-700">{productName}</p>
        <p className="font-bold text-black">K{price}</p>
      </Link>
      <div className="flex justify-space-evenly gap-4">
        <BuyNowButton productId={productId} />
        <AddToCartButton productId={productId} productName={productName} />
      </div>
    </div>
  );
}
