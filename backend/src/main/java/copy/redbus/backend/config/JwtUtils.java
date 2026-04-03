package copy.redbus.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility class for generating and validating JSON Web Tokens (JWT).
 * Handles both short-lived Access Tokens and long-lived Refresh Tokens.
 */
@Component
public class JwtUtils {

    // Secure secret key for signing tokens
    private final String SECRET_KEY = "Ta7.6S*92_pL!mN#8vXz5rQ&uW^4yC%k"; 
    
    // Access Token valid for 15 minutes (short-lived for security)
    private final int ACCESS_TOKEN_EXPIRATION_MS = 15 * 60 * 1000; 
    
    // Refresh Token valid for 7 days (long-lived to keep user logged in)
    private final int REFRESH_TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /**
     * Generates a short-lived access token for the user.
     */
    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, ACCESS_TOKEN_EXPIRATION_MS);
    }

    /**
     * Generates a long-lived refresh token for the user.
     */
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, REFRESH_TOKEN_EXPIRATION_MS);
    }

    private String generateToken(UserDetails userDetails, int expirationMs) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the username from a given JWT token.
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates if the token is properly signed and not expired.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token is either expired, tampered with, or malformed
        }
        return false;
    }
}
