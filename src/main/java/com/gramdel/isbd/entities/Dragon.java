package com.gramdel.isbd.entities;

import javax.persistence.*;

@Entity
@Table(name = "dragon")
public class Dragon {
    @Id
    @Column(name = "name")
    private String name;

    @Column(name = "danger_level")
    private int dangerLevel;

    @Column(name = "losing_chance")
    private double losingChance;

    @Column(name = "country")
    private String country;

    @Column(name = "color")
    private String color;

    @Column(name = "vulnerability")
    private long vulnerability;

    public int getDangerLevel() {
        return dangerLevel;
    }

    public double getLosingChance() {
        return losingChance;
    }

    public String getCountry() {
        return country;
    }

    public String getColor() {
        return color;
    }

    public long getVulnerability() {
        return vulnerability;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLosingChance(double losingChance) {
        this.losingChance = losingChance;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setDangerLevel(int dangerLevel) {
        this.dangerLevel = dangerLevel;
    }

    public void setVulnerability(long vulnerability) {
        this.vulnerability = vulnerability;
    }
}