package com.gramdel.isbd.repositories;

import com.gramdel.isbd.entities.Dragon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface DragonRepository extends JpaRepository<Dragon, String> {
    @Modifying
    @Transactional
    @Query(value = "select * from dragon order by random() limit 4", nativeQuery = true)
    ArrayList<Dragon> getRandomDragons();
}