package com.monespaceformation.backend.config;

import com.monespaceformation.backend.model.Training;
import com.monespaceformation.backend.model.TrainingDocument;
import com.monespaceformation.backend.model.User;
import com.monespaceformation.backend.repository.TrainingRepository;
import com.monespaceformation.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(TrainingRepository trainingRepository, 
                                UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {
        return args -> {
            // Créer l'utilisateur admin s'il n'existe pas
            if (!userRepository.existsByEmail("admin@txlforma.fr")) {
                User admin = new User();
                admin.setNom("Administrateur");
                admin.setPrenom("Admin");
                admin.setEmail("admin@txlforma.fr");
                admin.setPassword(passwordEncoder.encode("123456789")); // Mot de passe par défaut
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("--- UTILISATEUR ADMIN CRÉÉ (admin@txlforma.fr) ---");
            } else {
                // S'assurer que l'utilisateur admin existant a bien le rôle ADMIN
                User existingAdmin = userRepository.findByEmail("admin@txlforma.fr").orElse(null);
                if (existingAdmin != null && !"ADMIN".equals(existingAdmin.getRole())) {
                    existingAdmin.setRole("ADMIN");
                    userRepository.save(existingAdmin);
                    System.out.println("--- RÔLE ADMIN ATTRIBUÉ À L'UTILISATEUR EXISTANT ---");
                }
            }

            // On ajoute la formation SEULEMENT si la base est vide
            if (trainingRepository.count() == 0) {
                Training t = new Training();
                t.setTitle("Développement Front-End avec React et TypeScript");
                t.setReference("FORM-DEV-001");
                t.setSessionRef("INS-2024-001234");
                t.setStartDate("15 Janvier 2025");
                t.setEndDate("19 Janvier 2025");
                t.setDuration("5 Jours");
                t.setLocation("42 Avenue des Champs-Élysées, 75008 Paris");

                t.setTrainerName("Jean-Pierre Martin");
                t.setTrainerRole("Expert React & TypeScript");
                t.setTrainerEmail("jp.martin@txlforma.fr");
                t.setStatus("A Venir");

                // Les documents de ta maquette
                t.setDocuments(Arrays.asList(
                        new TrainingDocument("Facture acquittée", "FAC-2024-001234", "Facture", "#"),
                        new TrainingDocument("Confirmation d'inscription", "INS-2024", "Confirmation", "#"),
                        new TrainingDocument("Convention de formation", "CONV-2024", "Convention", "#")
                ));

                trainingRepository.save(t);
                System.out.println("--- DONNÉES DE DÉMO AJOUTÉES (Formation React) ---");
            }
        };
    }
}