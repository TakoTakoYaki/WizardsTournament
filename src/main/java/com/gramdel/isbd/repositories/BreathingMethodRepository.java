package com.gramdel.isbd.repositories;

import com.gramdel.isbd.entities.BreathingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BreathingMethodRepository extends JpaRepository<BreathingMethod, String> {
}