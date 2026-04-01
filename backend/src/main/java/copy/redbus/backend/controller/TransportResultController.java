package copy.redbus.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;

import copy.redbus.backend.service.TransportResultService;

@RestController
@RequestMapping("/search")
public class TransportResultController {
    private final TransportResultService transportResultService;

    public TransportResultController(TransportResultService transportResultService) {
        this.transportResultService = transportResultService;
    }

    @GetMapping
    public ResponseEntity<?> getTransportResults(
            @RequestParam String page,
            @RequestParam String txtFrom,
            @RequestParam String txtTo,
            @RequestParam String dateOfJourney) {
        
        try {
            LocalDate date = LocalDate.parse(dateOfJourney);
            return new ResponseEntity<>(
                transportResultService.getResults(page, txtFrom, txtTo, date), 
                HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid search parameters", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("getAll")
    public ResponseEntity<?> getTransportReultsAll(){
        return new ResponseEntity<>(transportResultService.getAllResults(),HttpStatus.OK);
    }
}
