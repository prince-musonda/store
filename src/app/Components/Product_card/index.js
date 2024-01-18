import Link from "next/link";
import Image from "next/image";
import BuyNowButton from "../BuyNowButton";
import AddToCartButton from "../AddToCartButton";
// to use ProductCard componet, just provide the following props:
// 1) id
// 2) imagesUrl
// 3) productName
// 4) price
export default function ProductCard(props) {
  return (
    <div className="flex bg-white p-4 flex-col justify-between shadow-lg">
      <Link
        href={`/product/id/${props.id}`}
        className="flex flex-col justify-evenly grow"
      >
        <Image
          src={props.imagesUrl[0]}
          width={200}
          height={200}
          alt={props.productName}
        />
        <p className="font-bold text-gray-700">{props.productName}</p>
        <p className="font-bold text-black">K{props.price}</p>
      </Link>
      <div className="flex justify-space-evenly gap-4">
        <BuyNowButton productId={props.id} />
        <AddToCartButton productId={props.id} />
      </div>
    </div>
  );
}
