import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// --- IMPORTS DES PAGES ---
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register'; // Inscription au site (Compte)
import CourseDetails from './pages/FormationDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard'; 
import Salle3D from "./pages/Salle3D";
import AdminDashboard from './pages/AdminDashboard';

// 👇 1. IMPORT DE LA PAGE DE PAIEMENT
import InscriptionPage from './pages/InscriptionPage'; 
// 👇 AJOUT : IMPORT DE LA PAGE DE SUCCÈS
import RegistrationSuccess from './pages/RegistrationSuccess';

// Composant de protection de route pour les administrateurs
const ProtectedAdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  
  if (role === 'ADMIN') {
    return children;
  } else {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas admin
    return <Navigate to="/connexion" replace />;
  }
};

function App() {
  const location = useLocation();
  
  // On cache le header/footer sur les pages de connexion/inscription compte
  const isAuthPage = location.pathname === '/connexion' || location.pathname === '/inscription-compte';

  // Scroll en haut de page à chaque changement de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">

      {!isAuthPage && <Header />}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Salle 3D */}
          <Route path="/salle" element={<Salle3D />} />

          {/* Catalogue des formations */}
          <Route path="/formations" element={<Catalogue />} />
          
          {/* Détail d'une formation */}
          <Route path="/formations/:id" element={<CourseDetails />} />
          
          {/* 👇 2. LA ROUTE POUR LE PAIEMENT (Lien depuis CourseDetails) */}
          <Route path="/inscription/:id" element={<InscriptionPage />} />

          {/* 👇 AJOUT : LA ROUTE DE CONFIRMATION D'INSCRIPTION */}
          <Route path="/succes-inscription" element={<RegistrationSuccess />} />

          {/* Connexion / Inscription au site */}
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          
          {/* Espace membre */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Espace admin - Route protégée */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;