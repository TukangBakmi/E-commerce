import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const query = useQuery().get('q') || '';

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['all', ...data]));
  }, []);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const lower = query.toLowerCase();
        const filteredData = data.filter(p => {
          const matchQuery = p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower);
          const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
          return matchQuery && matchCategory;
        });
        setFiltered(filteredData);
        setCurrentPage(1); // Reset to first page when filters change
      });
  }, [query, selectedCategory]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h4>Hasil pencarian untuk: <strong>{query}</strong></h4>
      <div className="mb-3">
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="row">
        {filtered.length === 0 && <p>Tidak ada produk ditemukan.</p>}
        {currentProducts.map(product => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} height="200" style={{objectFit: 'contain'}} />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
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
              
              {Array.from({ length: Math.ceil(filtered.length / productsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === Math.ceil(filtered.length / productsPerPage) ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filtered.length / productsPerPage)}
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
