package com.gramdel.isbd.repositories;

import com.gramdel.isbd.entities.Danger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface DangerRepository extends JpaRepository<Danger, String> {
    @Modifying
    @Transactional
    @Query(value = "select * from danger where danger.name = 'Гриндилоу' " +
            "or danger.name = 'Русалка' or danger.name = 'Тритон'", nativeQuery = true)
    ArrayList<Danger> getWaterDanger();

    @Modifying
    @Transactional
    @Query(value = "select * from danger where danger.name = 'Паук' " +
            "or danger.name = 'Лиана' or danger.name = 'Телепорт'", nativeQuery = true)
    ArrayList<Danger> getMazeDanger();
}