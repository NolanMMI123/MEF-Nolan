import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './ManageInscriptions.css';

/**
 * Page de gestion des inscriptions
 * Affiche la liste complète des inscriptions avec filtres
 */
const ManageInscriptions = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [trainingFilter, setTrainingFilter] = useState('ALL');

  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inscriptions');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des inscriptions');
        }
        const data = await response.json();
        setInscriptions(data);
        setFilteredInscriptions(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInscriptions();
  }, []);

  // Filtrer les inscriptions
  useEffect(() => {
    let filtered = [...inscriptions];

    // Filtre par recherche (nom, email, formation)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(insc =>
        insc.userName?.toLowerCase().includes(term) ||
        insc.userEmail?.toLowerCase().includes(term) ||
        insc.trainingTitle?.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(insc => insc.status === statusFilter);
    }

    // Filtre par formation
    if (trainingFilter !== 'ALL') {
      filtered = filtered.filter(insc => insc.trainingTitle === trainingFilter);
    }

    setFilteredInscriptions(filtered);
  }, [inscriptions, searchTerm, statusFilter, trainingFilter]);

  // Récupérer les formations uniques pour le filtre
  const uniqueTrainings = Array.from(new Set(inscriptions.map(insc => insc.trainingTitle).filter(Boolean)));

  // Récupérer les statuts uniques pour le filtre
  const uniqueStatuses = Array.from(new Set(inscriptions.map(insc => insc.status).filter(Boolean)));

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Chargement des inscriptions...</p>
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
      <div className="manage-inscriptions">
        <div className="manage-header">
          <div>
            <h2 className="admin-page-title">Gestion des inscriptions</h2>
            <p className="admin-page-subtitle">Liste complète des inscriptions</p>
          </div>
          <div className="manage-search-filters">
            <div className="admin-search-box">
              <FaSearch className="admin-search-icon" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="admin-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="admin-filter-btn">
              <FaFilter />
              Filtres
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="manage-filters">
          <select
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tous les statuts</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            className="admin-filter-select"
            value={trainingFilter}
            onChange={(e) => setTrainingFilter(e.target.value)}
          >
            <option value="ALL">Toutes les formations</option>
            {uniqueTrainings.map(training => (
              <option key={training} value={training}>{training}</option>
            ))}
          </select>
        </div>

        {/* Liste des inscriptions */}
        {filteredInscriptions.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">👥</div>
            <p>Liste détaillée des inscriptions avec filtres avancés</p>
            <p className="admin-empty-hint">Recherche par nom, email, formation, statut, dates ...</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Formation</th>
                  <th>Date session</th>
                  <th>Date inscription</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredInscriptions.map((insc) => (
                  <tr key={insc.id}>
                    <td>{insc.userName || 'N/A'}</td>
                    <td>{insc.userEmail || 'N/A'}</td>
                    <td>{insc.trainingTitle || 'N/A'}</td>
                    <td>{insc.sessionDate || 'N/A'}</td>
                    <td>{formatDate(insc.registrationDate)}</td>
                    <td>
                      <span className={`admin-status-badge status-${insc.status?.toLowerCase() || 'default'}`}>
                        {insc.status || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="manage-footer">
          <p>Total: {filteredInscriptions.length} inscription(s)</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageInscriptions;

