export default async function httpAddtoCart({
  productId,
  productName,
  usersAuthToken,
}) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${api_url}/carts`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${usersAuthToken}`,
      },
      body: JSON.stringify({ productId, productName }),
    });

    return res.json();
  } catch (e) {
    throw e;
  }
}
