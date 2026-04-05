package copy.redbus.backend.controller;

import copy.redbus.backend.entity.Booking;
import copy.redbus.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller for ticket booking actions.
 */
@RestController
@RequestMapping("/book-tickets")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookTicketsController {

    @Autowired
    private AccountService accountService;

    /**
     * Endpoint to book a ticket for a specific transport.
     */
    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(Authentication authentication, @RequestBody Map<String, Object> payload) {
        String username = authentication.getName();
        Long transportId = Long.valueOf(payload.get("transportId").toString());
        
        try {
            // Book ticket and deduct wallet balance
            Booking booking = accountService.bookTicket(username, transportId);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            // Handle insufficient balance or other errors
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
