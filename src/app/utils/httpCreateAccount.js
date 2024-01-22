export default async function httpCreateAccount(credentials) {
  const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return res.json();
  } catch (e) {
    throw e;
  }
}
