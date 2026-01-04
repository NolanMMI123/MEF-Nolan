import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { FaEye, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import './ManageTrainers.css';

/**
 * Page de gestion des formateurs
 * Affiche la liste des formateurs avec leurs statistiques
 */
const ManageTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users?role=TRAINER');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des formateurs');
        }
        const data = await response.json();
        setTrainers(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Générer les initiales pour l'avatar
  const getInitials = (fullname) => {
    if (!fullname) return '??';
    const parts = fullname.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullname.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Chargement des formateurs...</p>
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
      <div className="manage-trainers">
        <div className="manage-header">
          <div>
            <h2 className="admin-page-title">Gestion des formateurs</h2>
            <p className="admin-page-subtitle">Suivi des formateurs et de leurs sessions</p>
          </div>
          <button className="admin-btn-primary">
            <FaPlus />
            Ajouter un formateur
          </button>
        </div>

        {/* Liste des formateurs */}
        {trainers.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">👨‍🏫</div>
            <p>Aucun formateur trouvé</p>
            <p className="admin-empty-hint">Assurez-vous que les utilisateurs ont le rôle "TRAINER" dans la base de données</p>
          </div>
        ) : (
          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="trainer-card">
                <div className="trainer-avatar">
                  {getInitials(trainer.fullname)}
                </div>
                <div className="trainer-name">{trainer.fullname || 'N/A'}</div>
                <div className="trainer-rating">
                  ⭐ 4.8
                </div>
                <div className="trainer-speciality">
                  <span className="trainer-tag">{trainer.speciality || 'N/A'}</span>
                </div>
                <div className="trainer-stats">
                  <div className="trainer-stat">
                    <span className="trainer-stat-label">Sessions en cours</span>
                    <span className="trainer-stat-value">{trainer.activeSessions || 0}</span>
                  </div>
                </div>
                <div className="trainer-contact">
                  <div className="trainer-email">📧 {trainer.email || 'N/A'}</div>
                </div>
                <div className="trainer-actions">
                  <button className="trainer-action-btn">
                    <FaEye />
                    Profil
                  </button>
                  <button className="trainer-action-btn">
                    <FaCalendarAlt />
                    Planning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageTrainers;

