package copy.redbus.backend.controller;

import copy.redbus.backend.entity.*;
import copy.redbus.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = accountService.getUserProfile(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(Authentication authentication, @RequestBody Map<String, Object> payload) {
        String username = authentication.getName();
        String name = (String) payload.get("name");
        Integer age = (Integer) payload.get("age");
        User updatedUser = accountService.updateProfile(username, name, age);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(Authentication authentication) {
        LocalDateTime now = LocalDateTime.now();
        String username = authentication.getName();
        List<Booking> bookings = accountService.getUserBookings(username);
        for (Booking b : bookings) {
            // If trip date is before now and status is still BOOKED
            if ((b.getTrip().getJourneyDate()).atTime(b.getTrip().getDepartureTime()).isBefore(now)
                    && b.getStatus() == BookingStatus.BOOKED) {
                b.setStatus(BookingStatus.COMPLETED);
                accountService.saveBooking(b); // Update the DB
            }
        }
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/cancel-booking/{id}")
    public ResponseEntity<?> cancelBooking(Authentication authentication, @PathVariable Long id) {
        String username = authentication.getName();
        Booking booking = accountService.cancelBooking(username, id);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/transactions")
    public ResponseEntity<?> getTransactions(Authentication authentication) {
        String username = authentication.getName();
        List<Transaction> transactions = accountService.getUserTransactions(username);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/wallet/add")
    public ResponseEntity<?> addWalletBalance(Authentication authentication, @RequestBody Map<String, Object> payload) {
        String username = authentication.getName();
        BigDecimal amount = new BigDecimal(payload.get("amount").toString());
        User user = accountService.addWalletBalance(username, amount);
        return ResponseEntity.ok(user);
    }
}
