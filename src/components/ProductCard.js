import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 border-0 shadow-sm hover-shadow transition">
        <div className="position-relative">
          {product.category && (
            <span className="position-absolute top-0 end-0 bg-primary text-white px-2 py-1 m-2 rounded-pill small">
              {product.category.split(' ')[0]}
            </span>
          )}
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top p-4"
            style={{ height: '220px', objectFit: 'contain' }}
          />
        </div>
        <div className="card-body">
          <h6 className="card-title mb-3">
            {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
          </h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text fw-bold text-primary mb-0">${product.price}</p>
            <div className="badge bg-light text-dark border">
              {product.rating && `★ ${product.rating.rate} (${product.rating.count})`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
