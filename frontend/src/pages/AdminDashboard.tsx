import { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [lostItems, setLostItems] = useState<any[]>([]);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [tab, setTab] = useState<'items' | 'users'>('items');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const lostRes = await API.get('/lost');
      const foundRes = await API.get('/found');
      const usersRes = await API.get('/admin/users');

      setLostItems(lostRes.data.data || lostRes.data);
      setFoundItems(foundRes.data.data || foundRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Admin data fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const deleteItem = async (id: number, type: 'lost' | 'found') => {
    if (window.confirm("🚨 Are you sure? This action cannot be undone.")) {
      try {
        await API.delete(`/admin/${type}/${id}`);
        fetchAdminData();
      } catch (err) {
        alert("Error deleting item");
      }
    }
  };

  if (loading) return <div className="text-center mt-5 p-5"><div className="spinner-border text-dark"></div></div>;

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* --- Admin Header Section --- */}
      <div className="bg-dark text-white py-5 mb-4 shadow">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1" style={{ letterSpacing: '-1px' }}>🛠️ Control Center</h1>
              <p className="text-muted mb-0">Manage community reports and registered members</p>
            </div>
            <button onClick={fetchAdminData} className="btn btn-outline-light btn-sm rounded-pill px-3">
              Refresh Data
            </button>
          </div>

          {/* --- Quick Stats --- */}
          <div className="row mt-4 g-3">
            <div className="col-md-3">
              <div className="card bg-secondary text-white border-0 shadow-sm p-3 rounded-4">
                <small className="opacity-75">Total Users</small>
                <h3 className="fw-bold m-0">{users.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-danger text-white border-0 shadow-sm p-3 rounded-4">
                <small className="opacity-75">Lost Reports</small>
                <h3 className="fw-bold m-0">{lostItems.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white border-0 shadow-sm p-3 rounded-4">
                <small className="opacity-75">Found Items</small>
                <h3 className="fw-bold m-0">{foundItems.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* --- Aesthetic Tab Navigation --- */}
        <div className="d-flex bg-white p-2 rounded-pill shadow-sm mb-4 border w-fit-content mx-auto" style={{ width: 'fit-content' }}>
          <button 
            className={`btn rounded-pill px-4 fw-bold ${tab === 'items' ? 'btn-dark' : 'btn-light'}`}
            onClick={() => setTab('items')}
          >
            All Items
          </button>
          <button 
            className={`btn rounded-pill px-4 fw-bold ${tab === 'users' ? 'btn-dark' : 'btn-light'}`}
            onClick={() => setTab('users')}
          >
            User Database
          </button>
        </div>

        {tab === 'items' ? (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="text-muted small text-uppercase">
                    <th className="ps-4">Item Details</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Reporter</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...lostItems.map(i => ({...i, type: 'lost'})), ...foundItems.map(i => ({...i, type: 'found'}))].map((item) => (
                    <tr key={`${item.type}-${item.id}`}>
                      <td className="ps-4 py-3">
                        <div className="fw-bold text-dark">{item.title}</div>
                        <small className="text-muted">ID: #{item.id}</small>
                      </td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${item.type === 'lost' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                          {item.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-muted small">{item.location}</td>
                      <td>
                        <div className="fw-medium small text-dark">{item.createdBy?.name || 'Unknown'}</div>
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{item.createdBy?.email}</div>
                      </td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-outline-danger border-0 rounded-circle" 
                                style={{ width: '32px', height: '32px', padding: '0' }}
                                onClick={() => deleteItem(item.id, item.type as any)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="text-muted small text-uppercase">
                    <th className="ps-4">User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{ width: '35px', height: '35px', fontWeight: 'bold' }}>
                            {user.name.charAt(0)}
                          </div>
                          <div className="fw-bold">{user.name}</div>
                        </div>
                      </td>
                      <td className="text-muted">{user.email}</td>
                      <td>
                        <span className="badge bg-info-subtle text-info rounded-pill px-3 py-2 text-uppercase" style={{ fontSize: '0.7rem' }}>
                          {user.role}
                        </span>
                      </td>
                      <td className="text-muted small">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;