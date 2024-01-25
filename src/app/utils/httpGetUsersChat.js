export default async function httpGetUsersCart(usersAuthToken) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  // get request
  try {
    const res = await fetch(`${api_url}/carts`, {
      headers: {
        Authorization: `Bearer ${usersAuthToken}`,
      },
    });
    console.log(res);
    return res.json();
  } catch (e) {
    throw e;
  }
}
