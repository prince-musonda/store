export default async function httpLogin(loginCredentials) {
  const api_url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${api_url}/users/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(loginCredentials),
    });
    return res.json();
  } catch (e) {
    throw e;
  }
}
