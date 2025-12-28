import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const PostLost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    if (image) formData.append('image', image);

    try {
      await API.post('/lost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err) {
      alert('Error uploading. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            
            {/* Navigation Back */}
            <Link to="/" className="text-decoration-none text-muted small d-inline-flex align-items-center mb-4 transition-all hover-translate-x">
              <span className="me-2">←</span> Back to Dashboard
            </Link>

            <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '24px' }}>
              <div className="text-center mb-4">
                <div className="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '64px', height: '64px' }}>
                  <span className="fs-3">📢</span>
                </div>
                <h2 className="fw-bold text-dark">Report Lost Item</h2>
                <p className="text-muted small px-md-4">
                  Please provide as much detail as possible to help others identify your item.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Image Upload/Preview Section */}
                <div className="mb-4">
                  <label htmlFor="lost-upload" className="w-100">
                    <div className="border border-2 border-dashed rounded-4 p-4 text-center transition-all" 
                         style={{ 
                           borderColor: '#dc3545', 
                           backgroundColor: preview ? 'transparent' : '#fff5f5',
                           cursor: 'pointer'
                         }}>
                      {preview ? (
                        <div className="position-relative d-inline-block">
                          <img src={preview} alt="Preview" className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '220px' }} />
                          <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white">
                            Change
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">
                          <div className="mb-2 fs-4 text-danger">📸</div>
                          <p className="mb-1 fw-bold text-dark">Add a Reference Image</p>
                          <p className="text-muted extra-small mb-0">It helps people recognize the item quickly</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <input id="lost-upload" type="file" className="d-none" accept="image/*" onChange={handleImageChange} />
                </div>

                {/* Input Fields with Floating Labels */}
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light shadow-none" 
                    id="lostTitle" 
                    placeholder="Title" 
                    style={{ borderRadius: '12px' }}
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                  />
                  <label htmlFor="lostTitle" className="text-muted">Item Name (e.g. Wallet, Keys)</label>
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light shadow-none" 
                    id="lostLoc" 
                    placeholder="Location" 
                    style={{ borderRadius: '12px' }}
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                  <label htmlFor="lostLoc" className="text-muted">Last Seen Location</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea 
                    className="form-control border-0 bg-light shadow-none" 
                    id="lostDesc" 
                    placeholder="Description" 
                    style={{ borderRadius: '12px', height: '130px' }}
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                  ></textarea>
                  <label htmlFor="lostDesc" className="text-muted">Item Details (Color, Brand, Marks...)</label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-danger btn-lg w-100 shadow-sm border-0 py-3 mt-2" 
                  style={{ 
                    borderRadius: '16px', 
                    fontWeight: '700', 
                    letterSpacing: '0.5px',
                    transition: '0.3s' 
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Publishing...
                    </>
                  ) : 'Broadcast Lost Report'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Basic CSS for subtle animations */}
      <style>{`
        .hover-translate-x:hover { transform: translateX(-5px); }
        .extra-small { font-size: 0.75rem; }
        .form-control:focus { background-color: #fff !important; border: 1px solid #dc3545 !important; }
      `}</style>
    </div>
  );
};

export default PostLost;