import React from "react";
import "./orderdetails.css";

const OrderDetails = () => {
  // Dummy order details
  const order = {
    order_id: 101,
    status: "Out for Delivery", // Status can be: Dispatched, Out for Delivery, Delivered
    items: [
      { product_id: 5001, name: "Wireless Headphones", quantity: 2, unit_price: 59.99 },
    ],
    address: {
      fullName: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip_code: "10001",
    },
    total_amount: 209.97,
    created_at: "2025-04-18T15:00:00Z",
  };

  const steps = ["Dispatched", "Out for Delivery", "Delivered"];
  
  const getCurrentStep = (status) => {
    return steps.indexOf(status);
  };

  return (
    <div className="order-details-container">
      <h2>Order #{order.order_id}</h2>

      {/* Order Progress Bar */}
      <div className="progress-container">
        {steps.map((step, index) => (
          <div key={index} className={`progress-step ${getCurrentStep(order.status) >= index ? "active" : ""}`}>
            <div className="circle">{index + 1}</div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="order-status">
        <h3>Status: <span className={`status ${order.status.toLowerCase().replace(/ /g, '-')}`}>
          {order.status}
        </span></h3>
      </div>

      <div className="section">
        <h3>Order Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.unit_price.toFixed(2)}</td>
                <td>${(item.quantity * item.unit_price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Shipping Address</h3>
        <p>{order.address.fullName}</p>
        <p>{order.address.street}</p>
        <p>{order.address.city}, {order.address.state} {order.address.zip_code}</p>
      </div>

      <div className="section total-amount">
        <h3>Total Amount: ${order.total_amount.toFixed(2)}</h3>
        <p>Ordered on: {new Date(order.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
