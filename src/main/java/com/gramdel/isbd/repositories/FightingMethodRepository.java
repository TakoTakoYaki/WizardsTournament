package com.gramdel.isbd.repositories;

import com.gramdel.isbd.entities.FightingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FightingMethodRepository extends JpaRepository<FightingMethod, String> {
}