package copy.redbus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Entity
@Table(name = "transport_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransportResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private OfferType type;

    @Column(name = "fromLocation")
    private String fromLocation;

    @Column(name = "toLocation")
    private String toLocation;

    @Column(name = "journeyDate")
    private LocalDate journeyDate;

    @Column(name = "companyName")
    private String companyName;

    private String model;

    @Column(name = "isAc")
    private boolean isAc;

    @Column(name = "isSeater")
    private boolean isSeater;

    @Column(name = "isSleeper")
    private boolean isSleeper;

    @Column(name = "isDirect")
    private boolean isDirect;

    private BigDecimal rating;

    @Column(name = "totalNoOfRatings")
    private int totalNoOfRatings;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "departureTime")
    private LocalTime departureTime;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "arrivalTime")
    private LocalTime arrivalTime;
   
    @Column(name = "arrivalDate")
    private LocalDate arrivalDate;

    private String duration;
    private BigDecimal price;

    @Column(name = "noOfSingleSeatsFree")
    private int noOfSingleSeatsFree;

    @Column(name = "noOfSleepersFree")
    private int noOfSleepersFree;

    @Column(columnDefinition = "JSON")
    private String tags;
}
