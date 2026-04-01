package copy.redbus.backend.service;

import copy.redbus.backend.entity.Offer;
import copy.redbus.backend.entity.OfferType;
import copy.redbus.backend.repository.OfferRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class OfferService {
  
    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> getOffersByType(OfferType offerType) {
        return offerRepository.findByOfferType(offerType);
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

}
