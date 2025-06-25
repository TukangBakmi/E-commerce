import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear search input when navigating to home page
  useEffect(() => {
    if (location.pathname === '/' && !location.search) {
      setQuery('');
    }
  }, [location]);

  // Update search input when navigating to search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const searchParams = new URLSearchParams(location.search);
      const searchQuery = searchParams.get('q');
      if (searchQuery) {
        setQuery(searchQuery);
      }
    }
  }, [location]);
  
  // Update cart count whenever location changes or component mounts
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartCount(count);
    };
    
    updateCartCount();
    
    // Add event listener for storage changes
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      // If search is empty, navigate to home page
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    setQuery('');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 fixed-top">
      <div className="container">
        <Link className="navbar-brand fs-2" to="/" onClick={handleHomeClick}>HelloMart</Link>

        <div className="collapse navbar-collapse justify-content-end me-4">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Cari produk..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{borderRadius: '6px 0 0 6px', width: '40vw'}}
            />
            <button className="btn btn-outline-secondary" type="submit" style={{borderRadius: '0 6px 6px 0'}}>
              <i className="fas fa-search me-1"></i>
            </button>
          </form>
        </div>

        <div className="d-flex">
          <Link to="/cart" className="btn btn-outline-primary position-relative">
            <i className="fas fa-shopping-cart me-1"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
