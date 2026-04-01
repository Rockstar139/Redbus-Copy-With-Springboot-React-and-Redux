package copy.redbus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "whats_new")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WhatsNew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "backgroundImage")
    private String backgroundImage;
}
