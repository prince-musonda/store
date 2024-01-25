export default async function httpRemoveItemFromCart(
  usersAuthToken,
  productId
) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${api_url}/carts`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${usersAuthToken}`,
      },
      body: JSON.stringify({ productId }),
    });
    return res.json();
  } catch (e) {
    throw e;
  }
}
