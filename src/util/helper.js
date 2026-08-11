export const getImageUrl = (url, size = "original") => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://image.tmdb.org/t/p/${size}${url}`;
};
