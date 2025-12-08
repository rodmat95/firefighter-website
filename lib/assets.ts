export const getAssetUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_R2_URL;

  // If no base URL is defined, return path as is (development fallback or misconfig)
  if (!baseUrl) {
    // In production, we might want to warn, but for now fallback to local
    return path;
  }

  // If path is already absolute, return it
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Ensure path starts with / for concatenation if missing, or handle double slashes
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Remove trailing slash from base url if present
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  return `${cleanBase}${cleanPath}`;
};
