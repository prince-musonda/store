export default async function httpAddNewOrder(usersAuthToken, productOrdered) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${api_url}/orders`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${usersAuthToken}`,
      },
      body: JSON.stringify(productOrdered),
    });
    console.log(res);

    return res.json();
  } catch (e) {
    throw e;
    console.log(e);
  }
}
