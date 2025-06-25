import { useState, useEffect } from "react";
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
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const sum = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    setTotal(sum);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
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
      <div className="container my-5">
        <h2 className="mb-4 fw-bold" style={{color: '#2c3e50'}}>💳 Checkout</h2>
      
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="card mb-4" style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
              <div className="card-header" style={{background: 'linear-gradient(45deg, #0d6efd, #6610f2)', color: 'white'}}>
                <h5 className="mb-0">Contact Information</h5>
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

            <div className="card mb-4" style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
              <div className="card-header" style={{background: 'linear-gradient(45deg, #28a745, #20c997)', color: 'white'}}>
                <h5 className="mb-0">Shipping Address</h5>
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

            <div className="card mb-4" style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
              <div className="card-header" style={{background: 'linear-gradient(45deg, #ffc107, #fd7e14)', color: 'white'}}>
                <h5 className="mb-0">Payment Information</h5>
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

            <button type="submit" className="btn btn-lg w-100 py-3" style={{background: 'linear-gradient(45deg, #28a745, #20c997)', border: 'none', borderRadius: '15px', fontWeight: '600', color: 'white'}}>
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="col-md-4">
          <div className="card" style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
            <div className="card-header" style={{background: 'linear-gradient(45deg, #6f42c1, #e83e8c)', color: 'white'}}>
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              {cartItems.map(item => {
                const quantity = item.quantity || 1;
                return (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>{item.title.substring(0, 20)}... x{quantity}</span>
                    <span>${(item.price * quantity).toFixed(2)}</span>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
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