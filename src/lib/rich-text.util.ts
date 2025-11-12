export function StripTags(htmlString: string): string {
  // server-side stripping of HTML tags
  return htmlString.replace(/<\/?[^>]+(>|$)/g, '');
}
