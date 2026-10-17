// Hardcode the production URL temporarily if you can't access the hosting dashboard
const API_URL =
  import.meta.env.VITE_API_URL || "https://bato.yourshousing.com/api/v1";

export interface Partner {
  id: number;
  name: string;
  isActive: boolean;
}

export const getPartners = async (): Promise<Partner[]> => {
  const response = await fetch(`${API_URL}/partners?all=true`);
  if (!response.ok) throw new Error("Failed to fetch partners");
  const json = await response.json();
  return json.data;
};

export const createPartner = async (data: {
  name: string;
  isActive: boolean;
}): Promise<Partner> => {
  const response = await fetch(`${API_URL}/partners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create partner");
  const json = await response.json();
  return json.data;
};

export const updatePartner = async (
  id: number,
  data: { name: string; isActive: boolean },
): Promise<Partner> => {
  const response = await fetch(`${API_URL}/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update partner");
  const json = await response.json();
  return json.data;
};

export const deletePartner = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/partners/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete partner");
};
