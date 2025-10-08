import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VistaMesero from './pages/VistaMesero';
import VistaMesas from './pages/VistaMesas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mesero" element={<VistaMesero />} />
        <Route path="/mesas" element={<VistaMesas />} />
      </Routes>
    </Router>
  );
}

export default App
