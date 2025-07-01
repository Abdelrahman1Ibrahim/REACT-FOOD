export default async function submitOrder(url, order) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

export async function fetchFoods(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}
