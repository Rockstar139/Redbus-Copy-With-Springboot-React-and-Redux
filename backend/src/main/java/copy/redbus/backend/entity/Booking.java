package copy.redbus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    private TransportResult trip;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.BOOKED;

    @Column(name = "amount_paid", nullable = false)
    private BigDecimal amountPaid;
}
