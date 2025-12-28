import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const PostFound = () => {
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
      await API.post('/found', formData, {
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
    <div className="min-vh-100 py-5" style={{ background: '#fcfcfc' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            
            {/* Back Button */}
            <Link to="/" className="text-decoration-none text-muted small d-flex align-items-center mb-4">
              <span className="me-2">←</span> Back to Home
            </Link>

            <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '24px' }}>
              <div className="text-center mb-4">
                {/* Icon Circle - Green for Found */}
                <div className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '60px', height: '60px' }}>
                  <span className="fs-3">🎁</span>
                </div>
                <h2 className="fw-bold text-dark">Report Found Item</h2>
                <p className="text-muted small">Help someone find their belongings by providing accurate details.</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Image Preview / Upload Area */}
                <div className="mb-4 text-center">
                  <label htmlFor="found-upload" className="w-100 cursor-pointer">
                    <div className="border border-2 border-dashed rounded-4 p-4" 
                         style={{ 
                           borderColor: '#198754', 
                           backgroundColor: preview ? 'transparent' : '#f0fff4',
                           cursor: 'pointer'
                         }}>
                      {preview ? (
                        <div className="position-relative d-inline-block">
                          <img src={preview} alt="Preview" className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '250px' }} />
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success border border-light">Change</span>
                        </div>
                      ) : (
                        <div className="py-3">
                          <p className="mb-1 fw-bold text-success">📸 Upload a photo</p>
                          <p className="text-muted small mb-0">Adding a photo helps owners identify it quickly</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <input id="found-upload" type="file" className="d-none" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light shadow-none" 
                    id="foundTitle" 
                    placeholder="e.g. Leather Wallet" 
                    style={{ borderRadius: '12px' }}
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                  />
                  <label htmlFor="foundTitle" className="text-muted">What did you find?</label>
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light shadow-none" 
                    id="foundLoc" 
                    placeholder="Location" 
                    style={{ borderRadius: '12px' }}
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                  <label htmlFor="foundLoc" className="text-muted">Where did you find it?</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea 
                    className="form-control border-0 bg-light shadow-none" 
                    id="foundDesc" 
                    placeholder="Description" 
                    style={{ borderRadius: '12px', height: '120px' }}
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                  ></textarea>
                  <label htmlFor="foundDesc" className="text-muted">Provide a short description...</label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success btn-lg w-100 shadow-sm border-0 py-3 mt-2" 
                  style={{ borderRadius: '14px', fontWeight: '700' }}
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span> Posting...</>
                  ) : 'Post Found Report'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFound;