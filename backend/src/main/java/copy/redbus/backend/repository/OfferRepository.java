package copy.redbus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import copy.redbus.backend.entity.Offer;
import copy.redbus.backend.entity.OfferType;

public interface OfferRepository extends JpaRepository<Offer, Long>{
    List<Offer> findByOfferType(OfferType offerType);
}
