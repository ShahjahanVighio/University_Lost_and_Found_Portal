import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [myLost, setMyLost] = useState<any[]>([]);
  const [myFound, setMyFound] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyItems = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      // Backend ke un routes ko hit kar rahe hain jo humne service mein banaye hain
      const [lostRes, foundRes] = await Promise.all([
        API.get(`/lost/user/${user.id}`),
        API.get(`/found/user/${user.id}`)
      ]);

      // Data set kar rahe hain, check kar rahe hain ke array kahan mil raha hai
      setMyLost(lostRes.data.data || lostRes.data || []);
      setMyFound(foundRes.data.data || foundRes.data || []);
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // User ID load hote hi data fetch karein
  useEffect(() => { 
    if (user?.id) {
      fetchMyItems(); 
    }
  }, [user?.id]);

  const deleteItem = async (type: 'lost' | 'found', id: number) => {
    if (window.confirm("🗑️ Are you sure you want to remove this report?")) {
      try {
        await API.delete(`/${type}/${id}`);
        fetchMyItems(); // List refresh karne ke liye
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  if (loading) return (
    <div className="text-center mt-5 py-5">
      <div className="spinner-grow text-primary"></div>
      <p className="mt-3 text-muted">Loading your activity...</p>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* --- Profile Sidebar --- */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 text-center overflow-hidden" style={{ borderRadius: '24px' }}>
              <div className="position-absolute top-0 start-0 w-100" style={{ height: '80px', background: 'linear-gradient(to right, #00d4ff, #0072ff)', opacity: 0.1 }}></div>
              
              <div className="mt-4 mb-3 position-relative">
                <div className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-lg" 
                     style={{ width: '100px', height: '100px', fontSize: '2.5rem', fontWeight: 'bold', border: '4px solid white' }}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              
              <h4 className="fw-bold text-dark mb-1">{user?.name || 'User'}</h4>
              <p className="text-muted small mb-3">{user?.email}</p>
              
              <div className="d-flex justify-content-center gap-2 mb-4">
                <span className="badge rounded-pill bg-dark px-3 py-2 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                  {user?.role || 'Member'} Account
                </span>
              </div>

              <div className="row g-2 border-top pt-4">
                <div className="col-6">
                  <div className="p-2 bg-light rounded-3">
                    <h5 className="fw-bold mb-0">{myLost.length}</h5>
                    <small className="text-muted">Lost Posts</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-2 bg-light rounded-3">
                    <h5 className="fw-bold mb-0">{myFound.length}</h5>
                    <small className="text-muted">Found Posts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Activity Section --- */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4 ps-2">
              <h3 className="fw-bold m-0 text-dark">My Activity</h3>
            </div>

            {/* Lost Items List */}
            <div className="mb-5">
              <h6 className="text-danger fw-bold text-uppercase small mb-3">🔴 My Lost Item Reports</h6>
              {myLost.length > 0 ? myLost.map(item => (
                <div key={item.id} className="card border-0 shadow-sm mb-3 p-3" style={{ borderRadius: '16px' }}>
                  <div className="d-flex align-items-center">
                    <div className="bg-danger-subtle rounded-3 p-3 me-3 text-danger d-none d-sm-block">📢</div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="fw-bold mb-1 text-dark text-capitalize">{item.title}</h6>
                        {item.status === 'resolved' && <span className="badge bg-success small">Recovered</span>}
                      </div>
                      <p className="text-muted small mb-0">📍 {item.location} • {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Link to={`/lost/${item.id}`} className="btn btn-light btn-sm rounded-pill px-3">View</Link>
                      <button onClick={() => deleteItem('lost', item.id)} className="btn btn-outline-danger btn-sm rounded-pill px-3 border-0">Delete</button>
                    </div>
                  </div>
                </div>
              )) : <div className="p-4 text-center bg-white rounded-4 shadow-sm text-muted">No lost reports found.</div>}
            </div>

            {/* Found Items List */}
            <div>
              <h6 className="text-success fw-bold text-uppercase small mb-3">🟢 My Found Item Reports</h6>
              {myFound.length > 0 ? myFound.map(item => (
                <div key={item.id} className="card border-0 shadow-sm mb-3 p-3" style={{ borderRadius: '16px' }}>
                  <div className="d-flex align-items-center">
                    <div className="bg-success-subtle rounded-3 p-3 me-3 text-success d-none d-sm-block">🎁</div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="fw-bold mb-1 text-dark text-capitalize">{item.title}</h6>
                        {item.status === 'resolved' && <span className="badge bg-success small">Claimed</span>}
                      </div>
                      <p className="text-muted small mb-0">📍 {item.location} • {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Link to={`/found/${item.id}`} className="btn btn-light btn-sm rounded-pill px-3">View</Link>
                      <button onClick={() => deleteItem('found', item.id)} className="btn btn-outline-danger btn-sm rounded-pill px-3 border-0">Delete</button>
                    </div>
                  </div>
                </div>
              )) : <div className="p-4 text-center bg-white rounded-4 shadow-sm text-muted">No found reports found.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;