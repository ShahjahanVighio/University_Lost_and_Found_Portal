import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ItemDetails from './pages/ItemDetails';
import PostLost from './pages/PostLost';
import PostFound from './pages/PostFound';
import ProtectedRoute from './components/ProtectedRoute'; // Import karein
// Pehle import kar lein
import AdminDashboard from './pages/AdminDashboard'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Normal Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/post-lost" element={<ProtectedRoute><PostLost /></ProtectedRoute>} />
        <Route path="/post-found" element={<ProtectedRoute><PostFound /></ProtectedRoute>} />
        <Route path="/:type/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />

        {/* ✅ ADMIN ROUTE: Isko admin role ke sath protect karein */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}export default App;