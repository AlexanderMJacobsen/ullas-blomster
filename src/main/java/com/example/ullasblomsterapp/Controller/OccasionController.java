package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.Occasion;
import com.example.ullasblomsterapp.Service.OccasionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/occasions") // Standard practice to prefix API routes
public class OccasionController {

    private final OccasionService occasionService;

    public OccasionController(OccasionService occasionService) {
        this.occasionService = occasionService;
    }

    /**
     * This handles the core data request.
     * Accessible at: GET /api/occasions
     */
    @GetMapping
    public Occasion[] getAllOccasions() {
        return occasionService.getAllOccasions();
    }

    /**
     * If your "page logic" needed specific metadata or a wrapped response,
     * you can add a specialized endpoint like this.
     */
    @GetMapping("/summary")
    public Map<String, Object> getOccasionsSummary() {
        return Map.of(
                "title", "Ullas Blomster Occasions",
                "count", occasionService.getAllOccasions().length,
                "data", occasionService.getAllOccasions()
        );
    }
}