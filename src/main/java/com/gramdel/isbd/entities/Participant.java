package com.gramdel.isbd.entities;

import javax.persistence.*;

@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @Column(name = "name")
    private String name;

    @Column(name = "points")
    private int points;

    @Column(name = "fighting_method")
    private String fightingMethod;

    @Column(name = "breathing_method")
    private String breathingMethod;

    @Column(name = "name_of_sacrifice")
    private String nameOfSacrifice;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getPoints() {
        return points;
    }

    public void setFightingMethod(String fightingMethod) {
        this.fightingMethod = fightingMethod;
    }

    public String getFightingMethod() {
        return fightingMethod;
    }

    public void setBreathingMethod(String breathingMethod) {
        this.breathingMethod = breathingMethod;
    }

    public String getBreathingMethod() {
        return breathingMethod;
    }

    public void setNameOfSacrifice(String nameOfSacrifice) {
        this.nameOfSacrifice = nameOfSacrifice;
    }

    public String getNameOfSacrifice() {
        return nameOfSacrifice;
    }
}
