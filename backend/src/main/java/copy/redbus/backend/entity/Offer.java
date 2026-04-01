package copy.redbus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "offerType")
    private OfferType offerType;

    private String title;
    private String validity;

    @Column(name = "couponCode", nullable = false, unique = true)
    private String couponCode;

    @Column(name = "backgroundImage")
    private String backgroundImage;
}
