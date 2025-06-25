import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
    
    // Calculate total
    const sum = stored.reduce((acc, item) => {
      return acc + (item.price * (item.quantity || 1));
    }, 0);
    setTotal(sum);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch storage event to update cart count in navbar
    window.dispatchEvent(new Event('storage'));
    
    // Recalculate total
    const sum = updatedCart.reduce((acc, item) => {
      return acc + (item.price * (item.quantity || 1));
    }, 0);
    setTotal(sum);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch storage event to update cart count in navbar
    window.dispatchEvent(new Event('storage'));
    
    // Recalculate total
    const sum = updatedCart.reduce((acc, item) => {
      return acc + (item.price * (item.quantity || 1));
    }, 0);
    setTotal(sum);
  };

  return (
    <div className="container py-5 mt-5">
      <h2 className="mb-4">Keranjang Belanja</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <p className="mb-4">Keranjang belanja Anda kosong</p>
          <Link to="/" className="btn btn-primary">Mulai Belanja</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Produk</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const quantity = item.quantity || 1;
                  const subtotal = item.price * quantity;
                  
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                            className="me-3"
                          />
                          <div>
                            <Link to={`/product/${item.id}`} className="text-decoration-none">
                              {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="input-group" style={{ width: '120px' }}>
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            type="button"
                            onClick={() => updateQuantity(index, quantity - 1)}
                          >-</button>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-center" 
                            value={quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) updateQuantity(index, val);
                            }}
                          />
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            type="button"
                            onClick={() => updateQuantity(index, quantity + 1)}
                          >+</button>
                        </div>
                      </td>
                      <td>${subtotal.toFixed(2)}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeItem(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <Link to="/" className="btn btn-outline-primary">
                <i className="fas fa-arrow-left me-2"></i>
                Lanjutkan Belanja
              </Link>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Ringkasan Belanja</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Pengiriman</span>
                    <span>Gratis</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link to="/checkout" className="btn btn-primary w-100 mt-3">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
