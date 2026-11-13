/** Resolve a photo in public/img against Vite's base, so a subpath deploy works. */
export const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;
