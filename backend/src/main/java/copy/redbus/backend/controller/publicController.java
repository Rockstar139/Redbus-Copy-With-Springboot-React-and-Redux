package copy.redbus.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class publicController {
    
    @GetMapping("health")
    public ResponseEntity<?> checkHealth(){
        return new ResponseEntity<>("I am healthy",HttpStatus.OK);
    }

}
