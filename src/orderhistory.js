import React from "react";
import "./orderhistory.css";

const OrderHistory = () => {
  // Dummy order data
  const orders = [
    {
      order_item_id: 1,
      order_id: 101,
      user_id: 123,
      product_id: 5001,
      quantity: 2,
      unit_price: 19.99,
      subtotal: 39.98,
      created_at: "2025-04-10T14:30:00Z",
      status: "Delivered",  // <-- Added
    },
    {
      order_item_id: 2,
      order_id: 102,
      user_id: 123,
      product_id: 5002,
      quantity: 1,
      unit_price: 49.99,
      subtotal: 49.99,
      created_at: "2025-04-15T10:15:00Z",
      status: "Pending",
    },
    {
      order_item_id: 3,
      order_id: 103,
      user_id: 123,
      product_id: 5003,
      quantity: 3,
      unit_price: 15.0,
      subtotal: 45.0,
      created_at: "2025-04-16T09:00:00Z",
      status: "Shipped",
    },
    {
      order_item_id: 4,
      order_id: 104,
      user_id: 123,
      product_id: 5003,
      quantity: 3,
      unit_price: 15.0,
      subtotal: 45.0,
      created_at: "2025-04-16T09:00:00Z",
      status: "Cancelled",
    },
  ];

  return (
    <div className="order-history-container">
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
              <th>Ordered At</th>
              <th>Status</th> {/* Added Status column */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_item_id}>
                <td>{order.order_id}</td>
                <td>{order.product_id}</td>
                <td>{order.quantity}</td>
                <td>${order.unit_price.toFixed(2)}</td>
                <td>${order.subtotal.toFixed(2)}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
