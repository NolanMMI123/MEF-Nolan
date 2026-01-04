package com.monespaceformation.backend.controller;

import com.monespaceformation.backend.model.User;
import com.monespaceformation.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:5173") // Décommentez si besoin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- ROUTE INSCRIPTION ---
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Normaliser l'email en minuscules pour la recherche et le stockage
        String email = user.getEmail() != null ? user.getEmail().toLowerCase() : null;
        
        if (email != null && userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erreur : Cet email est déjà utilisé !"));
        }
        
        // Stocker l'email en minuscules
        user.setEmail(email);
        
        // Définir le rôle par défaut
        if (user.getRole() == null || user.getRole().isEmpty()) {
            // Si l'email est admin@txlforma.fr, définir le rôle ADMIN
            if ("admin@txlforma.fr".equalsIgnoreCase(email)) {
                user.setRole("ADMIN");
            } else {
                // Sinon, rôle USER par défaut
                user.setRole("USER");
            }
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Inscription réussie !"));
    }

    // --- ROUTE CONNEXION (CORRIGÉE) ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        // Recherche insensible à la casse : convertir l'email en minuscules
        String emailLower = email != null ? email.toLowerCase() : null;
        Optional<User> userOpt = userRepository.findByEmail(emailLower);

        if (userOpt.isPresent()) {
            System.out.println("✓ Utilisateur trouvé dans MongoDB : " + emailLower);
            User user = userOpt.get();
            
            // Vérification du mot de passe
            if (passwordEncoder.matches(password, user.getPassword())) {
                System.out.println("✓ Mot de passe correct pour : " + emailLower);
                // 👇 LA CORRECTION EST ICI 👇
                // Au lieu de construire une Map manuelle incomplète, 
                // on renvoie TOUT l'objet user. 
                // Comme ça, l'ID est envoyé automatiquement.
                return ResponseEntity.ok(user);
            } else {
                System.out.println("✗ Mot de passe incorrect pour : " + emailLower);
            }
        } else {
            System.out.println("✗ Utilisateur NON trouvé dans MongoDB pour l'email : " + emailLower);
        }

        return ResponseEntity.status(401).body(Map.of("message", "Email ou mot de passe incorrect"));
    }
}