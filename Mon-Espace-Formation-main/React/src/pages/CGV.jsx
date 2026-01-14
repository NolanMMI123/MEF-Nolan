import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const CGV = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <Container>
          <h1 className="legal-title">Conditions Générales de Vente (CGV)</h1>
          <p className="legal-subtitle">Ventes de services de formation en présentiel — TXLFORMA</p>
        </Container>
      </div>

      <Container className="legal-content">
        <section className="legal-card">
          <h2 className="legal-section-title">Objet</h2>
          <p>
            Les présentes CGV régissent les ventes de services de formation proposées par <strong>TXLFORMA</strong> via
            la plateforme « Mon Espace Formation », à destination de clients <strong>professionnels et particuliers</strong>,
            exclusivement en présentiel.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Produits et services</h2>
          <p>
            Formations en présentiel dans les domaines suivants: réseaux et télécoms, administration système, développement front,
            développement back, bureautique, cybersécurité, conduite de projets. Modalités d’accès, prérequis, support pédagogique et
            accompagnement sont détaillés dans les fiches formation.
          </p>
          <ul>
            <li>Lieu: sites TXLFORMA ou lieux partenaires.</li>
            <li>Matériel: mis à disposition par TXLFORMA (PC portables principalement); aucun matériel personnel n’est autorisé pendant la formation.</li>
            <li>Organisation des sessions: calendrier, durée, horaires, capacité, intervenants.</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Prix</h2>
          <p>
            Les prix sont indiqués en <strong>EUR</strong>, <strong>HT/TTC</strong> selon le cas, et peuvent inclure les taxes applicables.
            Politique de remise et financement <strong>[OPCO/CPF/entreprise]</strong> selon éligibilité.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Commande</h2>
          <p>
            Le processus de commande inclut la sélection de la formation, la validation du panier, l’acceptation des CGV,
            et le paiement. La confirmation de commande vaut contrat. Les inscriptions peuvent être soumises à des prérequis
            (niveau, matériel fourni, capacité de session).
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Paiement</h2>
          <p>
            Moyens acceptés: <strong>[CB, virement, plateforme de paiement]</strong>. Sécurisation des paiements:
            <strong> [PSP / 3‑D Secure / etc.]</strong>. Les commandes non réglées peuvent être annulées.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Accès et livraison</h2>
          <p>
            Accès aux sessions en présentiel selon le calendrier communiqué. Convocation et informations pratiques
            adressées avant le début de la formation. En cas de problème d’accès, contactez le support <strong>contact@mef.fr</strong>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Droit de rétractation</h2>
          <p>
            Pour les <strong>consommateurs</strong>, droit de rétractation de <strong>14 jours</strong> à compter de la commande,
            sous réserve des exceptions de l’article L221‑28 du Code de la consommation (notamment si la prestation a commencé
            avec votre accord avant la fin du délai). Pour les <strong>professionnels</strong>, conditions spécifiques prévues au contrat.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Garanties et responsabilité</h2>
          <p>
            TXLFORMA garantit la conformité des prestations aux descriptifs. La responsabilité ne saurait être engagée
            en cas d’indisponibilité résultant de cas fortuits ou de force majeure. Les participants s’engagent à respecter
            les règles de sécurité et l’usage du matériel fourni.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Propriété intellectuelle</h2>
          <p>
            Les supports de formation sont protégés. Toute reproduction ou diffusion non autorisée est interdite.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Protection des données</h2>
          <p>
            Traitement des données clients conformément à la 
            <Link to="/PolitiqueConfidentialite"> Politique de confidentialité </Link>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Force majeure</h2>
          <p>
            Aucune des parties ne pourra être tenue pour responsable si l’exécution du contrat est retardée
            ou empêchée par un cas de force majeure.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Médiation et litiges</h2>
          <p>
            En cas de litige, le client consommateur peut recourir gratuitement à un médiateur de la consommation
            <strong> [à préciser]</strong>. À défaut d’accord, compétence des tribunaux <strong>[Lieu]</strong>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">Droit applicable</h2>
          <p>
            Les présentes CGV sont régies par le droit français.
          </p>
        </section>

        <div className="legal-updated">Dernière mise à jour: 06/01/2026</div>
      </Container>
    </div>
  );
};

export default CGV;