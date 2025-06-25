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
    <nav className="navbar navbar-expand-lg navbar-light px-4 fixed-top">
      <div className="container">
        <Link className="navbar-brand fs-2 fw-bold text-primary" to="/" onClick={handleHomeClick}>
          <i className="fas fa-store me-2"></i>HelloMart
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSearch} style={{width: '100%', maxWidth: '500px'}}>
            <input
              className="form-control"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{borderRadius: '25px 0 0 25px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}
            />
            <button className="btn btn-primary" type="submit" style={{borderRadius: '0 25px 25px 0', border: 'none'}}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <div className="d-flex ms-auto">
          <Link to="/cart" className="btn btn-primary position-relative px-3 py-2" style={{borderRadius: '15px'}}>
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
