export function getR2ImageUrl(path: string) {
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  return `${process.env.NEXT_PUBLIC_R2_BASE_URL}/${path}`;
}

export function getR2PathFromUrl(url: string) {
  return url.replace(`${process.env.NEXT_PUBLIC_R2_BASE_URL}/`, '');
}
