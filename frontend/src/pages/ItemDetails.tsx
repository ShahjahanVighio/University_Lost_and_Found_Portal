import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import Comments from '../components/Comments';

const ItemDetails = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await API.get(`/${type}/${id}`);
        setItem(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}></div>
    </div>
  );

  if (!item) return (
    <div className="container mt-5 text-center">
      <h2 className="display-6 fw-bold">Item not found!</h2>
      <Link to="/" className="btn btn-dark rounded-pill mt-3">Go Back Home</Link>
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-decoration-none text-muted small">← Back to Explore</Link>
        </nav>

        <div className="row g-4 justify-content-center">
          {/* --- Item Information Card --- */}
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '24px' }}>
              <div className="row g-0">
                
                {/* Image Section */}
                <div className="col-md-6">
                  <img
                    src={item.imageUrl 
                      ? `http://localhost:3000/uploads/${item.imageUrl}` 
                      : `https://placehold.co/800x800/${type === 'lost' ? 'fee2e2/dc2626' : 'f0fdf4/16a34a'}?text=${item.title}`
                    }
                    alt={item.title}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', minHeight: '400px' }}
                  />
                </div>

                {/* Content Section */}
                <div className="col-md-6 bg-white p-4 p-lg-5">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className={`badge rounded-pill px-3 py-2 ${type === 'lost' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                      {type?.toUpperCase()}
                    </span>
                    <span className="text-muted small">• Posted {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h1 className="display-6 fw-bold text-dark mb-2">{item.title}</h1>
                  <p className="fs-5 text-muted mb-4"><i className="bi bi-geo-alt-fill me-2"></i>{item.location}</p>
                  
                  <div className="bg-light p-4 rounded-4 mb-4">
                    <h6 className="fw-bold text-dark text-uppercase small mb-2">Description</h6>
                    <p className="lead fs-6 text-secondary mb-0">{item.description}</p>
                  </div>

                  {/* Owner Info */}
                  <div className="d-flex align-items-center border-top pt-4 mt-4">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '45px', height: '45px', fontWeight: 'bold' }}>
                      {item.createdBy?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="mb-0 small text-muted">Reported by</p>
                      <h6 className="mb-0 fw-bold">{item.createdBy?.name || 'Community Member'}</h6>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-4 pt-2">
                    <button className={`btn btn-lg w-100 rounded-pill shadow-sm fw-bold ${type === 'lost' ? 'btn-danger' : 'btn-success'}`}>
                      {type === 'lost' ? 'I Found This Item' : 'This Item Belongs to Me'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Comments Section --- */}
          <div className="col-lg-10 mt-5">
            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
              <h4 className="fw-bold mb-4">Community Discussion</h4>
              <Comments itemId={Number(id)} itemType={type as 'lost' | 'found'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;