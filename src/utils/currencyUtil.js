export function formatCurrency(value=0.0, currency = "GBP") {
  const options = {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat("en-US", options).format(value);
}

export function getTotalPrice(cart) {
  const total = cart.reduce((total, item) => {
    return total + (parseFloat(item.subtotal) || 0);
  }, 0);
  
  return total;
}