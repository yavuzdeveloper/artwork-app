import axios from "axios";

import { Artwork } from "@/types";

const API_URL = "https://api.artic.edu/api/v1";

export const fetchArtworks = async () => {
  const response = await axios.get(`${API_URL}/artworks`);
  return response.data.data.map((artwork: any) => ({
    id: artwork.id,
    title: artwork.title,
    image_id: artwork.image_id,
    iiif_url: response.data.config.iiif_url,
  }));
};

export const fetchArtwork = async (id: string): Promise<Artwork> => {
  const response = await axios.get(`${API_URL}/artworks/${id}`);
  return {
    id: response.data.data.id.toString(),
    title: response.data.data.title,
    description: response.data.data.description || "No description available",
    image_id: response.data.data.image_id,
    iiif_url: response.data.config.iiif_url,
  };
};
