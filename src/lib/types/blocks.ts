export interface Block {
  type: string; // Block type identifier (e.g., 'hero', 'gallery')
  data: HeroBlockData | GalleryBlockData; // Data associated with the block
}

// Example specific block types
export interface HeroBlockData {
  title: string;
  subtitle: string;
}

export interface GalleryBlockData {
  images: string[]; // Array of image URLs
}
