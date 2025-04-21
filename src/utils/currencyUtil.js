export function formatCurrency(value, currency = "GBP") {
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
    return total + parseFloat(item.subtotal);
  }, 0);
  
  return total.toFixed(2);
}