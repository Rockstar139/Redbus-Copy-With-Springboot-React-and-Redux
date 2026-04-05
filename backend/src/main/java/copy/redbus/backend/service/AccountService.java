package copy.redbus.backend.service;

import copy.redbus.backend.entity.*;
import copy.redbus.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransportResultRepository transportResultRepository;

    @Value("${storage.upload.profile-pic.location}")
    private String uploadDir;

    @Value("${storage.upload.profile-pic.max-size}")
    private String maxSize;

    public User getUserProfile(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Books a ticket for a user.
     * Deducts amount from wallet balance if sufficient, otherwise throws exception.
     */
    @Transactional
    public Booking bookTicket(String username, Long transportId) {
        User user = getUserProfile(username);
        int seatQty = 1;
        TransportResult trip = transportResultRepository.findById(transportId)
                .orElseThrow(() -> new RuntimeException("Transport result not found"));

        BigDecimal price = trip.getPrice();

        // Check if user has enough balance
        if (user.getWalletBalance().compareTo(price) < 0) {
            throw new RuntimeException("Insufficient wallet balance. Please recharge your wallet.");
        }

        //reduce free seats
        trip.setNoOfSingleSeatsFree(trip.getNoOfSingleSeatsFree() - seatQty);
        transportResultRepository.save(trip);

        // Deduct balance
        user.setWalletBalance(user.getWalletBalance().subtract(price));
        userRepository.save(user);

        // Create Booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTrip(trip);
        booking.setAmountPaid(price);
        booking.setStatus(BookingStatus.BOOKED);
        booking = bookingRepository.save(booking);

        // Record Transaction
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setBooking(booking);
        transaction.setType(TransactionType.BOOKING);
        transaction.setAmount(price.negate());
        transaction.setDescription("Ticket booking for " + trip.getCompanyName() + " (#" + booking.getId() + ")");
        transactionRepository.save(transaction);

        return booking;
    }

    @Transactional
    public User updateProfile(String username, String name, Integer age) {
        User user = getUserProfile(username);
        user.setName(name);
        user.setAge(age);
        return userRepository.save(user);
    }

    public List<Booking> getUserBookings(String username) {
        User user = getUserProfile(username);
        // return bookingRepository.findByUser(user);
        return bookingRepository.findByUserOrderByTripJourneyDateDesc(user);
    }

    @Transactional
    public Booking cancelBooking(String username, Long bookingId) {
        User user = getUserProfile(username);
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized cancellation");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        // Update Wallet: Refund the amount
        BigDecimal refundAmount = booking.getAmountPaid();
        user.setWalletBalance(user.getWalletBalance().add(refundAmount));
        userRepository.save(user);

        // Record Transaction
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setBooking(booking);
        transaction.setType(TransactionType.REFUND);
        transaction.setAmount(refundAmount);
        transaction.setDescription("Refund for cancelled booking #" + bookingId);
        transactionRepository.save(transaction);

        return booking;
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }


    public List<Transaction> getUserTransactions(String username) {
        User user = getUserProfile(username);
        return transactionRepository.findByUserOrderByTransactionDateDesc(user);
    }

    @Transactional
    public User addWalletBalance(String username, BigDecimal amount) {
        User user = getUserProfile(username);
        user.setWalletBalance(user.getWalletBalance().add(amount));
        userRepository.save(user);

        // Record Transaction
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setType(TransactionType.WALLET_LOAD);
        transaction.setAmount(amount);
        transaction.setDescription("Wallet top-up");
        transactionRepository.save(transaction);

        return user;
    }

    public ResponseEntity<?> uploadImage(String username, MultipartFile file) {
        try {
        User user = getUserProfile(username);
        user.setProfilePicPath(file.getOriginalFilename());

        // 1. Create directory if not exists
        File directory = new File(uploadDir);
        if (!directory.exists()) directory.mkdirs();

        // 2. Save the file with a unique name
        String fileName = "user_" + user.getId() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.write(path, file.getBytes());

        // 3. Update User in Database
        user.setProfilePicPath(fileName);
        userRepository.save(user);

        return ResponseEntity.ok(user);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file");
        }
    }
}
