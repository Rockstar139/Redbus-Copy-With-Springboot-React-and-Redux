package copy.redbus.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import copy.redbus.backend.entity.WhatsNew;
import copy.redbus.backend.repository.WhatsNewRepository;

@Service
public class WhatsNewService {
    private final WhatsNewRepository whatsNewRepository;

    public WhatsNewService(WhatsNewRepository whatsNewRepository){
        this.whatsNewRepository = whatsNewRepository;
    }

    public List<WhatsNew> getWhatsNew(){
        return whatsNewRepository.findAll();
    }

}
