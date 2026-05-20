package com.example.ullasblomsterapp.Repository;

import com.example.ullasblomsterapp.Model.CustomerPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerPreferenceRepository extends JpaRepository<CustomerPreference, Integer> {

}
