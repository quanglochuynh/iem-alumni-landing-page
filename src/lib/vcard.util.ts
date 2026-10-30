const escapeVCard = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');

export type VCardInput = {
  name: string;
  phone?: string;
  email?: string;
  urls?: string[];
  note?: string;
};

export function buildVCard({ name, phone, email, urls, note }: VCardInput) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCard(name)}`,
    `N:${escapeVCard(name)};;;;`,
  ];
  if (phone) lines.push(`TEL;TYPE=CELL:${escapeVCard(phone)}`);
  if (email) lines.push(`EMAIL:${escapeVCard(email)}`);
  for (const url of urls ?? []) lines.push(`URL:${escapeVCard(url)}`);
  if (note) lines.push(`NOTE:${escapeVCard(note)}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export function downloadVCard(input: VCardInput) {
  const blob = new Blob([buildVCard(input)], {
    type: 'text/vcard;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${input.name.replace(/[^\w-]+/g, '_') || 'contact'}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
