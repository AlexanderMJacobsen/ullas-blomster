package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.Occasion;
import org.springframework.stereotype.Service;

@Service
public class OccasionService
{
    public Occasion[] getAllOccasions()
    {
        return Occasion.values();
    }
}
