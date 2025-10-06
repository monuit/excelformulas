import crypto from "node:crypto";

/**
 * Normalize a query string for consistent hashing
 * - Trim whitespace
 * - Convert to lowercase
 * - Remove extra spaces
 * - Sort words for similar queries
 */
export function normalizeQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .split(" ")
    .sort()
    .join(" ");
}

/**
 * Generate a hash from a normalized query
 * Returns a short hash (first 16 characters of SHA-256)
 */
export function hashQuery(query: string): string {
  const normalized = normalizeQuery(query);
  return crypto
    .createHash("sha256")
    .update(normalized)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Generate a URL-friendly slug from a query
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters
 * - Limits to 60 characters
 */
export function generateSlug(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
    .slice(0, 60); // Limit length
}

/**
 * Generate a unique slug with hash suffix
 * Example: "vlookup-formula-example-a1b2c3d4"
 */
export function generateUniqueSlug(query: string): string {
  const slug = generateSlug(query);
  const hash = hashQuery(query).slice(0, 8);
  return `${slug}-${hash}`;
}
