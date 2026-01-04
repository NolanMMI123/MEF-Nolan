package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.dto.AdminDashboardSummary;
import com.monespaceformation.backend.model.Inscription;
import com.monespaceformation.backend.repository.InscriptionRepository;
import com.monespaceformation.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private SessionRepository sessionRepository;


    @GetMapping("/summary")
    public ResponseEntity<AdminDashboardSummary> getSummary() {
        AdminDashboardSummary summary = new AdminDashboardSummary();
        List<Inscription> inscriptions = inscriptionRepository.findAll();
        
        summary.setTotalInscriptions(inscriptions.size());
        summary.setTotalRevenue(inscriptions.stream().mapToDouble(Inscription::getAmount).sum());
        summary.setUpcomingSessions((int) sessionRepository.count());
        
        // Valeurs exemples pour l'interface
        summary.setRegistrationTrend(12.0);
        summary.setRevenueTrend(8.5);
        summary.setFillRate(75.0);
        
        return ResponseEntity.ok(summary);
    }

}

