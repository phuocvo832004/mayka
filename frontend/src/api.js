const API_URL = "http://localhost:5000";

export const getGallery = async () => {
  const response = await fetch(`${API_URL}/gallery`);
  return response.text();
};
