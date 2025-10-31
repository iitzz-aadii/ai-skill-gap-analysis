import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Results from './pages/Results';
import Chat from './pages/Chat';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/results" element={<Layout><Results /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/progress" element={<Layout><Progress /></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
