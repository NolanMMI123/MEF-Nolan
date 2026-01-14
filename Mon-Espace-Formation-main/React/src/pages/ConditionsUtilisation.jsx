import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const ConditionsUtilisation = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <Container>
          <h1 className="legal-title">Conditions d'utilisation</h1>
          <p className="legal-subtitle">Conditions générales d'utilisation de la plateforme Mon Espace Formation</p>
        </Container>
      </div>

      <Container className="legal-content">
        <section className="legal-card">
          <h2 className="legal-section-title">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions 
            d'utilisation de la plateforme "Mon Espace Formation" (ci-après "la Plateforme") éditée par <strong>TXLFORMA</strong>.
          </p>
          <p>
            La Plateforme permet aux utilisateurs de consulter le catalogue de formations, de s'inscrire aux formations, 
            de gérer leur parcours de formation, d'émarger en ligne et de télécharger leurs attestations.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">2. Acceptation des conditions</h2>
          <p>
            L'utilisation de la Plateforme implique l'acceptation pleine et entière des présentes CGU. 
            En créant un compte ou en utilisant les services de la Plateforme, vous acceptez sans réserve ces conditions.
          </p>
          <p>
            TXLFORMA se réserve le droit de modifier à tout moment les présentes CGU. Les utilisateurs seront informés 
            de toute modification substantielle par email et/ou via une notification sur la Plateforme.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">3. Création et gestion du compte utilisateur</h2>
          
          <h3 className="legal-subsection-title">3.1 Inscription</h3>
          <p>
            Pour accéder aux services de la Plateforme, vous devez créer un compte utilisateur en fournissant des 
            informations exactes, complètes et à jour : nom, prénom, adresse email, entreprise, poste, etc.
          </p>
          
          <h3 className="legal-subsection-title">3.2 Identifiants et sécurité</h3>
          <p>
            Vous êtes responsable de la confidentialité de vos identifiants de connexion (email et mot de passe). 
            Toute activité effectuée via votre compte est présumée avoir été effectuée par vous-même.
          </p>
          <p>
            En cas de suspicion d'utilisation non autorisée de votre compte, vous devez immédiatement en informer 
            TXLFORMA à l'adresse : <strong>contact@txlforma.fr</strong>
          </p>

          <h3 className="legal-subsection-title">3.3 Exactitude des informations</h3>
          <p>
            Vous vous engagez à fournir des informations exactes et à les maintenir à jour. TXLFORMA se réserve le droit 
            de suspendre ou supprimer tout compte contenant des informations inexactes, frauduleuses ou périmées.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">4. Services proposés</h2>
          
          <h3 className="legal-subsection-title">4.1 Catalogue de formations</h3>
          <p>
            La Plateforme permet de consulter le catalogue complet des formations proposées par TXLFORMA dans les domaines suivants :
          </p>
          <ul>
            <li>Réseaux et télécoms</li>
            <li>Administration système</li>
            <li>Développement Front-End et Back-End</li>
            <li>Bureautique</li>
            <li>Cybersécurité</li>
            <li>Conduite de projets</li>
          </ul>

          <h3 className="legal-subsection-title">4.2 Inscription aux formations</h3>
          <p>
            Les utilisateurs peuvent s'inscrire en ligne aux formations proposées. L'inscription est confirmée après 
            paiement sécurisé via Stripe et sous réserve de places disponibles.
          </p>

          <h3 className="legal-subsection-title">4.3 Espace personnel</h3>
          <p>
            Chaque utilisateur dispose d'un espace personnel ("Dashboard") permettant de :
          </p>
          <ul>
            <li>Consulter ses formations en cours et à venir</li>
            <li>Accéder aux documents pédagogiques</li>
            <li>Émarger numériquement matin et après-midi</li>
            <li>Télécharger ses attestations de formation</li>
            <li>Suivre sa progression</li>
          </ul>

          <h3 className="legal-subsection-title">4.4 Émargement numérique</h3>
          <p>
            L'émargement numérique est obligatoire pour valider la présence à la formation. Il doit être effectué 
            deux fois par jour (matin et après-midi). Le défaut d'émargement peut entraîner la non-délivrance de l'attestation.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">5. Obligations de l'utilisateur</h2>
          
          <p>En utilisant la Plateforme, vous vous engagez à :</p>
          <ul>
            <li>Respecter les lois et règlements en vigueur</li>
            <li>Ne pas usurper l'identité d'une autre personne</li>
            <li>Ne pas diffuser de contenu illicite, diffamatoire, injurieux ou portant atteinte aux droits de tiers</li>
            <li>Ne pas tenter d'accéder de manière non autorisée aux systèmes informatiques de TXLFORMA</li>
            <li>Ne pas utiliser la Plateforme à des fins commerciales sans autorisation préalable</li>
            <li>Ne pas copier, reproduire ou distribuer les contenus sans autorisation</li>
            <li>Signaler tout dysfonctionnement ou comportement suspect</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">6. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments de la Plateforme (structure, design, textes, graphismes, logos, icônes, sons, logiciels, etc.) 
            est la propriété exclusive de TXLFORMA ou de ses partenaires.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle 
            du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite 
            sans l'autorisation écrite préalable de TXLFORMA.
          </p>
          <p>
            Les supports de cours et ressources pédagogiques fournis dans le cadre des formations sont réservés à un usage 
            personnel et non commercial. Leur diffusion ou reproduction est strictement interdite.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">7. Protection des données personnelles</h2>
          <p>
            TXLFORMA s'engage à protéger la confidentialité des données personnelles collectées sur la Plateforme, 
            conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
          <p>
            Pour plus d'informations sur la collecte et le traitement de vos données personnelles, veuillez consulter notre{' '}
            <Link to="/PolitiqueConfidentialite">Politique de confidentialité</Link>.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">8. Disponibilité et maintenance</h2>
          <p>
            TXLFORMA s'efforce d'assurer la disponibilité de la Plateforme 24h/24 et 7j/7. Toutefois, TXLFORMA ne peut 
            garantir une accessibilité permanente et se réserve le droit d'interrompre, de suspendre momentanément ou de 
            modifier sans préavis l'accès à tout ou partie de la Plateforme pour des raisons de maintenance, de mise à jour 
            ou pour toute autre raison technique.
          </p>
          <p>
            En cas de maintenance programmée, TXLFORMA s'efforcera d'en informer préalablement les utilisateurs.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">9. Limitation de responsabilité</h2>
          <p>
            TXLFORMA met tout en œuvre pour offrir aux utilisateurs des informations et des outils fiables et vérifiés. 
            Cependant, TXLFORMA ne saurait être tenue responsable :
          </p>
          <ul>
            <li>Des interruptions ou dysfonctionnements de la Plateforme</li>
            <li>De l'impossibilité temporaire d'accéder à la Plateforme</li>
            <li>Des dommages directs ou indirects résultant de l'utilisation de la Plateforme</li>
            <li>De l'utilisation frauduleuse par des tiers des informations mises à disposition sur la Plateforme</li>
            <li>Du contenu des sites externes vers lesquels la Plateforme pourrait renvoyer</li>
          </ul>
          <p>
            L'utilisateur est seul responsable de l'utilisation qu'il fait de la Plateforme et des données qu'il y consulte.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">10. Résiliation</h2>
          
          <h3 className="legal-subsection-title">10.1 Résiliation par l'utilisateur</h3>
          <p>
            L'utilisateur peut à tout moment demander la suppression de son compte en contactant TXLFORMA à l'adresse 
            <strong> contact@txlforma.fr</strong>. La suppression du compte entraîne la perte définitive de l'accès 
            aux services et aux données associées.
          </p>

          <h3 className="legal-subsection-title">10.2 Résiliation par TXLFORMA</h3>
          <p>
            TXLFORMA se réserve le droit de suspendre ou supprimer, sans préavis ni indemnité, l'accès à la Plateforme 
            de tout utilisateur qui ne respecterait pas les présentes CGU, notamment en cas de :
          </p>
          <ul>
            <li>Violation des conditions d'utilisation</li>
            <li>Comportement frauduleux ou illicite</li>
            <li>Tentative d'intrusion ou de piratage</li>
            <li>Utilisation abusive de la Plateforme</li>
          </ul>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">11. Cookies</h2>
          <p>
            La Plateforme utilise des cookies pour améliorer l'expérience utilisateur, mémoriser les préférences et 
            analyser le trafic. En utilisant la Plateforme, vous acceptez l'utilisation de ces cookies.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter certaines fonctionnalités 
            de la Plateforme.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">12. Droit applicable et juridiction compétente</h2>
          <p>
            Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution 
            des présentes, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
          </p>
        </section>

        <section className="legal-card">
          <h2 className="legal-section-title">13. Contact</h2>
          <p>
            Pour toute question concernant les présentes Conditions Générales d'Utilisation, vous pouvez contacter TXLFORMA :
          </p>
          <ul>
            <li><strong>Par email :</strong> contact@txlforma.fr</li>
            <li><strong>Par téléphone :</strong> 01 23 45 67 89</li>
            <li><strong>Par courrier :</strong> TXLFORMA, 123 Avenue des Formations, 75000 Paris, France</li>
          </ul>
        </section>

        <section className="legal-card">
          <p className="text-muted small">
            <strong>Date de dernière mise à jour :</strong> 3 janvier 2026
          </p>
        </section>

        <div className="legal-footer-links">
          <Link to="/">← Retour à l'accueil</Link>
          <Link to="/PolitiqueConfidentialite">Politique de confidentialité</Link>
          <Link to="/MentionsLegales">Mentions légales</Link>
          <Link to="/CGV">CGV</Link>
        </div>
      </Container>
    </div>
  );
};

export default ConditionsUtilisation;
