export default function formatMony(product) {
  return `$${(product.priceCents / 100).toFixed(2)}`;
}
