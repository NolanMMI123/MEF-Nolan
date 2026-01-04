package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.dto.AdminTrainerDTO;
import com.monespaceformation.backend.model.User;
import com.monespaceformation.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Controller pour gérer les utilisateurs (formateurs pour l'admin)
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Endpoint pour récupérer les utilisateurs par rôle
     * GET /api/users?role=TRAINER
     */
    @GetMapping
    public ResponseEntity<List<AdminTrainerDTO>> getUsersByRole(@RequestParam(required = false) String role) {
        try {
            List<User> users;
            if (role != null && !role.isEmpty()) {
                users = userRepository.findByRole(role);
            } else {
                users = userRepository.findAll();
            }

            List<AdminTrainerDTO> result = new ArrayList<>();

            for (User user : users) {
                String fullname = (user.getPrenom() != null ? user.getPrenom() : "") + " " + 
                                 (user.getNom() != null ? user.getNom() : "");
                fullname = fullname.trim();
                if (fullname.isEmpty()) {
                    fullname = user.getEmail() != null ? user.getEmail() : "N/A";
                }

                // Pour l'instant, on met 0 car il faudrait compter les sessions actives
                // Cela nécessiterait une relation entre User et SessionFormation
                int activeSessions = 0;

                AdminTrainerDTO dto = new AdminTrainerDTO(
                    user.getId(),
                    fullname,
                    user.getEmail() != null ? user.getEmail() : "N/A",
                    user.getPoste() != null ? user.getPoste() : "N/A",
                    activeSessions
                );

                result.add(dto);
            }

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}

