/** Resolve a file in public/ against Vite's base, so a subpath deploy works. */
export const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

/** Shorthand for files in public/img. */
export const img = (file: string) => asset(`img/${file}`);
