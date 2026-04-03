package copy.redbus.backend.controller;

import copy.redbus.backend.config.JwtUtils;
import copy.redbus.backend.entity.User;
import copy.redbus.backend.repository.UserRepository;
import copy.redbus.backend.service.UserDetailsServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for Authentication, Registration, and Token Refresh.
 * Uses HTTP-only cookies for refresh tokens for enhanced security.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /**
     * Authenticates a user and returns a short-lived access token.
     * Sets a long-lived refresh token in an HTTP-only cookie.
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.get("username"), loginRequest.get("password")));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        
        // Short-lived JWT (15 min) returned in the response body
        String accessToken = jwtUtils.generateAccessToken(userDetails);
        
        // Long-lived JWT (7 days) set in HTTP-only cookie
        String refreshToken = jwtUtils.generateRefreshToken(userDetails);
        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false); // Set to true in production with HTTPS
        refreshCookie.setPath("/api/auth/refresh"); // Only sent to the refresh endpoint
        refreshCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days in seconds
        response.addCookie(refreshCookie);

        Map<String, Object> body = new HashMap<>();
        body.put("token", accessToken);
        body.put("username", userDetails.getUsername());
        
        return ResponseEntity.ok(body);
    }

    /**
     * Registers a new user with the "USER" role.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> signUpRequest) {
        if (userRepository.findByUsername(signUpRequest.get("username")).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        User user = new User();
        user.setUsername(signUpRequest.get("username"));
        user.setPassword(encoder.encode(signUpRequest.get("password")));
        user.setRoles("USER"); // Hardcoded to USER for security

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    /**
     * Issues a new access token if a valid refresh token cookie is present.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        if (refreshToken != null && jwtUtils.validateToken(refreshToken)) {
            String username = jwtUtils.getUsernameFromToken(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            String newAccessToken = jwtUtils.generateAccessToken(userDetails);
            
            Map<String, String> response = new HashMap<>();
            response.put("token", newAccessToken);
            response.put("username", username);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Refresh Token is missing or invalid");
    }

    /**
     * Logs the user out by clearing the refresh token cookie.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/api/auth/refresh");
        refreshCookie.setMaxAge(0); // Deletes the cookie
        response.addCookie(refreshCookie);
        return ResponseEntity.ok("Logged out");
    }
}
