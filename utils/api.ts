import axios from "axios";

import { Artwork } from "@/types";

const API_URL = "https://api.artic.edu/api/v1";

export async function fetchArtworks(page: number = 1, searchQuery?: string) {
  let url = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=12&fields=id,title,image_id`;

  if (searchQuery) {
    url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
      searchQuery
    )}&page=${page}&limit=12&fields=id,title,image_id`;
  }

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();

  const iiif_url = data.config?.iiif_url;

  // Search endpoint returns slightly different response structure
  const artworks = (data.data || []).map((artwork: any) => ({
    id: artwork.id,
    title: artwork.title,
    image_id: artwork.image_id,
    iiif_url: iiif_url,
  }));

  return {
    artworks,
    pagination: data.pagination || {
      current_page: page,
      total_pages: Math.ceil((data.info?.total || 0) / 12),
    },
  };
}

export const fetchArtwork = async (id: string): Promise<Artwork> => {
  const response = await axios.get(`${API_URL}/artworks/${id}`);

  return {
    id: response.data.data.id.toString(),
    title: response.data.data.title,
    description: response.data.data.description || "",
    image_id: response.data.data.image_id,
    iiif_url: response.data.config.iiif_url,
  };
};
