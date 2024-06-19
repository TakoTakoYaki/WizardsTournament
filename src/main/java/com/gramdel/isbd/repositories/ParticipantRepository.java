package com.gramdel.isbd.repositories;

import com.gramdel.isbd.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, String> {
    @Modifying
    @Transactional
    @Query(value = "select * from generate_participants()", nativeQuery = true)
    ArrayList<Participant> generateParticipants();

    @Modifying
    @Transactional
    @Query(value = "select * from set_random_sacrifices() order by name", nativeQuery = true)
    ArrayList<Participant> setRandomSacrifices();

    @Modifying
    @Transactional
    @Query(value = "update Participant p set p.points = ?1 where p.name = ?2")
    int updateParticipantPoints(int points, String name);
}