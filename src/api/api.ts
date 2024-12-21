const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
import axios from "axios";
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }

  return res.json();
}

// Fetch all pages
export const fetchAllPages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data.json`); // Adjust endpoint as per API
    return response.data;
  } catch (error) {
    console.error("Error fetching all pages:", error);
    return null; // Return null on error
  }
};

// Fetch a specific page by slug
export const fetchPageData = async (slug: string) => {
  console.log("slug", slug);
  try {
    const response = await axios.get(`${API_BASE_URL}/data.json`); // Adjust endpoint as per API
    return response.data;
  } catch (error) {
    console.error(`Error fetching page data for slug: ${slug}`, error);
    return null; // Return null on error
  }
};
