package copy.redbus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String roles; // Store roles as comma-separated string, e.g. "USER,ADMIN"

    private String name;
    private Integer age;

    @Column(name = "profile_pic_path")
    private String profilePicPath;

    @Column(name = "wallet_balance")
    private java.math.BigDecimal walletBalance = java.math.BigDecimal.ZERO;
}
