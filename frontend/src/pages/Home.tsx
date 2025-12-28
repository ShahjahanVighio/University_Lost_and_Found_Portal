import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [lostItems, setLostItems] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const lostRes = await API.get('/lost');
      const foundRes = await API.get('/found');
      setLostItems(lostRes.data.data || lostRes.data);
      setFoundItems(foundRes.data.data || foundRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filterData = (items: any[]) =>
    items.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-grow text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <h5 className="mt-4 text-secondary fw-light">Syncing with our community...</h5>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* --- Aesthetic Hero Section --- */}
      <div className="py-5 mb-5" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #343a40 100%)', color: 'white' }}>
        <div className="container text-center py-4">
          <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-1.5px' }}>Lost something? <span style={{ color: '#00d4ff' }}>We'll help.</span></h1>
          <p className="lead opacity-75 mb-4">The community-driven platform to reunite people with their belongings.</p>
          
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group input-group-lg shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <span className="input-group-text border-0 bg-white ps-4">🔍</span>
                <input
                  type="text"
                  className="form-control border-0 py-3 shadow-none"
                  placeholder="Search by item name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '1rem' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* --- Quick Action Floating Buttons --- */}
        <div className="d-flex justify-content-center gap-3 mb-5 mt-n5">
          <Link to="/post-lost" className="btn btn-danger btn-lg px-4 shadow py-3" style={{ borderRadius: '12px', fontWeight: '600' }}>
            <i className="bi bi-megaphone me-2"></i> Report Lost Item
          </Link>
          <Link to="/post-found" className="btn btn-success btn-lg px-4 shadow py-3" style={{ borderRadius: '12px', fontWeight: '600' }}>
            <i className="bi bi-box-seam me-2"></i> Report Found Item
          </Link>
        </div>

        <div className="row g-4">
          {/* --- Lost Items Section --- */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center mb-4 ps-2">
              <div className="bg-danger rounded-circle me-3" style={{ width: '12px', height: '12px' }}></div>
              <h3 className="h4 fw-bold m-0 text-dark">Recent Lost Items</h3>
              <span className="badge ms-3 bg-danger-subtle text-danger rounded-pill px-3">{filterData(lostItems).length}</span>
            </div>
            
            <div className="row row-cols-1 g-4">
              {filterData(lostItems).map((item) => (
                <div className="col" key={item.id}>
                  <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: '18px', transition: 'transform 0.3s ease' }}
                       onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                       onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div className="row g-0">
                      <div className="col-sm-4">
                        <img
                          src={item.imageUrl ? `http://localhost:3000/uploads/${item.imageUrl}` : `https://placehold.co/600x400/fee2e2/dc2626?text=LOST`}
                          className="img-fluid h-100"
                          alt={item.title}
                          style={{ objectFit: 'cover', minHeight: '150px' }}
                        />
                      </div>
                      <div className="col-sm-8">
                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title fw-bold mb-0 text-dark text-capitalize">{item.title}</h5>
                            <span className="small text-muted">{new Date().toLocaleDateString()}</span>
                          </div>
                          <p className="text-muted small mb-3"><i className="bi bi-geo-alt me-1"></i> {item.location}</p>
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <span className="small text-secondary">By <strong>{item.createdBy?.name || 'Community Member'}</strong></span>
                            <Link to={`/lost/${item.id}`} className="btn btn-link text-danger p-0 text-decoration-none fw-bold small">Details →</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Found Items Section --- */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center mb-4 ps-2">
              <div className="bg-success rounded-circle me-3" style={{ width: '12px', height: '12px' }}></div>
              <h3 className="h4 fw-bold m-0 text-dark">Recent Found Items</h3>
              <span className="badge ms-3 bg-success-subtle text-success rounded-pill px-3">{filterData(foundItems).length}</span>
            </div>

            <div className="row row-cols-1 g-4">
              {filterData(foundItems).map((item) => (
                <div className="col" key={item.id}>
                  <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: '18px', transition: 'transform 0.3s ease' }}
                       onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                       onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div className="row g-0">
                      <div className="col-sm-4">
                        <img
                          src={item.imageUrl ? `http://localhost:3000/uploads/${item.imageUrl}` : `https://placehold.co/600x400/f0fdf4/16a34a?text=FOUND`}
                          className="img-fluid h-100"
                          alt={item.title}
                          style={{ objectFit: 'cover', minHeight: '150px' }}
                        />
                      </div>
                      <div className="col-sm-8">
                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title fw-bold mb-0 text-dark text-capitalize">{item.title}</h5>
                            <span className="small text-muted">{new Date().toLocaleDateString()}</span>
                          </div>
                          <p className="text-muted small mb-3"><i className="bi bi-geo-alt me-1"></i> {item.location}</p>
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <span className="small text-secondary">By <strong>{item.createdBy?.name || 'Community Member'}</strong></span>
                            <Link to={`/found/${item.id}`} className="btn btn-link text-success p-0 text-decoration-none fw-bold small">Details →</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;