package copy.redbus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import copy.redbus.backend.entity.TransportResult;
import copy.redbus.backend.entity.OfferType;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransportResultRepository extends JpaRepository<TransportResult, Long> {
    List<TransportResult> findByTypeAndFromLocationAndToLocationAndJourneyDate(
        OfferType type, 
        String fromLocation, 
        String toLocation, 
        LocalDate journeyDate
    );
}
