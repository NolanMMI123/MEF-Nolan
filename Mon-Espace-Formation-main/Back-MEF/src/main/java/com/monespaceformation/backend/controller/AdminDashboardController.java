package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.dto.AdminDashboardSummary;
import com.monespaceformation.backend.model.Inscription;
import com.monespaceformation.backend.model.SessionFormation;
import com.monespaceformation.backend.repository.InscriptionRepository;
import com.monespaceformation.backend.repository.SessionRepository;
import com.monespaceformation.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/summary")
    public ResponseEntity<AdminDashboardSummary> getSummary() {
        AdminDashboardSummary summary = new AdminDashboardSummary();
        
        try {
            // Utiliser count() pour totalInscriptions
            long inscriptionCount = inscriptionRepository.count();
            System.out.println("📊 Nombre total d'inscriptions dans MongoDB (mef_db.inscriptions) : " + inscriptionCount);
            summary.setTotalInscriptions((int) inscriptionCount);
            
            // Calculer totalRevenue en sommant les amount de toutes les inscriptions
            List<Inscription> inscriptions = inscriptionRepository.findAll();
            System.out.println("📋 Inscriptions récupérées depuis MongoDB : " + inscriptions.size());
            
            double totalRevenue = inscriptions.stream()
                    .filter(i -> i.getAmount() != null)
                    .mapToDouble(Inscription::getAmount)
                    .sum();
            System.out.println("💰 Revenu total calculé : " + totalRevenue + " €");
            summary.setTotalRevenue(totalRevenue);
            
            long sessionsCount = sessionRepository.count();
            System.out.println("📅 Nombre de sessions dans MongoDB (mef_db.trainings) : " + sessionsCount);
            summary.setUpcomingSessions((int) sessionsCount);
            
            // Valeurs exemples pour l'interface
            summary.setRegistrationTrend(12.0);
            summary.setRevenueTrend(8.5);
            summary.setFillRate(75.0);
            
            System.out.println("✅ Résumé du dashboard généré avec succès");
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des données MongoDB : " + e.getMessage());
            e.printStackTrace();
        }
        
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<Map<String, Object>>> getRecentInscriptions() {
        // Récupérer toutes les inscriptions et les trier par date décroissante
        List<Inscription> allInscriptions = inscriptionRepository.findAll();
        
        List<Inscription> recentInscriptions = allInscriptions.stream()
                .filter(i -> i.getDateInscription() != null)
                .sorted((a, b) -> b.getDateInscription().compareTo(a.getDateInscription()))
                .limit(5)
                .collect(Collectors.toList());
        
        // Construire la liste de réponses avec les détails
        List<Map<String, Object>> result = new ArrayList<>();
        
        for (Inscription inscription : recentInscriptions) {
            Map<String, Object> inscriptionData = new HashMap<>();
            
            // Informations de base
            inscriptionData.put("id", inscription.getId() != null ? inscription.getId() : "");
            inscriptionData.put("dateInscription", inscription.getDateInscription() != null 
                    ? inscription.getDateInscription().toString() : "");
            String status = inscription.getStatus() != null ? inscription.getStatus() : "";
            inscriptionData.put("status", status);
            inscriptionData.put("amount", inscription.getAmount() != null ? inscription.getAmount() : 0.0);
            
            // Détails du participant
            if (inscription.getParticipant() != null) {
                Map<String, Object> participantData = new HashMap<>();
                participantData.put("nom", inscription.getParticipant().getNom() != null 
                        ? inscription.getParticipant().getNom() : "");
                participantData.put("prenom", inscription.getParticipant().getPrenom() != null 
                        ? inscription.getParticipant().getPrenom() : "");
                participantData.put("email", inscription.getParticipant().getEmail() != null 
                        ? inscription.getParticipant().getEmail() : "");
                participantData.put("entreprise", inscription.getParticipant().getEntreprise() != null 
                        ? inscription.getParticipant().getEntreprise() : "");
                inscriptionData.put("participant", participantData);
            }
            
            // Détails de la formation (via sessionId)
            String sessionId = inscription.getSessionId();
            if (sessionId != null && !sessionId.isEmpty()) {
                Optional<SessionFormation> sessionOpt = sessionRepository.findById(sessionId);
                if (sessionOpt.isPresent()) {
                    SessionFormation session = sessionOpt.get();
                    Map<String, Object> formationData = new HashMap<>();
                    formationData.put("title", session.getTitle() != null ? session.getTitle() : "");
                    formationData.put("dates", session.getDates() != null ? session.getDates() : "");
                    formationData.put("location", session.getLieu() != null ? session.getLieu() : "");
                    inscriptionData.put("formation", formationData);
                }
            }
            
            result.add(inscriptionData);
        }
        
        return ResponseEntity.ok(result);
    }

}

