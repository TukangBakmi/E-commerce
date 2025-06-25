import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [showToast, setShowToast] = useState(false);

  const cartItems = [
    { id: 1, title: "Fjallraven - Foldsack No. 1 Backpack", price: 109.95, quantity: 2 },
    { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, quantity: 1 }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <>
      <Toast
        message="Order placed successfully!"
        type="success"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="container mt-5 pt-4">
        <h2 className="mb-4">Checkout</h2>
      
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header">
                <h5>Contact Information</h5>
              </div>
              <div className="card-body">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5>Shipping Address</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="form-control mb-3"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="form-control mb-3"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control mb-3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="row">
                  <div className="col-md-8">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="form-control mb-3"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      className="form-control mb-3"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5>Payment Information</h5>
              </div>
              <div className="card-body">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  className="form-control mb-3"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className="form-control mb-3"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      className="form-control mb-3"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100">
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Order Summary</h5>
            </div>
            <div className="card-body">
              {cartItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.title.substring(0, 20)}... x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}