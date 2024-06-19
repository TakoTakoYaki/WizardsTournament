package com.gramdel.isbd.controllers;

import com.gramdel.isbd.entities.*;
import com.gramdel.isbd.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class ApiController {
    @Autowired
    ParticipantRepository participantRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    VulnerabilityRepository vulnerabilityRepository;
    @Autowired
    DragonRepository dragonRepository;
    @Autowired
    DangerRepository dangerRepository;
    @Autowired
    BreathingMethodRepository breathingMethodRepository;
    @Autowired
    FightingMethodRepository fightingMethodRepository;


    @GetMapping(value = "/api/students/get")
    private ResponseEntity<ArrayList<Student>> getStudents() {
        ArrayList<Student> students = new ArrayList<>(studentRepository.findAll());
        if (students.size() == 15) {
            return ResponseEntity.ok().body(students);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/api/participants/generate")
    private ResponseEntity<ArrayList<Participant>> generateParticipants() {
        participantRepository.deleteAll();
        ArrayList<Participant> participants = participantRepository.generateParticipants();
        if (participants.size() == 7) {
            return ResponseEntity.ok().body(participants);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/api/participants/get")
    private ResponseEntity<ArrayList<Participant>> getParticipants() {
        ArrayList<Participant> participants = new ArrayList<>(participantRepository.findAll(Sort.by(Sort.Order.asc("name"))));
        if (participants.size() == 4) {
            return ResponseEntity.ok().body(participants);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/api/participants/update", consumes = {"application/json"})
    public ResponseEntity<Void> updateParticipants(@RequestBody Participant[] participants) {
        try {
            for (Participant p : participants) {
                participantRepository.updateParticipantPoints(p.getPoints(), p.getName());
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/api/participants/set_random_sacrifices")
    private ResponseEntity<ArrayList<Participant>> setRandomSacrificesOfParticipants() {
        ArrayList<Participant> participants = participantRepository.setRandomSacrifices();
        if (participants.size() == 4) {
            return ResponseEntity.ok().body(participants);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/api/dragons/get")
    private ResponseEntity<ArrayList<Dragon>> getDragons() {
        ArrayList<Dragon> dragons = dragonRepository.getRandomDragons();
        if (dragons.size() == 4) {
            return ResponseEntity.ok().body(dragons);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/api/vulnerabilities/get", consumes = {"application/json"})
    private ResponseEntity<ArrayList<Vulnerability>> getVulnerabilities(@RequestBody long[] ids) {
        ArrayList<Vulnerability> vulnerabilities = new ArrayList<>();
        for (long id : ids) {
            Optional<Vulnerability> optional = vulnerabilityRepository.findById(id);
            if (optional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            vulnerabilities.add(optional.get());
        }
        return ResponseEntity.ok().body(vulnerabilities);
    }

    @PostMapping(value = "/api/fighting_methods/get", consumes = {"application/json"})
    private ResponseEntity<ArrayList<FightingMethod>> getFightingMethods(@RequestBody String[] names) {
        ArrayList<FightingMethod> fightingMethods = new ArrayList<>();
        for (String name : names) {
            Optional<FightingMethod> optional = fightingMethodRepository.findById(name);
            if (optional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            fightingMethods.add(optional.get());
        }
        return ResponseEntity.ok().body(fightingMethods);
    }

    @PostMapping(value = "/api/breathing_methods/get", consumes = {"application/json"})
    private ResponseEntity<ArrayList<BreathingMethod>> getBreathingMethods(@RequestBody String[] names) {
        ArrayList<BreathingMethod> breathingMethods = new ArrayList<>();
        for (String name : names) {
            Optional<BreathingMethod> optional = breathingMethodRepository.findById(name);
            if (optional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            breathingMethods.add(optional.get());
        }
        return ResponseEntity.ok().body(breathingMethods);
    }

    @GetMapping(value = "/api/dangers/water/get")
    private ResponseEntity<ArrayList<Danger>> getWaterDangers() {
        ArrayList<Danger> dangers = dangerRepository.getWaterDanger();
        if (dangers.size() == 3) {
            return ResponseEntity.ok().body(dangers);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/api/dangers/maze/get")
    private ResponseEntity<ArrayList<Danger>> getMazeDangers() {
        ArrayList<Danger> dangers = dangerRepository.getMazeDanger();
        if (dangers.size() == 3) {
            return ResponseEntity.ok().body(dangers);
        }
        return ResponseEntity.notFound().build();
    }
}
