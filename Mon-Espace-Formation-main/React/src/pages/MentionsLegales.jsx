import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const MentionsLegales = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <Container>
          <h1 className="legal-title">Mentions légales</h1>
          <p className="legal-subtitle">Informations légales de TXLFORMA — Mon Espace Formation</p>
        </Container>
      </div>

      <Container className="legal-content">
        <section className="legal-card">
          <h2 className="legal-section-title">Éditeur du site</h2>
          <p>
            Entreprise: <strong>TXLFORMA</strong><br />
            Forme juridique: <strong>[À compléter]</strong><br />
            Capital social: <strong>[À compléter]</strong><br />
            SIREN/SIRET: <strong>[À compléter]</strong><br />
            Adresse: <strong>123 Avenue des Formations, 75000 Paris, France</strong><br />
            Téléphone: <strong>01 23 45 67 89</strong><br />
            Email: <strong>contact@mef.fr</strong>
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Directeur de la publication</h2>
          <p><strong>M. Roger DURAND</strong> — Informaticien et spécialiste des nouvelles technologies (Développement et DevOps).</p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Présentation de l’entreprise</h2>
          <p>
            TXLFORMA, fraîchement arrivée sur le marché des formations, propose aux entreprises et aux particuliers une
            offre de formations dans le numérique et les nouvelles technologies. L’entreprise a été créée par
            trois personnes: M. Roger DURAND (nouvelles technologies), Mme Alice ROMAINVILLE (diplômée d’une école de commerce),
            et M. Lionel PRIGENT (Master MEEF).
          </p>
          <p>
            L’effectif actuel est de 10 personnes, réparties sur les services suivants: comptabilité et finances (2), moyens généraux (2),
            accueil (1), promotion et gestion du personnel (2). TXLFORMA fait également appel à des ressources externes
            pour l’enseignement: freelance, contrats CDD, vacataires, etc.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Activités et domaines de formation</h2>
          <ul>
            <li>Réseaux et télécoms: VLAN, adressage, routage, VPN</li>
            <li>Administration système: Windows Server, Linux, Unix</li>
            <li>Développement Front: Angular, React, Vue.js</li>
            <li>Développement Back: Symfony, Spring Boot, Laravel</li>
            <li>Bureautique: pack Office, Access</li>
            <li>Cybersécurité: attaques, IPS, IDS, sécurité BDD et Web</li>
            <li>Conduite de projets: Jira, Trello, MS Project</li>
          </ul>
          <p>
            Important: les formations se déroulent exclusivement en présentiel et les participants utilisent uniquement
            le matériel mis à disposition par TXLFORMA (principalement des PC portables).
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Hébergeur</h2>
          <p>
            Raison sociale: <strong>[À compléter]</strong><br />
            Adresse: <strong>[À compléter]</strong><br />
            Téléphone: <strong>[À compléter]</strong>
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus (textes, graphismes, logos, icônes, images, clips audio ou vidéo) et leur mise en forme sont la
            propriété de <strong>TXLFORMA</strong> ou de ses partenaires, sauf mention contraire. Toute reproduction,
            représentation, modification, publication, adaptation de tout ou partie des éléments de ce site, quel que soit le moyen
            ou le procédé utilisé, est interdite sans l’autorisation préalable écrite.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Responsabilité</h2>
          <p>
            TXLFORMA s’efforce de fournir des informations exactes et à jour. Néanmoins, des erreurs ou omissions peuvent survenir.
            L’utilisateur est invité à vérifier l’exactitude des informations et à signaler toute modification utile. TXLFORMA ne saurait
            être responsable de l’utilisation faite des informations et des contenus du site.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Liens externes</h2>
          <p>
            Le site peut contenir des liens vers d’autres sites. TXLFORMA ne peut être tenue responsable du contenu de ces sites externes.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Données personnelles et cookies</h2>
          <p>
            Pour en savoir plus sur la collecte et le traitement de vos données, consultez notre
            <Link to="/PolitiqueConfidentialite" className="legal-link"> Politique de confidentialité</Link>.
            Des cookies peuvent être utilisés pour améliorer l’expérience et mesurer l’audience.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Loi applicable</h2>
          <p>
            Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, et à défaut d’accord amiable,
            la compétence est attribuée aux tribunaux <strong>[Lieu de compétence]</strong>.
          </p>
        </section>

        <div className="legal-updated">Dernière mise à jour: 06/01/2026</div>
      </Container>
    </div>
  );
};

export default MentionsLegales;