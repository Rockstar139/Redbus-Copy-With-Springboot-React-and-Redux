package copy.redbus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "offers_page")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffersPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "backgroundImage")
    private String backgroundImage;

    private String title;

    @Column(name = "couponCode")
    private String couponCode;
}
