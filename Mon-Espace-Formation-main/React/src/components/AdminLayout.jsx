import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaBell, FaCog, FaSignOutAlt, FaChartBar, FaUsers, 
  FaCalendarAlt, FaChalkboardTeacher, FaCertificate, FaHome
} from 'react-icons/fa';
import './AdminLayout.css';

/**
 * Layout d'administration réutilisable
 * Affiche le header, la navigation et le contenu des pages admin
 */
const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/connexion');
  };

  // Gestion du retour au site public
  const handleBackToSite = () => {
    navigate('/');
  };

  const tabs = [
    { path: '/admin', label: 'Vue d\'ensemble', icon: FaChartBar },
    { path: '/admin/inscriptions', label: 'Inscriptions', icon: FaUsers },
    { path: '/admin/sessions', label: 'Sessions', icon: FaCalendarAlt },
    { path: '/admin/formateurs', label: 'Formateurs', icon: FaChalkboardTeacher },
    { path: '/admin/attestations', label: 'Attestations', icon: FaCertificate },
  ];

  return (
    <div className="admin-wrapper">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <div className="admin-logo">
              <div className="admin-logo-icon">🏢</div>
              <div>
                <h1 className="admin-title">TXLFORMA - Gestion Administration</h1>
                <p className="admin-subtitle">Tableau de bord de Gestion</p>
              </div>
            </div>
          </div>
          <div className="admin-header-right">
            <button 
              className="admin-header-btn-text" 
              onClick={handleBackToSite}
              title="Voir le site"
            >
              <FaHome />
              <span>Voir le site</span>
            </button>
            <button className="admin-header-icon" title="Notifications">
              <FaBell />
              <span className="admin-badge">1</span>
            </button>
            <button className="admin-header-icon" title="Paramètres">
              <FaCog />
            </button>
            <div className="admin-user">
              <span className="admin-user-icon">👤</span>
              <div>
                <div className="admin-user-name">Admin</div>
                <div className="admin-user-role">Administrateur</div>
              </div>
            </div>
            <button className="admin-header-icon" onClick={handleLogout} title="Déconnexion">
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <div className="admin-nav-content">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`admin-nav-tab ${isActive ? 'active' : ''}`}
              >
                <Icon className="admin-nav-icon" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

