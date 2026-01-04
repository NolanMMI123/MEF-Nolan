import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Settings, User, LogOut, 
  TrendingUp, Calendar, FileText, Award,
  Download, Plus, Users, FileCheck,
  AlertCircle, CheckCircle2, Clock,
  MapPin, ArrowUpRight, Building2, Eye,
  Search, Filter, BarChart3, UserCircle,
  CreditCard, Shield, Info, Star,
  Mail, Phone, ChevronLeft
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

  // Fonction pour charger les sessions depuis MongoDB
  const [sessionsData, setSessionsData] = useState([]);
  const [inscriptionsData, setInscriptionsData] = useState([]);

  useEffect(() => {
    if (activeTab === 'sessions' || activeTab === 'inscriptions') {
      fetchSessionsData();
      fetchInscriptionsData();
    }
  }, [activeTab]);

  const fetchSessionsData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessionsData(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
    }
  };

  const fetchInscriptionsData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/inscriptions');
      if (response.ok) {
        const data = await response.json();
        setInscriptionsData(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
    }
  };

  // Fonctions de rendu pour chaque onglet
  const renderOverviewTab = () => (
    <>
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
            <button className="btn-link" onClick={() => setActiveTab('inscriptions')}>Voir tout &gt;</button>
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
              <button className="btn-quick-action primary" onClick={() => setActiveTab('sessions')}>
                <Calendar size={18} />
                Créer une session
              </button>
              <button className="btn-quick-action">
                <FileText size={18} />
                Nouvelle formation
              </button>
              <button className="btn-quick-action" onClick={() => setActiveTab('formateurs')}>
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
    </>
  );

  const renderSessionsTab = () => {
    // Données mockées pour les sessions (sera remplacé par l'API)
    const sessions = sessionsData.length > 0 ? sessionsData : [
      {
        id: 'SESS-2025-008',
        title: 'Développement Front-End avec React',
        dates: '15-19 Janvier 2025',
        location: 'Paris',
        trainer: 'Jean-Pierre Martin',
        enrolled: 12,
        capacity: 15,
        status: 'confirmé',
        attendance: { total: 120, completed: 0 }
      },
      {
        id: 'SESS-2025-009',
        title: 'Développement Front-End avec React',
        dates: '22-26 Janvier 2025',
        location: 'Lyon',
        trainer: 'Alice Romainville',
        enrolled: 10,
        capacity: 12,
        status: 'confirmé',
        attendance: { total: 100, completed: 0 }
      },
      {
        id: 'SESS-2025-010',
        title: 'Développement Front-End avec React',
        dates: '29 Jan - 2 Fév 2025',
        location: 'Paris',
        trainer: 'Lionel Prigent',
        enrolled: 8,
        capacity: 15,
        status: 'confirmé',
        attendance: { total: 80, completed: 0 }
      },
      {
        id: 'SESS-2025-011',
        title: 'Développement Front-End avec React',
        dates: '5-9 Février 2025',
        location: 'Bordeaux',
        trainer: 'Roger Durand',
        enrolled: 6,
        capacity: 12,
        status: 'peu d\'inscrits',
        attendance: { total: 60, completed: 0 }
      }
    ];

    return (
      <div className="admin-main" style={{ width: '100%' }}>
        <div className="admin-card">
          <div className="card-header-blue">
            <div>
              <h2>Gestion des sessions</h2>
              <p className="card-subtitle">Planification et suivi des sessions de formation</p>
            </div>
            <button className="btn-export" style={{ backgroundColor: 'var(--admin-accent-yellow)', color: 'var(--admin-text-dark)' }}>
              <Calendar size={16} />
              Créer une session
            </button>
          </div>
          <div className="card-body">
            <div className="sessions-management-list">
              {sessions.map((session, index) => {
                const fillRate = session.capacity > 0 ? (session.enrolled / session.capacity * 100).toFixed(0) : 0;
                return (
                  <div key={index} className="session-management-card">
                    <div className="session-card-header">
                      <div className="session-id">{session.id}</div>
                      <span className={`session-status-badge ${session.status === 'confirmé' ? 'confirmed' : 'low-enrollment'}`}>
                        {session.status}
                      </span>
                    </div>
                    <div className="session-card-body">
                      <div className="session-card-title">{session.title}</div>
                      <div className="session-card-info">
                        <div className="session-info-item">
                          <Calendar size={16} />
                          <span>{session.dates}</span>
                        </div>
                        <div className="session-info-item">
                          <MapPin size={16} />
                          <span>{session.location}</span>
                        </div>
                        <div className="session-info-item">
                          <UserCircle size={16} />
                          <span>{session.trainer}</span>
                        </div>
                      </div>
                      <div className="session-card-stats">
                        <div className="session-stat-item">
                          <div className="session-stat-label">Taux de remplissage</div>
                          <div className="session-stat-value">{session.enrolled}/{session.capacity}</div>
                          <div className="session-progress-bar">
                            <div 
                              className="session-progress-fill" 
                              style={{ width: `${fillRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="session-stat-item">
                          <div className="session-stat-label">Émargements</div>
                          <div className="session-stat-value">{session.attendance.completed}/{session.attendance.total}</div>
                        </div>
                      </div>
                      <div className="session-card-actions">
                        <button className="btn-session-action">
                          <Eye size={16} />
                          Détails
                        </button>
                        <button className="btn-session-action">
                          <FileText size={16} />
                          Émargement
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInscriptionsTab = () => {
    return (
      <div className="admin-main" style={{ width: '100%' }}>
        <div className="admin-card">
          <div className="card-header-blue">
            <div>
              <h2>Gestion des inscriptions</h2>
              <p className="card-subtitle">Liste complète des inscriptions</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Rechercher ..." />
              </div>
              <button className="btn-export">
                <Filter size={16} />
                Filtres
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="inscriptions-placeholder">
              <Users size={64} style={{ color: 'var(--admin-text-muted)', marginBottom: '16px' }} />
              <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--admin-text-dark)', marginBottom: '8px' }}>
                Liste détaillée des inscriptions avec filtres avancés
              </div>
              <div style={{ fontSize: '14px', color: 'var(--admin-text-muted)' }}>
                Recherche par nom, email, formation, statut, dates ...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFormateursTab = () => {
    const formateurs = [
      {
        id: 1,
        name: 'Jean-Pierre Martin',
        initials: 'JM',
        rating: 4.8,
        skills: ['React', 'TypeScript', 'JavaScript'],
        currentSessions: 1,
        totalSessions: 24,
        email: 'jp.martin@txlforma.fr',
        phone: '06 12 34 56 78'
      },
      {
        id: 2,
        name: 'Alice Romainville',
        initials: 'AR',
        rating: 4.9,
        skills: ['Cybersécurité', 'Réseaux'],
        currentSessions: 1,
        totalSessions: 31,
        email: 'a.romainville@txlforma.fr',
        phone: '06 23 45 67 89'
      },
      {
        id: 3,
        name: 'Lionel Prigent',
        initials: 'LP',
        rating: 4.7,
        skills: ['Linux', 'Administration système'],
        currentSessions: 1,
        totalSessions: 28,
        email: 'l.prigent@txlforma.fr',
        phone: '06 34 56 78 90'
      },
      {
        id: 4,
        name: 'Roger Durand',
        initials: 'RD',
        rating: 4.8,
        skills: ['Node.js', 'PHP', 'Bases de données'],
        currentSessions: 1,
        totalSessions: 22,
        email: 'r.durand@txlforma.fr',
        phone: '06 45 67 89 01'
      }
    ];

    return (
      <div className="admin-main" style={{ width: '100%' }}>
        <div className="admin-card">
          <div className="card-header-blue">
            <div>
              <h2>Gestion des formateurs</h2>
              <p className="card-subtitle">Suivi des formateurs et de leurs sessions</p>
            </div>
            <button className="btn-export">
              <Users size={16} />
              Ajouter un formateur
            </button>
          </div>
          <div className="card-body">
            <div className="formateurs-grid">
              {formateurs.map((formateur) => (
                <div key={formateur.id} className="formateur-card">
                  <div className="formateur-avatar">{formateur.initials}</div>
                  <div className="formateur-name">{formateur.name}</div>
                  <div className="formateur-rating">
                    {'★'.repeat(Math.floor(formateur.rating))}
                    <span style={{ marginLeft: '4px' }}>{formateur.rating}</span>
                  </div>
                  <div className="formateur-skills">
                    {formateur.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="formateur-stats">
                    <div className="formateur-stat">
                      <span className="stat-label">Sessions en cours</span>
                      <span className="stat-badge">{formateur.currentSessions}</span>
                    </div>
                    <div className="formateur-stat">
                      <span className="stat-label">Total de sessions</span>
                      <span>{formateur.totalSessions}</span>
                    </div>
                  </div>
                  <div className="formateur-contact">
                    <div className="contact-item">
                      <Mail size={14} />
                      <span>{formateur.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={14} />
                      <span>{formateur.phone}</span>
                    </div>
                  </div>
                  <div className="formateur-actions">
                    <button className="btn-formateur-action">
                      <Eye size={16} />
                      Profil
                    </button>
                    <button className="btn-formateur-action">
                      <Calendar size={16} />
                      Planning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAttestationsTab = () => {
    const attestationsToGenerate = [
      {
        id: 'INS-2024-001156',
        name: 'Laurent Mercier',
        course: 'React & TypeScript',
        session: '11-15 Nov 2024',
        presence: 100
      },
      {
        id: 'INS-2024-001158',
        name: 'Nathalie Blanc',
        course: 'Cybersécurité Avancée',
        session: '11-15 Nov 2024',
        presence: 100
      },
      {
        id: 'INS-2024-001162',
        name: 'Pierre Duval',
        course: 'Administration Linux',
        session: '11-15 Nov 2024',
        presence: 100
      }
    ];

    const quarterlyStats = [
      { quarter: 'T1 2024', count: 28 },
      { quarter: 'T2 2024', count: 42 },
      { quarter: 'T3 2024', count: 53 },
      { quarter: 'T4 2024', count: 33 }
    ];

    const maxCount = Math.max(...quarterlyStats.map(s => s.count));

    return (
      <div className="admin-main" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Colonne gauche - Attestations à générer */}
        <div className="admin-card">
          <div className="card-header-blue">
            <div>
              <h2>Attestations à générer</h2>
              <p className="card-subtitle">Formations terminées avec émargement complet</p>
            </div>
          </div>
          <div className="card-body">
            <div className="attestations-to-generate-list">
              {attestationsToGenerate.map((att, index) => (
                <div key={index} className="attestation-item">
                  <div className="attestation-info">
                    <div className="attestation-name">{att.name}</div>
                    <div className="attestation-course">{att.course}</div>
                    <div className="attestation-session">Session: {att.session}</div>
                    <div className="attestation-id">{att.id}</div>
                  </div>
                  <div className="attestation-details">
                    <div className="attestation-presence">
                      <CheckCircle2 size={16} style={{ color: 'var(--admin-success)' }} />
                      <span>{att.presence}%</span>
                    </div>
                    <button className="btn-generate-pdf">
                      <Download size={16} />
                      Générer PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne droite - Statistiques */}
        <div className="admin-card">
          <div className="card-header-blue">
            <div>
              <h2>Statistiques 2024</h2>
              <p className="card-subtitle">Attestations générées cette année</p>
            </div>
          </div>
          <div className="card-body">
            <div className="attestations-stats">
              <div className="stats-main">
                <Award size={64} style={{ color: 'var(--admin-text-muted)', marginBottom: '16px' }} />
                <div className="stats-main-value">156</div>
                <div className="stats-main-label">Attestations générées</div>
              </div>
              <div className="stats-cards">
                <div className="stat-mini-card">
                  <div className="stat-mini-value">3</div>
                  <div className="stat-mini-label">En attente</div>
                </div>
                <div className="stat-mini-card">
                  <div className="stat-mini-value">46</div>
                  <div className="stat-mini-label">Refusées</div>
                </div>
              </div>
              <div className="quarterly-distribution">
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Répartition par trimestre</h3>
                {quarterlyStats.map((stat, index) => (
                  <div key={index} className="quarter-item">
                    <div className="quarter-label">{stat.quarter}</div>
                    <div className="quarter-bar-container">
                      <div 
                        className="quarter-bar-fill" 
                        style={{ width: `${(stat.count / maxCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="quarter-value">{stat.count}</div>
                  </div>
                ))}
              </div>
              <button className="btn-export" style={{ width: '100%', marginTop: '24px' }}>
                <Download size={16} />
                Exporter le rapport annuel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsTab = () => {
    return (
      <div className="admin-main" style={{ width: '100%', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
        {/* Sidebar gauche */}
        <div className="admin-card">
          <div className="card-body">
            <button 
              className="settings-back-btn"
              onClick={() => setActiveTab('overview')}
            >
              <ChevronLeft size={16} />
              Retour au tableau de bord
            </button>
            <div className="settings-sidebar">
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Paramètres de la plateforme</h3>
              <p style={{ fontSize: '12px', color: 'var(--admin-text-muted)', marginBottom: '24px' }}>
                Configuration globale de Mon Espace Formation
              </p>
              <div className="settings-menu-item active">
                <CreditCard size={18} />
                <span>Paiement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="admin-card">
          <div className="card-header-blue">
            <h2>Paramètres</h2>
            <button className="btn-export">
              <Download size={16} />
              Enregistrer les modifications
            </button>
          </div>
          <div className="card-body">
            {/* Configuration Stripe */}
            <div className="settings-section">
              <div className="settings-section-header">
                <FileText size={20} />
                <div>
                  <h3>Configuration Stripe</h3>
                  <p className="card-subtitle">Paramètres du système de paiement en ligne</p>
                </div>
              </div>
              <div className="settings-warning-box">
                <Shield size={16} />
                <span>Les clés API Stripe sont sensibles. Ne les partagez jamais publiquement.</span>
              </div>
              <div className="settings-form-group">
                <label>Clé publique Stripe</label>
                <input type="text" placeholder="pk_test_..." defaultValue="pk_test_..." />
              </div>
              <div className="settings-form-group">
                <label>Clé secrète Stripe</label>
                <input type="password" placeholder="sk_test_..." defaultValue="sk_test_..." />
              </div>
            </div>

            {/* Paiement intégral obligatoire */}
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3>Paiement intégral obligatoire</h3>
                </div>
                <div className="toggle-switch active">
                  <div className="toggle-slider"></div>
                </div>
              </div>
              <div className="settings-info-box">
                <Info size={16} />
                <span>Paiement intégral obligatoire. Le paiement intégral est obligatoire pour valider toute inscription. Cette option ne peut pas être désactivée.</span>
              </div>
            </div>

            {/* Politique d'annulation */}
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3>€ Politique d'annulation et remboursement</h3>
                </div>
              </div>
              <div className="settings-form-group">
                <label>Délai d'annulation (jours)</label>
                <input type="number" defaultValue="7" />
                <p className="settings-help-text">Nombre de jours avant la formation pour annuler</p>
              </div>
              <div className="settings-form-group">
                <label>Taux de remboursement (%)</label>
                <input type="number" defaultValue="80" />
                <p className="settings-help-text">Pourcentage remboursé en cas d'annulation dans les délais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            <button 
              className="header-icon-btn"
              onClick={() => setActiveTab('settings')}
            >
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
            <BarChart3 size={16} />
            Vue d'ensemble
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('inscriptions')}
          >
            <Users size={16} />
            Inscriptions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`}
            onClick={() => setActiveTab('sessions')}
          >
            <Calendar size={16} />
            Sessions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'formateurs' ? 'active' : ''}`}
            onClick={() => setActiveTab('formateurs')}
          >
            <UserCircle size={16} />
            Formateurs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'attestations' ? 'active' : ''}`}
            onClick={() => setActiveTab('attestations')}
          >
            <Award size={16} />
            Attestations
          </button>
        </div>

        <div className="admin-content">
          {/* RENDU CONDITIONNEL SELON L'ONGLET ACTIF */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'sessions' && renderSessionsTab()}
          {activeTab === 'inscriptions' && renderInscriptionsTab()}
          {activeTab === 'formateurs' && renderFormateursTab()}
          {activeTab === 'attestations' && renderAttestationsTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

