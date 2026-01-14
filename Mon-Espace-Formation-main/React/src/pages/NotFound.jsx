import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { theme } from '../utils/theme';

const NotFound = () => {
    return (
        <>
            <style>{`
                .notfound-link {
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .notfound-link:hover {
                    text-decoration: underline;
                    opacity: 0.8;
                    transform: translateY(-2px);
                }
                @keyframes scroll-404 {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .banner-404-container {
                    overflow: hidden;
                    width: 100%;
                    margin: 20px 0;
                }
                .animated-404-banner {
                    font-size: 80px;
                    font-weight: bold;
                    color: ${theme.colors.primary};
                    opacity: 0.08;
                    white-space: nowrap;
                    pointer-events: none;
                    user-select: none;
                    display: inline-block;
                    animation: scroll-404 15s linear infinite;
                }
            `}</style>
            
            <div style={{ minHeight: '100vh', backgroundColor: theme.colors.lightGrey, display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
            <Container>
                <div className="text-center">
                    {/* Code d'erreur 404 */}
                    <div style={{ position: 'relative', marginBottom: '40px', height: '200px' }}>
                        <div style={{ 
                            position: 'absolute', 
                            top: '-10px', 
                            left: '50%', 
                            transform: 'translate(-50%, 0)',
                            width: '100%',
                            zIndex: 10
                        }}>
                            <Search size={160} color={theme.colors.accent} strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Bannière animée de "404" */}
                    <div className="banner-404-container">
                        <div className="animated-404-banner">404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404 • 404</div>
                    </div>

                    {/* Message d'erreur */}
                    <h2 className="mb-3" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                        Page introuvable
                    </h2>
                    <p className="lead text-muted mb-5" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
                        Oups ! La page que vous recherchez semble avoir disparu. Elle a peut-être été déplacée ou n'existe plus.
                    </p>

                    {/* Boutons d'action */}
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                        <Link 
                            to="/" 
                            className="btn px-4 py-3 d-flex align-items-center gap-2"
                            style={{ 
                                backgroundColor: theme.colors.primary, 
                                color: 'white',
                                border: 'none',
                                fontWeight: '600',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a1f3d'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.primary}
                        >
                            <Home size={20} />
                            Retour à l'accueil
                        </Link>
                        <button 
                            onClick={() => window.history.back()}
                            className="btn px-4 py-3 d-flex align-items-center gap-2"
                            style={{ 
                                backgroundColor: 'white', 
                                color: theme.colors.primary,
                                border: `2px solid ${theme.colors.primary}`,
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = theme.colors.primary;
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.color = theme.colors.primary;
                            }}
                        >
                            <ArrowLeft size={20} />
                            Page précédente
                        </button>
                    </div>

                    {/* Suggestions de liens */}
                    <div className="mt-5 pt-4" style={{ borderTop: '1px solid #dee2e6' }}>
                        <p className="text-muted mb-3">Vous cherchez peut-être :</p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            <Link to="/formations" className="text-decoration-none notfound-link" style={{ color: theme.colors.accent, fontWeight: '500' }}>
                                Nos Formations
                            </Link>
                            <span className="text-muted">•</span>
                            <Link to="/about" className="text-decoration-none notfound-link" style={{ color: theme.colors.accent, fontWeight: '500' }}>
                                À Propos
                            </Link>
                            <span className="text-muted">•</span>
                            <Link to="/contact" className="text-decoration-none notfound-link" style={{ color: theme.colors.accent, fontWeight: '500' }}>
                                Contact
                            </Link>
                            <span className="text-muted">•</span>
                            <Link to="/dashboard" className="text-decoration-none notfound-link" style={{ color: theme.colors.accent, fontWeight: '500' }}>
                                Mon Espace
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        </>
    );
};

export default NotFound;
