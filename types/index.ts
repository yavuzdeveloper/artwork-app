export type Artwork = {
  id: string;
  title: string;
  image_id: string;
  iiif_url: string;
  description?: string;
};

export interface Pagination {
  total: number;
  total_pages: number;
  current_page: number;
}

export interface ArtAPIResponse {
  data: Artwork[];
  pagination: Pagination;
  config: {
    iiif_url: string;
  };
}
