import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 8;

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['all', ...data]));
  }, []);

  // Fetch products
  useEffect(() => {
    setIsLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      });
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory, products]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
      {/* Carousel */}
      <div id="homeCarousel" className="carousel slide mb-5 rounded-3 overflow-visible shadow position-relative mx-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="bg-primary text-white p-5 d-flex align-items-center" style={{height: "300px"}}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center text-md-start">
                    <h1 className="display-5 fw-bold">Welcome to HelloMart</h1>
                    <p className="fs-4">Discover amazing products at great prices</p>
                    <button className="btn btn-light btn-lg">Shop Now</button>
                  </div>
                  <div className="col-md-6 d-none d-md-block text-end">
                    <img src="https://placehold.co/400x200?text=Shop+Now" className="img-fluid rounded" alt="Shop Now" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="bg-success text-white p-5 d-flex align-items-center" style={{height: "300px"}}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center text-md-start">
                    <h1 className="display-5 fw-bold">New Arrivals</h1>
                    <p className="fs-4">Check out our latest products</p>
                    <button className="btn btn-light btn-lg">View New Items</button>
                  </div>
                  <div className="col-md-6 d-none d-md-block text-end">
                    <img src="https://placehold.co/400x200?text=New+Arrivals" className="img-fluid rounded" alt="New Arrivals" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="bg-danger text-white p-5 d-flex align-items-center" style={{height: "300px"}}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center text-md-start">
                    <h1 className="display-5 fw-bold">Special Offers</h1>
                    <p className="fs-4">Limited time deals on selected items</p>
                    <button className="btn btn-light btn-lg">See Offers</button>
                  </div>
                  <div className="col-md-6 d-none d-md-block text-end">
                    <img src="https://placehold.co/400x200?text=Special+Offers" className="img-fluid rounded" alt="Special Offers" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button 
          className="carousel-control-prev" 
          type="button" 
          data-bs-target="#homeCarousel" 
          data-bs-slide="prev"
          style={{
            width: "40px",
            height: "40px",
            top: "50%",
            left: "0",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button 
          className="carousel-control-next" 
          type="button" 
          data-bs-target="#homeCarousel" 
          data-bs-slide="next"
          style={{
            width: "40px",
            height: "40px",
            top: "50%",
            right: "0",
            transform: "translate(50%, -50%)",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
      {/* Categories */}
      <div className="mb-4">
        <h4 className="mb-3">Browse Categories</h4>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <h4 className="mb-3">All Products</h4>
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {currentProducts.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No products found in this category.</div>
            </div>
          ) : (
            currentProducts.map(product => (
              <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      )}
      
      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="d-flex justify-content-center mt-5">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
