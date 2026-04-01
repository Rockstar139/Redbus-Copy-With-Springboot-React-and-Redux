package copy.redbus.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import copy.redbus.backend.service.OffersPageService;

@RestController
@RequestMapping("/offers-page")
public class OffersPageController {
    private final OffersPageService offersPageService;

    public OffersPageController(OffersPageService offersPageService) {
        this.offersPageService = offersPageService;
    }

    @GetMapping
    public ResponseEntity<?> getAllOffersPages() {
        return new ResponseEntity<>(offersPageService.getAllOffersPages(), HttpStatus.OK);
    }

}
