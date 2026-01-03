import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Settings, User, LogOut, 
  TrendingUp, Calendar, FileText, Award,
  Download, Plus, Users, FileCheck,
  AlertCircle, CheckCircle2, Clock,
  MapPin, ArrowUpRight, Building2
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Vérification que l'utilisateur est admin
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/connexion');
      return;
    }
    
    const user = JSON.parse(userStr);
    // Vérifier si c'est l'admin (email admintxl ou role ADMIN)
    if (user.email !== 'admintxl' && user.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }

    // Charger les données du dashboard depuis MongoDB
    fetchDashboardData();
  }, [navigate]);

  // Fonction pour charger les données depuis l'API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/admin/dashboard');
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Erreur lors du chargement des données');
        // En cas d'erreur, utiliser des données par défaut
        setDashboardData(getDefaultData());
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      // En cas d'erreur, utiliser des données par défaut
      setDashboardData(getDefaultData());
    } finally {
      setLoading(false);
    }
  };

  // Données par défaut en cas d'erreur
  const getDefaultData = () => ({
    kpis: {
      inscriptionsEnCours: 0,
      inscriptionsChange: '+0% vs mois dernier',
      caTrimestre: '0 €',
      caChange: '+0% vs T3 2024',
      prochainesSessions: 0,
      tauxRemplissage: '0%',
      attestations: 0,
      attestationsChange: '+0% vs 2023'
    },
    quarterlyStats: {
      totalInscriptions: 0,
      validated: 0,
      cancelled: 0,
      totalRevenue: '0 €',
      conversionRate: '0%',
      attendanceRate: '0%'
    },
    categoryDistribution: [],
    monthlyRevenue: [],
    recentInscriptions: [],
    alerts: [],
    upcomingSessions: []
  });

  // Extraire les données pour l'affichage
  const defaultData = getDefaultData();
  const kpiData = dashboardData ? {
    inscriptions: { 
      value: dashboardData.kpis.inscriptionsEnCours, 
      change: dashboardData.kpis.inscriptionsChange ? dashboardData.kpis.inscriptionsChange.split(' ')[0] : '+0%', 
      period: dashboardData.kpis.inscriptionsChange ? dashboardData.kpis.inscriptionsChange.split(' ').slice(1).join(' ') : 'vs mois dernier'
    },
    ca: { 
      value: dashboardData.kpis.caTrimestre, 
      change: dashboardData.kpis.caChange ? dashboardData.kpis.caChange.split(' ')[0] : '+0%', 
      period: dashboardData.kpis.caChange ? dashboardData.kpis.caChange.split(' ').slice(1).join(' ') : 'vs T3 2024'
    },
    sessions: { 
      value: dashboardData.kpis.prochainesSessions, 
      fillRate: dashboardData.kpis.tauxRemplissage || '0%'
    },
    attestations: { 
      value: dashboardData.kpis.attestations, 
      change: dashboardData.kpis.attestationsChange ? dashboardData.kpis.attestationsChange.split(' ')[0] : '+0%', 
      period: dashboardData.kpis.attestationsChange ? dashboardData.kpis.attestationsChange.split(' ').slice(1).join(' ') : 'vs 2023'
    }
  } : {
    inscriptions: { value: 0, change: '+0%', period: 'vs mois dernier' },
    ca: { value: '0 €', change: '+0%', period: 'vs T3 2024' },
    sessions: { value: 0, fillRate: '0%' },
    attestations: { value: 0, change: '+0%', period: 'vs 2023' }
  };

  const quarterlyStats = dashboardData ? dashboardData.quarterlyStats : defaultData.quarterlyStats;
  const categories = dashboardData ? dashboardData.categoryDistribution : [];
  const monthlyRevenue = dashboardData ? dashboardData.monthlyRevenue : [];
  const recentInscriptions = dashboardData ? dashboardData.recentInscriptions : [];
  const alerts = dashboardData ? dashboardData.alerts : [];
  const upcomingSessions = dashboardData ? dashboardData.upcomingSessions : [];

  if (loading) {
    return (
      <div className="admin-dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div>Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* HEADER ADMIN */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <Building2 size={20} className="logo-icon" style={{ color: 'var(--admin-accent-yellow)' }} />
            <span className="logo-m">TXL</span>FORMA
            <span className="logo-subtitle">- Gestion Administration</span>
          </div>
          <div className="admin-header-actions">
            <button className="header-icon-btn">
              <Bell size={20} />
              <span className="notification-badge">1</span>
            </button>
            <button className="header-icon-btn">
              <Settings size={20} />
              <span>Paramètres</span>
            </button>
            <div className="admin-profile">
              <User size={18} />
              <span>Admin Administrateur</span>
            </div>
            <button 
              className="header-icon-btn"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('userEmail');
                navigate('/connexion');
              }}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        {/* KPI CARDS */}
        <div className="kpi-section">
          <div className="kpi-card">
            <div className="kpi-label">Inscriptions en cours</div>
            <div className="kpi-value">{kpiData.inscriptions.value}</div>
            <div className="kpi-change positive">
              <TrendingUp size={14} />
              <span>{kpiData.inscriptions.change} {kpiData.inscriptions.period}</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">CA Trimestre</div>
            <div className="kpi-value">{kpiData.ca.value}</div>
            <div className="kpi-change positive">
              <TrendingUp size={14} />
              <span>{kpiData.ca.change} {kpiData.ca.period}</span>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Prochaines sessions</div>
            <div className="kpi-value">{kpiData.sessions.value}</div>
            <div className="kpi-info">Taux de remplissage {kpiData.sessions.fillRate}</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Attestations 2024</div>
            <div className="kpi-value">{kpiData.attestations.value}</div>
            <div className="kpi-change positive">
              <TrendingUp size={14} />
              <span>{kpiData.attestations.change} {kpiData.attestations.period}</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Vue d'ensemble
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('inscriptions')}
          >
            Inscriptions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`}
            onClick={() => setActiveTab('sessions')}
          >
            Sessions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'formateurs' ? 'active' : ''}`}
            onClick={() => setActiveTab('formateurs')}
          >
            Formateurs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'attestations' ? 'active' : ''}`}
            onClick={() => setActiveTab('attestations')}
          >
            Attestations
          </button>
        </div>

        <div className="admin-content">
          {/* MAIN CONTENT */}
          <div className="admin-main">
            {/* STATISTIQUES TRIMESTRIELLES */}
            <div className="admin-card">
              <div className="card-header-blue">
                <div>
                  <h2>Statistiques Trimestrielles</h2>
                  <p className="card-subtitle">T4 2025 (Oct - Nov - Déc)</p>
                </div>
                <button className="btn-export">
                  <Download size={16} />
                  Exporter
                </button>
              </div>
              <div className="card-body">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Total Inscriptions</div>
                    <div className="stat-value">{quarterlyStats.totalInscriptions}</div>
                    <div className="stat-detail">
                      <span className="text-success">{quarterlyStats.validated} validées</span>
                      <span className="text-danger ms-2">{quarterlyStats.cancelled} annulées</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Revenu Total</div>
                    <div className="stat-value">{quarterlyStats.totalRevenue}</div>
                    <div className="stat-detail">
                      Taux de conversion : {quarterlyStats.conversionRate}
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Taux de présence moyen</div>
                    <div className="stat-value">{quarterlyStats.attendanceRate}</div>
                    <div className="stat-detail text-success">
                      Excellente assiduité
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RÉPARTITION PAR CATÉGORIE */}
            <div className="admin-card">
              <div className="card-header-blue">
                <h2>Répartition par catégorie</h2>
              </div>
              <div className="card-body">
                <div className="category-list">
                  {categories.map((cat, index) => (
                    <div key={index} className="category-item">
                      <div className="category-info">
                        <div className="category-name">{cat.name}</div>
                        <div className="category-details">
                          {cat.inscriptions} inscriptions • {cat.revenue} • {cat.percentage}%
                        </div>
                      </div>
                      <div className="category-bar">
                        <div 
                          className="category-bar-fill" 
                          style={{ width: `${cat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ÉVOLUTION MENSUELLE DU CA */}
            <div className="admin-card">
              <div className="card-header-blue">
                <h2>Évolution mensuelle du CA</h2>
              </div>
              <div className="card-body">
                <div className="monthly-revenue">
                  {monthlyRevenue.map((month, index) => (
                    <div key={index} className="month-item">
                      <div className="month-name">{month.month}</div>
                      <div className="month-amount">{month.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* INSCRIPTIONS RÉCENTES */}
            <div className="admin-card">
              <div className="card-header-blue">
                <div>
                  <h2>Dernières inscriptions validées</h2>
                </div>
                <button className="btn-link">Voir tout &gt;</button>
              </div>
              <div className="card-body">
                <div className="inscriptions-list">
                  {recentInscriptions.map((insc, index) => (
                    <div key={index} className="inscription-item">
                      <div className="inscription-avatar">{insc.avatar}</div>
                      <div className="inscription-details">
                        <div className="inscription-name">{insc.name}</div>
                        <div className="inscription-id">{insc.id}</div>
                        <div className="inscription-email">{insc.email}</div>
                        <div className="inscription-company">{insc.company}</div>
                      </div>
                      <div className="inscription-training">
                        <div className="training-name">{insc.training}</div>
                        <div className="training-session">Session: {insc.session}</div>
                      </div>
                      <div className="inscription-payment">
                        <div className="payment-amount">{insc.amount}</div>
                        <div className="payment-status success">{insc.status}</div>
                        <div className="payment-date">{insc.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="admin-sidebar">
            {/* ACTIONS RAPIDES */}
            <div className="admin-card">
              <div className="card-header-blue">
                <h2>Actions Rapides</h2>
              </div>
              <div className="card-body">
                <div className="quick-actions">
                  <button className="btn-quick-action primary">
                    <Calendar size={18} />
                    Créer une session
                  </button>
                  <button className="btn-quick-action">
                    <FileText size={18} />
                    Nouvelle formation
                  </button>
                  <button className="btn-quick-action">
                    <Users size={18} />
                    Ajouter un formateur
                  </button>
                  <button className="btn-quick-action">
                    <Download size={18} />
                    Export trimestre
                  </button>
                </div>
              </div>
            </div>

            {/* ALERTES */}
            <div className="admin-card">
              <div className="card-header-blue">
                <h2>Alertes</h2>
              </div>
              <div className="card-body">
                <div className="alerts-list">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`alert-item ${alert.type}`}>
                      <AlertCircle size={16} />
                      <div>
                        <div className="alert-text">{alert.text}</div>
                        <div className="alert-detail">{alert.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SESSIONS À VENIR */}
            <div className="admin-card">
              <div className="card-header-blue">
                <h2>Sessions à venir</h2>
              </div>
              <div className="card-body">
                <div className="sessions-list">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="session-item">
                      <div className="session-title">{session.title}</div>
                      <div className="session-dates">
                        <Calendar size={14} />
                        {session.dates}
                      </div>
                      <div className="session-enrollment">
                        {session.enrolled}/{session.capacity} inscrits
                      </div>
                      <div className="session-location">
                        <MapPin size={14} />
                        {session.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

