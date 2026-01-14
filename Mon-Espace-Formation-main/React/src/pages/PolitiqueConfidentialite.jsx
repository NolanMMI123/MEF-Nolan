import React from 'react';
import { Container } from 'react-bootstrap';
import './LegalPages.css';

const PolitiqueConfidentialite = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <Container>
          <h1 className="legal-title">Politique de confidentialité</h1>
          <p className="legal-subtitle">Traitement des données personnelles (RGPD)</p>
        </Container>
      </div>

      <Container className="legal-content">
        <section className="legal-card">
          <h2 className="legal-section-title">Responsable de traitement</h2>
          <p>
            <strong>TXLFORMA</strong>, <strong>[forme juridique]</strong>, siège social
            <strong> 123 Avenue des Formations, 75000 Paris, France</strong>, <strong>contact@mef.fr</strong>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Données collectées</h2>
          <ul>
            <li>Identification: nom, prénom, email, téléphone.</li>
            <li>Compte: identifiant, mot de passe (haché), préférences.</li>
            <li>Utilisation: parcours de formation, progrès, résultats, logs de connexion.</li>
            <li>Technique: adresse IP, type de navigateur, cookies, identifiants de session (sur les matériels fournis par TXLFORMA).</li>
            <li>Présentiel: listes d’émargement, présence, observations pédagogiques.</li>
            <li>Facturation (si applicable): adresse de facturation, historique des commandes et paiements.</li>
          </ul>
          <p>
            Important: les participants utilisent exclusivement le matériel fourni par TXLFORMA lors des sessions en présentiel; nous
            ne collectons pas d’identifiants techniques liés à des appareils personnels pendant les formations.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Finalités et bases juridiques</h2>
          <ul>
            <li>Fourniture du service et gestion du compte (exécution du contrat).</li>
            <li>Organisation des sessions en présentiel et suivi pédagogique (exécution du contrat / intérêt légitime).</li>
            <li>Support client et communication (intérêt légitime / contrat).</li>
            <li>Sécurité, prévention de la fraude et audit (intérêt légitime / obligation légale).</li>
            <li>Facturation et obligations comptables (obligation légale).</li>
            <li>Analyses d’usage et amélioration du service (intérêt légitime, avec opposition possible).</li>
            <li>Prospection commerciale (consentement, si applicable).</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Cookies et traceurs</h2>
          <p>
            Cookies nécessaires au fonctionnement (authentification, session) et, le cas échéant, cookies de mesure d’audience
            et de personnalisation. Vos préférences sont gérables via un bandeau de consentement.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Destinataires et sous-traitants</h2>
          <p>
            Équipes internes autorisées et prestataires (hébergement, paiement, emailing, analytics) agissant selon nos instructions,
            soumis à des obligations de confidentialité et de sécurité.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Transferts hors UE</h2>
          <p>
            En cas de transfert de données en dehors de l’UE/EEE, nous mettons en œuvre des garanties appropriées
            (clauses contractuelles types, etc.). <strong>[Lister les services concernés le cas échéant]</strong>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Durées de conservation</h2>
        <ul>
            <li>Compte utilisateur: durée d’utilisation + <strong>[X]</strong> ans après la clôture.</li>
            <li>Logs de connexion: <strong>[X]</strong> mois.</li>
            <li>Documents de présence et pédagogiques: <strong>[X]</strong> ans.</li>
            <li>Facturation: <strong>10</strong> ans (obligations légales).</li>
            <li>Prospection: <strong>3</strong> ans à compter du dernier contact.</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Vos droits</h2>
          <p>
            Droits d’accès, rectification, effacement, limitation, opposition, portabilité, directives post-mortem.
            Pour exercer vos droits, contactez <strong>[email DPO/contact]</strong>. Vous pouvez adresser une réclamation à la CNIL.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Sécurité</h2>
          <p>
            Mesures techniques et organisationnelles: chiffrement en transit, hachage des mots de passe, contrôle d’accès,
            journalisation, sauvegardes, durcissement des postes fournis. <strong>[Ajouter vos mesures spécifiques]</strong>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Coordonnées</h2>
          <p>
            DPO / Référent vie privée: <strong>[Nom]</strong> — <strong>[email]</strong> — <strong>[adresse]</strong>.
          </p>
        </section>

        <div className="legal-updated">Dernière mise à jour: 06/01/2026</div>
      </Container>
    </div>
  );
};

export default PolitiqueConfidentialite;