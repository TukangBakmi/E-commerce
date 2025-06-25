import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm hover-shadow" style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)'}}>
        <div className="position-relative">
          {product.category && (
            <span className="position-absolute top-0 end-0 bg-gradient text-white px-3 py-1 m-2 rounded-pill small fw-bold" style={{background: 'linear-gradient(45deg, #0d6efd, #6610f2)'}}>
              {product.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          )}
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top p-4"
            style={{ height: '220px', objectFit: 'contain', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body p-4">
          <h6 className="card-title mb-3 fw-bold" style={{color: '#2c3e50'}}>
            {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
          </h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text fw-bold mb-0" style={{fontSize: '1.2rem', background: 'linear-gradient(45deg, #0d6efd, #6610f2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>${product.price}</p>
            <div className="badge" style={{background: 'linear-gradient(45deg, #28a745, #20c997)', color: 'white', borderRadius: '15px'}}>
              {product.rating && `★ ${product.rating.rate} (${product.rating.count})`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
