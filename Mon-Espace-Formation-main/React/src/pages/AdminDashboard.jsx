import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import './AdminDashboard.css';

/**
 * Page principale du dashboard d'administration
 * Affiche les statistiques globales et un aperçu des données
 */
const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/dashboard/summary');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des statistiques');
        }
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Chargement des données...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-error">
          <p>Erreur: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h2 className="admin-page-title">Tableau de bord</h2>

        {/* Statistiques principales */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">👥</div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{summary?.totalInscriptions || 0}</div>
              <div className="admin-stat-label">Inscriptions en cours</div>
              <div className="admin-stat-trend positive">+12% vs mois dernier</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">€</div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{summary?.totalTrainings || 0}</div>
              <div className="admin-stat-label">Formations disponibles</div>
              <div className="admin-stat-trend positive">+8.5% vs trimestre précédent</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📅</div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{summary?.totalSessions || 0}</div>
              <div className="admin-stat-label">Sessions à venir</div>
              <div className="admin-stat-detail">Taux de remplissage 75%</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📜</div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{summary?.totalUsers || 0}</div>
              <div className="admin-stat-label">Utilisateurs total</div>
              <div className="admin-stat-trend positive">+18% vs année précédente</div>
            </div>
          </div>
        </div>

        {/* Message d'information */}
        <div className="admin-info-box">
          <p>Bienvenue dans le tableau de bord d'administration.</p>
          <p>Utilisez les onglets de navigation pour accéder aux différentes sections : Inscriptions, Sessions, Formateurs, Attestations.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

