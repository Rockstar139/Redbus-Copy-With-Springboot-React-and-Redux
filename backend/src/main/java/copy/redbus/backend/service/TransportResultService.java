package copy.redbus.backend.service;

import java.util.List;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

import copy.redbus.backend.entity.TransportResult;
import copy.redbus.backend.entity.OfferType;
import copy.redbus.backend.repository.TransportResultRepository;

@Service
public class TransportResultService {
    private final TransportResultRepository transportResultRepository;

    public TransportResultService(TransportResultRepository transportResultRepository){
        this.transportResultRepository = transportResultRepository;
    }

    public List<TransportResult> getResults(String type, String from, String to, LocalDate date){
        try {
            OfferType offerType = OfferType.valueOf(type.toUpperCase());
            return transportResultRepository.findByTypeAndFromLocationAndToLocationAndJourneyDate(
                offerType, from, to, date);
        } catch (Exception e) {
            // If invalid type or missing params, return empty or all as fallback
            // For now, returning empty to be strict
            return List.of();
        }
    }

    public List<TransportResult> getAllResults(){
        return transportResultRepository.findAll();
    }
}
