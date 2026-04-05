package copy.redbus.backend.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import copy.redbus.backend.entity.TransportResult;
import copy.redbus.backend.entity.OfferType;
import copy.redbus.backend.repository.TransactionRepository;
import copy.redbus.backend.repository.TransportResultRepository;

@Service
public class TransportResultService {
    // private final TransportResultRepository transportResultRepository;

    // public TransportResultService(TransportResultRepository
    // transportResultRepository){
    // this.transportResultRepository = transportResultRepository;
    // }

    @Autowired
    private TransportResultRepository transportResultRepository;

    public List<TransportResult> getResults(String type, String from, String to, LocalDate date) {
        try {
            OfferType offerType = OfferType.valueOf(type.toUpperCase());
            return transportResultRepository
                    .findByNoOfSingleSeatsFreeGreaterThanAndTypeAndFromLocationAndToLocationAndJourneyDate(0l,
                            offerType, from, to, date);
        } catch (Exception e) {
            // If invalid type or missing params, return empty or all as fallback
            // For now, returning empty to be strict
            return List.of();
        }
    }

    public List<TransportResult> getAllResults() {
        return transportResultRepository.findAll();
    }

    public TransportResult getResultById(Long id) {
        return transportResultRepository.findById(id).orElse(null);
    }
}
