const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPrograms() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const response = await fetch(`${API_URL}/bato-program/list?page=1&limit=10`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch BATO programs");
  }

  const result = await response.json();

  return result.data.rows;
}
