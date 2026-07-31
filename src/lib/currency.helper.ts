export const getVND = (value: number | string) => {
  const num = Number(value);
  return num.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export function numberWithCommas(x: number | string) {
  if (x === 0) return '0';
  if (!x) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
