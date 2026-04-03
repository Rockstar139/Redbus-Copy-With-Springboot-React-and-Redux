package copy.redbus.backend.service;

import copy.redbus.backend.entity.*;
import copy.redbus.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public User getUserProfile(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
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
        return bookingRepository.findByUserOrderByTripJourneyDateAsc(user);
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
}
