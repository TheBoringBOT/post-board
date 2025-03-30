export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export function getPostPath(id: number, title: string): string {
  return `/post/${id}/${createSlug(title)}`;
}
