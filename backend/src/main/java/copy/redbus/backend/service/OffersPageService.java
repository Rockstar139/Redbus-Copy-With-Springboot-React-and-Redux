package copy.redbus.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import copy.redbus.backend.entity.OffersPage;
import copy.redbus.backend.repository.OffersPageRepository;

@Service
public class OffersPageService {
    private final OffersPageRepository offersPageRepository;

    public OffersPageService(OffersPageRepository offersPageRepository) {
        this.offersPageRepository = offersPageRepository;
    }

    public List<OffersPage> getAllOffersPages() {
        return offersPageRepository.findAll();
    }
}
