import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { FaEye, FaFileAlt, FaPlus } from 'react-icons/fa';
import './ManageSessions.css';

/**
 * Page de gestion des sessions
 * Affiche la liste des sessions de formation
 */
const ManageSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sessions');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des sessions');
        }
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString;
  };

  // Calculer le taux de remplissage
  const getFillRate = (session) => {
    if (!session.placesTotales) return 0;
    const reserved = session.placesReservees || 0;
    return Math.round((reserved / session.placesTotales) * 100);
  };

  // Obtenir le statut de la session
  const getSessionStatus = (session) => {
    const fillRate = getFillRate(session);
    if (fillRate >= 100) return { label: 'Complet', class: 'full' };
    if (fillRate >= 75) return { label: 'Confirmé', class: 'confirmed' };
    if (fillRate >= 50) return { label: 'En cours', class: 'in-progress' };
    if (fillRate > 0) return { label: 'Peu d\'inscrits', class: 'low' };
    return { label: 'Vide', class: 'empty' };
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Chargement des sessions...</p>
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
      <div className="manage-sessions">
        <div className="manage-header">
          <div>
            <h2 className="admin-page-title">Gestion des sessions</h2>
            <p className="admin-page-subtitle">Planification et suivi des sessions de formation</p>
          </div>
          <button className="admin-btn-primary">
            <FaPlus />
            Créer une session
          </button>
        </div>

        {/* Liste des sessions */}
        {sessions.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">📅</div>
            <p>Aucune session disponible</p>
          </div>
        ) : (
          <div className="sessions-grid">
            {sessions.map((session) => {
              const status = getSessionStatus(session);
              const fillRate = getFillRate(session);
              return (
                <div key={session.id} className="session-card">
                  <div className="session-card-header">
                    <div className="session-id">{session.id}</div>
                    <span className={`session-status status-${status.class}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="session-title">{session.title || 'Session sans titre'}</div>
                  <div className="session-dates">{formatDate(session.dates)}</div>
                  <div className="session-location">
                    📍 {session.lieu || session.location || 'Lieu non spécifié'}
                  </div>
                  {session.trainerName && (
                    <div className="session-trainer">
                      👤 {session.trainerName}
                    </div>
                  )}
                  <div className="session-fill">
                    <div className="session-fill-label">
                      Taux de remplissage: {session.placesReservees || 0}/{session.placesTotales || 0}
                    </div>
                    <div className="session-fill-bar">
                      <div
                        className="session-fill-progress"
                        style={{ width: `${fillRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="session-actions">
                    <button className="session-action-btn">
                      <FaEye />
                      Détails
                    </button>
                    <button className="session-action-btn">
                      <FaFileAlt />
                      Émargement
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageSessions;

