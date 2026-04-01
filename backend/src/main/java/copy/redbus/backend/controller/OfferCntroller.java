package copy.redbus.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import copy.redbus.backend.service.OfferService;

@RestController
@RequestMapping("/offers")
public class OfferCntroller {
    private final OfferService offerService;

    public OfferCntroller(OfferService offerService){
        this.offerService = offerService;
    }

    @GetMapping
    public ResponseEntity<?> getOffers(){
        return new ResponseEntity<>(offerService.getAllOffers(),HttpStatus.OK);
    }
}
