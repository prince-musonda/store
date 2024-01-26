export default async function httpRemoveItemFromCart(
  usersAuthToken,
  productId
) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  const productToRemove = JSON.stringify({ productId });
  console.log(productToRemove);
  try {
    const res = await fetch(`${api_url}/carts`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${usersAuthToken}`,
      },
      body: productToRemove,
    });
    return res.json();
  } catch (e) {
    throw e;
  }
}
