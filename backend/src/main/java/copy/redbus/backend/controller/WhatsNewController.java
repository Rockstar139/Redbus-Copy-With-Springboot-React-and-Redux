package copy.redbus.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import copy.redbus.backend.service.WhatsNewService;

@RestController
@RequestMapping("/whats-new")
public class WhatsNewController {
    private final WhatsNewService whatsNewService;

    public WhatsNewController(WhatsNewService whatsNewService) {
        this.whatsNewService = whatsNewService;
    }

    @GetMapping
    public ResponseEntity<?> getWhatsNew() {
        return new ResponseEntity<>(whatsNewService.getWhatsNew(), HttpStatus.OK);
    }

}
