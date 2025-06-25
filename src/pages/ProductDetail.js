import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // Update quantity if product already in cart
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + quantity;
    } else {
      // Add new product with quantity
      cart.push({...product, quantity});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch storage event to update cart count in navbar
    window.dispatchEvent(new Event('storage'));
    
    alert('Ditambahkan ke keranjang!');
  };

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container mt-5">
      <div className="alert alert-danger">
        Product not found
        <button className="btn btn-primary ms-3" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="container py-5 mt-5">
      <div className="row">
        <div className="col-md-5">
          <div className="card border-0">
            <img 
              src={product.image} 
              className="card-img-top p-4" 
              alt={product.title} 
              style={{ height: '400px', objectFit: 'contain' }} 
            />
          </div>
        </div>
        <div className="col-md-7">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
              <li className="breadcrumb-item"><a href="/" className="text-decoration-none">{product.category}</a></li>
              <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
            </ol>
          </nav>
          
          <h2 className="mb-3">{product.title}</h2>
          
          {product.rating && (
            <div className="mb-3">
              <span className="badge bg-success me-2">★ {product.rating.rate}</span>
              <small className="text-muted">({product.rating.count} reviews)</small>
            </div>
          )}
          
          <h3 className="text-primary mb-4">${product.price}</h3>
          
          <p className="mb-4">{product.description}</p>
          
          <div className="d-flex align-items-center mb-4">
            <div className="input-group me-3" style={{ width: '130px' }}>
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >-</button>
              <input 
                type="text" 
                className="form-control text-center" 
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) setQuantity(val);
                }}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
              >+</button>
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Tambah ke Keranjang
            </button>
          </div>
          
          <div className="mt-4">
            <p className="mb-1"><strong>Category:</strong> {product.category}</p>
            <p className="mb-1"><strong>SKU:</strong> {product.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
